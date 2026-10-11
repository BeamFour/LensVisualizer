import { afterEach, describe, expect, it, vi } from "vitest";
import type { WorkCounterSnapshot } from "../../../../src/optics/diagnostics.js";
import type { ExactTraceLens } from "../../../../src/optics/internal/exactSurfaceTrace.js";
import type {
  SurfaceIntersectionLens,
  SurfaceIntersectionRay,
} from "../../../../src/optics/internal/surfaceIntersection.js";
import type { AsphericCoefficients } from "../../../../src/types/optics.js";

/**
 * The counters flag is read once, when the counters module loads. The engine is therefore imported on demand, so
 * the define-off test can change the global first and then load a module graph that sees it.
 */
async function loadEngine() {
  const [
    diagnostics,
    counters,
    constants,
    optics,
    compat,
    perspectiveTrace,
    fieldSampling,
    kernel,
    legacyKernel,
    legacyTrace,
    profiles,
    rootSolve,
    state,
  ] = await Promise.all([
    import("../../../../src/optics/diagnostics.js"),
    import("../../../../src/optics/diagnostics/workCounters.js"),
    import("../../../../src/optics/constants.js"),
    import("../../../../src/optics/optics.js"),
    import("../../../../src/optics/compat.js"),
    import("../../../../src/optics/perspective/trace.js"),
    import("../../../../src/optics/perspective/fieldSampling.js"),
    import("../../../../src/optics/math/intersection.js"),
    import("../../../../src/optics/internal/surfaceIntersection.js"),
    import("../../../../src/optics/internal/exactSurfaceTrace.js"),
    import("../../../../src/optics/math/surfaceProfile.js"),
    import("../../../../src/optics/math/rootSolve.js"),
    import("../../../../src/optics/state/prepareState.js"),
  ]);
  const fixtures = await import("../testLensFixtures.js");
  return {
    diagnostics,
    counters,
    constants,
    optics,
    compat,
    perspectiveTrace,
    fieldSampling,
    kernel,
    legacyKernel,
    legacyTrace,
    profiles,
    rootSolve,
    state,
    fixtures,
  };
}

type Engine = Awaited<ReturnType<typeof loadEngine>>;

/** Synthetic singlet with what the lens-level counters need: a catalog glass, an asphere and an image format. */
const SINGLET = {
  key: "test-work-counters-singlet",
  name: "Work counters singlet",
  imageFormat: "135-full-frame",
  closeFocusM: 0.5,
  yScFill: 0.55,
  nominalFno: 2,
  fstopSeries: [2, 2.8, 4, 5.6, 8, 11, 16],
  elements: [{ id: 1, name: "Fixture element", label: "L1", type: "positive", nd: 1.5168, vd: 64.17, glass: "N-BK7" }],
  surfaces: [
    { label: "STO", R: 1e15, nd: 1.0, sd: 15, d: 1, elemId: 0 },
    { label: "1", R: 50, nd: 1.5168, sd: 15, d: 5, elemId: 1 },
    { label: "2", R: -50, nd: 1.0, sd: 15, d: 80, elemId: 1 },
  ],
  asph: { "2": { K: 0, A4: 1e-6, A6: 0, A8: 0, A10: 0, A12: 0, A14: 0 } },
};

/** The same singlet behind a fisheye projection, which sends every chief-ray solve to the bounding-sphere solver. */
const FISHEYE_SINGLET = {
  ...SINGLET,
  key: "test-work-counters-fisheye-singlet",
  projection: { kind: "fisheye-equidistant", focalLengthMm: 49.2, fullFieldDeg: 50 },
};

/** One ray and one surface, in a form that either intersection kernel can be given. */
interface KernelRequest {
  ray: SurfaceIntersectionRay;
  R: number;
  asphere?: AsphericCoefficients;
  /** Clear radius of an asphere: the prepared kernel's `clearRadius`, the legacy surface's `sd`. */
  sd?: number;
  vertexZ?: number;
  options: { minT?: number; maxT: number; maxIterations?: number };
}

function intersectPrepared(engine: Engine, { ray, R, asphere, sd, vertexZ = 0, options }: KernelRequest): void {
  const profile = engine.profiles.createSurfaceProfile({ R }, asphere);
  engine.kernel.intersectSurfaceProfile(ray, profile, vertexZ, { ...options, clearRadius: sd });
}

