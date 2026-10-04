# Audit Log - AGFA SOLAGON 50mm f/2

Patent: US 2,745,315, Example 1

## 2026-07-04 - Semi-diameter patent-diagram review

### Phase 2 - Retained-information audit

- Reviewed local `patents/US2745315.pdf`. The patent publishes the f = 100 mm Example 1 prescription and Fig. 1 section, but no clear-aperture or semi-diameter table.
- Fig. 1 confirms the disturbed-symmetry double-Gauss layout: tall outer positive singlets, two negative cemented menisci facing the central stop, and a rear singlet of similar height to the rear meniscus group.
- Stored SDs preserve that broad f/2 silhouette while respecting the tight spherical-rim limit at the stop-facing R5 surface and the narrow rear L5-L6 air gap.
- No SD values changed. Current values remain inferred from paraxial marginal/chief-ray traces, figure proportions, edge-thickness checks, spherical-rim limits, and same-element diameter constraints.

## 2026-08-11 — Phase 92 HOYA F7 recovery

- Visually rechecked US 2,745,315 Examples 1–3 on rendered PDF pages 2–3: L3 and L4 use the rounded
  `1.6254 / 35.6` flint coordinate.
- Added the official legacy HOYA F7 row (`1.625363 / 35.583498`, code `625356`) and used it as the
  coefficient-backed optical equivalent for both elements.
- The production supplier remains unspecified. No prescription geometry, aperture, or semi-diameter values changed.

## 2026-10-03 — Exact F/2 marginal-ray aperture correction

- Re-inspected original `patents/US2745315.pdf`, Fig. 1 and the normalized Example 1 prescription. No clear apertures are published; S3 remains an inferred radius.
- At infinity, the exact axis-parallel ray at `EFL/(2×2) = 12.5212096067 mm` reaches S3 at `11.5903813122 mm`. Its only body-aperture violation was the former S3=11.2 mm; it reaches the modeled iris without exceeding it. The restricted axis bundle corresponded to about F/2.076 rather than source F/2.
- Increased S3 to 12.52 mm (8.02% over that footprint) and the plane cemented interface S4 from 11.2 to 12.0 mm (8.45% over its 11.065403 mm footprint; the former radius left 1.22%). Fig. 1 draws the R4 interface across the full height of the cemented member, level with the R3 rim.
- Declared all ten non-stop radii in `inferredApertures` at `marginFrac=0.075`: S2 keeps its existing 13.2 mm at 7.57%, every other surface exceeds 8%. The traced basis is the infinity on-axis marginal ray; this is not an all-field/all-focus aperture envelope.
- Retained the default `gapSagFrac=0.90`, all prescription radii/spacings/glasses, stop and focus modeling. The common S3/S4 material edge is +0.800245 mm at 12.0 mm; the plane extension at front SD=12.52 has +0.252736 mm axial separation. Minimum sampled air clearance remains +0.050000 mm.
- Fig. 1 photogrammetry gives the relevant front rim about 12.13 mm and envelope about 12.19 mm. Both revised radii are within drawing precision; required-ray clipping supplies the reason for the correction.
- Exact-ray diagnostics for the S3 change alone (S4 still 11.2 mm) at axis, 60% source half-field and full 25-degree half-field over five unit-focus states (0/.25/.5/.75/1): 839→901 accepted samples of 1,335; the same 242 geometric failures. These samples do not measure transmission and were not repeated after the S4 change. The close-focus endpoint remains representative rather than patent-published. EFL, half-field, source/full-format chief and image-circle coverage are unchanged by either radius; off-axis vignetting is not claimed resolved.
- The declared margin is enforced by the inferred-apertures corpus sweep: the ordinary near-axis catalog smoke ray does not exercise this failure. Existing S5/S6 renderer trims (0.046/0.246 mm) remain unchanged and are outside this optical correction.
- Image-circle audit: 0 undersized; full-format chief coverage: 100%. Negative control restoring only S3=11.2 clips both source F/2 marginal rays; corrected S3 admits both with unchanged exit coordinates/slopes.
