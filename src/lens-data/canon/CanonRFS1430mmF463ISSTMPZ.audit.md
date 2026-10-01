# Audit Log — Canon RF-S 14-30mm f/4-6.3 IS STM PZ

Patent: JP 2025-50505 A, Numerical Example 5.

## 2026-10-01 — Metadata root cause, optical rims and glass

| Field / elements | Before | After | Source and reason |
| --- | --- | --- | --- |
| `patentAuthors` | 仲田 丈晴 | Takeharu Nakada | PDF p. 1 names 仲田 丈晴; the [publication record](https://patents.google.com/patent/JP2025050505A/en) supplies the romanization, matching the existing Canon inventor identity. The structured metadata contract requires Latin-script author names. |
| `subtitle` / analysis inventor | Japanese-only display | Romanized inventor; original retained in analysis | Same source; preserves the source spelling without splitting inventor identity. |
| E3, E4, E5, E8, E10 `glass` | Bare vendor-specific catalog names | Explicit supplier-neutral class/proxy labels | Example 5, PDF pp. 13–14, lists nd/νd without vendor identities. |
| All `sd` | Existing inferred apertures | Retained | Fig. 9, PDF p. 20, inspected at 600 dpi; optical rims agree within drawing/clearance uncertainty. |

The axial glass span gives 52.64 µm/px. The automated G12 reading selected the taller G11 neighbor; G12's actual optical rim agrees with 9.6 mm. The sole cemented doublet and the closely spaced G31/G32 pair were inspected. The documented reductions at surfaces 3, 4A, 18, 19A and 20A preserve cross-gap clearance and remain appropriate.

Eight of ten elements already resolve to catalog coefficients. G12 and G32 retain explicit unmatched molded COP-class polymer labels (patent nd = 1.53504 / νd = 55.7). [ZEON's COP property table](https://www.zeon.co.jp/business/enterprise/resin/cop/) lists multiple grades at nd = 1.535, supplies no dispersion coefficients, and does not identify Canon's grade. It does not support a new grade-specific spectral curve. No nominal resin or invented Sellmeier fit was added to close this gap.

Display name retained: **CANON RF-S 14-30mm f/4-6.3 IS STM PZ**, consistent with [Canon's product page](https://www.usa.canon.com/shop/p/rf-s14-30mm-f4-6-3-is-stm-pz). The patent-production correlation remains qualified. The analysis preserves the source's meridional-field and condition-(9) contradictions.
