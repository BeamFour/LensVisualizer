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
