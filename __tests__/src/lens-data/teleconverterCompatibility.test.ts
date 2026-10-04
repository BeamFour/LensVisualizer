import { describe, expect, it } from "vitest";
import buildLens from "../../../src/optics/buildLens.js";
import { computeElementRenderDiagnostics } from "../../../src/optics/diagramGeometry.js";
import { doLayout, epAtZoom, traceRay, traceSkewRay } from "../../../src/optics/optics.js";
import {
  attachTeleconverter,
  teleconverterCompatibility,
  validateTeleconverterData,
} from "../../../src/optics/teleconverter.js";
import { ALL_CATALOG_KEYS, LENS_CATALOG } from "../../../src/utils/catalog/lensCatalog.js";
import {
  TELECONVERTER_CATALOG,
  TELECONVERTER_KEYS,
  teleconverterOptionsForLens,
} from "../../../src/utils/catalog/teleconverterCatalog.js";
import type { RuntimeLens } from "../../../src/types/optics.js";

/** Largest hidden render trim tolerated on a converter element, matching the production-lens diagnostics sweep. */
const MATERIAL_TRIM_TOLERANCE_MM = 0.25;

/** Fraction of the entrance-pupil radius the converter must pass on axis without clipping. */
const AXIAL_BEAM_FRACTION = 0.8;

function zoomSamples(L: RuntimeLens): number[] {
  return L.isZoom ? [0, 1] : [0];
}

/**
 * Data contract for detachable teleconverters, the counterpart of the per-lens corpus sweeps: a converter never
 * enters `LENS_CATALOG`, so none of those sweeps see it. Every converter is validated on its own, and every
 * converter–host pair the fit predicate allows must actually compose into a lens that builds and traces — the
 * predicate checks vertex clearance only, so this sweep is what catches rim contact or a clipped axial beam and
 * tells the author to set `incompatibleLensKeys` or `minHostFno`.
 */
describe("teleconverter catalog", () => {
  it("validates every teleconverter and applies the lens patent-metadata policy", () => {
    expect(TELECONVERTER_KEYS.length).toBeGreaterThan(0);
    const offenders: string[] = [];

    for (const key of TELECONVERTER_KEYS) {
      const tc = TELECONVERTER_CATALOG[key];
      for (const error of validateTeleconverterData(tc)) offenders.push(`${key}: ${error}`);
      if (LENS_CATALOG[key]) offenders.push(`${key}: key is already used by a lens`);
      if (!tc.patentNumber?.trim()) offenders.push(`${key}: patentNumber is required`);
      if (!Array.isArray(tc.patentAuthors)) offenders.push(`${key}: patentAuthors must be an array`);
      if (!Array.isArray(tc.patentAssignees)) offenders.push(`${key}: patentAssignees must be an array`);
      for (const lensKey of tc.incompatibleLensKeys ?? []) {
        if (!LENS_CATALOG[lensKey]) offenders.push(`${key}: incompatibleLensKeys names unknown lens "${lensKey}"`);
      }
    }

    expect(offenders).toEqual([]);
  });

  it("composes every compatible converter–host pair into a lens that builds, traces and keeps the host's stop", () => {
    const offenders: string[] = [];
    let pairs = 0;

    for (const tcKey of TELECONVERTER_KEYS) {
      const tc = TELECONVERTER_CATALOG[tcKey];
      for (const lensKey of ALL_CATALOG_KEYS) {
        const hostData = LENS_CATALOG[lensKey];
        if (!teleconverterCompatibility(hostData, tc).ok) continue;
        pairs++;
        const pair = `${lensKey} + ${tcKey}`;

        let L: RuntimeLens;
        try {
          L = buildLens(attachTeleconverter(hostData, tc));
        } catch (error) {
          offenders.push(`${pair}: ${String(error).split("\n")[0]}`);
          continue;
        }
        const host = buildLens(hostData);

        if (Math.abs(L.stopPhysSD - host.stopPhysSD) > 1e-9) offenders.push(`${pair}: stop radius changed`);
        (host.zoomStopSDs ?? []).forEach((sd, station) => {
          if (Math.abs((L.zoomStopSDs?.[station] ?? NaN) - sd) > 1e-9) {
            offenders.push(`${pair}: stop radius changed at zoom station ${station}`);
          }
        });
        (host.zoomEPs ?? [host.EP.epSD]).forEach((epSD, station) => {
          if (Math.abs((L.zoomEPs?.[station] ?? L.EP.epSD) - epSD) > 1e-9) {
            offenders.push(`${pair}: entrance pupil changed at zoom station ${station}`);
          }
        });

        for (const zoomT of zoomSamples(L)) {
          const layout = doLayout(0, zoomT, L);
          const beamHeight = AXIAL_BEAM_FRACTION * epAtZoom(zoomT, L);
          const traces = [
            traceRay(0, 0, layout.z, 0, zoomT, L.stopPhysSD, true, L),
            traceSkewRay(0, 0, 0, 0, 0, zoomT, L.stopPhysSD, true, L),
            traceRay(beamHeight, 0, layout.z, 0, zoomT, L.stopPhysSD, true, L),
          ];
          if (traces.some((trace) => trace.clipped || !Number.isFinite(trace.y))) {
            offenders.push(`${pair}: axial beam is clipped or non-finite at zoomT=${zoomT}`);
          }
        }

        const firstConverterElement = L.data.attachedTeleconverter!.firstElementId;
        for (const diagnostic of computeElementRenderDiagnostics(L, doLayout(0, 0, L).z)) {
          if (diagnostic.eid < firstConverterElement) continue;
          for (const surface of [diagnostic.front, diagnostic.rear]) {
            if (surface.trimAmount > MATERIAL_TRIM_TOLERANCE_MM) {
              offenders.push(
                `${pair}: converter surface ${surface.surfaceLabel} hides ${surface.trimAmount.toFixed(2)} mm (${surface.trimCause})`,
              );
            }
          }
        }
      }
    }

    /* Zero pairs would mean the sweep stopped seeing the catalog rather than that everything passed. */
    expect(pairs).toBeGreaterThan(0);
    expect(offenders).toEqual([]);
  });

  it("offers a converter in the viewer for exactly the hosts the fit predicate allows", () => {
    const offenders: string[] = [];

    for (const lensKey of ALL_CATALOG_KEYS) {
      const expected = TELECONVERTER_KEYS.filter(
        (tcKey) => teleconverterCompatibility(LENS_CATALOG[lensKey], TELECONVERTER_CATALOG[tcKey]).ok,
      );
      const offered = teleconverterOptionsForLens(lensKey).map((option) => option.key);
      if (offered.join() !== expected.join())
        offenders.push(`${lensKey}: offered [${offered}], expected [${expected}]`);
    }

    expect(offenders).toEqual([]);
  });
});
