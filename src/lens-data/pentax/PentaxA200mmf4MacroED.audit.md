# Audit Log — Pentax A* 200mm f/4 Macro ED

Patent: US 4,666,260, Example 1 / claim 5

## 2026-06-23 — Pentax folder patent audit

### Patent evidence

- Rechecked local patent file `patents/US4666260.pdf`.
- Reviewed the first drawing sheet; it supports the large front telephoto envelope, stop before surface 14, and long rear clearance already modeled.

### Disposition

- Glass labels remain unchanged. The `BPM4 (OHARA legacy, 613/438 short flint)` row remains a legacy/proprietary label because the nearest current catalog candidates do not match closely enough for a relabel.
- L2 and L3 remain `apd: "inferred"` ED fluorophosphate elements. The patent describes super-low-dispersion positive lenses by Abbe-number condition, but does not tabulate partial dispersion.
- No patent clear-aperture or semi-diameter table was found. Existing SDs remain unchanged after visual drawing review.


## 2026-09-26 — Source-state review

Source-state review outcome: verified.

- Rechecked exact local `patents/US4666260.pdf`, Example 1 on PDF page 11 (printed columns 3–4), and the drawing definitions on PDF page 10. The latter explicitly assign infinity / half magnification / unity magnification to Figure 2(a)/(b)/(c). The Example 1 definition of WD is object to first lens surface, not image plane or mechanical barrel front.
- All nineteen source refractive radii/thicknesses and ten glass coordinates match the retained unscaled prescription. Source d13 = 7.53 / 35.05 / 62.58 mm is reproduced by retained gap `13` = 6.53 / 34.05 / 61.58 plus the inferred 1 mm STO gap. Rear image distance is the printed 76.9 mm throughout. Neither the inferred stop location within d13 nor inferred lens rims are newly claimed as published dimensions.
- Enabled all three inventory candidates at focus 0 / 0.765303983447137 / 1, zoom 0. The nonuniform intermediate coordinate is retained exactly; no slider-step rounding or new focus movement is introduced.

| State | Declared distance | Fixed-plane derived first-surface distance (mm) | Derived image-plane distance (mm) | Derived magnification | Published magnitude error |
| --- | --- | ---: | ---: | ---: | ---: |
| Half life-size | Calculated 718.6686753185977 mm, image plane | 502.1086753185977 | 718.6686753185977 | −0.5000512940312648 | 0.0102588% |
| Life-size | Published 302.2 mm, first surface | 302.13298506812066 | 546.2229850681207 | −1.0001165195268862 | 0.0116520% |

- Intermediate physical track is 216.56 mm; close track is 244.09 mm. Independent exact-ray roots at heights 0.01 / 0.005 / 0.0025 mm are 502.108674909426 / 502.108675201691 / 502.108675318598 mm and 302.132984685615 / 302.132984971395 / 302.132985032948 mm, respectively. Maximum axial residual is below 1.27e−11 mm. The close first-surface distance differs from published WD by 0.0221757%. Distance and magnification checks pass the unchanged 1% allowance; the source WD is preserved rather than replaced with the exact fixed-plane root.
- The formal approximately 1.19 km root at the rounded infinity plane is not another finite source state. Source F/4 is retained; its physical stop model and glass spectral proxies remain qualified. No optical values, reference values or tolerances were changed, and no rear plate is listed or added.
- The initial life-size MTF search failed because its infinity-pupil seed (about 804.88 mm) skipped the finite chief-ray domain. A shared physical-entrance-scale fallback fixes the search without changing this prescription or any residual/domain threshold. All three reference/design-plane checks converge at center, middle and edge; live photopic best-axial runs converge at all eleven fields for half life-size and life-size (offsets −0.196 / −0.558 mm). Closing MTF retains the exact focus coordinate and aperture.
- Validation: shared source-state/conjugate/script checks, full repository quality gate, per-state center/off-axis MTF checks and live nonuniform-station/closed-diagram persistence. No per-lens tests were added.
