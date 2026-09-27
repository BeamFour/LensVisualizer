/**
 * Optics formatting helpers — small presentation strings for distance, f-number and Petzval values.
 *
 * Kept in the pure optics layer so analysis displays share unit conventions without importing React components.
 */

import { resolveLensSourceState } from "./sourceStates.js";
import { closeFocusAtZoom } from "./focusDistance.js";
import type { RuntimeLens } from "../types/optics.js";
import { FOCUS_INFINITY_THRESHOLD } from "./layout.js";

/**
 * Format an f-number as the aperture control shows it: hundredth-stop patent apertures keep their
 * precision while whole stops stay compact.
 *
 * @param f - f-number
 * @returns number text without the "f/" prefix, e.g. "1.45", "2.8", "16"
 */
export function formatFNumber(f: number): string {
  const rounded = Math.round(f * 100) / 100;
  if (Number.isInteger(rounded)) return rounded < 10 ? rounded.toFixed(1) : String(rounded);
  return rounded.toFixed(2).replace(/0$/, "");
}

/**
 * Format a normalized focus slider as user-facing object distance.
 *
 * @param t - normalized focus slider, 0=infinity and 1=close focus
 * @param L - runtime lens object with close-focus distance
 * @returns compact distance string in meters, centimeters, or infinity
 */
export function formatDist(t: number, L: RuntimeLens, zoomT = 0): string {
  if (t < FOCUS_INFINITY_THRESHOLD) return "\u221e";
  const d = closeFocusAtZoom(zoomT, L) / t;
  if (d >= 100) return `${Math.round(d)} m`;
  if (d >= 10) return `${d.toFixed(1)} m`;
  if (d >= 1) return `${d.toFixed(2)} m`;
  return `${(d * 100).toFixed(0)} cm`;
}

/**
 * Display the conjugate at an exact source station without substituting a production focus specification.
 * @param t - normalized focus coordinate, including finite configurations authored at zero
 * @param L - runtime prescription
 * @param zoomT - exact zoom coordinate
 * @param aberrationT - source geometry requires a neutral aberration control
 * @returns distance with its source reference and calculated provenance, or the legacy estimate
 */
export function formatFocusStateDistance(t: number, L: RuntimeLens, zoomT = 0, aberrationT = 0): string {
  const source = L.data && resolveLensSourceState(L.data, t, zoomT, aberrationT);
  if (source?.conjugate.kind === "infinity") return "∞";
  if (source?.conjugate.kind === "finite") {
    const conjugate = source.conjugate;
    const mm = conjugate.objectDistanceMm;
    const distance = mm < 1000 ? `${(mm / 10).toFixed(1)} cm` : `${(mm / 1000).toPrecision(3)} m`;
    const reference = conjugate.distanceReference === "image-plane" ? "image plane" : "first surface";
    const provenance = conjugate.distanceProvenance === "calculated" ? "Calculated " : "";
    return `${provenance}${distance} from ${reference}`;
  }
  // A finite station at coordinate zero must not become an infinity label when its geometry is perturbed.
  if (L.data && aberrationT !== 0 && resolveLensSourceState(L.data, t, zoomT)?.conjugate.kind === "finite")
    return "Unverified focus";
  const estimate = formatDist(t, L, zoomT);
  const hasSourceStates = Boolean(L.data?.sourceStates?.length || L.data?.finiteConjugates?.length);
  return hasSourceStates && estimate !== "∞" ? `Estimated ${estimate}` : estimate;
}

/**
 * Format Petzval curvature as a signed radius.
 *
 * @param P - Petzval curvature in reciprocal millimeters
 * @param subscript - whether to use the R_petz label
 * @returns display string in millimeters, or infinity for near-zero curvature
 */
export function formatPetzvalRadius(P: number, subscript = true): string {
  const label = subscript ? "R\u209a\u209c\u2093" : "R";
  if (Math.abs(P) < 1e-6) return `${label} = \u221e`;
  const R = 1 / P;
  const absR = Math.abs(R);
  const formatted = absR < 10 ? absR.toFixed(1) : Math.round(absR).toString();
  return `${label} = ${R < 0 ? "\u2212" : ""}${formatted} mm`;
}
