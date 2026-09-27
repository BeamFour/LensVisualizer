# PANASONIC LUMIX S 24-105mm f/4 MACRO O.I.S. Audit

## 2026-07-31 — Patent-figure SD, glass, and identity pass

**Source:** JP 2020-118738 A, Numerical Example 1, Figure 1.

### Semi-diameters

- Compared the wide-state section with the clean lens rims in Figure 1 at 600 dpi and checked the full-frame
  image-circle floor.
- Retained the submitted SDs. The trustworthy measurements do not show a greater-than-25% mismatch; several apparent
  outliers are neighboring rims or leader-line intersections rather than independent lens edges.

### Glass

- Reviewed all 16 glass elements. Fifteen already resolve to coefficient-backed curves.
- Retained L8 (`1.6882 / 31.1`) as an explicit unmatched M-FD80 / S-TIM28 / J-SF8-class row. Its patent coordinate does
  not uniquely establish one catalog curve, so forcing the nearest name would overstate the available evidence.

### Identity

- Confirmed the official product styling and project naming convention. The display name
  `PANASONIC LUMIX S 24-105mm f/4 MACRO O.I.S.` is correct and was retained.
- Romanized the inventor names and normalized the assignee to the existing
  `Panasonic Intellectual Property Management Co., Ltd.` catalog identity.

## 2026-09-23 — Rear plate modeled as `rearPlates`

- Replaced the air-equivalent d33 (25.113494 / 44.081494 / 49.713494 mm) with Numerical Example 1's physical rear stack
  (Table 1 surfaces 34–35 on PDF p. 20, Table 3A variable gaps on p. 21, confirmed on the rendered pages): d33 =
  21.029 / 39.997 / 45.629 mm, then `rearPlates` P 2.1 mm, nd 1.51680, νd 64.2 (N-BK7), and 2.7 mm to the image plane.
  The var label now reads D33.
- Paraxial check against the previous data: EFL identical and defocus unchanged (worst difference 1e-10 mm) at every
  zoom station and focus keyframe, because the legacy fold used the exact 2.1 / 1.5168 + 2.7 mm. Physical track grows
  by 0.715506 mm and now equals the patent's printed total lengths of 136.501 / 148.530 / 180.790 mm; conditions (1)
  and (2) re-evaluate to 0.182034 and 0.142087 (patent 0.182 / 0.142).
- `closeFocusM` stays at the source-quoted 0.300 m. The reconstructed close-focus G4 gaps were solved on the earlier
  air-equivalent track and were not re-solved, so the 300 mm object now sits 0.715506 mm closer to the front vertex.

## 2026-09-23 — Close-focus gaps re-solved on the physical track

- Re-solved the reconstructed G4 close-focus gaps so the 300 mm object is measured from the stored image plane on the
  physical track through plate P. D27 close 3.394493514 / 7.221740926 / 15.469690819 → 3.400517907 / 7.239460293 /
  15.52269395 mm; D29 close 14.530506486 / 9.953259074 / 15.970309181 → 14.524482093 / 9.935539707 / 15.91730605 mm.
  G4 travel is now 1.600518 / 4.619460 / 13.722694 mm. These remain reconstructions, not patent values.
- Method: paraxial y–u trace of the `expandRearPlates` surfaces from an axial object 300 mm before the image plane,
  bisecting G4 travel with d27 + d29 conserved and the infinity gaps untouched. The old gaps left that object's paraxial
  image 0.012 / 0.048 / 0.174 mm off the image plane (wide / middle / tele).
- Close-focus defocus is now at most 4.4e-10 mm; infinity EFL (25.002987 / 50.142962 / 100.568809 mm) and the infinity
  state are unchanged. Tele magnification is 0.494313× (was 0.492597×) and condition (5) 0.136451. Surface and
  image-circle audits pass.

## 2026-09-24 — Surface 7 raised to pass the patent's wide field

Numerical Example 1's Table 3A (JP 2020-118738 A, PDF p. 21) prints the wide state at f 25.0078 mm, ω 40.9808° and
image height 19.6000 mm, 90.5% of the full-frame corner; middle and tele print 21.6330 mm. So the wide end is a design
image circle. The real chief ray (solved through the stop centre) at the printed ω lands at 19.60 mm and crosses surface
7 at 16.37 mm, above its 16.0 mm rim, so the wide analysis field ended at 88.6% of the corner (19.18 mm). Surface 7
takes its floor + ~0.5 mm; its partner, surface 8 (R 16.21, the concave rear of the L4 meniscus), carries 12.28 mm of
that chief ray against its 13.1 mm rim and is unchanged.

| Surface | Before | After | Justification |
|---|---|---|---|
| 7 | 16.0 | 16.9 | wide chief ray at the printed ω crosses it at 16.37 mm + clearance |

The validator accepts the new value and the image-circle floor still reports nothing undersized. The wide analysis field
now runs to 41.9° (20.17 mm, 93% of the corner), just past the design height, where surface 7 clips again; the corner
itself (43.8°) would also need a larger surface 1. Middle and tele still reach 100%. The analysis quotes no surface-7
value.


## 2026-09-26 — Source-state review

Source-state review outcome: partial.

- Rechecked the exact local `patents/JP2020118738A.pdf`, Numerical Example 1, Tables 1–3A (PDF pages 19–21). The source explicitly labels the tabulated stations as infinity focus. All eight asphere coefficient rows and the retained radius/gap mapping agree, allowing for the already documented removal of three 0.005 mm adhesive layers into the preceding glass thicknesses. This normalization is retained and disclosed, not represented as an exact adhesive-layer model.
- Enabled `wide-infinity`, `middle-infinity`, and `tele-infinity` at focus 0 and zoom 0 / 0.5 / 1. Source focal lengths are 25.0078 / 50.1541 / 100.5897 mm. The five variable gaps reproduce Table 3A exactly:

| Gap | Wide (mm) | Middle (mm) | Tele (mm) |
| --- | ---: | ---: | ---: |
| d6 | 0.700 | 12.729 | 32.989 |
| d14 | 27.072 | 8.854 | 0.957 |
| d27 | 1.800 | 2.620 | 1.800 |
| d29 | 16.125 | 14.555 | 29.640 |
| d33 | 21.029 | 39.997 | 45.629 |

- Added the source's physical iris schedule, CIR = 7.270 / 9.125 / 10.893 mm, rather than retaining one physical opening across zoom. This directly sourced aperture change is separate from inferred lens rims. Source F-numbers are 4.12027 / 4.12016 / 4.12031; the normalized model retains nominal F/4.1194. No radii, spacings, rear plate, glass or image planes changed.
- Source rear surfaces 34–35 remain one hidden 2.1 mm plate, nd 1.51680, vd 64.2, followed by 2.7 mm air. Physical total tracks remain 136.501 / 148.530 / 180.790 mm; no second rear-plate expansion is introduced.
- Reviewed all three close-focus inventory candidates as blocked. Paragraphs 0182–0183 publish telephoto G4 travel 13.76 mm, image-plane object distance 300 mm and rounded 0.5× magnification, but the retained tele movement is a solved 13.72269395 mm. Wide and middle travel 1.600517907 / 4.619460293 mm is reconstructed without close-focus source spacing rows. No reconstruction is certified or modified to create a selectable state.
- Validation: shared source-state/conjugate/script suites, physical-stop zoom regression, complete repository quality gate and live station selection. Geometric/reference/design-plane checks retain their per-field numerical statuses; convergence is not production accuracy.
