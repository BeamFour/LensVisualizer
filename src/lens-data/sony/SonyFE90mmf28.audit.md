# Audit Log - Sony FE 90 mm F2.8 Macro G OSS

Patent: WO 2016/136352 A1, Example 2

## 2026-05-20 - Glass relabel pass

- Opened the local untracked patent PDF at `patents/WO2016136352A1.pdf`; local extraction is image-only, so the patent rows were cross-checked against the public Google Patents text.
- Confirmed relabel rows at surfaces 6, 20, 22, and 24.
- Updated G4 to `MC-TAF101-100 (HOYA)` for nd=1.76800, vd=49.24.
- Updated G5 to `S-LAH66 (OHARA)` for nd=1.77250, vd=49.62, clearing the prior no-catalog M-TAC60 annotation.
- Updated G12 to `S-TIM25 (OHARA)` for nd=1.67270, vd=32.17.
- Updated G13 to `S-LAH95 (OHARA)` for nd=1.90370, vd=31.32.
- Updated G14 to `N-SSK5 (Schott)` for nd=1.65840, vd=50.85.

## 2026-06-23 - Sony folder patent audit / APD + SD review

- Corrected this audit header from Example 1 to Example 2, matching `SonyFE90mmf28.data.ts` and the companion analysis sidecar.
- Rechecked local `patents/WO2016136352A1.pdf`; local extraction is image-only, so this pass relies on the existing Example 2 analysis and prior cross-check against public patent text.
- Existing R/d/nd/vd, focus spacings, high-index/catalog labels, APD metadata, and estimated SD profile remain consistent with the patent-backed Example 2 prescription and prior relabel pass.
- No APD, high-index, glass-label, spacing, or SD edits were needed in this pass.
- Current generated glass reports show no active Sony catalog-mismatch row for this lens.

## 2026-07-29 - Catalog-coordinate correction

- Corrected G7 from modern `S-NPH2` to historical OHARA `PBH21`, the exact 1.9229 / 20.88 row.

## 2026-09-23 — Rear plate modeled as `rearPlates`

- Read Example 2 Table 5 on PDF page 24 (printed page 22) at 200 dpi: surface 27 d = 22.747; surfaces 28–29 are one
  plane plate, 2.500 mm, nd 1.5168, νd 64.1983, then 1.000 mm to IMG. Paragraph [0094] (page 23) names it optical
  filter FL between GR5 and IMG. d27 is not a Table 8 variable gap, so the plate is camera-fixed.
