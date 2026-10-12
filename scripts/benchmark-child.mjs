/**
 * One pass of a paired, heavy or memory benchmark run, in a process of its own.
 *
 * `scripts/benchmark-optics-rendering.mjs` builds the bundles and starts this script once per pass. The process
 * that ran the builds is no place to measure in: the bundler's objects share V8's shape tree with the engine's,
 * and what the bundler stored in a shape decides how the engine's code is compiled. Measured after a build of a
 * base worktree, `evaluateAperture` deoptimized in a loop, which slowed the heavy cases on both sides and made two
 * copies of one engine differ. A process that only imports the prebuilt bundles has no such history, and none of
 * the build's heap.
 *
 * Usage:
 *   node [--expose-gc] scripts/benchmark-child.mjs <timed|untimed|memory> <request JSON> <result file>
 *
 * The request names the bundle to import as `bundleUrl`, a timed pass's base bundle as `baseBundleUrl`, the side
 * whose bundle a paired timed pass loads and prepares first as `firstSide`, the heavy set as `heavy`, and the
 * options of the entry function as `options`. The result file receives that function's return value as JSON.
 * Progress goes to stderr.
 */

import { writeFileSync } from "node:fs";

const [pass, requestJson, resultPath] = process.argv.slice(2);
const { bundleUrl, baseBundleUrl = null, firstSide = "base", heavy = false, options = {} } = JSON.parse(requestJson);
/* The label names the pass in the progress lines and is no option of an entry function. */
const { label = pass, ...entryOptions } = options;

/* Which bundle a process loads first leans most cases toward one side for the whole process, and the alternation
 * of pairs cannot cancel that. A paired run therefore times once in each order, and this process is one of the
 * two. The head's bundle drives the run in both, whichever is loaded first. */
const baseFirst = pass === "timed" && baseBundleUrl !== null && firstSide === "base";
const baseLoadedFirst = baseFirst ? await import(baseBundleUrl) : null;
const bundle = await import(bundleUrl);
const cells = heavy ? bundle.HEAVY_BENCHMARK_CELLS : undefined;
const reportCell = ({ lensKey, scenarioId, index, count }) => {
  console.error(`benchmark: ${label} ${index + 1}/${count} ${lensKey} ${scenarioId}`);
};

let result;
if (pass === "timed") {
  const base = baseLoadedFirst ?? (baseBundleUrl ? await import(baseBundleUrl) : null);
  result = await bundle.runOpticsRenderingBenchmark({
    ...entryOptions,
    cells,
    keepSamples: true,
    onCell: reportCell,
    ...(base ? { base: { ...entryOptions.base, prepareBenchmarkLens: base.prepareBenchmarkLens, firstSide } } : {}),
  });
} else if (pass === "untimed") {
  result = await bundle.runUntimedBenchmarkPass({ cells, onCell: reportCell });
} else if (pass === "memory") {
  result = await bundle.runMemorySession({ cells });
} else {
  throw new Error(`Unknown benchmark pass: ${pass}`);
}
writeFileSync(resultPath, JSON.stringify(result), "utf8");
