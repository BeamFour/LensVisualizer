# Audit Log — Tamron SP AF 60mm f/2 Di II LD [IF] Macro (G005)

## 2026-09-27 — Source-state review

Source-state review outcome: partial.

- Visually rechecked exact local `patents/US20110286116A1.pdf`, Embodiment 1 / paragraph 0046, PDF page 12 (printed page 3). Twenty-four refractive rows, fourteen nd/vd pairs, stop row 15 and all four variable gaps reproduce the source. The patent omits the final image gap; the existing calculated infinity BFD 41.7724 mm remains fixed and explicitly qualified.
- Infinity at focus 0 / zoom 0 is enabled. Life-size at focus 1 / zoom 0 is enabled with source gaps D9/D14/D15/D22 = 17.4252/1.4470/1.5000/13.5384 mm. Its calculated source is 106.83938165589451 mm before surface 1, or 230.0682816558945 mm from the image plane after adding the 123.2289 mm physical track.
- Independent exact-ray roots at heights 0.01 / 0.005 / 0.0025 mm are 106.83938143201522 / 106.83938159992472 / 106.83938164345682 mm. All three pass the unchanged consistency checks. Derived magnitude 0.996790290713385 differs from the published 1:1 by 0.320971%, within the unchanged 1% allowance. Production 0.23 m is not an input.
- The intermediate candidate at focus 0.5039200468308941 remains blocked. The source labels it “Up to 5:1 Mag.”, while the fixed-geometry solve gives magnitude 0.19780890917811894 and first-surface distance 333.19271181411284 mm. It does not establish a 5× state. Even interpreting the ratio as object-to-image 5:1 (magnitude 0.2) leaves a **1.0955454%** discrepancy, beyond the unchanged allowance. Its independently consistent exact rays do not settle that source discrepancy; the column is not silently relabeled or certified.
- Source FNO 2.06 / 2.46 / 4.10, nominal f/2 and inferred physical iris remain qualified. All three inventory candidates have explicit dispositions. No geometry, glass, optical reference or tolerance changes are made.
- Validation: shared source-state/conjugate/inventory checks, full quality gate, center/off-axis MTF for both enabled states and live selector/closed-diagram persistence. No per-lens test was added.
