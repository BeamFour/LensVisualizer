/**
 * Teleconverter fit rules — whether a converter can be mounted on a host lens, and the axial spacing that results.
 *
 * Import-free on purpose: `scripts/generate-build-metadata.mjs` loads this file under plain Node (type stripping
 * only, no `.js` → `.ts` resolution) to precompute each converter's host list, so the runtime predicate and the
 * build-time list cannot diverge. Every import here must stay `import type`.
 *
 * All spacing is air-equivalent. A converter is positioned by its virtual object — the host's native image plane,
 * `masterImageDistanceMm` behind the converter's first vertex — so hosts that list a sensor cover plate and hosts
 * that fold it into their back focus resolve to the same junction.
 */

import type { LensData, RearPlateData } from "../../types/optics.js";
import type {
  TeleconverterCompatibility,
  TeleconverterData,
  TeleconverterGeometry,
} from "../../types/teleconverter.js";

/** Prefix of every composed converter surface label; reserved in authored lens data. */
export const TELECONVERTER_LABEL_PREFIX = "TC";

/** Smallest air gap accepted at the junction and behind the converter; below this the glass is in contact. */
export const MIN_TELECONVERTER_GAP_MM = 0.1;

/** Host fields the fit rules read; satisfied by both defaulted `LensData` and raw `LensDataInput` modules. */
export type TeleconverterHost = Pick<
  LensData,
  | "key"
  | "lensMounts"
  | "acceptsTeleconverters"
  | "attachedTeleconverter"
  | "opticalPath"
  | "projection"
  | "perspectiveControl"
  | "nominalFno"
  | "surfaces"
  | "rearPlates"
  | "var"
  | "aberrationControl"
>;

/**
 * Sum of the air-equivalent distances of a plate stack: Σ(t/n + gapAfter).
 *
 * Adding the physical gap before the first plate gives the legacy folded back-focus value, so migrations can check
 * that paraxial focus is unchanged.
 *
 * @param plates - authored rear plates
 * @returns air-equivalent length of the plates and trailing gaps in mm
 */
export function rearPlateAirEquivalentMm(plates: readonly RearPlateData[]): number {
  return plates.reduce((sum, plate) => sum + plate.thicknessMm / plate.nd + plate.gapAfterMm, 0);
}

/** Collect every finite thickness in a scalar, focus vector, or zoom table of focus vectors. */
function collectThicknesses(range: unknown, out: number[]): void {
  if (typeof range === "number") {
    if (Number.isFinite(range)) out.push(range);
  } else if (Array.isArray(range)) {
    for (const entry of range) collectThicknesses(entry, out);
  }
}

/**
 * Every authored thickness of the host's last gap: the scalar `d` plus each focus, zoom and aberration-control entry.
 *
 * @param host - host lens data
 * @returns authored last-gap thicknesses in mm; empty when the host has no surfaces
 */
function hostLastGapThicknesses(host: TeleconverterHost): number[] {
  const last = host.surfaces[host.surfaces.length - 1];
  if (!last) return [];
  const values: number[] = [];
  collectThicknesses(last.d, values);
  collectThicknesses(host.var?.[last.label], values);
  collectThicknesses(host.aberrationControl?.var?.[last.label], values);
  return values;
}

/**
 * Whether any host rear plate sits ahead of the converter's first vertex (a lens-side drop-in filter).
 *
 * A plate is positioned by the air-equivalent distance from its rear face to the image. Camera-side cover glass is
 * within a few millimetres of the image; a drop-in filter is tens of millimetres ahead and belongs to the lens.
 */
function hasLensSidePlate(plates: readonly RearPlateData[], masterImageDistanceMm: number): boolean {
  let rearFaceToImage = 0;
  for (let i = plates.length - 1; i >= 0; i--) {
    rearFaceToImage += plates[i].gapAfterMm;
    if (rearFaceToImage >= masterImageDistanceMm) return true;
    rearFaceToImage += plates[i].thicknessMm / plates[i].nd;
  }
  return false;
}

