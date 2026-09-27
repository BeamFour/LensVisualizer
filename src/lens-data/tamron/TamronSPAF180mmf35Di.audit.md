# Audit Log — Tamron SP AF 180mm f/3.5 Di LD [IF] Macro (B01)

## 2026-09-27 — Source-state review

Source-state review outcome: verified.

- Visually checked exact local `patents/JP_2003329924_A.pdf`, Example 2, paragraph 0019 on PDF page 4. The twenty-five refractive surfaces and fourteen nd/vd pairs reproduce the source after the existing uniform ×1.0171864961 scale and six-decimal rounding. Source R23 = -69.3962 mm is retained at scale. No source radius, spacing, glass or tolerance is changed.
- All three inventory candidates are enabled at exact focus 0 / 0.7387189937888587 / 1, zoom 0. Unscaled source gaps are D11 = 4.7192 / 20.9991 / 36.7439; D16 = 35.5923 / 19.3121 / 3.5676; D17 = 15.2508 / 9.1087 / 3.2000; gap after surface 22 = 15.1456 / 20.2861 / 25.1986; BF = 59.274 / 60.275 / 61.271 mm. The source's D20 heading for the fourth variable gap conflicts with the surface table's D22; the existing physically indexed surface-22 interpretation remains explicit.
- The finite distances below are **calculated at the existing scaled model size**, not published patent distances. Source signed magnifications -0.5 / -1 are scale-invariant. Production 0.47 m is not an input.

| State | First-surface distance (mm) | Physical track (mm) | Image-plane distance (mm) | Derived magnification |
| --- | ---: | ---: | ---: | ---: |
| Half life-size | 424.0198844738364 | 212.216633 | 636.2365174738364 | -0.4999992846415252 |
| Life-size | 256.4133039777904 | 212.216736 | 468.63003997779043 | -0.9999989997817453 |

- Independent exact-ray roots at 0.01 / 0.005 / 0.0025 mm for half life-size are 424.01988444915514 / 424.0198844738363 / 424.0198844738363 mm. Both finite states pass the unchanged exact-ray and 1% published-magnification checks; magnitude errors are 0.0001431% and 0.0001000%. Scale and source rounding are retained in the evidence rather than described as production accuracy.
- Source FNO 3.536 / 4.285 / 5.440, nominal f/3.5, inferred iris and clear apertures retain their qualifications. Validation: shared source-state/conjugate/script checks, full quality gate, per-state center/off-axis MTF and live station/closed-diagram persistence. No per-lens test was added.
