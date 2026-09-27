# Audit Log - SIGMA APO MACRO 150mm f/2.8 EX DG OS HSM

Patent: JP 2012-63403 A, Numerical Example 2 / FIG. 8

## 2026-07-04 - Semi-diameter patent-diagram review

### Phase 2 - Retained-information audit

- Reviewed local `patents/JP2012063403A.pdf`. Numerical Example 2 is shown by FIG. 8 on PDF page 20.
- The patent does not publish clear apertures. Stored SDs are conservative renderer apertures derived from the design F2.92 marginal ray with local reductions for edge-thickness and cross-gap sag clearance.
- FIG. 8 shows a large front L1/L2 section, a smaller stop-adjacent middle, and rear/internal-focus/OS groups tapering toward the image side. Current SDs match this progression: 28.3-25.9 mm front surfaces, a 16.7 mm stop, and rear values descending from about 17.85 mm to 10.2 mm.
- No SD values changed.


## 2026-09-27 — Source-state review

Source-state review outcome: verified.

- Visually rechecked exact local `patents/JP2012063403A.pdf`, Numerical Example 2, paragraphs 0085–0087 on PDF pages 13–14. All thirty-two refractive surface radii/thicknesses, nineteen nd/vd glass coordinates and source aperture row 16 (stored as STO) match the unscaled prescription. Source planar surface 5 uses the existing engine's large-radius plane representation.
- All three inventory candidates are enabled at exact focus 0 / 0.7573770485166879 / 1, zoom 0. Source INF / |β| = 0.5 / |β| = 1 columns reproduce d8 = 2.4200 / 10.5359 / 20.1009; d15 = 24.6600 / 16.5441 / 6.9791; d16 = 22.5200 / 12.0489 / 2.5000; and d21 = 2.5500 / 13.0211 / 22.5700 mm. No inferred focus movement or coordinate rounding is introduced.
- The source marks the rear gap Bf without printing its value. The retained 54.019889 mm gap was calculated at infinity and is explicitly qualified in each declaration. The track-preserving internal focus system keeps this existing image plane fixed; no finite state is tuned to the production 0.38 m specification or to the magnification target.

| State | First-surface distance (mm) | Physical image track (mm) | Calculated image-plane distance (mm) | Derived magnification | Published magnitude error |
| --- | ---: | ---: | ---: | ---: | ---: |
| Half life-size | 309.24171317123626 | 192.489889 | 501.7316021712363 | −0.49998959526395376 | 0.00208095% |
| Life-size | 186.18479843308077 | 192.489889 | 378.6746874330808 | −0.9999797587863613 | 0.00202412% |

- Independent exact-ray roots at heights 0.01 / 0.005 / 0.0025 mm are 309.241712928233 / 309.241713099235 / 309.241713171236 mm and 186.184798197368 / 186.184798373475 / 186.184798411406 mm. Maximum axial residual is below 1.262e−11 mm. Both states pass the unchanged exact-ray limits and 1% published-magnification allowance; source magnitudes independently verify the calculated conjugates rather than supplying the image plane.
- The source publishes infinity FNO 2.92 and finite working FNO 4.37 / 5.83. The retained nominal f/2.8 control and inferred physical stop/rims remain qualified; no new iris schedule is inferred from working FNO. Glass spectral proxies remain qualified. No optical values, reference values or tolerances are changed, and no rear plate is listed or added.
- Validation: shared source-state/conjugate/script checks, full repository quality gate, per-state center/off-axis MTF checks and live exact-station/closed-diagram persistence. No per-lens tests were added.