function intersectLegacy(engine: Engine, { ray, R, asphere, sd, vertexZ = 0, options }: KernelRequest): void {
  const lens: SurfaceIntersectionLens = { S: [{ R, sd }], asphByIdx: asphere ? { 0: asphere } : {} };
  engine.legacyKernel.intersectSagSurface(ray, 0, vertexZ, lens, options);
}

function asphere(A4: number): AsphericCoefficients {
  return { K: 0, A4, A6: 0, A8: 0, A10: 0, A12: 0, A14: 0 };
}

/* Kernel outcomes that a well-behaved lens seldom produces, on the intersection contract's own cases. */
// No iteration is allowed and the seed is not a root, so both solvers exhaust their budget.
const EXHAUSTED: KernelRequest = {
  ray: { origin: [0, 1, -5], direction: [0, 0, 1] },
  R: 5,
  options: { minT: 4.1, maxT: 6.1, maxIterations: 0 },
};
// A 1e8 mm launch distance quantizes t: the nearest point is accepted on the roundoff envelope.
const FLOOR_ASSISTED: KernelRequest = {
  ray: { origin: [0, 1, -1e8], direction: [0, 0, 1] },
  R: 5,
  options: { maxT: 1e8 + 2 },
};
// 300 mm off axis, coordinate roundoff exceeds the tolerance and the cap certificate is refused.
const CAP_REFUSED: KernelRequest = {
  ray: { origin: [0, 300, -5], direction: [0, 0, 1] },
  R: 1e15,
  asphere: asphere(1e-10),
  sd: 400,
  options: { maxT: 10 },
};

/** A ray onto a 45° mirror plane, through the prepared kernel's plane path. */
function intersectPreparedTiltedPlane(engine: Engine): void {
  const profile = engine.profiles.createTiltedPlaneProfile({ y: 1, z: 1 });
  engine.kernel.intersectSurfaceProfile({ origin: [0, 1, 3], direction: [0, -1, 0] }, profile, 0, { maxT: 10 });
}

/** The same mirror for the legacy tracer, which reaches its tilted-plane solver only through a trace. */
const TILTED_MIRROR: ExactTraceLens = {
  S: [
    {
      label: "M1",
      R: 1e15,
      d: 0,
      nd: 1,
      sd: 10,
      interaction: { type: "reflect", mirrorKind: "first-surface", normal: { z: 1, y: 1 } },
    },
  ],
  asphByIdx: {},
  opticalPath: { mode: "sequential", surfaceOrder: [0], surfaceLabels: ["M1"], maxInteractions: 2 },
  isFoldedOptics: true,
};

/**
 * One fixed request list that reaches every counter. It builds its lenses itself, so every run starts from cold
 * identity-keyed caches and two runs do the same work.
 */
function runRequests(engine: Engine): void {
  const { compat, fieldSampling, fixtures, legacyTrace, optics, perspectiveTrace } = engine;

  /* Lens level: build, find the analysis field, solve a chief ray, trace, invert image heights. */
  const L = fixtures.build(SINGLET);
  const zPos = [...optics.doLayout(0, 0, L).z];
  const geometry = optics.computeAnalysisFieldGeometryAtState(0, 0, L);
  const chief = optics.solveChiefRay(0.6 * geometry.halfFieldDeg, 0, 0, L, geometry);
  optics.traceRay(0.5 * L.EP.epSD, 0, zPos, 0, 0, undefined, true, L);
  optics.traceRay(chief.yLaunch, chief.uField, zPos, 0, 0, undefined, true, L);
  optics.solveFieldAnglesForImageHeightsAccurate([3, 9], zPos, 0, 0, L, geometry);

  /* Sensor-locked samples on a shifted lens: each one runs perspective chief solves on the scalar root solver. */
  const camera = perspectiveTrace.createPerspectiveTraceContext({
    preparedState: compat.prepareRuntimeState(L, 0, 0),
    movement: { shiftMm: 2, tiltDeg: 0 },
  });
  fieldSampling.sampleSensorLockedFields(camera, [
    { u: 0, v: 0.25 },
    { u: 0.2, v: 0.3 },
  ]);

  /* A folded fixture runs both generalized tracers and their image-plane tests. */
  const folded = fixtures.buildFoldedTirLens();
  optics.traceRay(2, 0, [...optics.doLayout(0, 0, folded).z], 0, 0, undefined, true, folded);

  /* The seldom-seen kernel outcomes, and a tilted flat mirror, in both kernels. */
  for (const request of [EXHAUSTED, FLOOR_ASSISTED, CAP_REFUSED]) {
    intersectPrepared(engine, request);
    intersectLegacy(engine, request);
  }
  intersectPreparedTiltedPlane(engine);
  legacyTrace.traceExactSurfaceStack(TILTED_MIRROR, { y0: 10, uy0: 0 });
}