/**
 * Axial spacing of a host + converter system.
 *
 * junction gap = host back focus (air) − `masterImageDistanceMm`
 * final gap    = converter back focus (air) − host plate stack (air)
 *
 * @param host - host lens data
 * @param tc - teleconverter data
 * @returns junction shift, smallest junction gap, final gap and image-plane extension in mm
 */
export function teleconverterGeometry(host: TeleconverterHost, tc: TeleconverterData): TeleconverterGeometry {
  const hostPlatesAirEq = rearPlateAirEquivalentMm(host.rearPlates ?? []);
  const lastGapShiftMm = hostPlatesAirEq - tc.masterImageDistanceMm;
  const lastGaps = hostLastGapThicknesses(host);
  const minJunctionGapMm = lastGaps.length > 0 ? Math.min(...lastGaps) + lastGapShiftMm : -Infinity;

  const tcLast = tc.surfaces[tc.surfaces.length - 1];
  const tcAirBackFocus = (tcLast?.d ?? 0) + rearPlateAirEquivalentMm(tc.rearPlates ?? []);
  let tcVertexLength = 0;
  for (let i = 0; i < tc.surfaces.length - 1; i++) tcVertexLength += tc.surfaces[i].d;

  return {
    lastGapShiftMm,
    minJunctionGapMm,
    finalGapMm: tcAirBackFocus - hostPlatesAirEq,
    extensionMm: tcVertexLength + tcAirBackFocus - tc.masterImageDistanceMm,
  };
}

/**
 * Decide whether a converter can be mounted on a host lens.
 *
 * Fit needs a shared mount and either a universal converter or a host that declares acceptance. The remaining rules
 * reject systems the engine cannot compose faithfully: folded paths, fisheye projections, perspective-control
 * movement (the converter is camera-fixed while the movement model poses the whole prescription), lens-side rear
 * plates, and any state where the glass would touch.
 *
 * @param host - host lens data (defaulted or raw)
 * @param tc - teleconverter data
 * @returns the composed spacing when compatible, otherwise the first failing rule
 */
export function teleconverterCompatibility(host: TeleconverterHost, tc: TeleconverterData): TeleconverterCompatibility {
  const hostMounts: readonly string[] = host.lensMounts ?? [];
  if (!tc.lensMounts.some((mount) => hostMounts.includes(mount))) return { ok: false, reason: "mount" };
  if (host.attachedTeleconverter) return { ok: false, reason: "stacked" };
  if (tc.universal !== true && host.acceptsTeleconverters !== true) return { ok: false, reason: "not-declared" };
  if (tc.incompatibleLensKeys?.includes(host.key)) return { ok: false, reason: "excluded" };

  const folded =
    host.opticalPath !== undefined ||
    host.surfaces.some((surface) => surface.interaction !== undefined && surface.interaction.type !== "refract");
  if (folded) return { ok: false, reason: "folded-host" };
  if (host.projection !== undefined && host.projection.kind !== "rectilinear") {
    return { ok: false, reason: "projection" };
  }
  if (host.perspectiveControl !== undefined) return { ok: false, reason: "perspective-control" };

  if (tc.minHostFno !== undefined) {
    const fastest = Array.isArray(host.nominalFno) ? Math.min(...host.nominalFno) : host.nominalFno;
    /* A tiny tolerance keeps a host at exactly the limit from failing on float noise. */
    if (typeof fastest === "number" && fastest < tc.minHostFno - 1e-9) return { ok: false, reason: "host-too-fast" };
  }

  if (hasLensSidePlate(host.rearPlates ?? [], tc.masterImageDistanceMm)) {
    return { ok: false, reason: "lens-side-plate" };
  }

  const geometry = teleconverterGeometry(host, tc);
  if (!(geometry.minJunctionGapMm >= MIN_TELECONVERTER_GAP_MM) || !(geometry.finalGapMm >= MIN_TELECONVERTER_GAP_MM)) {
    return { ok: false, reason: "clearance" };
  }
  return { ok: true, geometry };
}
