# Audit Log - Nikon R-UW AF Micro-Nikkor 50mm f/2.8

Patent: US 5,257,137, Embodiment 1

## 2026-07-29 - Glass coverage follow-up

- Relabeled L31 from an explicit unmatched J-SFH2 class note to coefficient-backed Hikari J-SFH2.
- Current J-SFH2 retains the patent coordinate's `nd=1.86074`; its published `vd=23.08` and code `861231` are
  one final rounding digit from the stored `vd=23.0` / `861230` coordinate.
- Kept J-LASFH2, 796/409, and 607/403 rows unresolved because this pass found no comparably strong catalog evidence
  for those materials.
- No prescription, semi-diameter, or movement values changed.

## 2026-07-29 - `796409` coefficient-source review

- Visually rechecked Example 1 Table 1 row 14 at `nd = 1.79631`, `vd = 40.9`; the stored radius and
  thickness match the printed prescription.
- Official OHARA, HOYA, Hikari, and Sumita coefficient catalogs contain no exact `796409` row.
  The nearby named lanthanum-flint families do not reproduce both coordinates.
- Retained the explicit unmatched `796409` annotation. No supplier, catalog model, or geometry changed.

## 2026-08-11 — Phase 92 HOYA legacy-catalog recovery

- Visually rechecked US 5,257,137 Table 1 on rendered PDF page 8: L33 is `1.79631 / 40.9` and L41 is
  `1.60717 / 40.3`.
- Recovered official legacy HOYA models NBFD2 (`1.797199 / 41.143795`) and BAFD3
  (`1.607171 / 40.359687`); both are compatible with their patent coordinates.
- Relabeled the two elements as supplier-neutral optical equivalents and synchronized the analysis. No underwater
  prescription geometry, aperture, projection, or semi-diameter values changed.

## 2026-08-11 — Phase 94 J-LASFH2 completion

- Rechecked Example 1 Table 1 on rendered PDF page 8: surface 3 is `nd = 1.76684`, `νd = 46.8`.
- The subsequently added first-party Hikari J-LASFH2 curve reproduces that coordinate at `1.766840019 / 46.78`, so
  the earlier explicit-unmatched safeguard is no longer applicable.
- Relabeled L2F to J-LASFH2, completing the lens at 10/10 strict Sellmeier surfaces. No source values or geometry
  changed.

## 2026-09-24 — Declared field converted to its in-air equivalent

| Field | Before | After | Justification |
|---|---|---|---|
| `projection.maxTraceFieldDeg` | 17.5 | 23.59 | The production 35° field is an underwater angle, but the app launches rays in air in front of the flat port; asin(1.3306 · sin 17.5°) = 23.59° is the same ray in air (nw = 1.3306 from patent col. 10). |
| `projection.fullFieldDeg` | 35 | 47.18 | Twice the in-air half-field (rounded up so the half-field rule holds). |

The underwater declaration had stopped the analysis field at 17.5° in air, 74% of the 35 mm corner. The traced
chief ray reaches the corner at 23.5° with every rim clear, consistent with the analysis note that the frame
corner is 22.75° image-side and about 16.9° underwater. The `specs` line keeps "35° underwater field". No
prescription or semi-diameter changed.

## 2026-09-26 — Source-state review

Source-state review outcome: blocked. All three authored candidates reviewed; none is
certified as an underwater source state. The incident-medium optical path is unsupported.

Visually checked local `patents/US5257137.pdf`, first embodiment / Table 1, PDF pages
7–8. The source includes the 10 mm flat front port, 19 prescription surfaces and two
variable spaces. The retained radii and physical gaps reproduce the source, including
the inferred stop split of source d9=8.84 mm into 4.42+4.42 mm. The source defines D0
from the object to the first surface. Its focus rows are:

| Source beta | Focus coordinate | D0 (mm, in water) | d2 (mm) | d15 (mm) | Bf (mm) |
|---|---:|---:|---:|---:|---:|
| 0 | 0 | infinity | 43.0605 | 4.4407 | 45.0470 |
| -0.5 | 0.6967361668974719 | 108.4613 | 24.2389 | 23.2623 | 45.0470 |
| -1 | 1 | 64.7658 | 5.4172 | 42.0840 | 45.0470 |

PDF page 8 explicitly gives object-space water index 1.3306 and Abbe number 53.98.
The current sequential and generalized trace paths initialize the incident index to 1;
the source-state contract has no incident-medium declaration. The existing projection
converts an underwater field angle to an in-air equivalent, but that does not establish
a common finite physical source, water dispersion, optical launch phase or solid-angle
weights for source-backed underwater MTF. No water state is represented as a verified
air state, and no substitute calculated distance is declared.

For diagnostic comparison only, the current air-model audit derives finite distances
81.400807022044 and 48.596486882361 mm before the front port, with magnifications
-0.499830845925 and -0.999790454345. Exact-ray checks are internally consistent with
those air sources (maximum axial residual 1.661e-9 mm), but their distances differ from
the source's water distances by approximately 25%. Passing air-ray convergence does
not verify the source medium. Infinity is also left uncertified rather than implying
that the existing field-angle conversion validates the complete underwater MTF model.

Future certification requires shared incident-medium geometry, reference/spectral index,
phase and weighting support checked against the published water conjugates. Current
inferred stop/rim geometry and catalog glass approximations remain additional qualifications.
No source values, fields, movement, existing calculation eligibility or prescription were
changed; the analysis now states why the selector has no verified configurations.