/** Events a counter holds: its value, or the solves filed across a histogram's buckets. */
function events(value: number | readonly number[]): number {
  return typeof value === "number" ? value : value.reduce((sum, bucket) => sum + bucket, 0);
}

/** Units a histogram accounts for: bucket index times the solves in it. */
function units(histogram: readonly number[]): number {
  return histogram.reduce((sum, solves, index) => sum + solves * index, 0);
}

function countersWithEvents(snapshot: WorkCounterSnapshot): string[] {
  return Object.entries(snapshot)
    .filter(([, value]) => events(value) > 0)
    .map(([name]) => name);
}

/** Counters after `work` alone: the record is zeroed first, so every field is what that work added. */
function countsFor(engine: Engine, work: () => unknown): WorkCounterSnapshot {
  engine.diagnostics.resetWorkCounters();
  work();
  return engine.diagnostics.snapshotWorkCounters();
}

/**
 * What `work` alone moved: each non-zero counter by name, with a histogram given as its non-empty buckets by index.
 * Comparing the whole result also shows that the work moved no other counter.
 */
function moved(engine: Engine, work: () => unknown): Record<string, number | Record<string, number>> {
  const nonZero = Object.entries(countsFor(engine, work)).filter(([, value]) => events(value) > 0);
  return Object.fromEntries(
    nonZero.map(([name, value]) => [
      name,
      typeof value === "number" ? value : Object.fromEntries([...value.entries()].filter(([, solves]) => solves > 0)),
    ]),
  );
}

/** What one request moves in the prepared kernel, and what it moves in the legacy kernel. */
function movedInEachKernel(engine: Engine, request: KernelRequest) {
  return {
    prepared: moved(engine, () => intersectPrepared(engine, request)),
    legacy: moved(engine, () => intersectLegacy(engine, request)),
  };
}

