/// <reference types="vite/client" />

/**
 * Compile-time switch for the optics work counters, set by `define` in vite.config.js. Scripts that load
 * `src/optics` under plain Node get no define, so the global may not exist; only
 * `src/optics/diagnostics/workCounters.ts` reads it.
 */
declare const __OPTICS_COUNTERS__: boolean | undefined;

declare module "*.md?raw" {
  const content: string;
  export default content;
}
