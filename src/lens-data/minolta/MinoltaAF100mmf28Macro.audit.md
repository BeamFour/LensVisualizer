# Audit Log - Minolta AF 100mm f/2.8 Macro

Patent: US 4,764,000, Example 8 / claim 9

## 2026-09-26 — Source-state review

Source-state review outcome: verified. All three authored candidates enabled: infinity,
half life-size and life-size. Intermediate finite slider positions remain uncertified.

Visually checked local `patents/US4764000.pdf`, PDF page 21, Table 8 / Embodiment 8
(printed column 12). The sixteen radii, fifteen internal spacings and eight d-line glass
rows match the retained file; notably r12=-26.167 mm, not the OCR reading -26.67.
The source gives d8/d12=5.00/24.00 at infinity, 18.36/10.64 at beta=-0.5 and
27.50/1.50 mm at beta=-1.0, with object distances -266.4/-171.0 mm. These are
object-side first-vertex distances, not the production object-to-film MFD. The existing
stop split 4.35+4.35 mm preserves source d10=8.70 mm. Stop placement and rims remain inferred.

Existing rear image gaps 43.1530002237/76.5518/113.4895036789 mm are calculated,
not printed source spacings, and are retained without adjustment. At the two finite states,
fixed-geometry ABCD gives first-surface distances 266.400017275939/171.000000000040 mm
and magnifications -0.500049554198/-1.000277483438. Independent exact roots at
0.01/0.005/0.0025 mm heights are 266.400015740793/266.400016888276/266.400017182900 mm
and 170.999998974828/170.999999741249/170.999999940319 mm; axial residuals stay below
6.001e-11 mm. Magnification differences from the published ratios are 0.00991%/0.02775%.
These verify consistency of the retained image-gap solution, not independent measurements
of that gap. Source distances are retained exactly rather than replaced by calculated values.

The intermediate authored coordinate is exactly focusT=0.853009797094441, not a uniform
midpoint. Its source geometry and identity must survive URL restoration without slider-step
rounding. Infinity is explicitly declared even though its near-zero matrix A has no finite
real source. No optical values changed; unresolved L7 dispersion and supplier-neutral glass
proxies remain qualified, and all ordinary MTF support and convergence checks still apply.

## 2026-05-19 - Missing-Sellmeier queue audit

### Patent evidence

- Local patent file checked: `patents/US4764000.pdf`.
- Example 8 / claim table rows confirmed:
  - L4 / d7: nd = 1.74000, vd = 31.72.
  - L5 / d9: nd = 1.69680, vd = 56.47.
  - L7 / d13: nd = 1.80741, vd = 31.59.

### Catalog-search disposition

- Added OHARA `BPH50` from the public OHARA 2017 Zemax / refractiveindex.info formula-3 row; it is the exact coefficient-backed `740317` match for L4.
- Added CDGM `H-LAK12` as a coefficient-backed equivalent for the patent's `697565` family. Public CDGM cross-reference tables map `H-LAK12` (`697562`) to old OHARA `LAL64` (`697565`), but no coefficient-backed public LAL64 row was found, so this remains an equivalent assignment rather than supplier proof.
- No coefficient-backed public match was found for L7 / `807316`.

### Changes made

| Element | Before | After | Disposition |
|---|---|---|---|
| L4 | `Unmatched dense flint (740/317 class...)` | `BPH50 (OHARA)` | Exact catalog match. |
| L5 | `Unmatched high-index crown (697/565 class...)` | `H-LAK12 (CDGM equivalent; patent 697565)` | Coefficient-backed equivalent. |
| L7 | `Unmatched dense lanthanum flint (807/316 class...)` | `807316 - dense lanthanum flint ...` | Unresolved; explicit code retained. |

### Analysis sync

- Updated L4/L5/L7 descriptions and the glass-identification table.

## 2026-06-24 - Folder-wide patent audit

### Patent evidence

- Rechecked local `patents/US4764000.pdf`, Example 8 / claim 9.
- The prior May glass audit remains valid: `BPH50 (OHARA)` for L4, `H-LAK12 (CDGM equivalent; patent 697565)` for L5, and unresolved code `807316` for L7.

### Disposition

- No glass-label, APD, or high-index-status changes were needed in this pass.
- The patent gives no clear apertures. Existing SDs remain inferred from the f/2.83 marginal envelope, 55 mm production filter constraint, edge thickness, and cross-gap sag clearance, so no SD edits were made.
