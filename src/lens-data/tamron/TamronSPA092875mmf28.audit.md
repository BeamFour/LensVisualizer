# Audit Log — Tamron SP AF 28-75mm f/2.8 XR Di LD Aspherical [IF] MACRO (A09)

Patent: US 7,075,731 B2, Example 1, Figure 1

## 2026-08-17 — Patent-figure, display-name, movement, and glass review

### Semi-diameters

- Figure 1 was rendered from the local patent at 300 dpi. Its annotated group brackets were excluded from the outline judgment.
- The modeled front scale and rear-group taper agree with the physical outlines within the action threshold. No SD change was justified, and the image-circle audit is clean.

### Display name and glass

- The normalized `SP AF 28-75mm F/2.8 XR Di LD Aspherical [IF] MACRO` designation was already correct.
- Sixteen of 20 physical media resolve to verified curves. The four gaps are unidentified hybrid/aspheric layers, so no optical-glass catalog entries were fabricated.

### Movement and diagram labels

- Recomputed the three zoom stations and constrained close-focus states. G2 alone moves objectward toward G1 for closer focus, and the zoom gaps remain correctly ordered from wide to telephoto.
- Replaced long sign/focus prose with the patent's concise `G1`-`G4` labels.
- Added physical lens labels around all four hybrid layers (`4r`, `10r`, `15r`, and `16r`) so the SVG counts the source's 16 physical pieces instead of presenting 20 media IDs as lens numbers.

## 2026-09-27 — Source-state review

Source-state review outcome: blocked.

- Visually checked exact local `patents/US7075731.pdf`, exemplary numerical prescription, PDF page 9 (printed column 8). The original visibly prints surface 30 R = **+40.8554 mm**, surface 8 vd = **146.6**, and surface 34 vd = **141.2**. The existing model substitutes R30 = -40.8554 mm, vd8 = 46.6 and vd34 = 41.2, as disclosed in its header. No independent amendment establishes those replacements as published values.
- All three infinity candidates (focus 0, zoom 0 / 0.5 / 1) remain uncertified because the authored refractive geometry differs from the exact source. Reproducing the source's three focal lengths with the substituted sign is optical evidence for a possible typographical error, not independent source verification. The omitted final image distance is already a calculated BFD and is not represented as published.
- All three focus-1 candidates have an additional blocker: the patent publishes G2-only focusing but no finite spacing rows. Those gaps were reconstructed from production 0.33 m MFD and cannot be certified by solving object distance from them. Published infinity gaps are d6 = 2.694 / 16.985 / 27.814; d16 = 9.782 / 3.828 / 0.985; d25 = 6.786 / 2.409 / 0.997 mm.
- No source states are added and no prescription, source value, optical reference or tolerance is changed. All six inventory candidates have explicit dispositions; existing qualified diagram and legacy infinity behavior remain unchanged.
- Validation: shared source-state/conjugate/inventory regression coverage and full repository quality gate; live no-verified-states and finite-focus eligibility checks. No per-lens test was added.
