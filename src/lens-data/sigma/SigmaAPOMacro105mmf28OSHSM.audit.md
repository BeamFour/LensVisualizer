# Audit Log - Sigma APO Macro 105mm F2.8 EX DG OS HSM

Patent: JP 2012-58682 A, Example 4

## 2026-05-31 - Catalog mismatch remainder audit

### Phase 1 - Glass correction

| Element / surface | Field | Before | After | Justification |
|---|---|---|---|---|
| E16 / 27 | `glass` | `BACD5 (HOYA) / S-BAL35 class` | `M-BACD5N (HOYA)` | Patent Example 4 row 27 lists nd=1.58913, vd=61.25. The `BACD5` token aliases to Schott N-SK16 in the resolver, which is the wrong 1.62041-index glass for this row. The coefficient-backed Hoya M-BACD5N catalog entry round-trips the 589613 code. |

### Phase 2 - Patent and SD review

- Checked the local `patents/JP2012058682A.pdf` prescription for Example 4. Row 27 gives R=53.7454, d=4.6951, nd=1.58913, and vd=61.25, matching the stored surface and element values.
- Rendered Figure 31, the Example 4 lens-section figure. The figure matches the 16-element layout, moving-focus grouping, stop placement, and rear L3b triplet used by the data file.
- The patent does not publish clear apertures or semi-diameters for Example 4. The existing data-file SDs are renderer-safe estimates, so no SD edits were made.

### Phase 3 - Analysis sync

- Updated the E16 element note and glass-selection table from the legacy BACD5/S-BAL35 wording to M-BACD5N.
- Added a HOYA M-BACD5N source note to the analysis references.


## 2026-09-26 — Source-state review

Source-state review outcome: verified.

- Visually rechecked exact local `patents/JP2012058682A.pdf`, Example 4, paragraphs 0090–0091 and prescription/variable-spacing tables on PDF pages 17–18. All twenty-seven refractive surface radii/thicknesses, sixteen nd/vd glass coordinates and the source aperture row 13 (stored as STO) match the retained unscaled prescription.
- All three inventory candidates are enabled at exact focus 0 / 0.7874856150695161 / 1, zoom 0. The source INF / 1:2 / 1:1 columns reproduce d7 = 2.9138 / 10.4099 / 18.6188; d12 = 20.1047 / 12.6086 / 4.3997; d15 = 22.7964 / 12.4801 / 3.3614; d20 = 5.4077 / 15.7240 / 24.8427; and Bf = 53.3000 / 53.3001 / 53.3001 mm. No inferred travel or coordinate rounding is introduced.

| State | First-surface distance (mm) | Physical image track (mm) | Calculated image-plane distance (mm) | Derived magnification | Published magnitude error |
| --- | ---: | ---: | ---: | ---: | ---: |
| Half life-size | 228.0975133670662 | 168.1002 | 396.1977133670662 | −0.4999906217582646 | 0.00187565% |
| Life-size | 144.28648478800906 | 168.1002 | 312.3866847880091 | −0.9999916077612647 | 0.000839224% |

- Independent exact-ray roots at heights 0.01 / 0.005 / 0.0025 mm are 228.097513274127 / 228.097513340512 / 228.097513367066 mm and 144.286484557048 / 144.286484729219 / 144.286484771212 mm. Maximum axial residual is below 1.607e−11 mm. Both finite states pass the unchanged exact-ray limits and 1% published-magnification allowance. Source ratios are unsigned; the optical calculation independently gives image inversion. The production minimum-focus specification is not an input.
- The source publishes infinity FNO 2.91 and finite working FNO 4.38 / 5.83. The retained nominal f/2.8 control and inferred physical stop/rims remain qualified; working FNO values do not authorize a new aperture schedule. Glass spectral proxies remain qualified. No optical values, reference values or tolerances are changed, and no rear plate is listed or added.
- Validation: shared source-state/conjugate/script checks, full repository quality gate, per-state center/off-axis MTF checks and live exact-station/closed-diagram persistence. No per-lens tests were added.
