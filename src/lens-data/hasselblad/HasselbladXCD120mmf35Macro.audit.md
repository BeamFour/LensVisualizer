# Audit Log - Hasselblad XCD 3,5/120mm Macro

Patent: US 2020/0192060 A1, Example 2

## 2026-09-26 — Source-state review

Source-state review outcome: verified. All three authored candidates enabled using published
conjugates; the retained d-line model discrepancy is qualified below. No inferred finite travel.

Visually checked local `patents/US20200192060A1.pdf`, PDF page 6, Example 2 Figures 6–7.
All 20 optical surface rows reproduce the published radii, gaps and indices; row 21 is the image.
The 1.8 mm COVER (nd=1.51633, vd=64.14), preceding 31.25575 mm gap and trailing 0.1 mm
remain physical and expand once through `rearPlates`. Figure 7's five variable gaps match all
three authored columns at focusT=0/0.21386551368720905/1. Paragraph 0041 defines distance
from image plane 5a; paragraph 0043 extends the conventions to later examples. Figure 7
publishes infinity/2000.0000/429.9341 mm and reproduction ratios 0/0.0650/0.5000.

Independent d-line fixed-plane matrices give A=-0.06464770972684195,
B=120.06811436866984 mm at the intermediate station and A=-0.49731708430503485,
B=137.7324459137768 mm at closest focus. Derived first-surface distances are
1857.267873463693/276.95096400367595 mm; image-plane distances are
2011.2850034636929/430.96807400367595 mm. Small-height exact roots agree with
these paraxial distances (axial residuals below 2.96e-13/2.49e-11 mm at the derived source).
These checks establish the model's paraxial solution, not coincidence with the published source.

Published-distance differences are 0.5643%/0.2405%; magnification differences are
0.5420%/0.5366%. They fall inside the audit's default 1% comparison allowance, but the
five-decimal source tables do not establish rounding as the cause. Paragraph 0042 explicitly
specifies d-line indices; paragraph 0044 plots e-line as solid and d-line as dot-dash. The review
cannot infer which wavelength generated every listed metric from line styles alone.

Preserve the published sources and residual defocus. Do not replace them with calculated distances,
change glass, tune gaps or shift the diagram image plane to force agreement. Source eligibility
is not a guarantee of design-plane sharpness or numerical convergence; ordinary MTF domain and
convergence checks remain active. Figure 7's varying F-numbers are source metrics, not permission
to substitute a different physical stop. Existing apertures and qualified spectral proxies remain.

## 2026-05-19 - Missing-Sellmeier queue audit

### Patent evidence

- Local patent file checked: `patents/US20200192060A1.pdf`.
- Example 2 table rows confirmed:
  - L11: nd = 1.85026, vd = 32.27.
  - L23: nd = 1.91650, vd = 31.60.
  - L31: nd = 1.89286, vd = 20.36.
  - L51: nd = 1.80000, vd = 29.84.
  - L52: nd = 1.91650, vd = 31.60.

### Catalog-search disposition

- Matched L11 to existing coefficient-backed OHARA `S-LAH71` (`850323`).
- Corrected/used OHARA `S-LAH88` as the coefficient-backed `917316` match for L23/L52; the runtime catalog code was updated from rounded `916316` to vendor d-code `917316`.
- Matched L51 to existing coefficient-backed OHARA `S-NBH55` (`800298`).
- The original pass found no defensible public match for L31 / `893204`. The later Sweep 2 catalog pass added the S-NPH4 `893204` code path from public OHARA coefficients.

### Changes made

| Element | Before | After | Disposition |
|---|---|---|---|
| L11 | `Lanthanum flint, 850/323 (unmatched)` | `S-LAH71 (OHARA)` | Exact catalog match. |
| L23 | `Very high-index lanthanum flint, 917/316 (unmatched)` | `S-LAH88 (OHARA)` | Exact catalog match. |
| L31 | `Ultra-high-dispersion flint, 893/204 (unmatched)` | `893204 - ultra-high-dispersion flint ...` | Resolved by Sweep 2 via S-NPH4 code-backed catalog data. |
| L51 | `Dense flint, 800/298 (unmatched)` | `S-NBH55 (OHARA)` | Exact catalog match. |
| L52 | `Very high-index lanthanum flint, 917/316 ...` | `S-LAH88 (OHARA)` | Same glass as L23. |

### Analysis sync

- Updated element descriptions, glass table rows, and palette summary. Sweep 2 later resolved L31 by adding the missing `893204` catalog code.

## 2026-06-24 - APD, high-index, and SD audit

- Rechecked `patents/US20200192060A1.pdf`, Example 2 / Figure 5 and Figure 6 tables, against the current data file.
- Marked L21 `S-FPM3 (OHARA)` as inferred APD. The patent gives nd/vd and H*2 effective diameters, while the APD status is inferred from the S-FPM3 fluorophosphate class and chromatic-correction role.
- Confirmed the high-index elements remain L11, L23, L31, L51, and L52 (nd >= 1.8). L31 remains the explicit `893204` S-NPH4 code-backed disposition.
- Confirmed the SDs already come from the patent H*2 effective-diameter column halved. Figure 5 is consistent with those values, so no SD edits were made.
- Verification: `npm run generate:glass-reports`, `npm run typecheck`, `npm run format:check`, `npm run lint`, `npm run test`, and `git diff --check` passed.

## 2026-09-23 — Rear plate modeled as `rearPlates`

- Read Example 2 Fig. 6 on PDF page 6 (Sheet 5) at 160 dpi: surface 18 d = 31.25575 (fixed; not in the Fig. 7
  variable-gap table); surfaces 19–20 are one plate labeled COVER, 1.80 mm, nd 1.51633, νd 64.14 (H*2 58.00);
  20 → 21 is 0.10 mm. Surface 18 now stores 31.25575 instead of the folded 32.54309, with `rearPlates` COVER
  (OHARA S-BSL7, exact 1.51633 / 64.14 row, matching the file's OHARA element labels) and gapAfter 0.10 mm.
- Paraxial check against the previous data: EFL identical; defocus changes by 0.00026 mm at all three focus keyframes
  (rounding in the old 32.54309 versus 32.54283). Physical track grows by 0.613 mm, to 154.02 mm front vertex to image.
