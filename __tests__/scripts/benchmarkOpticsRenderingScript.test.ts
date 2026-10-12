import { mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  BENCHMARK_RUN_RETENTION_TRIGGER,
  parseArgs,
  pruneOldBenchmarkRunFiles,
} from "../../scripts/benchmark-optics-rendering.mjs";

function withTempRunsDir<T>(callback: (runsDir: string) => T): T {
  const root = mkdtempSync(join(tmpdir(), "benchmark-retention-"));
  try {
    return callback(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function writeRunFile(runsDir: string, index: number): string {
  const name = `2026-05-27T12-${String(index).padStart(2, "0")}-00Z-test.json`;
  writeFileSync(join(runsDir, name), "{}\n", "utf8");
  return name;
}

describe("benchmark optics rendering script retention", () => {
  it("leaves fewer-than-threshold run files untouched", () => {
    withTempRunsDir((runsDir) => {
      const names = Array.from({ length: BENCHMARK_RUN_RETENTION_TRIGGER - 1 }, (_, index) =>
        writeRunFile(runsDir, index),
      );

      expect(pruneOldBenchmarkRunFiles(runsDir)).toEqual([]);
      expect(readdirSync(runsDir).sort()).toEqual(names.sort());
    });
  });

  it("removes oldest JSON run files once the threshold is reached", () => {
    withTempRunsDir((runsDir) => {
      const names = Array.from({ length: BENCHMARK_RUN_RETENTION_TRIGGER + 2 }, (_, index) =>
        writeRunFile(runsDir, index),
      );
      writeFileSync(join(runsDir, "README.md"), "ignore me\n", "utf8");

      const removed = pruneOldBenchmarkRunFiles(runsDir);
      const remaining = readdirSync(runsDir).sort();

      expect(removed.map((path) => basename(path))).toEqual(names.slice(0, 3));
      expect(remaining).toEqual([...names.slice(3), "README.md"].sort());
    });
  });
});

describe("benchmark optics rendering command line", () => {
  const plain = {
    dryRun: false,
    reportOnly: false,
    iterations: undefined,
    warmups: undefined,
    base: null,
    heavy: false,
    memory: false,
  };

  it("runs the whole matrix on the working tree when given nothing", () => {
    expect(parseArgs([])).toEqual(plain);
    expect(parseArgs(["--iterations=5", "--warmups=2"])).toEqual({ ...plain, iterations: 5, warmups: 2 });
    expect(parseArgs(["--dry-run"])).toEqual({ ...plain, dryRun: true });
    expect(parseArgs(["--report-only"])).toEqual({ ...plain, reportOnly: true });
  });

  it("takes the base of a paired run after its flag or after an equals sign", () => {
    const paired = { ...plain, base: "d49857ae", heavy: true, iterations: 15, warmups: 2 };

    expect(parseArgs(["--base", "d49857ae", "--heavy", "--iterations=15", "--warmups=2"])).toEqual(paired);
    expect(parseArgs(["--base=d49857ae", "--heavy", "--iterations=15", "--warmups=2"])).toEqual(paired);
    expect(parseArgs(["--iterations=15", "--warmups=2", "--heavy", "--base", "d49857ae"])).toEqual(paired);
    expect(parseArgs(["--base=optics-rewrite/s1"]).base).toBe("optics-rewrite/s1");
    expect(parseArgs(["--memory", "--heavy", "--base", "HEAD"])).toEqual({
      ...plain,
      base: "HEAD",
      heavy: true,
      memory: true,
    });
  });

  it("refuses what it cannot run, and says why", () => {
    expect(() => parseArgs(["--base"])).toThrow("--base needs a ref.");
    expect(() => parseArgs(["--base="])).toThrow("--base needs a ref.");
    expect(() => parseArgs(["--base", "--heavy"])).toThrow("--base needs a ref.");
    expect(() => parseArgs(["d49857ae"])).toThrow("Unknown benchmark argument: d49857ae");
    expect(() => parseArgs(["--verbose"])).toThrow("Unknown benchmark argument: --verbose");
    expect(() => parseArgs(["--iterations=0"])).toThrow("--iterations must be an integer >= 1.");
    expect(() => parseArgs(["--warmups=-1"])).toThrow("--warmups must be an integer >= 0.");
    expect(() => parseArgs(["--dry-run", "--report-only"])).toThrow("cannot be used together");
    expect(() => parseArgs(["--report-only", "--heavy"])).toThrow("--report-only rebuilds the trend report");
    expect(() => parseArgs(["--memory", "--iterations=3"])).toThrow("--memory runs the memory session alone");
    expect(() => parseArgs(["--memory", "--dry-run"])).toThrow("--memory runs the memory session alone");
  });
});
