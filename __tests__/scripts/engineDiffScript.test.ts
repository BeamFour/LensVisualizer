/**
 * The engine differential driver: its command line, and one run of the real script.
 *
 * The comparison itself is tested with the harness in `__tests__/src/benchmarks/`. What only a real run shows is
 * the plumbing around it: a base worktree added and removed again, two capture bundles built with no config file,
 * and the reports written where the caller asked.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { USAGE, parseArgs } from "../../scripts/engine-diff.mjs";

describe("engine-diff command line", () => {
  it("defaults to Tier P under C0, with nothing narrowed and nothing declared", () => {
    expect(parseArgs(["--base", "origin/main"])).toEqual({
      base: "origin/main",
      tier: "p",
      changeClass: "c0",
      lens: null,
      exceptions: null,
      out: null,
    });
  });

  it("takes a value after its flag or after an equals sign", () => {
    const expected = {
      base: "optics-rewrite/s1",
      tier: "p",
      changeClass: "c2",
      lens: "host-lens+some-converter",
      exceptions: "description.md",
      out: "out/dir=1",
    };
    expect(
      parseArgs([
        "--base",
        "optics-rewrite/s1",
        "--tier",
        "p",
        "--class",
        "c2",
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
        "--tier=p",
        "--class=c2",
        "--lens=host-lens+some-converter",
        "--exceptions=description.md",
        "--out=out/dir=1",
      ]),
    ).toEqual(expected);
  });

  it("refuses what it cannot run, and says why", () => {
    expect(() => parseArgs([])).toThrow("--base <ref> is required");
    expect(() => parseArgs(["--base"])).toThrow("--base needs a value");
    expect(() => parseArgs(["--base=main", "--verbose"])).toThrow(`Unknown engine-diff argument: --verbose\n${USAGE}`);
    expect(() => parseArgs(["main"])).toThrow("Unknown engine-diff argument: main");
    expect(() => parseArgs(["--base=main", "--tier=q"])).toThrow("--tier must be one of p, s, f");
    expect(() => parseArgs(["--base=main", "--class=c4"])).toThrow("--class must be one of c0, c1, c2, c3");
    /* The stage and full tiers and their shards are known names with no request list yet. */
    expect(() => parseArgs(["--base=main", "--tier=s"])).toThrow("--tier s is not defined yet");
    expect(() => parseArgs(["--base=main", "--tier", "f"])).toThrow("--tier f is not defined yet");
    expect(() => parseArgs(["--base=main", "--shard", "2/4"])).toThrow("--shard is not defined yet");
    expect(() => parseArgs(["--base=main", "--shard=5/4"])).toThrow("--shard must be i/n");
    expect(() => parseArgs(["--base=main", "--shard=half"])).toThrow("--shard must be i/n");
  });
});

describe("engine-diff run", () => {
  it(
    "compares HEAD with the working tree for one lens and leaves no worktree behind",
    { timeout: 180_000 },
    (context) => {
      const outDir = mkdtempSync(join(tmpdir(), "engine-diff-test-"));
      try {
        let output: string;
        try {
          output = execFileSync(
            "node",
            [
              "scripts/engine-diff.mjs",
              "--base",
              "HEAD",
              "--tier",
              "p",
              "--class",
              "c0",
              "--lens",
              "canon-serenar-50f18",
              "--out",
              outDir,
            ],
            { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
          );
        } catch (error) {
          const stderr = String((error as { stderr?: string }).stderr);
          /* A source archive or a sandbox without a writable git directory has no worktrees to add. */
          if (stderr.includes("git worktree add failed")) {
            context.skip(`git cannot create a worktree here, so the driver was not run: ${stderr.trim()}`);
          }
          throw new Error(`engine-diff.mjs failed: ${stderr}`, { cause: error });
        }

        expect(output).toContain("engine-diff: passed (tier p, class c0): 1 lenses, 7 records");
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
          lens: string;
          base: { ref: string; commit: string };
          engine: { records: number; recordsDiffering: number; numbers: number };
          uncompared: unknown[];
          seam: { base: Record<string, string>; head: Record<string, string> };
          phases: [string, number][];
        };
        expect(summary).toMatchObject({
          passed: true,
          tier: "p",
          changeClass: "c0",
          lens: "canon-serenar-50f18",
          base: { ref: "HEAD" },
          engine: { records: 7, recordsDiffering: 0 },
          uncompared: [],
        });
        expect(summary.base.commit).toMatch(/^[0-9a-f]{40}$/);
        expect(summary.engine.numbers).toBeGreaterThan(1e5);
        /* Both bundles resolved the engine through the same seam. */
        expect(summary.seam.base).toEqual(summary.seam.head);
        expect(summary.phases.map(([phase]) => phase)).toEqual(
          expect.arrayContaining(["Base worktree", "Capture bundles", "Capture on the base engine", "Total"]),
        );
        expect(readFileSync(join(outDir, "reports", "summary.md"), "utf8")).toContain("# Engine diff: passed");
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
});
