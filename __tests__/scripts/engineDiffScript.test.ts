/**
 * The engine differential driver: its command line, and runs of the real script.
 *
 * The comparison itself is tested with the harness in `__tests__/src/benchmarks/`. What only a real run shows is
 * the plumbing around it: a base worktree added and removed again, two capture bundles built with no config file
 * and with the engine's work counters on, a tier cut down to one shard, and the reports written where the caller
 * asked.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { USAGE, parseArgs } from "../../scripts/engine-diff.mjs";
import { exportCatalog, requestCatalog } from "../../src/benchmarks/engineDiff/captureEntry.js";
import { lensId, shardRequests, tierRequests } from "../../src/benchmarks/engineDiff/requests.js";

describe("engine-diff command line", () => {
  it("defaults to Tier P under C0, with nothing narrowed and nothing declared", () => {
    expect(parseArgs(["--base", "origin/main"])).toEqual({
      base: "origin/main",
      tier: "p",
      changeClass: "c0",
      shard: null,
      lens: null,
      exceptions: null,
      out: null,
    });
  });

  it("takes a value after its flag or after an equals sign", () => {
    const expected = {
      base: "optics-rewrite/s1",
      tier: "s",
      changeClass: "c2",
      shard: { index: 3, count: 8 },
      lens: "host-lens+some-converter",
      exceptions: "description.md",
      out: "out/dir=1",
    };
    expect(
      parseArgs([
        "--base",
        "optics-rewrite/s1",
        "--tier",
        "s",
        "--class",
        "c2",
        "--shard",
        "3/8",
        "--lens",
        "host-lens+some-converter",
        "--exceptions",
        "description.md",
        "--out",
        "out/dir=1",
      ]),
    ).toEqual(expected);
    expect(
      parseArgs([
        "--base=optics-rewrite/s1",
        "--tier=s",
        "--class=c2",
        "--shard=3/8",
        "--lens=host-lens+some-converter",
        "--exceptions=description.md",
        "--out=out/dir=1",
      ]),
    ).toEqual(expected);
  });

  it("takes every tier, and a shard counted from 1 up to the number of shards", () => {
    expect(["p", "s", "f"].map((tier) => parseArgs(["--base=main", `--tier=${tier}`]).tier)).toEqual(["p", "s", "f"]);
    expect(parseArgs(["--base=main", "--tier=f", "--shard=1/1"]).shard).toEqual({ index: 1, count: 1 });
    expect(parseArgs(["--base=main", "--tier=f", "--shard=32/32"]).shard).toEqual({ index: 32, count: 32 });
  });

  it("refuses what it cannot run, and says why", () => {
    expect(() => parseArgs([])).toThrow("--base <ref> is required");
    expect(() => parseArgs(["--base"])).toThrow("--base needs a value");
    expect(() => parseArgs(["--base=main", "--verbose"])).toThrow(`Unknown engine-diff argument: --verbose\n${USAGE}`);
    expect(() => parseArgs(["main"])).toThrow("Unknown engine-diff argument: main");
    expect(() => parseArgs(["--base=main", "--tier=q"])).toThrow("--tier must be one of p, s, f");
    expect(() => parseArgs(["--base=main", "--class=c4"])).toThrow("--class must be one of c0, c1, c2, c3");
    for (const shard of ["5/4", "0/4", "1/0", "half", "3", "-1/4", "1.5/4", "1/4/8"]) {
      expect(() => parseArgs(["--base=main", `--shard=${shard}`])).toThrow("--shard must be i/n with 1 <= i <= n");
    }
  });
});

/** What a run of the driver printed, and how it ended. */
interface DriverRun {
  status: "passed" | "failed";
  stdout: string;
  stderr: string;
}

/**
 * Run the real driver against HEAD.
 *
 * @param args - arguments after `--base HEAD`
 * @returns the run, or null where git cannot add a worktree and the driver therefore cannot run at all
 */
