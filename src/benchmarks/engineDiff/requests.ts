/**
 * Request lists for the engine differential harness.
 *
 * A tier is a deterministic list of lens × state × request-family triples, built from facts about the prescriptions
 * alone so both engines under comparison receive the same list. This module holds the constants that define what
 * each family asks of the engine (pupil fractions, field fractions, job names) and knows nothing about the engine
 * itself; `captureEntry.ts` carries the requests out.
 */

/* ── Vocabulary ── */

/** One payload family. A request names one, and a capture answers it with one record. */
export type RequestFamily =
  | "composition"
  | "build"
  | "layout"
  | "traces"
  | "fieldGeometry"
  | "chiefSolves"
  | "analysis"
  | "mtf";

/** Viewer controls of one lens state: normalized sliders, and lens movement in physical units. */
export interface CaptureState {
  /** 0 at the first zoom station, 1 at the last; ignored by primes. */
  zoomT: number;
  /** 0 at infinity, 1 at close focus. */
  focusT: number;
  /** Aberration-control ring position; 0 is the corrected setting. */
  aberrationT: number;
  /** 0 wide open, 1 at the smallest marked aperture. */
  stopdownT: number;
  shiftMm: number;
  tiltDeg: number;
}

/** A catalog lens, or a host lens with a detachable teleconverter mounted. */
export interface LensRef {
  key: string;
  teleconverter?: string;
}

/** One unit of capture work. `state` is null for the families that describe the lens rather than a state. */
export interface CaptureRequest {
  lens: LensRef;
  state: CaptureState | null;
  family: RequestFamily;
}

/** What a tier needs to know about the prescriptions it is built for. */
export interface RequestCatalog {
  /** Every lens to cover, with its authored zoom station count (1 for a prime). */
  lenses: readonly { key: string; zoomStations: number }[];
  /** Every host and converter the fit predicate allows; a tier chooses which of them it covers. */
  pairs: readonly { host: string; teleconverter: string }[];
}

/**
 * Identity of a lens reference in records and reports.
 *
 * The harness names a pair itself, as `host+converter`, rather than use the key the engine gives the composed
 * prescription: a record must pair up across two engines even if one of them changes that key.
 *
 * @param lens - a catalog lens or a host + converter pair
 * @returns the lens key, or `host+converter`
 */
export function lensId(lens: LensRef): string {
  return lens.teleconverter ? `${lens.key}+${lens.teleconverter}` : lens.key;
}

/**
 * Identity of a state, derived from its values so the same controls get the same id in every tier.
 *
 * @param state - a lens state, or null for a lens-level request
 * @returns a stable text key
 */
export function stateId(state: CaptureState | null): string {
  if (!state) return "lens";
  const { zoomT, focusT, aberrationT, stopdownT, shiftMm, tiltDeg } = state;
  return `zoom=${zoomT} focus=${focusT} aberration=${aberrationT} stopdown=${stopdownT} shift=${shiftMm} tilt=${tiltDeg}`;
}

/** Infinity focus, first zoom station, wide open, corrected, no movement: the state a lens page opens in. */
export const DEFAULT_STATE: CaptureState = Object.freeze({
  zoomT: 0,
  focusT: 0,
  aberrationT: 0,
  stopdownT: 0,
  shiftMm: 0,
  tiltDeg: 0,
});

/* ── What each family asks ── */

/** Channels at which chromatic rays are traced and surface indices are evaluated. */
export const CHROMATIC_CHANNELS = ["R", "G", "B", "V"] as const;

/** Chief rays are solved at these fractions of the analysis half-field (the one the viewer passes to analyses). */
export const CHIEF_FIELD_FRACTIONS = [0, 0.5, 1] as const;

/*
 * Ray fans, as fractions of the wide-open entrance-pupil semi-diameter. They are fixed here rather than read from a
 * lens's display fractions, so a change to how a lens is drawn does not change what is compared. No fraction is 1:
 * a ray at the pupil rim sits on the stop edge, where a last-bit difference flips it between passing and clipped.
 * The on-axis fan is lopsided because a rotationally symmetric lens gives mirror-image rays at ±f.
 */
export const ON_AXIS_PUPIL_FRACTIONS = [0, 0.3, 0.6, 0.9, -0.75] as const;
/** Meridional fan about the chief ray at the edge of the field, where rims vignette and clipped hits appear. */
export const OFF_AXIS_FIELD_FRACTION = 1;
export const OFF_AXIS_PUPIL_FRACTIONS = [-0.8, -0.4, 0, 0.4, 0.8] as const;
/** Sagittal fan about the chief ray at mid-field: true skew rays that mostly pass. */
export const SKEW_FIELD_FRACTION = 0.5;
export const SKEW_PUPIL_FRACTIONS = [0.3, 0.6, 0.9, -0.75] as const;
/** On-axis fan traced once per chromatic channel. */
export const CHROMATIC_PUPIL_FRACTIONS = [0.5, 0.85] as const;

