# Audit Log — Leica Macro-Elmarit-R 60mm f/2.8

Patent: US 3,552,833, sole numerical prescription / claim table

## 2026-09-26 — Source-state review

Source-state review outcome: partial. Both authored candidates reviewed: infinity (focusT=0)
is enabled; close (focusT=1) is blocked because its 30.7 mm image-gap extension is inferred
from production 1:2 magnification, not published source geometry. ZoomT=0 for both.

Visually inspected local `patents/US3552833.pdf`, PDF page 2, the sole numerical claim table.
Retained eleven radii, glass thicknesses and ne/ve coordinates reproduce that table at the
existing 61.45317155 scale to stored rounding. The claim uses r3=0.2895 and d3=0.0331;
the upper description table differs (r3=0.2815 and d3=0.0339). The retained claim-table
choice is explicit; do not silently combine the two. The inferred stop divides source
a2=0.2234 into model gaps 5.6058+8.1228 mm. No physical stop diameter is tabulated.

Source s'=0.6838 identifies the normalized infinity rear focal distance. The retained
42.0224 mm image gap was calculated from the scaled paraxial prescription; it differs by
about 0.000721 mm from directly scaling the rounded source s'. The native-e model matrix
has A=2.2895634846920032e-6 and C=-0.016286622382016717 mm^-1. Preserve that
stored geometry and residual rather than tuning the image plane.

The close endpoint's 72.7224 mm gap equals 42.0224+0.5×61.4 mm by construction.
Its derived source is 157.78286501828796 mm ahead of the first surface, with
magnification -0.4999970175644285; independent small-height exact rays agree. This is
consistent optical behavior of the inferred extension, not source verification. The patent
claims use over infinity-to-1:1 but does not give that endpoint's 1:2 spacing or object distance.
Neither the derivation nor the production minimum distance certifies invented movement.

Only the infinity state is declared. Existing close movement, geometry, apertures, glass and
image plane remain unchanged. Production-scale normalization, inferred stop/rims and unresolved
native-e spectral data remain qualifications; ordinary MTF eligibility checks still apply.

## 2026-06-24 — Folder audit

- Rechecked local `patents/US3552833.pdf` OCR for the sole prescription and claim table.
- Confirmed the patent uses e-line constants and retains the existing d3 correction documented in the analysis.
- Updated L4 from `Unmatched dense flint (...)` to explicit `Unmatched (...)` wording. L2 and L4 remain unresolved e-line glasses, not d-line six-digit code candidates.
- Rechecked APD/high-index status: no partial-dispersion data or APO claim are present, so all elements remain non-APD. L1 and L4 retain high-index/high-dispersion roles supported by the e-line constants.
- No patent clear-aperture or semi-diameter table was found. Current SDs remain inferred from f/2.8 marginal rays, the patent ±18° design half-field, stop placement, and thin rear air-gap constraints.

## 2026-07-29 - Remaining e-line mismatch disposition

- Rechecked the sole prescription in local `patents/US3552833.pdf`; R, d, ne, and νe remain unchanged.
- S1 `LAF2 / S-LAM2 class` -> explicit unmatched LAF2-class e-line glass at 1.74795 / 44.50.
- S4 `E-FD5 / S-TIM25 class` -> explicit unmatched dense-flint e-line glass at 1.67764 / 32.00.
- The d-line catalog names remain comparisons only. Synchronized the element descriptions and glass table.

## 2026-07-30 - Reference-line metadata

- Added `indexReference: "e"` to all six elements because the stored `nd` / `vd` slots preserve patent
  `ne` / `νe` values.
- The runtime and generated reports now reject d-line catalog substitution structurally rather than relying on annotation wording.
- No source values or prescription geometry changed.
