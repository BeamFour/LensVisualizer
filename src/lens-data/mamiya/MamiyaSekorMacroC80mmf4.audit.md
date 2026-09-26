# Audit Log - Mamiya-Sekor Macro C 80mm f/4

Patent: JP S55-24081 B2, Example 1 / Figure 1
Catalog version: local working tree, 2026-08-07

## 2026-09-26 — Source-state review

Source-state review outcome: verified. Both authored bare-lens candidates enabled: infinity and
published beta=-1/2 internal geometry with calculated image and object distances. No accessory
or intermediate finite configuration is added.

Visually checked local `patents/JPB 1980024081-000000.pdf`, PDF pages 2–3 and Figure 5
on page 7. Page 3 publishes the ten powered surface radii, thicknesses and d-line glass
coordinates, including r2=658.4 mm; all match the retained prescription. Infinity spacings are
d3=1.93, d5=9.38 and d7=0.50 mm. Page 2 right column explicitly gives
beta=-1/2, d3=3.53, d5=7.78 and d7=2.1 mm; these are printed values, not readings
estimated from the motion graph. Model d5 is split at the inferred stop: 2.345+7.035 mm
at infinity and 2.345+5.435 mm at close. Both focusT=0/1 stations reproduce the source.

The source does not publish the final image gap. Existing calculated gaps
62.698154758552214/102.88463637235272 mm are retained. At close, the fixed matrix gives
A=-0.49999999999999944 and B=105.40665212893427 mm; s=-B/A is
210.81330425786877 mm before the first surface, or 358.0979406302215 mm object-to-image.
Independent exact roots at 0.01/0.005/0.0025 mm first-vertex heights are
210.813298594826/210.813302834439/210.813303914282 mm, with axial residuals below
1.343e-10 mm. Exact magnification tends to -0.499999999996. The original rear-gap
solution used the published beta=-1/2 condition: the ratio match is a consistency check,
not independent evidence of a published object distance. Exact tracing verifies that the
retained model has the stated physical source without changing its image plane.

The beta=-1 internal-gap row is not authored in this bare-lens file. Its prose/gap disagreement
(t1=t2=2.3 versus d3 implying 2.2 mm) is irrelevant to the verified half-life-size row and is
not resolved by inventing movement. Production barrel working distance is also not substituted
for the first-vertex distance. Stop position, physical diameter and rims remain inferred;
coordinate-compatible glass models do not establish production melts. No geometry or optical
reference values changed; ordinary MTF field, spectral and convergence restrictions remain.

## 2026-08-07 - Patent-figure semi-diameter audit

### Figure evidence

- Rendered patent PDF page 5 at high resolution and isolated the Figure 1 optical section from labels and leader lines.
- The original front floating doublet and rear cemented group were visibly oversized against the patent silhouette.
- The central elements and stop region agreed closely enough with the drawing to remain unchanged.
- The patent does not tabulate clear apertures, so the revised values are rounded figure-constrained inferences rather than source dimensions.

| Surfaces | Before | Figure estimate | After | Decision |
|---|---:|---:|---:|---|
| 1 | 16.5 mm | approximately 12.8 mm | 12.8 mm | Tightened to the front-doublet silhouette |
| 2 | 15.2 mm | approximately 12.8 mm | 12.8 mm | Tightened to the front-doublet silhouette |
| 3 | 10.5 mm | approximately 12.8 mm | 12.8 mm | Matched the shared rear rim shown for the doublet |
| 8 | 14.3 mm | approximately 10.6 mm | 10.6 mm | Tightened to the rear-group silhouette |
| 9 | 15.3 mm | approximately 11.4 mm | 11.4 mm | Tightened to the cemented-interface silhouette |
| 10 | 17.0 mm | approximately 12.8 mm | 12.8 mm | Tightened to the rear-group silhouette |

### Geometry and tracing checks

- The revised surfaces preserve positive edge thickness and valid spherical domains.
- Exact tracing retains clearance for the complete 0.6-field diagnostic bundles at infinity and the represented `beta = -1/2` state.

### Glass review

- Retained the six-digit patent-coordinate glass classes. The patent gives only `nd` and `vd`, and no unique coefficient-backed production identities were established.

### Screenshot follow-up

- A tighter repeat measurement against patent Figure 1 found L1–L6 figure/data mean-height ratios of approximately `1.007`, `0.996`, `0.941`, `0.991`, `1.118`, and `0.996`. Every element is within approximately 12% of the patent silhouette, so no further semi-diameter change is justified.
- Element shapes, D1/D2 boundaries, rounded Abbe badges, and the production display name remain correct.
- Shortened the diagram captions to `G1`–`G4`; the floating/fixed behavior remains explicit in the focus model, variable-gap labels, top-line specification, and analysis while no longer colliding beneath the compact rear group.