/*
 * Readouts the viewer computes beside the analysis context, asked the way its components ask. The numbers below are
 * the components' own, copied because a capture bundle holds no component.
 */
/** Marginal fractions the diagram's LoCA readout tries, outermost first, ahead of the lens's own ray fractions. */
export const LOCA_READOUT_FRACTIONS = [0.97, 0.95, 0.9, 0.85, 0.8] as const;
/** Width in px that the LoCA inset gives its bars at its default size. */
export const LOCA_INSET_BAR_WIDTH_PX = 86;
/** Heights at which the aspheric overlay's click readout is asked, as fractions of the surface's semi-diameter. */
export const ASPHERIC_READOUT_FRACTIONS = [0.25, 0.5, 0.75, 1] as const;

/** The analysis-context accessors, centered jobs first, then the six perspective jobs, in capture order. */
export const ANALYSIS_CONTEXT_JOBS = [
  "computeOpticalSummary",
  "computeDistortionCurve",
  "computeDistortionFieldGrid",
  "computeVignettingCurve",
  "computeBothPupilAberrationProfiles",
  "computeBokehPreviewPair",
  "computeBestFocusZ",
  "computeSphericalAberration",
  "computeSAProfile",
  "computeSphericalAberrationBlurCharacter",
  "computeFieldCurvatureBundle",
  "computeChromaticAnalysis",
  "computeChromaticRayFanAnalysis",
  "computeIntrinsicLongitudinalChromaticFocus",
  "computeComaAnalysis",
  "computePerspectiveFocusAnalysis",
  "computePerspectiveFieldAberrations",
  "computePerspectiveChromaticAnalysis",
  "computePerspectiveDistortionAnalysis",
  "computePerspectiveVignettingAnalysis",
  "computePerspectivePupilAnalysis",
] as const;

export const GROUP_MOVEMENT_MODES = ["focus", "zoom", "combined"] as const;

/**
 * Geometric MTF at the smallest pupil grid, with the MTF benchmark's defaults for the rest: the reference
 * wavelength, the design image plane, and three fields. The capture adds the state's aperture and movement.
 */
export const MTF_REQUEST = Object.freeze({
  method: "geometric",
  spectrum: "reference",
  focus: "design",
  maxGridSize: 32,
  fieldFractions: [0, 0.5, 1],
} as const);

/* ── Tier P ── */

const LENS_FAMILIES: readonly RequestFamily[] = ["build"];
const STATE_FAMILIES: readonly RequestFamily[] = ["layout", "traces", "fieldGeometry", "chiefSolves"];
const ANALYSIS_FAMILIES: readonly RequestFamily[] = ["analysis", "mtf"];

/**
 * The rendering benchmark's lens set (`DEFAULT_BENCHMARK_LENS_KEYS`). Copied, not imported: that module pulls in
 * React and the component tree, which the capture bundle must build without.
 */
export const BENCHMARK_LENS_KEYS = [
  "canon-serenar-50f18",
  "apo-lanthar-50f2",
  "ricoh-gr3-28f28",
  "canon-rf-85f12l",
  "sony-fe-24-70mm-f28-gm-ii",
  "sony-fe-70-200mm-f28-gm-ii",
  "canon-rf100f28-macro",
  "nikon-pc-nikkor-19mm-f4e-ed",
  "canon-tse-50f28l-macro",
  "canon-ef-8-15mm-f4l-fisheye-usm",
  "fujifilm-gf-20-35mm-f4-r-wr",
  "leica-apo-vario-elmarit-sl-90-280-f28-4",
  "sigma-apo-macro-180mm-f28-os-hsm",
  "sigma-apo-macro-150mm-f28-os-hsm",
  "reference-maksutov-cassegrain-meniscus",
] as const;

/** One lens that carries an engine feature the benchmark set lacks, and the state that exercises it. */
export interface FeatureRepresentative {
  feature: string;
  lens: LensRef;
  /** Controls that differ from the default state, for a feature the default state leaves idle. */
  featureState?: Partial<CaptureState>;
}

/**
 * Feature representatives for the analysis row. Each is the catalog's clearest carrier of its feature: the
 * equidistant fisheye (the benchmark has only an equisolid zoom), the auto-path and longest explicit-order folded
 * lenses, the lens with the most diffractive surfaces, an absorbing element, rear plates with published rims, the
 * strongest converter on a variable-aperture host, the one lens with a patent-derived tilt pivot, the MTF
 * benchmark's finite-conjugate lens, a fixed-iris zoom with no other special feature, and a centered
 * aberration-control ring.
 */