- Surface 27 now stores the patent's 22.747 mm, with `rearPlates` FL (N-BK7; 1.51680 / 64.2 class, catalog-compatible)
  and gapAfter 1.000 mm, replacing the legacy air-equivalent 25.4 mm (the patent's two-decimal BF 25.40).
- Paraxial check against the previous data: EFL identical at all three focus keyframes; defocus changes by 0.0048 mm
  (22.747 + 2.500/1.5168 + 1.000 = 25.3952 vs the rounded 25.4). Physical track grows by 0.847 mm to 145.005 mm,
  matching the analysis's physical S1-to-image figure.

## 2026-09-24 — Semi-diameters raised to the traced format corner

Example 2 prints ω = 13.15° (Table 7, PDF p. 25), and the Fig. 6 infinity aberration plots run to Y = 21.63 mm (PDF
p. 44), within 0.02 mm of the full-frame corner (21.65 mm), so the design covers the format. The estimated rims (rear
elements sized for a 40% field) clipped the real chief ray (solved through the stop centre) at surface 27 from 10.3°,
leaving the infinity-focus analysis field at 77% of the corner (16.71 mm). The traced corner chief ray (13.27°) needs
surface 1 ≥ 19.06, 2 ≥ 18.18, 3 ≥ 16.87, 4 ≥ 15.83, 26 ≥ 10.67 and 27 ≥ 11.41 mm; every other rim is clear (surface 25
keeps 0.17 mm). Values are floor + ~0.5 mm, rounded up. Surface 2 also equals G1 scaled with surface 1 (×1.107);
surface 5, G3's rear face (14.58 mm at the corner), is scaled with the cemented junction 4 (×1.038); G15 is a strong
meniscus (R −27.80 / −75.22), so surfaces 26 and 27 take their own floors. Fig. 5 (300 dpi, 0.1076 mm/px) draws G1 to
about 24.9 mm and G13–G15 to about 15 mm, so every new value stays inside the drawn outline; the figure was used only
as that bound.

| Surface | Before | After | Justification |
|---|---|---|---|
| 1 | 17.7 | 19.6 | corner chief ray 19.06 mm + clearance |
| 2 | 16.9 | 18.7 | corner chief ray 18.18 mm + clearance (= G1 scaled ×1.107) |
| 3 | 16.8 | 17.4 | corner chief ray 16.87 mm + clearance |
| 4 | 15.8 | 16.4 | corner chief ray 15.83 mm + clearance; cemented G2/G3 junction |
| 5 | 15.5 | 16.1 | G3 scaled with surface 4 (×1.038); does not clip |
| 26 | 8.9 | 11.2 | corner chief ray 10.67 mm + clearance |
| 27 | 8.9 | 12.0 | corner chief ray 11.41 mm + clearance |

The validator accepts the new values, the traced edge now reaches 21.65 mm at 13.3° with every rim clear, and the
image-circle floor still reports nothing undersized. No aspheric surface changed (the S7 departure the analysis quotes
is untouched), and the analysis quotes none of the changed rims.


## 2026-09-27 — Source-state review

Source-state review outcome: verified.

- Visually rechecked exact local `patents/WO2016136352A1.pdf`, Example 2, Tables 5–8 on PDF pages 24–25 (printed pages 22–23). All twenty-six refractive lens radii/thicknesses and fifteen refractive indices match the unscaled source; source stop row 16 is STO. Existing lens Abbe values retain two-decimal rounding of the source's four decimals. Table 6's surface-7 K = 0 and A4/A6/A8/A10 coefficients match the retained asphere.
- All three inventory candidates are enabled at exact focus 0 / 0.8075766830717322 / 1, zoom 0. Source magnifications 0 / −0.5 / −1 pair with d7 = 2.80 / 11.89 / 22.17; d12 = 22.92 / 13.83 / 3.54; d16 = 23.22 / 13.23 / 5.00; and d21 = 7.49 / 17.48 / 25.71 mm. The source's 0.01 mm track-rounding difference at close focus is preserved.
- The existing source filter FL remains physical: gap from surface 27 is 22.747 mm, plate thickness 2.5 mm with nd 1.5168 / vd 64.1983, then 1 mm air to the image. The shared `rearPlates` path includes it exactly once in source derivation and MTF; it is not drawn as a lens element. No plate or gap changes are made.

| State | First-surface distance (mm) | Physical image track including FL (mm) | Calculated image-plane distance (mm) | Derived magnification | Published signed-magnification error |
| --- | ---: | ---: | ---: | ---: | ---: |
| Half life-size | 202.57759224286826 | 145.005 | 347.58259224286826 | −0.4984232420088314 | 0.315352% |
| Life-size | 130.17779081248614 | 144.995 | 275.17279081248614 | −0.9957179219271312 | 0.428208% |

- Independent exact-ray roots at heights 0.01 / 0.005 / 0.0025 mm are 202.577591682769 / 202.577592101369 / 202.577592195702 mm and 130.177790552962 / 130.177790748079 / 130.177790797331 mm. Maximum axial residual is below 1.987e−11 mm. Both finite states pass the unchanged exact-ray limits and 1% signed-magnification allowance. The production 0.28 m distance is not an input, and the source/model magnitude differences remain explicit.
- Source FNO is 2.88, versus retained nominal f/2.8. The physical iris, clear apertures and spectral glass proxies retain their qualifications. No optical values, reference values or tolerances are changed to improve MTF.
- Validation: shared source-state/conjugate/script checks, worker/rear-plate regression coverage, full repository quality gate, per-state center/off-axis MTF checks and live exact-station/closed-diagram persistence. No per-lens tests were added.
