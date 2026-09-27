# Audit Log - Sigma APO Macro 180mm F2.8 EX DG OS HSM

Patent: JP 2013-104994 A, Numerical Example 2

## 2026-06-23 - Semi-diameter raw-geometry audit

### SD corrections

| Surface | Before | After | Justification |
|---|---:|---:|---|
| S7 | 37.0 | 36.0 | Raw extended edge check showed L4 S7/S8 self-crossing by 0.440 mm at the larger authored endpoint. |
| S18 | 21.0 | 20.2 | Raw extended edge check showed L11 S18/S19 self-crossing by 0.675 mm at the larger authored endpoint. |

### Notes

- JP 2013-104994 A Example 2 does not publish a clear-aperture / effective-radius table.
- Temporary Sigma SD audit after the edits reported 0/27 Sigma files with raw SD/render issues.

## 2026-08-07 - Line-index ambiguity audit

- Rechecked Numerical Example 2's glass-index table in the ignored local `patents/JP2013104994A.pdf`.
- Relabeled L11 from the ambiguous `BK7 / S-BSL7` class to N-BK7 as a catalog equivalent, without asserting Sigma's
  production supplier. The patent gives nC/nF/ng = 1.51432/1.52237/1.52667; N-BK7 reproduces all three within
  1.5e-5 maximum error, while S-BSL7 differs by approximately 4.65e-4.
- The complete patent line indices remain the runtime source of truth and bypass catalog dispersion for this element.


## 2026-09-27 — Source-state review

Source-state review outcome: verified.

- Visually rechecked exact local `patents/JP2013104994A.pdf`, Numerical Example 2, paragraphs 0061–0063 and prescription/variable tables on PDF pages 15–16. All thirty-three refractive surface radii/thicknesses, nineteen nd/vd coordinates and source stop row 20 (stored as STO) match the unscaled prescription. The source's R12 = 0 notation denotes a plane and retains the engine's large-radius plane representation. Published C/F/g indices for the first five lenses remain separate from unresolved spectral identities elsewhere.
- All three inventory candidates are enabled at exact focus 0 / 0.7710631530319496 / 1, zoom 0. Source INF / 1:2 / 1:1 columns reproduce d9 = 4.9234 / 20.5289 / 37.6004; d14 = 73.9422 / 39.9411 / 6.3155; and d19 = 5.8630 / 24.2585 / 40.8127 mm. The source Bf is 53.29 mm throughout. The 0.0001 mm rounded track difference between finite states is preserved.

| State | First-surface distance (mm) | Physical image track (mm) | Calculated image-plane distance (mm) | Derived magnification | Published magnitude error |
| --- | ---: | ---: | ---: | ---: | ---: |
| Half life-size | 368.8000963630492 | 240.7479 | 609.5479963630492 | −0.501326398543399 | 0.265280% |
| Life-size | 227.54251538466548 | 240.7480 | 468.29051538466547 | −1.0001026988081605 | 0.0102699% |

- Independent exact-ray roots at heights 0.01 / 0.005 / 0.0025 mm are 368.800096244981 / 368.800096320115 / 368.800096363049 mm and 227.542515262152 / 227.542515358176 / 227.542515384666 mm. Maximum axial residual is below 5.345e−12 mm. Both stations pass the unchanged exact-ray checks and 1% published-magnification allowance. The intermediate 0.2653% discrepancy is retained explicitly, not corrected by modifying focus travel or the image plane. Production minimum focus is not a derivation input.
- Source infinity FNO is 2.92; the finite working FNO values are 4.62 / 5.34. The retained nominal f/2.8 control and inferred physical stop/rims remain qualified, and no iris schedule is inferred from those working FNOs. No optical values, reference values or tolerances are changed, and no rear plate is listed or added.
- Validation: shared source-state/conjugate/script checks, full repository quality gate, per-state center/off-axis MTF checks and live exact-station/closed-diagram persistence. No per-lens tests were added.
