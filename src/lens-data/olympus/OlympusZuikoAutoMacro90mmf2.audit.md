# Audit Log — Olympus Zuiko Auto-Macro 90mm f/2

Patent: US 4,792,219, Embodiment 3

## 2026-05-20 — Glass relabel follow-up

### Patent evidence

- Reviewed local patent file `patents/US4792219.pdf`.
- Embodiment 3 row confirmed L9 / surface 17 nd = 1.65160, vd = 58.52.

### Glass corrections

| Element / surface | Before | After | Disposition |
|---|---|---|---|
| L9 / S17 | `BSC7 (HOYA)` | `S-LAL7 (OHARA)` | Public OHARA catalog row matches the patent nd/vd pair. |

### Analysis sync

- Updated the L9 element paragraph and glass table.

## 2026-06-24 - Olympus patent glass-code audit

### Patent evidence

- Reviewed local patent file `patents/US4792219.pdf`.
- Embodiment 3 lists the full R/d/nd/vd prescription for L1-L9, but does not publish clear-aperture semi-diameters.
- The retained surface geometry, stop placement, focus spacings, and inferred SDs were left unchanged.

### Glass corrections

| Element / surface | Before | After | Disposition |
|---|---|---|---|
| L1 / S1 | `TAC4 (HOYA)` | `S-LAL14 (OHARA) / TAC4 class (HOYA, 697555)` | Public coefficient-backed catalog row matches the patent nd/vd pair. |
| L2 / S3 | `TACL1 (HOYA)` | `N-LAK8 (Schott) / TACL1 class (HOYA, 713538)` | Public coefficient-backed catalog row matches the patent nd/vd pair. |
| L3 / S5 | `FD4 (HOYA)` | `S-TIH3 (OHARA) / FD4 class (HOYA, 740283)` | Public coefficient-backed catalog row matches the patent nd/vd pair. |
| L4 / S8 | `BACL1 (HOYA)` | `S-TIL26 (OHARA) / BACL1 class (HOYA, 567428)` | Public coefficient-backed catalog row matches the patent nd/vd pair. |
| L5 / S10 | `LAF7 (HOYA)` | `744447 - LAF7-class lanthanum flint (HOYA; no exact public catalog match)` | Code-labeled because no exact public Sellmeier/catalog match was found. |
| L6 / S12 | `TAFL3 (HOYA)` | `773497 - TAFL3-class lanthanum crown (HOYA; no exact public catalog match)` | Code-labeled because nearby catalog rows differ in Abbe value. |
| L7 / S14 | `CFKL2 (HOYA)` | `S-NSL36 (OHARA) / CFKL2 class (HOYA, 517524)` | Public coefficient-backed catalog row matches the patent nd/vd pair. |
| L8 / S16 | `FD5 (HOYA)` | `S-TIM35 (OHARA) / FD5 class (HOYA, 699301)` | Public coefficient-backed catalog row matches the patent nd/vd pair. |

### APD, high-index, and SD review

- No APD status changes: the patent does not identify anomalous partial dispersion glass for this example.
- L6 remains the highest-index element and the condition-(10) high-index crown; the analysis wording now uses the code label instead of forcing a modern catalog equivalent.
- No SD change: existing inferred semi-diameters remain rational for the patent Fig. 1 proportions and the patent does not provide a numerical clear-aperture table.

### Analysis sync

- Updated the L1-L8 element descriptions and the glass summary table to match the data-file labels.

## 2026-07-30 - `773497` catalog-equivalent review

- Rechecked L6 at the patent coordinate `nd = 1.77250`, `vd = 49.7`.
- Schott N-LAF34 (`1.77250 / 49.62`, code `773496`) retains the exact index and differs by only `-0.08` in Abbe
  number, within the runtime safety window.
- Relabeled L6 as an N-LAF34 catalog equivalent while leaving the production supplier unidentified. Synchronized
  the analysis; no prescription, focus, aperture, APD, or semi-diameter values changed.

## 2026-07-30 - Patent 744447 catalog-equivalent recovery

- Rechecked L5 against the patent row `nd = 1.74400`, `vd = 44.73`.
- OHARA S-LAM2 (`1.743997 / 44.79`) reproduces the index and differs by only `+0.06` in Abbe number.
- Relabeled L5 as the coefficient-backed S-LAM2 optical equivalent while leaving the production supplier
  unspecified. No prescription, focus, aperture, APD, or semi-diameter values changed.


## 2026-09-26 — Source-state review

Source-state review outcome: blocked.

- Reviewed the exact local `patents/US4792219.pdf`, Embodiment 3 on PDF page 16 and the repeated prescription in Claim 6 on PDF page 18. Both print r₆ = 271.1363, whereas retained surface `6` is 24.4227 mm at ×0.9 scale, corresponding to 27.1363. This is visible in the source, not merely an OCR discrepancy. No radius correction is inferred from the computed focal length or intended negative-element description. All three authored positions remain uncertified pending resolution.
- The printed d₆ = 11.8882 agrees with the retained scaled 10.6994 mm. Corrected the explanatory comment to cite the visible value. The source's ΣDIII = 21.153 also differs from the sum of its individual d₁₄–d₁₈ rows, 20.9544; retained those rows and removed the unsupported OCR explanation.
- Source d₁₃ is 0.8888 / 5.283 / 20.277 at infinity / unsigned 0.1× / 0.5×. Retained scaled gap `12` is 0.7999 / 4.7547 / 18.2493 at focus coordinates 0 / 0.42200636994498253 / 1. Source F/2.06 differs from the nominal F/2 physical-aperture model.
- Rear image distances 39.8578 / 46.59164864864865 / 69.56894054054054 mm are calculated from the retained infinity plane and an assumed constant α = 0.370 differential-motion ratio; they are not tabulated source image planes.

| Authored focus | Derived first-surface distance (mm) | Derived image-plane distance (mm) | Derived magnification | Published magnitude | Relative error |
| --- | ---: | ---: | ---: | ---: | ---: |
| 0.42200636994498253 | 825.6554424143744 | 947.8529910630231 | −0.1175347101175448 | 0.1 | 17.5347% |
| 1 | 237.5508324381382 | 396.22027297867874 | −0.5059752180370831 | 0.5 | 1.19504% |

- Independently solved exact rays at heights 0.01 / 0.005 / 0.0025 mm give middle-state source roots 825.655437223951 / 825.655441260947 / 825.655442029899 mm and close-state roots 237.550831636156 / 237.550832244556 / 237.550832382829 mm. Maximum axial residual is below 1.71e−11 mm. Both published-magnification checks fail the unchanged 1% allowance; numerical agreement between model methods does not resolve the source discrepancy.
- The infinity position's formal approximately 22.4 km finite root is a residual of the retained calculated plane, not an additional source state. No source states or optical values were changed. All three inventory candidates have a reviewed blocked outcome; production focus specifications do not substitute for missing configuration evidence.
- Validation: shared source-state/conjugate/script suites and the complete repository quality gate. No per-lens tests or optical-reference changes.