/** Source text with comments, import and re-export statements, and every flag-guarded statement removed. */
function withoutGuardedStatements(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "")
    .replace(/^(?:import|export) [^;]*? from [^;]*;$/gm, "")
    .replace(/if \(OPTICS_COUNTERS_ENABLED[^{;]*\{[^{}]*\}/g, "")
    .replace(/if \(OPTICS_COUNTERS_ENABLED[^;]*;/g, "")
    .replace(/OPTICS_COUNTERS_ENABLED \?[^;]*;/g, "");
}

describe("work counters", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  // `undefined` is what a script running under plain Node sees: no define at all. Only the boolean `true` turns
  // counting on, so a string that merely reads "true" leaves it off.
  it.each([false, undefined, "true"])("stay off, with no counter record, when the define is %j", async (define) => {
    vi.stubGlobal("__OPTICS_COUNTERS__", define);
    vi.resetModules();
    const engine = await loadEngine();
    expect(engine.diagnostics.OPTICS_COUNTERS_ENABLED).toBe(false);
    expect(engine.counters.workCounters).toBeNull();

    // With no record to write to, a call site that skipped the flag throws here.
    runRequests(engine);

    const snapshot = engine.diagnostics.snapshotWorkCounters();
    expect(Object.keys(snapshot)).not.toHaveLength(0);
    expect(countersWithEvents(snapshot)).toEqual([]);
    // A reset has nothing to clear. It comes last so that it cannot be what makes the snapshot read zero.
    expect(() => engine.diagnostics.resetWorkCounters()).not.toThrow();
  });

  it("are touched only behind the flag, in every engine module", () => {
    const sources = import.meta.glob<string>("../../../../src/optics/**/*.ts", {
      eager: true,
      import: "default",
      query: "?raw",
    });
    const unguarded = Object.entries(sources)
      .filter(([path]) => !path.includes("/diagnostics/"))
      .filter(([, source]) => /\bworkCounters\b/.test(withoutGuardedStatements(source)))
      .map(([path]) => path);

    expect(Object.keys(sources).length).toBeGreaterThan(100);
    expect(unguarded).toEqual([]);
  });

  it("count the same work for the same requests, and reach every counter", async () => {
    const engine = await loadEngine();
    const { resetWorkCounters, snapshotWorkCounters } = engine.diagnostics;
    expect(engine.diagnostics.OPTICS_COUNTERS_ENABLED).toBe(true);

    resetWorkCounters();
    runRequests(engine);
    const first = snapshotWorkCounters();
    resetWorkCounters();
    runRequests(engine);
    const second = snapshotWorkCounters();

    expect(second).toEqual(first);
    expect(countersWithEvents(first)).toEqual(Object.keys(first));
  });

  it("file each solve under the work it spent", async () => {
    const engine = await loadEngine();
    engine.diagnostics.resetWorkCounters();
    runRequests(engine);
    const counters = engine.diagnostics.snapshotWorkCounters();

    expect(events(counters.chiefSolveStopTraceHistogram)).toBe(counters.chiefSolves);
    expect(units(counters.chiefSolveStopTraceHistogram)).toBe(counters.chiefSolveStopTraces);
    expect(events(counters.rootSolveEvaluationHistogram)).toBe(counters.rootSolveCalls);
    expect(units(counters.rootSolveEvaluationHistogram)).toBe(counters.rootSolveEvaluations);
  });

  it("reset every counter and histogram bucket to zero", async () => {
    const engine = await loadEngine();
    runRequests(engine);
    const before = engine.diagnostics.snapshotWorkCounters();
    expect(countersWithEvents(before)).toEqual(Object.keys(before));

    engine.diagnostics.resetWorkCounters();

    expect(countersWithEvents(engine.diagnostics.snapshotWorkCounters())).toEqual([]);
    // The earlier snapshot is a copy, so the reset does not reach it.
    expect(countersWithEvents(before)).toEqual(Object.keys(before));
  });

  /* The tests below fix what each counter counts, on requests small enough to count by hand. `moved` lists every
   * counter a request touched, so a count filed under the wrong field fails just as a wrong count does. */

  it("count one intersection per request, under its profile kind and its kernel", async () => {
    const engine = await loadEngine();
    // Parallel to the axis, so the ray keeps its radius and the sag residual is linear in t.
    const ray: SurfaceIntersectionRay = { origin: [0, 1, -5], direction: [0, 0, 1] };
    const options = { maxT: 10 };

    // A plane is solved in closed form, with no evaluation.
    expect(movedInEachKernel(engine, { ray, R: 1e15, options })).toEqual({
      prepared: { preparedFlatIntersections: 1 },
      legacy: { legacyFlatIntersections: 1 },
    });
    expect(moved(engine, () => intersectPreparedTiltedPlane(engine))).toEqual({ preparedTiltedPlaneIntersections: 1 });
    // A curved profile costs four evaluations here: both ends of the bracket, the vertex-plane seed, and one Newton
    // step, which lands on the root of a linear residual.
    expect(movedInEachKernel(engine, { ray, R: 50, options })).toEqual({
      prepared: { preparedSphericalIntersections: 1, preparedProfileEvaluations: 4 },
      legacy: { legacySphericalIntersections: 1, legacyProfileEvaluations: 4 },
    });
    // An asphere hit this far inside its clear radius is certified as the cap hit, so no cap search follows.
    expect(movedInEachKernel(engine, { ray, R: 50, asphere: asphere(1e-6), sd: 15, options })).toEqual({
      prepared: { preparedAsphericIntersections: 1, preparedProfileEvaluations: 4 },
      legacy: { legacyAsphericIntersections: 1, legacyProfileEvaluations: 4 },
    });

    // A ray with no direction: the prepared kernel counts the request, the legacy kernel only a surface it solves.
    expect(movedInEachKernel(engine, { ray: { ...ray, direction: [0, 0, 0] }, R: 50, options })).toEqual({
      prepared: { preparedSphericalIntersections: 1 },
      legacy: {},
    });
  });

  it("count a profile evaluation only where sag and slope are evaluated", async () => {
    const engine = await loadEngine();
    /* 6 mm off the axis of a 5 mm sphere, every point of the ray lies outside the sphere's domain. The prepared
     * kernel returns for each one before evaluating it. The legacy kernel has no domain test: it evaluates a clamped
     * sag at both ends of the search and at every bracket sample. */
    const outside: KernelRequest = { ray: { origin: [0, 6, -5], direction: [0, 0, 1] }, R: 5, options: { maxT: 10 } };

    expect(movedInEachKernel(engine, outside)).toEqual({
      prepared: { preparedSphericalIntersections: 1 },
      legacy: {
        legacySphericalIntersections: 1,
        legacyProfileEvaluations: 2 + engine.constants.INTERSECTION_BRACKET_SAMPLES,
      },
    });
  });

  it("count floor-assisted acceptances, exhaustion failures and cap-certificate refusals", async () => {
    const engine = await loadEngine();

    // Three evaluations: both ends of the bracket, then the seed as the step still pending when the budget ends.
    expect(movedInEachKernel(engine, EXHAUSTED)).toEqual({
      prepared: { preparedSphericalIntersections: 1, preparedProfileEvaluations: 3, preparedExhaustionFailures: 1 },
      legacy: { legacySphericalIntersections: 1, legacyProfileEvaluations: 3, legacyExhaustionFailures: 1 },
    });
    // The usual four evaluations. The last is still above the tolerance, but t is too coarse for another Newton
    // step to move it, so the hit is accepted on the envelope.
    expect(movedInEachKernel(engine, FLOOR_ASSISTED)).toEqual({
      prepared: {
        preparedSphericalIntersections: 1,
        preparedProfileEvaluations: 4,
        preparedFloorAssistedAcceptances: 1,
      },
      legacy: { legacySphericalIntersections: 1, legacyProfileEvaluations: 4, legacyFloorAssistedAcceptances: 1 },
    });
    // The plane solvers accept on the envelope too. From the same distance a plane at z = 0.1 lies between two
    // representable values of t; a plane at z = 0 is hit exactly, and is an ordinary acceptance.
    const plane = (vertexZ: number): KernelRequest => ({ ...FLOOR_ASSISTED, R: 1e15, vertexZ });
    expect(movedInEachKernel(engine, plane(0.1))).toEqual({
      prepared: { preparedFlatIntersections: 1, preparedFloorAssistedAcceptances: 1 },
      legacy: { legacyFlatIntersections: 1, legacyFloorAssistedAcceptances: 1 },
    });
    expect(movedInEachKernel(engine, plane(0))).toEqual({
      prepared: { preparedFlatIntersections: 1 },
      legacy: { legacyFlatIntersections: 1 },
    });

    /* A refused certificate sends the hit to the cap search, which runs in the prepared kernel for both tracers. It
     * spends 18 evaluations here: both ends, 14 of the 24 ordered samples up to the root's sign change, and two in
     * Newton. They come on top of the four that found the hit, and the refusal goes to the one shared counter. */
    expect(movedInEachKernel(engine, CAP_REFUSED)).toEqual({
      prepared: { preparedAsphericIntersections: 1, preparedProfileEvaluations: 4 + 18, capCertificateRefusals: 1 },
      legacy: {
        legacyAsphericIntersections: 1,
        legacyProfileEvaluations: 4,
        preparedProfileEvaluations: 18,
        capCertificateRefusals: 1,
      },
    });
  });

  it("count each trace once, under the tracer that ran it", async () => {
    const engine = await loadEngine();
    const { fixtures, legacyTrace, optics } = engine;

    const L = fixtures.build(SINGLET);
    const zPos = [...optics.doLayout(0, 0, L).z];
    const trace = () => optics.traceRay(1, 0, zPos, 0, 0, undefined, true, L);
    // The first trace of a lens also builds the tracer's prepared state, so the counted trace is one that reuses it.
    trace();
    // A sequential trace crosses the stop plane, the sphere and the asphere once each.
    expect(moved(engine, trace)).toEqual({
      fullTracesPreparedSequential: 1,
      preparedFlatIntersections: 1,
      preparedSphericalIntersections: 1,
      preparedAsphericIntersections: 1,
      preparedProfileEvaluations: expect.any(Number),
    });
    // The legacy stack tracer, given the same lens and ray, crosses the same three surfaces in its own kernel.
    expect(moved(engine, () => legacyTrace.traceExactSurfaceStack(L, { y0: 1, uy0: 0 }))).toEqual({
      fullTracesLegacy: 1,
      legacyFlatIntersections: 1,
      legacySphericalIntersections: 1,
      legacyAsphericIntersections: 1,
      legacyProfileEvaluations: expect.any(Number),
    });

    const folded = fixtures.buildFoldedTirLens();
    const zFolded = [...optics.doLayout(0, 0, folded).z];
    const traceFolded = () => optics.traceRay(2, 0, zFolded, 0, 0, undefined, true, folded);
    traceFolded();
    // The listed path STO, MG1, MG2, MG1 is three plane hits and one mirror hit. With the list spent, the tracer
    // tests the image plane and looks once more for a mirror hit.
    expect(moved(engine, traceFolded)).toEqual({
      fullTracesPreparedGeneralized: 1,
      preparedFlatIntersections: 3,
      preparedSphericalIntersections: 2,
      rayPlaneIntersections: 1,
      preparedProfileEvaluations: expect.any(Number),
    });

    // The legacy tracer takes the same course on its one listed mirror: the hit, then an image-plane test and one
    // more look for a mirror hit. It hands a folded lens to its generalized tracer, and that is still one trace.
    const mirror = { ...TILTED_MIRROR, imagePlane: { z: 0, y: -20, normal: { z: 0, y: 1 }, label: "IMG" } };
    expect(moved(engine, () => legacyTrace.traceExactSurfaceStack(mirror, { y0: 10, uy0: 0 }))).toEqual({
      fullTracesLegacy: 1,
      legacyTiltedPlaneIntersections: 2,
      legacyImagePlaneIntersections: 1,
    });
    // A lens with no image plane has none to test.
    expect(moved(engine, () => legacyTrace.traceExactSurfaceStack(TILTED_MIRROR, { y0: 10, uy0: 0 }))).toEqual({
      fullTracesLegacy: 1,
      legacyTiltedPlaneIntersections: 2,
    });
  });

  it("count a lens build, its compile and its material resolutions once per lens object", async () => {
    const engine = await loadEngine();
    const { compat, fixtures } = engine;

    // One surface names a catalog glass, and a build resolves it twice: for the RuntimeLens, and again for the
    // EngineLens compiled from it.
    const built = { runtimeLensBuilds: 1, engineLensCompilations: 1, materialResolutions: 2 };
    expect(countsFor(engine, () => fixtures.build(SINGLET))).toMatchObject(built);
    // The same data built again is a new lens object, and pays again.
    expect(countsFor(engine, () => fixtures.build(SINGLET))).toMatchObject(built);
    // A lens that names no glass has nothing to resolve.
    expect(countsFor(engine, () => fixtures.buildSimplePositiveElementLens())).toMatchObject({
      ...built,
      materialResolutions: 0,
    });

    // The compile is cached on the lens object, so asking for it again compiles nothing.
    const L = fixtures.build(SINGLET);
    expect(moved(engine, () => compat.engineLensFromRuntime(L))).toEqual({});
  });

  it("count a prepared state when it is built, not when a cache answers", async () => {
    const engine = await loadEngine();
    const { compat, fixtures, state } = engine;
    const L = fixtures.build(SINGLET);
    const prepare = (focusT: number) => () => compat.prepareRuntimeState(L, focusT, 0);

    expect(moved(engine, prepare(0))).toEqual({ preparedStateConstructions: 1 });
    expect(moved(engine, prepare(0))).toEqual({});
    expect(moved(engine, prepare(1))).toEqual({ preparedStateConstructions: 1 });

    // Without a cache, every call builds.
    const engineLens = compat.engineLensFromRuntime(L);
    const uncached = () => state.prepareState(engineLens, 0, 0);
    expect(moved(engine, () => [uncached(), uncached()])).toEqual({ preparedStateConstructions: 2 });
  });

  it("count a root solve with the callback evaluations it spent", async () => {
    const engine = await loadEngine();
    const { solveScalarRoot } = engine.rootSolve;
    const search = { initialGuess: 0, initialHalfWidth: 1, maxExpansions: 0 };

    // Six evaluations: the seed, four scan points up to the sign change (-1, -0.5, 0, 0.5), and the midpoint of
    // the last two, 0.25, which is the root.
    expect(moved(engine, () => solveScalarRoot((x) => x - 0.25, { ...search, scanSamples: 4 }))).toEqual({
      rootSolveCalls: 1,
      rootSolveEvaluations: 6,
      rootSolveEvaluationHistogram: { 6: 1 },
    });
    // A failed solve is counted like any other: four evaluations, the seed and three scan points with no sign change.
    expect(moved(engine, () => solveScalarRoot(() => 1, { ...search, scanSamples: 2 }))).toEqual({
      rootSolveCalls: 1,
      rootSolveEvaluations: 4,
      rootSolveEvaluationHistogram: { 4: 1 },
    });
    // A rejected input is a call that evaluates nothing.
    expect(moved(engine, () => solveScalarRoot((x) => x, { ...search, initialGuess: NaN }))).toEqual({
      rootSolveCalls: 1,
      rootSolveEvaluationHistogram: { 0: 1 },
    });
  });

  it("file a solve too large for an exact bucket in the last bucket", async () => {
    const engine = await loadEngine();
    const { solveScalarRoot } = engine.rootSolve;
    const search = { initialGuess: 0, initialHalfWidth: 1, maxExpansions: 0 };

    // 1,102 evaluations: the seed and 1,101 scan points, none of which changes sign.
    expect(moved(engine, () => solveScalarRoot(() => 1, { ...search, scanSamples: 1100 }))).toEqual({
      rootSolveCalls: 1,
      rootSolveEvaluations: 1102,
      rootSolveEvaluationHistogram: { 1024: 1 },
    });
    // 2,002 evaluations: the seed and 2,001 scan points, the last of which is the root.
    expect(moved(engine, () => solveScalarRoot((x) => x - 1, { ...search, scanSamples: 2000 }))).toEqual({
      rootSolveCalls: 1,
      rootSolveEvaluations: 2002,
      rootSolveEvaluationHistogram: { 1024: 1 },
    });
    // Bucket 1,024 is the last of a fixed 1,025; an oversized solve must not lengthen the histogram.
    expect(engine.diagnostics.snapshotWorkCounters().rootSolveEvaluationHistogram).toHaveLength(1025);
  });

  it("count a chief solve with the stop traces it spent", async () => {
    const engine = await loadEngine();
    const { fixtures, optics } = engine;
    const L = fixtures.build(SINGLET);
    const geometry = optics.computeAnalysisFieldGeometryAtState(0, 0, L);
    const solve = (fieldDeg: number) => () => optics.solveChiefRay(fieldDeg, 0, 0, L, geometry);

    /* The stop is the first surface, so a ray's launch height is its height at the stop. The solve traces both ends
     * of its bracket and then their midpoint, which is the stop centre: three stop traces. Each is one sequential
     * trace that ends at the stop, before any surface is intersected, in a state the solver prepares for itself. */
    expect(moved(engine, solve(10))).toEqual({
      chiefSolves: 1,
      chiefSolveStopTraces: 3,
      chiefSolveStopTraceHistogram: { 3: 1 },
      fullTracesPreparedSequential: 3,
      preparedStateConstructions: 1,
    });
    // The per-lens solve cache answers the same field again, and that is not a solve.
    expect(moved(engine, solve(10))).toEqual({});
    // Within a degree of the axis the paraxial launch is the answer: a solve with no stop trace.
    expect(moved(engine, solve(0.5))).toEqual({ chiefSolves: 1, chiefSolveStopTraceHistogram: { 0: 1 } });

    /* A fisheye projection launches every field from the bounding sphere, and that solver counts its own stop
     * traces. It scans 97 launch points across the pupil, in order, for a sign change in the height at the stop. The
     * pupil is the stop here, so the 49th point, the pupil centre, is the chief ray, and the scan ends on it. */
    const fisheye = fixtures.build(FISHEYE_SINGLET);
    const fisheyeGeometry = optics.computeFieldGeometryAtState(0, 0, fisheye);
    expect(moved(engine, () => optics.solveChiefRay(10, 0, 0, fisheye, fisheyeGeometry))).toEqual({
      chiefSolves: 1,
      chiefSolveStopTraces: 49,
      chiefSolveStopTraceHistogram: { 49: 1 },
      fullTracesPreparedSequential: 49,
      preparedStateConstructions: 1,
    });
  });

  it("count the field walk's seeded re-solves apart from its full chief solves", async () => {
    const engine = await loadEngine();
    const L = engine.fixtures.build(SINGLET);
    const walk = countsFor(engine, () => engine.optics.computeAnalysisFieldGeometryAtState(0, 0, L));

    /* After its first probe the walk re-solves each field from the converged neighbour. With the stop at the first
     * surface a re-solve costs three stop traces: both ends of its bracket, and the point regula falsi puts between
     * them, which is the stop centre. Those are tallied apart from the full solves' stop traces, so the per-solve
     * histogram still accounts for every stop trace of a full solve. */
    expect(walk.seededChiefSolves).toBeGreaterThan(0);
    expect(walk.seededChiefSolveStopTraces).toBe(3 * walk.seededChiefSolves);
    expect(walk.chiefSolves).toBeGreaterThan(0);
    expect(units(walk.chiefSolveStopTraceHistogram)).toBe(walk.chiefSolveStopTraces);

    /* How many fields that walk probes depends on how fast it closes on the format corner. Given an image circle
     * that no field of this lens reaches, its course is fixed: a full solve at the raw half-field, one 5° step,
     * which a rim clips, and the eight bisections that settle where the clipping starts. Those nine re-solve from a
     * neighbour. The second full solve checks that the settled field also converges unseeded. */
    const cornerless = engine.fixtures.build({ ...SINGLET, imageCircleMm: 1000 });
    const clipWalk = countsFor(engine, () => engine.optics.computeAnalysisFieldGeometryAtState(0, 0, cornerless));
    expect(clipWalk).toMatchObject({
      seededChiefSolves: 1 + 8,
      seededChiefSolveStopTraces: 3 * (1 + 8),
      chiefSolves: 2,
      chiefSolveStopTraces: 2 * 3,
    });
  });

  it("count one inversion target per image height and one sensor-locked solve per sensor point", async () => {
    const engine = await loadEngine();
    const { compat, fieldSampling, fixtures, optics, perspectiveTrace } = engine;
    const L = fixtures.build(SINGLET);
    const zPos = [...optics.doLayout(0, 0, L).z];
    const geometry = optics.computeAnalysisFieldGeometryAtState(0, 0, L);

    // A zero height is the axis and needs no inversion, which leaves two targets.
    const invert = () => optics.solveFieldAnglesForImageHeightsAccurate([0, 3, 9], zPos, 0, 0, L, geometry);
    const first = countsFor(engine, invert);
    expect(first.imageHeightInversionTargets).toBe(2);
    // On a lens with no solve cached yet, every chief solve the inversion requests is run.
    expect(first.chiefSolves).toBeGreaterThan(0);
    expect(first.imageHeightInversionChiefSolves).toBe(first.chiefSolves);
    // The repeat requests the same solves, and the per-lens solve cache answers every one.
    expect(countsFor(engine, invert)).toMatchObject({
      imageHeightInversionTargets: 2,
      imageHeightInversionChiefSolves: first.imageHeightInversionChiefSolves,
      chiefSolves: 0,
    });

    // The single-target entry point scans a field table of its own. On a second lens, with no solve cached, one
    // height is one target, and here too every chief solve it requests is run.
    const uncached = fixtures.build(SINGLET);
    const invertOne = (height: number) => () =>
      optics.solveFieldAngleForImageHeightAccurate(height, zPos, 0, 0, uncached, geometry);
    const single = countsFor(engine, invertOne(9));
    expect(single.imageHeightInversionTargets).toBe(1);
    expect(single.chiefSolves).toBeGreaterThan(0);
    expect(single.imageHeightInversionChiefSolves).toBe(single.chiefSolves);
    expect(moved(engine, invertOne(0))).toEqual({});

    const camera = perspectiveTrace.createPerspectiveTraceContext({
      preparedState: compat.prepareRuntimeState(L, 0, 0),
      movement: { shiftMm: 2, tiltDeg: 0 },
    });
    const sensorPoints = [
      { u: 0, v: 0.25 },
      { u: 0.2, v: 0.3 },
    ];
    const sampled = countsFor(engine, () => fieldSampling.sampleSensorLockedFields(camera, sensorPoints));
    expect(sampled.sensorLockedSolves).toBe(2);
  });
});
