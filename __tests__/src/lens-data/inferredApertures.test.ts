import { describe, expect, it } from "vitest";
import buildLens from "../../../src/optics/buildLens.js";
import { traceExactSurfaceStack } from "../../../src/optics/internal/exactSurfaceTrace.js";
import { zoomIndexToT } from "../../../src/optics/internal/lensState.js";
import { doLayout, epAtZoom } from "../../../src/optics/layout.js";
import { LENS_CATALOG } from "../../../src/utils/catalog/lensCatalog.js";

/**
 * Data contract for declared inferred apertures.
 *
 * A prescription that declares `inferredApertures` claims its listed semi-diameters clear the wide-open on-axis
 * marginal ray with the stated radial reserve. The footprint is traced here from the current prescription at
 * infinity focus and every authored zoom position, so the claim cannot go stale when radii, spacings or the stop
 * change. Shape rules live in validateLensData.test.ts; the near-axis smoke ray in exactTraceCatalog.test.ts does
 * not reach the rims this sweep checks.
 */

describe("inferred apertures", () => {
  it("clears the wide-open on-axis marginal ray by the declared margin on every listed surface", () => {
    const declaring = Object.values(LENS_CATALOG).filter((data) => data.inferredApertures !== undefined);
    expect(declaring.length).toBeGreaterThan(0);

    const shortfalls: string[] = [];
    for (const data of declaring) {
      const L = buildLens(data);
      const { marginFrac, surfaces } = data.inferredApertures!;
      const zoomCount = data.zoomPositions?.length ?? 1;

      for (let zoomIndex = 0; zoomIndex < zoomCount; zoomIndex++) {
        const zoomT = zoomIndexToT(zoomIndex, zoomCount);
        const trace = traceExactSurfaceStack(
          L,
          { y0: epAtZoom(zoomT, L), uy0: 0 },
          { zPos: doLayout(0, zoomT, L).z, checkSemiDiameter: false },
        );
        const footprintByIdx = new Map<number, number>();
        for (const hit of trace.hits) {
          footprintByIdx.set(hit.surfaceIdx, Math.max(footprintByIdx.get(hit.surfaceIdx) ?? 0, hit.radius));
        }

        for (const label of surfaces) {
          const idx = L.labelIdx[label];
          const footprint = footprintByIdx.get(idx);
          const where = `${data.key}: surface ${label} zoom ${zoomIndex}`;
          if (footprint === undefined || !Number.isFinite(footprint)) {
            shortfalls.push(`${where}: marginal ray never reaches it (${trace.failureReason ?? "no hit"})`);
            continue;
          }
          const required = footprint * (1 + marginFrac);
          if (L.S[idx].sd < required - 1e-9) {
            shortfalls.push(
              `${where}: sd ${L.S[idx].sd} < ${required.toFixed(6)} (footprint ${footprint.toFixed(6)} + ${marginFrac})`,
            );
          }
        }
      }
    }

    expect(shortfalls).toEqual([]);
  });
});
