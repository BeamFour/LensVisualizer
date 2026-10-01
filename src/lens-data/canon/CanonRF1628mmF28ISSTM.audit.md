# Audit Log — Canon RF 16-28mm f/2.8 IS STM

Patent: JP 2024-101615 A, Numerical Example 1.

## 2026-10-01 — Optical rims, glass and display metadata

| Element / field | Before | After | Source and reason |
| --- | --- | --- | --- |
| Display name | CANON RF 16-28mm f/2.8 IS STM | CANON RF 16-28mm f/2.8 IS STM (patent-family model) | Example 1, PDF pp. 15–16, versus Canon's product description: the selected embodiment has no resin layer and five νd ≥ 75 elements. Canon describes a replica asphere and four UD elements. |
| E7, E12, E13 `glass` | “only exact-class catalog match found” | FCD705 / FCD100 class, supplier-neutral spectral proxy | Example 1 nd/νd/θgF identifies dispersion coordinates, not production suppliers. |
| All surfaces `sd` | Existing inferred apertures | Retained | Fig. 1, PDF p. 24, inspected at 600 dpi; optical rims closely match after excluding neighboring edges. |

The wide drawing's axial glass span gives 104.61 µm/px. Its E2 automated envelope selected the taller neighboring E1 edge; the actual E2 rim agrees with 18.4 mm. The stepped front-group rims and all three cemented pairs were inspected. Surfaces 2A, 5 and 26 remain smaller than the drawing to preserve cross-gap clearance; enlarging them from neighboring rims would not be source-faithful optical-aperture work.

All 16 visible elements already have coefficient-backed catalog resolution. The patent's θgF column was checked against the data-file `dPgF` values using the engine baseline 0.6438 − 0.001682·νd; the authored deviations preserve the source rather than substituting catalog partial dispersion. No catalog addition is required.

The modeled wide-end field reaches approximately 19.33 mm image height before surface 2A clips, above the source's 17.55 mm evaluated image height but below the full-frame corner. The patent explicitly allows electronic distortion correction (¶0039); retain that source-field boundary instead of enlarging the optical rim to force corner coverage. Reconstructed close-focus stations remain model assumptions.

## 2026-10-01 — Live annotations, travel and spectral review

| Field | Before | After | Source and reason |
| --- | --- | --- | --- |
| `focusDescription` | Internal enum prefix | Plain “Inner focus” text | Preserve the reconstruction disclosure while making the rendered explanation readable. |
| `sd`, glass/APD fields | Existing source-qualified values | Retained | Fig. 1, PDF p. 24, and Example 1 tables, PDF pp. 15–16: all element outlines, three doublets, two aspheric elements and five inferred APD elements reviewed. |

At the published W/M/T states, L1's center lies −126.310/−115.932/−116.114 mm from the fixed image plane, retaining its small tele-end reversal. L2 and L4 move objectward together (their changes differ only by 0.001 mm rounding); L3 moves objectward through zoom and by another 3.630/4.969/5.795 mm for reconstructed near focus. L5 stays fixed. This agrees with Fig. 1's objectward focus arrow and the published variable gaps. No spacing order or sign change is justified.

All 16 elements retain coefficient-backed curves and the source-derived partial-dispersion deviations. The live inspector distinguishes inferred APD from patent-explicit APD. Structured **Canon Inc.** already shares the canonical modern assignee identity; no duplicate organizational node needs consolidation.

## 2026-10-01 — Production-diagram correlation and display name

- Removed the requested `(patent-family model)` suffix from the display name and analysis title; source qualifications remain in the subtitle and analysis.
- Compared Figs. 1/3/5/7 on local patent PDF pp. 24–25 with Canon's official 16 mm construction diagram in its January 23, 2025 [press release](https://corporate.jp.canon/newsroom/newsrelease/2025/pr-0123) and [product specifications](https://personal.canon.jp/product/camera/rf/rf16-28-f28/spec). Example 1 is the closest overall architectural match: front four-element sequence, pre-stop singlets, three cemented doublets including the IS unit, rear asphere and final positive lens. Its first/penultimate asphere positions also match Canon's markings. Example 3 has a similar silhouette but its front asphere is on E2; Examples 2/4 add a rear element, and Example 2 reverses the IS doublet interface orientation.
- This visual correlation does not establish exact production radii, glass or manufacturing process. Retained the tabulated prescription, absent replica layer, source field boundary and focus reconstruction disclosures. The five elements with νd ≥ 75 are a numerical count, not five manufacturer-confirmed Canon UD elements.
