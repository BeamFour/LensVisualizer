/**
 * Work counters — structural counts of the work the optics engine does.
 *
 * A count is exact and the same on every machine, so benchmarks, the differential harness and tests use these to
 * show that a request does no more work than it did before. Engine modules only feed them: every statement that
 * touches a counter is guarded by the flag below and stands on its own, so no optical result can depend on one.
 *
 * Counting is off unless the build defines `__OPTICS_COUNTERS__` as `true`. This module imports nothing, so any
 * engine module can import it without joining an import cycle; code outside `src/optics/` reads the counters through
 * `src/optics/diagnostics.ts`.
 */

/**
 * Whether counting is on, read once at module load.
 *
 * A Vite build replaces `__OPTICS_COUNTERS__` with a literal, so this constant folds and a build that sets it false
 * drops every `if (OPTICS_COUNTERS_ENABLED) ...` branch. Vitest and the dev server supply it as a runtime global
 * instead. Plain Node (the audit and MTF scripts) has no such global at all: the `typeof` test keeps the read from
 * throwing there, which is why call sites test this constant and never the bare global.
 */
export const OPTICS_COUNTERS_ENABLED = typeof __OPTICS_COUNTERS__ !== "undefined" && __OPTICS_COUNTERS__ === true;

/* Histogram bucket i counts solves that used exactly i units, and the last bucket takes every larger solve; call
 * sites clamp a per-solve count to it. The largest solves possible today are 420 stop traces (2 + 4 × 97 + 30) for
 * a chief solve and 517 evaluations (1 + 5 × 97 + 30 + 1) for a root solve at its default limits, so 1,024 exact
 * buckets leave room. */
const HISTOGRAM_BUCKETS = 1025;

/**
 * Build the zeroed counter record: numeric fields and fixed-length histograms only, so its shape never changes and
 * the module holds no keyed container.
 */
function createWorkCounters() {
  return {
    /* ── Surface-profile evaluations: one sag and one slope at a point along a ray ── */
    /** Prepared kernel (`math/intersection.ts`), which also runs the legacy tracer's asphere cap searches. */
    preparedProfileEvaluations: 0,
    /** Legacy kernel (`internal/surfaceIntersection.ts`). */
    legacyProfileEvaluations: 0,

    /* ── Intersections by kind ──
     * Prepared: one per request, by `SurfaceProfile` kind; an asphere's cap search is not a second intersection.
     * Legacy: by the branch that solves the surface, so a request rejected for an invalid ray or bounds is not one. */
    preparedFlatIntersections: 0,
    preparedSphericalIntersections: 0,
    preparedAsphericIntersections: 0,
    preparedTiltedPlaneIntersections: 0,
    legacyFlatIntersections: 0,
    legacySphericalIntersections: 0,
    legacyAsphericIntersections: 0,
    legacyTiltedPlaneIntersections: 0,
    /** `intersectRayPlane` requests: landings on the prepared image plane and the perspective sensor plane. */
    rayPlaneIntersections: 0,
    /** Image-plane tests by the legacy generalized tracer. */
    legacyImagePlaneIntersections: 0,

    /* ── Intersection outcomes ──
     * Floor-assisted: a hit accepted above the requested tolerance, on the solver's roundoff envelope.
     * Exhaustion: the iteration budget ran out; other failures carry the same failure reason and are not counted.
     * An asphere's cap search runs in the prepared kernel for both tracers, so its outcomes are counted in the
     * prepared fields even for a legacy request, and its certificate refusals in the one shared field. */
    preparedFloorAssistedAcceptances: 0,
    legacyFloorAssistedAcceptances: 0,
    preparedExhaustionFailures: 0,
    legacyExhaustionFailures: 0,
    /** Asphere cap selections that could not certify a unique cap root because coordinate roundoff was too large. */
    capCertificateRefusals: 0,

    /* ── Traces by capture ──
     * Every trace records full hits and diagnostics, so "full" is the only capture and the split is by tracer. */
    fullTracesPreparedSequential: 0,
    fullTracesPreparedGeneralized: 0,
    fullTracesLegacy: 0,

    /* ── Chief-ray solves ── */
    /** Full solves: cache misses, field-walk probes and convergence checks, near-axis and out-of-domain included. */
    chiefSolves: 0,
    /**
     * Stop traces those solves evaluate, object-plane and bounding-sphere searches alike. The bounding-sphere solver
     * is also exported: a direct call to it adds its stop traces here without adding a solve or a histogram entry.
     */
    chiefSolveStopTraces: 0,
    /** Stop traces per full solve. */
    chiefSolveStopTraceHistogram: createHistogram(),
    /** Field-walk re-solves from a converged neighbour that reach their bracket search, and their stop traces. */
    seededChiefSolves: 0,
    seededChiefSolveStopTraces: 0,
    /** Image heights inverted to a field angle on the accurate chief-ray path, past the trivial and no-field exits. */
    imageHeightInversionTargets: 0,
    /** Chief-ray solves those inversions request; the per-lens solve cache answers a repeated field. */
    imageHeightInversionChiefSolves: 0,

    /* ── Scalar root solves ── */
    rootSolveCalls: 0,
    rootSolveEvaluations: 0,
    /** Callback evaluations per `solveScalarRoot` call. */
    rootSolveEvaluationHistogram: createHistogram(),

    /* ── Construction ── */
    /** Prepared states built by `prepareState`: cache misses and uncached calls. */
    preparedStateConstructions: 0,
    /** `EngineLens` compiles, one per `RuntimeLens` identity. */
    engineLensCompilations: 0,
    /** `RuntimeLens` builds started, including any that fail validation. */
    runtimeLensBuilds: 0,
    /** Glass names sent to the catalog resolver while building a surface's dispersion. */
    materialResolutions: 0,
    /** Sensor points handed to the perspective sensor-lock solve. */
    sensorLockedSolves: 0,
  };
}

