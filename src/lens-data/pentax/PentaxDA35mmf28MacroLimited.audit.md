# Audit Log — Pentax DA 35mm f/2.8 Macro Limited

Patent: US 7,715,118 B2, Example 1

## 2026-06-23 — Pentax folder patent audit

### Patent evidence

- Rechecked local patent file `patents/US7715118.pdf`.
- Reviewed the first drawing sheet; it confirms the large front macro group, central stop, and separated rear groups used by the current renderer proportions.

### Disposition

- Glass labels remain unchanged. The patent-code labels `805/254`, `786/442`, `620/603`, and `741/527` remain more accurate than forcing uncertain current catalog names where the match is not exact.
- APD status remains `false`; the patent lists nd/vd only and no partial-dispersion terms.
- No patent clear-aperture or semi-diameter table was found. Existing SDs remain unchanged.


## 2026-09-26 — Source-state review

Source-state review outcome: verified.

- Rechecked exact local `patents/US7715118.pdf`, Embodiment 1 / Table 1 on PDF pages 15–16 (printed columns 7–9). The text identifies the three variable spacings as infinity / magnification −0.5 / magnification −1.0, in that order. All seventeen refractive radii/thicknesses and nine glass coordinates match the retained unscaled prescription.
- Source d13 = 1 / 12.57 / 24.13 mm is reproduced at exact focus coordinates 0 / 0.858792011850653 / 1, zoom 0; the printed 38.72 mm rear image distance stays fixed. Source stop location 4.425 mm before surface 8 is reproduced by splitting the printed 8.43 mm surface-7 air gap into 4.005 + 4.425 mm. No additional movement or rounded coordinate is introduced.
- All three inventory candidates are enabled. Finite distances are calculated with the authored geometry and image plane held fixed; the production 0.139 m focus specification is not used as evidence for the calculation.

| State | First-surface distance (mm) | Physical image track (mm) | Calculated image-plane distance (mm) | Derived magnification | Published signed-magnification error |
| --- | ---: | ---: | ---: | ---: | ---: |
| Half life-size | 64.04525491843141 | 97.81 | 161.8552549184314 | −0.499783176798856 | 0.0433646% |
| Life-size | 29.621990644211685 | 109.37 | 138.99199064421168 | −0.9994091604185922 | 0.0590840% |

- Independent exact-ray roots at heights 0.01 / 0.005 / 0.0025 mm are 64.045250838218 / 64.045253896980 / 64.045254664933 mm and 29.621989762270 / 29.621990423511 / 29.621990589036 mm. Maximum axial residual is below 3.184e−10 mm. Both stations pass the unchanged exact-ray thresholds and 1% published-magnification allowance. The rounded infinity configuration is not treated as another finite source.
- Source FNO is 1:2.88; retained nominal aperture is f/2.8. The physical stop radius, clear apertures and glass spectral proxies remain inferred/qualified. No optical values, reference values or tolerances are changed, and no rear plate is listed or added.
- Validation: shared source-state/conjugate/script checks, full repository quality gate, per-state center/off-axis MTF checks and live exact-station/closed-diagram persistence. No per-lens tests were added.
