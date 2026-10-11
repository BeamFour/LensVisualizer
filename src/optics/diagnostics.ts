/**
 * Engine diagnostics public barrel — read access to the work counters for benchmarks, harnesses and tests.
 *
 * Tooling outside `src/optics/` imports from here. The live counter record stays in
 * `diagnostics/workCounters.ts`, where only engine call sites write to it.
 */

export {
  OPTICS_COUNTERS_ENABLED,
  resetWorkCounters,
  snapshotWorkCounters,
  type WorkCounterSnapshot,
} from "./diagnostics/workCounters.js";