function runDriver(args: readonly string[]): DriverRun | null {
  try {
    const stdout = execFileSync("node", ["scripts/engine-diff.mjs", "--base", "HEAD", ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { status: "passed", stdout, stderr: "" };
  } catch (error) {
    const { stdout, stderr } = error as { stdout?: string; stderr?: string };
    /* A source archive or a sandbox without a writable git directory has no worktrees to add. */
    if (String(stderr).includes("git worktree add failed")) return null;
    return { status: "failed", stdout: String(stdout), stderr: String(stderr) };
  }
}

describe("engine-diff run", () => {
  it(
    "compares HEAD with the working tree for one lens and leaves no worktree behind",
    { timeout: 180_000 },
    (context) => {
      const outDir = mkdtempSync(join(tmpdir(), "engine-diff-test-"));
      try {
        const run = runDriver(["--tier", "p", "--class", "c0", "--lens", "canon-serenar-50f18", "--out", outDir]);
        if (!run) return context.skip("git cannot create a worktree here, so the driver was not run");
        if (run.status !== "passed") throw new Error(`engine-diff.mjs failed: ${run.stderr}`);
        const output = run.stdout;

        expect(output).toContain("engine-diff: passed (tier p, class c0): 1 lenses, 7 records");
        expect(output).toContain("engine-diff: work counters compared in 7 pairs of records; they rose in 0.");
        expect(readdirSync(join(outDir, "reports")).sort()).toEqual([
          "data-impact.md",
          "failing-records.ndjson.gz",
          "summary.json",
          "summary.md",
          "uncompared.json",
        ]);
        expect(readdirSync(join(outDir, "payloads")).sort()).toEqual([
          "base-data.ndjson.gz",
          "base-engine.ndjson.gz",
          "head-engine.ndjson.gz",
        ]);
        const summary = JSON.parse(readFileSync(join(outDir, "reports", "summary.json"), "utf8")) as {
          passed: boolean;
          tier: string;
          changeClass: string;
          shard: null;
          lens: string;
          base: { ref: string; commit: string };
          engine: { records: number; recordsDiffering: number; numbers: number };
          workCounters: { totals: Record<string, { base: number | null; head: number | null }> };
          uncompared: unknown[];
          seam: { base: Record<string, string>; head: Record<string, string> };
          phases: [string, number][];
        };
        expect(summary).toMatchObject({
          passed: true,
          tier: "p",
          changeClass: "c0",
          shard: null,
          lens: "canon-serenar-50f18",
          base: { ref: "HEAD" },
          engine: { records: 7, recordsDiffering: 0 },
          /* Both bundles were built to count, and Tier P reports a rise where the stage tiers fail on one. */
          workCounters: { gated: false, records: { base: 7, head: 7, both: 7 }, risingRecords: 0 },
          uncompared: [],
        });
        expect(summary.base.commit).toMatch(/^[0-9a-f]{40}$/);
        expect(summary.engine.numbers).toBeGreaterThan(1e5);
        /* The bundles really count: one lens built per record, and rays traced, the same on both engines. */
        const { totals } = summary.workCounters;
        expect(totals.runtimeLensBuilds).toEqual({ base: 7, head: 7 });
        expect(totals.fullTracesPreparedSequential.head).toBeGreaterThan(1000);
        expect(totals.fullTracesPreparedSequential.head).toBe(totals.fullTracesPreparedSequential.base);
        /* Both bundles resolved the engine through the same seam. */
        expect(summary.seam.base).toEqual(summary.seam.head);
        expect(summary.phases.map(([phase]) => phase)).toEqual(
          expect.arrayContaining(["Base worktree", "Capture bundles", "Capture on the base engine", "Total"]),
        );
        const markdown = readFileSync(join(outDir, "reports", "summary.md"), "utf8");
        expect(markdown).toContain("# Engine diff: passed");
        expect(markdown).toContain("| `runtimeLensBuilds` | 7 | 7 | 0 |");
        expect(readFileSync(join(outDir, "reports", "uncompared.json"), "utf8")).toBe("[]\n");

        /* The run names the worktree it added. Another run's may exist at this moment; this one's must be gone. */
        const worktree = /^engine-diff: base worktree (.+)$/m.exec(output)?.[1] ?? "";
        expect(worktree).toContain("engine-diff-base-");
        expect(existsSync(worktree)).toBe(false);
        const listed = execFileSync("git", ["worktree", "list"], {
          encoding: "utf8",
          stdio: ["ignore", "pipe", "pipe"],
        });
        expect(listed).not.toContain(worktree);
      } finally {
        rmSync(outDir, { recursive: true, force: true });
      }
      expect(existsSync(outDir)).toBe(false);
    },
  );

  it("runs one shard of the stage tier, and finds a lens in that shard alone", { timeout: 180_000 }, (context) => {
    const shard = { index: 2, count: 3 };
    /* The lens of the shard that the tier asks least of: a prime outside the analysis and MTF rows. */
    const requestsOf = new Map<string, number>();
    for (const request of shardRequests(tierRequests("s", requestCatalog(exportCatalog())), shard)) {
      requestsOf.set(lensId(request.lens), (requestsOf.get(lensId(request.lens)) ?? 0) + 1);
    }
    const [lens, records] = [...requestsOf].reduce((least, entry) => (entry[1] < least[1] ? entry : least));
    /* Build constants, and four families at two focus ends, each wide open and stopped down. */
    expect(records).toBe(17);

    const outDir = mkdtempSync(join(tmpdir(), "engine-diff-test-"));
    try {
      const run = runDriver(["--tier", "s", "--shard", "2/3", "--lens", lens, "--out", outDir]);
      if (!run) return context.skip("git cannot create a worktree here, so the driver was not run");
      if (run.status !== "passed") throw new Error(`engine-diff.mjs failed: ${run.stderr}`);
      expect(run.stdout).toContain("engine-diff: tier s shard 2/3, base ");
      expect(run.stdout).toContain(`engine-diff: passed (tier s shard 2/3, class c0): 1 lenses, ${records} records`);
      const summary = JSON.parse(readFileSync(join(outDir, "reports", "summary.json"), "utf8")) as object;
      expect(summary).toMatchObject({
        passed: true,
        tier: "s",
        shard,
        lens,
        engine: { records, recordsDiffering: 0 },
        /* The stage tier holds the work counters to "never rise", and a commit against itself raises none. */
        workCounters: { gated: true, records: { both: records }, risingRecords: 0 },
      });
      expect(readFileSync(join(outDir, "reports", "summary.md"), "utf8")).toContain(
        `Tier S, class C0, shard 2 of 3, lens \`${lens}\` only.`,
      );

      /* The same lens is in no other shard: the run has nothing to compare, and says so instead of passing. */
      const elsewhere = runDriver(["--tier", "s", "--shard", "1/3", "--lens", lens, "--out", outDir]);
      expect(elsewhere).toMatchObject({
        status: "failed",
        stderr: expect.stringContaining(`tier s shard 1/3 has no request for the lens "${lens}"`),
      });
    } finally {
      rmSync(outDir, { recursive: true, force: true });
    }
  });
});
