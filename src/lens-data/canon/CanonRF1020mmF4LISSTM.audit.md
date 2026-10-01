# Audit Log — Canon RF 10-20mm f/4 L IS STM

Patent: US 2024/0045184 A1, Numerical Example 1.

## 2026-10-01 — Optical rims, glass and display metadata

| Surface / element | Field | Before | After | Source and reason |
| --- | --- | --- | --- | --- |
| 13 / E7 | `sd` | 9.8 mm | 8.4 mm | Fig. 1, PDF p. 2: C2 has a continuous front/junction rim. Retained the 8.4 mm junction and the clearance-limited 6.9 mm rear. |
| E5, E9, E14 | `vd` | 40.81 | 40.8 | Example 1 surface rows 8, 16 and 24, PDF p. 20: retain the printed Abbe number rather than a catalog coordinate. |
| E6 | `vd` | 34.71 | 34.7 | Example 1 surface row 11, PDF p. 20: same source-coordinate correction. |
| All elements | Glass interpretation | Catalog class names | Supplier-neutral spectral proxies, explicit header | Example 1, PDF p. 20, gives nd/νd without supplier identities or partial dispersion. |

Fig. 1 was inspected at 600 dpi. The measured axial glass span gives 45.71 µm/px; C2's optical half-height is approximately 7.5 mm. The retained 8.4 mm rim allows model clearance without the former front step. Brackets and focus/IS leader lines contaminated the automated E6–E11 envelopes. The E3 automated reading instead selected E2's rim; it is not evidence to enlarge E3. All four cemented doublets were reviewed by eye, with cross-gap constraints retained. The remaining apertures are modeled, not source-published effective diameters.

All 16 visible elements already resolve to coefficient-backed catalog curves. S-FPL55, FCD515, S-NBH52V, TAFD65 and L-LAH85V are present in the shared catalog; this batch does not need duplicate rows. The Super UD/UD classifications remain inferred. No measured line indices or patent APD data were invented.

Display name retained: **CANON RF 10-20mm f/4 L IS STM**; Canon's [product page](https://www.usa.canon.com/shop/catalog/product/view/id/197450/s/rf10-20mm-f4-l-is-stm/) confirms the STM and L designations. The production correlation remains unconfirmed, and the published back-focus/group-power discrepancies remain disclosed in the analysis.
