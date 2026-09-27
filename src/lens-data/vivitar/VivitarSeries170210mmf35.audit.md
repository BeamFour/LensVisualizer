# Audit Log — Vivitar Series 1 70–210mm f/3.5 Macro Focusing Auto Zoom

## 2026-09-27 — Source-state review

Source-state review outcome: blocked.

- Visually checked exact local `patents/JPA 1976063635-000000.pdf`, sole numerical example / Table 1 on PDF pages 3–4, including a 300 dpi rendering of the rotated continuation. Source R19 clearly reads **38.35 mm**, whereas the authored value is **38.55 mm**. The existing analysis's claim of literal transcription has been qualified. This is an unresolved source/model discrepancy, not a reason to tune another radius or the image plane for agreement.
- Both infinity candidates (focus 0, zoom 0 / 1) remain uncertified until that prescription discrepancy is resolved. The published zoom gaps are d5 = 2.041 / 47.555; d10 = 28.624 / 6.000; d13 = 24.389 / 1.500 mm. The source places the stop directly after r21; the existing separate STO retains the full 49.846 mm air gap. Its 40.873732 mm final image distance is an inferred mean of the stored model's endpoint BFDs, not a source-published gap.
- Both finite candidates (focus 1, zoom 0 / 1) have an additional geometry-evidence blocker. The existing wide close gaps 11.461944992 / 28.624 / 24.389 mm and tele macro gaps 11.780356017 / 6 / 46.736703557 mm are numerical reconstructions of the described focus mechanisms and target distances. Table 1 does not print those finite spacing rows. Source prose describing a mode, working distance or macro magnification does not certify the reconstructed displacement.
- All four inventory candidates have explicit dispositions. No source states or invented intermediate stations are added; optical values, source values, reference values and tolerances remain unchanged. A prescription correction would require a separate source-faithful optical audit, including the dependent inferred image plane and reconstructed focus travel.
- Validation: shared source-state/conjugate/inventory regression coverage, full repository quality gate and live no-verified-states/finite-focus guard. No per-lens test was added.