function createHistogram(): number[] {
  return new Array<number>(HISTOGRAM_BUCKETS).fill(0);
}

/** Shape of the counter record that engine call sites increment. */
export type WorkCounters = ReturnType<typeof createWorkCounters>;

/** Copy of the counters at one moment; a histogram's last bucket is its overflow bucket. */
export type WorkCounterSnapshot = {
  readonly [Name in keyof WorkCounters]: WorkCounters[Name] extends number[] ? readonly number[] : number;
};

/**
 * Live counter record. It exists only while counting is on, so every statement that touches it must sit behind
 * `OPTICS_COUNTERS_ENABLED`.
 *
 * A record built unconditionally would ship in the app: call sites in other chunks name it, so the bundler keeps it
 * as a cross-chunk export even after it has dropped their guarded statements.
 */
export const workCounters = (OPTICS_COUNTERS_ENABLED ? createWorkCounters() : null) as WorkCounters;

/**
 * Copy the counters so later engine work cannot change what the caller holds.
 *
 * @returns every counter and histogram as of this call; all zero when counting is off
 */
export function snapshotWorkCounters(): WorkCounterSnapshot {
  if (!OPTICS_COUNTERS_ENABLED) return createWorkCounters();
  const snapshot: WorkCounters = { ...workCounters };
  const fields: Record<string, number | number[]> = snapshot;
  for (const [name, value] of Object.entries(fields)) {
    if (typeof value !== "number") fields[name] = [...value];
  }
  return snapshot;
}

/** Return every counter and histogram bucket to zero, keeping the record that call sites already hold. */
export function resetWorkCounters(): void {
  if (!OPTICS_COUNTERS_ENABLED) return;
  const counters: Record<string, number | number[]> = workCounters;
  for (const [name, value] of Object.entries(counters)) {
    if (typeof value === "number") counters[name] = 0;
    else value.fill(0);
  }
}
