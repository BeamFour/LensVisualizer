/**
 * The MTF benchmark's command line, and one paired run.
 *
 * The script is its own entry point and reads its arguments before it loads any engine module, so what it refuses
 * is tested by running it: each of those runs ends at the argument it cannot take. The paired run is the shortest
 * there is, one sample of the finite case against HEAD, and is skipped where git cannot add a worktree.
 */

import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

/**
 * Run the real script with arguments it must refuse.
 *
 * @param args - arguments after the script name
 * @returns what the script wrote to stderr, or "accepted" when it ran
 */
function refusal(args: readonly string[]): string {
  try {
    execFileSync(
      "node",
      ["--import", "./scripts/ts-js-specifier-hook-register.mjs", "scripts/benchmark-mtf.mjs", ...args],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    );
    return "accepted";
  } catch (error) {
    return String((error as { stderr?: string }).stderr);
  }
}

describe("benchmark-mtf command line", () => {
  it("treats an argument it does not know as an error", () => {
    expect(refusal(["--iteration=5"])).toContain("Unknown MTF benchmark argument: --iteration=5");
    expect(refusal(["--verbose"])).toContain("Unknown MTF benchmark argument: --verbose");
    expect(refusal(["d49857ae"])).toContain("Unknown MTF benchmark argument: d49857ae");
    /* A switch takes no value. */
    expect(refusal(["--finite=1"])).toContain("Unknown MTF benchmark argument: --finite=1");
  });

  it("needs a value for each flag that takes one, after the flag or after an equals sign", () => {
    expect(refusal(["--base"])).toContain("--base needs a value.");
    expect(refusal(["--base="])).toContain("--base needs a value.");
    expect(refusal(["--base", "--finite"])).toContain("--base needs a value.");
    expect(refusal(["--iterations"])).toContain("--iterations needs a value.");
  });

  it("checks the sample counts and the options it had before", () => {
    expect(refusal(["--iterations=0"])).toContain("--iterations must be an integer >= 1.");
    expect(refusal(["--warmups", "-1"])).toContain("--warmups must be an integer >= 0.");
    expect(refusal(["--method=wave"])).toContain("Unknown --method=wave");
    expect(refusal(["--spectrum", "white"])).toContain("Unknown --spectrum=white");
    expect(refusal(["--fields=1"])).toContain("--fields must be 2-101");
  });

  it("marks no row regressed on too few samples, and says so in its JSON", { timeout: 120_000 }, (context) => {
    let output: string;
    try {
      output = execFileSync(
        "node",
        [
          "--import",
          "./scripts/ts-js-specifier-hook-register.mjs",
          "scripts/benchmark-mtf.mjs",
          ...["--finite", "--base", "HEAD", "--iterations=1", "--warmups=0"],
        ],
        { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
      );
    } catch (error) {
      /* A source archive or a sandbox without a writable git directory has no worktrees to add. */
      if (String((error as { stderr?: string }).stderr).includes("git worktree add failed")) {
        return context.skip("git cannot create a worktree here, so the paired run was not made");
      }
      throw error;
    }
    const run = JSON.parse(output) as {
      iterations: number;
      comparison: { notice?: string; regressed: string[] };
      rows: { comparison: { pairs: number; regressed: boolean; ci95: [number, number] } }[];
    };

    expect(run.iterations).toBe(1);
    expect(run.comparison.notice).toBe(
      "Too few samples for a verdict: a regression needs at least 9 measured samples per case to mean anything. " +
        "No row is marked regressed.",
    );
    expect(run.comparison.regressed).toEqual([]);
    expect(run.rows).toHaveLength(4);
    for (const { comparison } of run.rows) {
      /* One pair gives an interval of no width, which the rule alone would read as certainty. */
      expect(comparison.pairs).toBe(1);
      expect(comparison.ci95[0]).toBe(comparison.ci95[1]);
      expect(comparison.regressed).toBe(false);
    }
  });
});