export const FEATURE_REPRESENTATIVES: readonly FeatureRepresentative[] = [
  { feature: "fisheye", lens: { key: "nikon-fisheye-nikkor-6mm-f28" } },
  { feature: "folded-auto-path", lens: { key: "carl-zeiss-mirotar-500f45" } },
  { feature: "folded-explicit-order", lens: { key: "minolta-af-reflex-500mm-f8" } },
  { feature: "diffractive", lens: { key: "nikon-af-s-nikkor-300mm-f4e-pf-ed-vr" } },
  { feature: "bulk-absorption", lens: { key: "minolta-stf-135f28-t45" } },
  { feature: "rear-plates", lens: { key: "zeiss-zx1-distagon-35mm-f2" } },
  {
    feature: "converter-pair",
    lens: { key: "fujifilm-fujinon-xf-100-400mm-f45-56-r-lm-ois-wr", teleconverter: "fujifilm-xf2x-tc-wr" },
  },
  /* The rendering benchmark's moved pose, inside this lens's ±15 mm and ±8.5° ranges. */
  {
    feature: "perspective-control",
    lens: { key: "fujifilm-gf-30mm-f56-ts" },
    featureState: { shiftMm: 6, tiltDeg: 4 },
  },
  /* The lens's one finite conjugate is authored at close focus. */
  { feature: "finite-conjugate", lens: { key: "fujifilm-gf80-f17" }, featureState: { focusT: 1 } },
  { feature: "fixed-iris-zoom", lens: { key: "canon-ef-70-200f28l-is-usm" } },
  { feature: "aberration-control", lens: { key: "nikon-af-dc-nikkor-135mm-f2" }, featureState: { aberrationT: 1 } },
];

function requestsFor(
  lens: LensRef,
  states: readonly (CaptureState | null)[],
  families: readonly RequestFamily[],
): CaptureRequest[] {
  return states.flatMap((state) => families.map((family) => ({ lens, state, family })));
}

/**
 * Tier P, first row: every catalog lens, hidden ones included, at the first and last zoom station, focused at
 * infinity and wide open. Converter pairs are not in it; the second row carries one.
 */
function tierPStateRow(catalog: RequestCatalog): CaptureRequest[] {
  return catalog.lenses.flatMap(({ key, zoomStations }) => {
    const lens: LensRef = { key };
    const states = zoomStations >= 2 ? [DEFAULT_STATE, { ...DEFAULT_STATE, zoomT: 1 }] : [DEFAULT_STATE];
    return [...requestsFor(lens, [null], LENS_FAMILIES), ...requestsFor(lens, states, STATE_FAMILIES)];
  });
}

/**
 * Tier P, second row: every analysis job and a small geometric MTF on the benchmark lenses and the feature
 * representatives, each at the default state plus its feature state.
 *
 * The first row covers a representative that is a catalog lens. The converter pair is not a catalog lens, so this
 * row also asks it for its composition and for the first row's families at the default state.
 */
function tierPAnalysisRow(catalog: RequestCatalog): CaptureRequest[] {
  const known = new Set([
    ...catalog.lenses.map((lens) => lens.key),
    ...catalog.pairs.map((pair) => lensId({ key: pair.host, teleconverter: pair.teleconverter })),
  ]);
  const representatives: FeatureRepresentative[] = [
    ...BENCHMARK_LENS_KEYS.map((key) => ({ feature: "benchmark", lens: { key } })),
    ...FEATURE_REPRESENTATIVES,
  ];
  /* A representative that has left the catalog would shrink this row without anyone noticing. */
  const missing = representatives.map(({ lens }) => lensId(lens)).filter((id) => !known.has(id));
  if (missing.length > 0) {
    throw new Error(`engineDiff Tier P: representative lens(es) not in the catalog: ${missing.join(", ")}`);
  }
  return representatives.flatMap(({ lens, featureState }) => [
    ...(lens.teleconverter
      ? [
          ...requestsFor(lens, [null], ["composition", ...LENS_FAMILIES]),
          ...requestsFor(lens, [DEFAULT_STATE], STATE_FAMILIES),
        ]
      : []),
    ...requestsFor(
      lens,
      featureState ? [DEFAULT_STATE, { ...DEFAULT_STATE, ...featureState }] : [DEFAULT_STATE],
      ANALYSIS_FAMILIES,
    ),
  ]);
}

/* ── Tiers ── */

/* Each tier is a list of rows; a later tier is one more entry here. */
const TIER_ROWS = {
  p: [tierPStateRow, tierPAnalysisRow],
} satisfies Record<string, readonly ((catalog: RequestCatalog) => CaptureRequest[])[]>;

export type TierId = keyof typeof TIER_ROWS;

/**
 * Build a tier's request list.
 *
 * Requests are grouped by lens, lenses in code-unit order of their id, so a driver can capture and write one lens at
 * a time and the order does not depend on how the catalog was enumerated.
 *
 * @param tier - tier id
 * @param catalog - the lenses and converter pairs to cover
 * @returns every request of the tier, with no duplicates
 * @throws when a lens the tier names explicitly is not in the catalog
 */
export function tierRequests(tier: TierId, catalog: RequestCatalog): CaptureRequest[] {
  const requests = TIER_ROWS[tier].flatMap((row) => row(catalog));
  /* The sort is stable, so a lens keeps its rows, states and families in the order the rows listed them. */
  return requests.sort((a, b) => {
    const [idA, idB] = [lensId(a.lens), lensId(b.lens)];
    return idA < idB ? -1 : idA > idB ? 1 : 0;
  });
}
