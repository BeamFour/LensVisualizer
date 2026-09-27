# Nikon AF-S DX MICRO-NIKKOR 85mm f/3.5G ED VR Patent Audit

Patent: US 2009/0190220 A1, Example 1

## 2026-09-26 — Source-state review

Source-state review outcome: verified. All three authored candidates enabled: infinity,
half life-size and life-size. Only the centered optical configuration is certified;
the patent's laterally shifted VR diagrams are not additional source states.

Visually checked local `patents/US20090190220A1.pdf`, PDF page 55, Example 1,
Table 1. All radii, glass rows and internal spacings match the retained prescription.
Source surface 13 is the fixed stop. The d7/d12/d13/d18 rows are
2.49595/17.38925/16.18097/4.99729 at infinity,
10.52739/9.35781/9.51488/11.66338 at beta=-0.5 and
17.78094/2.10426/3.18873/17.98953 mm at beta=-1.0.
The fixed d21=7.49950 and Bf=41.97225 mm also match. The nonuniform middle
coordinate focusT=0.7833746615766991 reproduces the complete published row.

The table's finite D0=206.1164/133.0597 mm values are object-side first-vertex
conjugates. This convention is independently supported by the fixed prescription:
ABCD derives first-vertex distances 206.117094622994/133.059947501104 mm and
magnifications -0.499999474448/-0.999999904331. Using D0 as object-to-image
would subtract the 131.13521 mm track and fail these published conjugates.
D0=0 in the infinity column is a placeholder, not a zero-distance launch.

Exact roots at 0.01/0.005/0.0025 mm first-vertex heights are
206.117094826954/206.117094670985/206.117094622994 and
133.059947280368/133.059947446888/133.059947485614 mm; axial residuals are
below 1.652e-11 mm. Calculated distance differences from the source are
0.0006946/0.0002475 mm (0.000337%/0.000186%). The printed distances and
spacing are retained rather than adjusted to erase these residuals. Near-axis
agreement supports the chosen distance convention without establishing production
accuracy or the cause of every source/model discrepancy.

No optical values changed. The production 0.286 m MFD is not substituted for the
patent conjugate. Intermediate finite positions remain unavailable, and inferred
clear apertures, stop diameter and catalog dispersion retain their qualifications.

## 2026-08-18 — Initial integration audit

- Reviewed the untracked local patent PDF `patents/US20090190220A1.pdf`; Figure 2 on PDF page 3 is the controlling optical section.
- The original SD ladder made L11 the largest front element, whereas the patent shows the L13/L14 cemented pair as the tallest part of G1. It also understated the diameter of the G4 vibration-reduction pair.

| Surfaces | Before (mm) | After (mm) |
|---|---:|---:|
| 1 / 2 / 3 / 4 | 15.5 / 15.0 / 14.6 / 13.5 | 14.0 / 13.8 / 13.0 / 13.0 |
| 5 / 6 / 7 | 13.25 / 13.0 / 12.7 | 15.0 / 15.0 / 15.0 |
| 19 / 20 / 21 | 8.6 / 8.6 / 8.5 | 10.5 / 10.5 / 10.3 |

- Replaced class-only annotations with the compatible catalog entries already selected by the resolver; no new catalog row was required.
- Normalized the display name to `NIKON AF-S DX MICRO-NIKKOR 85mm f/3.5G ED VR`.

## 2026-08-18 — Screenshot follow-up

- Compared the supplied rendering directly with Figure 2. The revised G1 and VR-pair heights align with the source silhouette; no further SD change was justified.
- Confirmed published dual-focus travel: G2 moves `+15.2850mm` imageward, G3 moves `−12.9922mm` objectward, and G1/G4/G5 remain axially fixed.
- Marked L33 as the single inferred ED position, matching the production one-ED count, while leaving G4's transverse VR behavior separate from axial focus motion.

## 2026-08-18 — Cemented-pair proportion correction

- Re-inspected a 600 dpi render of Figure 2 after the site screenshot exposed that the earlier silhouette assessment had over-read leader-line and flange ink. This supersedes the SD conclusion in the preceding screenshot follow-up.
- The optical outlines put D1 below L11 and near L12 in height. They put D4 modestly above G3 but below the rear G5 elements; the enlarged site rendering violated both orderings.

| Cemented pair | Surfaces | Before (mm) | After (mm) | Figure-supported ordering |
|---|---|---:|---:|---|
| L13 / L14 (D1) | 5 / 6 / 7 | 15.0 / 15.0 / 15.0 | 13.25 / 13.0 / 12.7 | L11 > D1 ≈ L12 |
| L41 / L42 (D4) | 19 / 20 / 21 | 10.5 / 10.5 / 10.3 | 9.5 / 9.5 / 9.4 | G5 > D4 ≈ G3 |

- The image-circle audit reports no undersized surfaces, and the real validator accepts all six reduced SDs without edge-thickness, rim-slope, cross-gap, or SD-ratio errors. Restoring the smaller D1 rim also makes the earlier lens-specific `gapSagFrac = 0.94` allowance unnecessary, so the lens now uses the default `0.90` policy with +0.139453 mm clearance at the shared 13.0 mm material rim.
