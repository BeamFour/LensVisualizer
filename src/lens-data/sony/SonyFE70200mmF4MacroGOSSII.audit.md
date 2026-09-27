# Patent and integration audit

## 2026-09-25 — new-lens integration

### Exact local source and semi-diameters

WO_2024247472_A1.pdf, p. 114, Figure 14, Example 2; Table 6 p. 35. Rendered and inspected the exact embodiment; optical rims exclude labels, rays, arrows and mechanical edges.

S31/S32: 13.9/13.95 → 16.48/16.575 mm; S33A/S34A: 11.1/11.1 → 14.465/14.6 mm. These are exactly half the published effective diameters 32.96/33.15/28.93/29.20 mm. Figure estimates (~19.4/17 mm) are superseded by the numerical table. Recomputed rear aspheric departures: −32.6 µm and +77.3 µm. Other modeled clearance margins remain.

### Metadata and glass

Normalized Macro casing in the display name. Added twelve compatible proxies, including new HOYA NBFD6, MP-TAC80-60 and ADF405. Seven source-coordinate glasses remain unmatched. Added zoomCloseFocusM for the published 2.289/3.709/5.814 m endpoints; no production macro focus is reconstructed.

Final trusted catalog coverage: **12/19 elements**. Catalog curves are spectral proxies, not proof of production supplier or melt. Original patent coordinates and reference lines remain authoritative.

New HOYA entries use the manufacturer’s [2026-07-07 Zemax catalog including obsolete glasses](https://www.hoya-opticalworld.com/common/agf/HOYA20260707_include_obsolete.agf), accessed 2026-09-25. Its formula-1 polynomial is preserved in the supported six-coefficient polynomial representation; no fabricated Sellmeier coefficients or relaxed tolerances. The 70–200mm S-LAH98 near-match was rejected because the close index is the vendor e-line value while the patent explicitly specifies d-line indices.

The existing nominal f-number stations now opt into `zoomApertureModel: "from-nominal-fno"`. Without that integration field the runtime held the wide-end iris fixed despite the source-model aperture schedule. These radii remain inferred; they are not published physical iris measurements.

## 2026-09-25 — local-site follow-up

Compared the live diagram directly with Figure 14, PDF p. 114 of WO_2024247472_A1.pdf; Tables 6–8, pp. 35–36.

Retained the newly corrected Table-6 rear rims and the rest of the source-based apertures after wide/tele live comparison. No further SD change is justified.

G2/G7 stay fixed in the image-plane frame. G1/G3/G4/G5/G6 move objectward Wide→Mid→Tele; D18/D27 gap reversals are not group reversals. G6 moves imageward 0.55/0.76/1.10 mm for the published 2.289/3.709/5.814 m endpoints. Simplified the on-site focus description to state this directly.

L2/L3/L12/L14 receive qualified inferred APD coloring from FCD1/FCD705/S-FPM2 curves. Seven remaining custom coordinates have no further compatible catalog/HOYA candidate; e-line near-matches remain rejected.


## 2026-09-27 — Source-state review

Source-state review outcome: verified.

- Visually rechecked exact local `patents/WO_2024247472_A1.pdf`, Example 2, Tables 6–9 on PDF pages 35–36 (printed pages 33–34). Source Table 6 explicitly defines object row 0 with d0 before surface 1. All retained refractive radii/thicknesses, nineteen nd/vd coordinates and four even-order aspheres match; the previously documented inactive zero-thickness S2 omission is preserved. Rear image gap remains the printed 31.32 mm; no physical plate is listed or added.
- All six inventory candidates are enabled at focus 0 / 1 and zoom 0 / 0.5 / 1. Table 8 gives d6 = 2.08 / 27.85 / 75.53; d14 = 16.82 / 2.61 / 1.50; d18 = 7.75 / 10.79 / 9.59; d22 = 9.60 / 6.12 / 5.81 mm. Finite focus changes only d27 from 5.29 / 8.33 / 2.80 to 5.84 / 9.09 / 3.90 and d30 from 13.76 / 25.37 / 33.52 to 13.21 / 24.61 / 32.42 mm. These reproduce the existing exact stations without inferred travel.
- Finite conjugates use the directly published first-surface distances d0 = 2119.38 / 3513.49 / 5570.44 mm. Source photography-distance labels 2289 / 3709 / 5814 mm are separately rounded: retained physical tracks 170.01 / 195.78 / 243.46 mm sum with d0 to 2289.39 / 3709.27 / 5813.90 mm. First-surface and image-plane conventions are not mixed, and no calculated magnification is presented as published.

| Zoom | Published d0 (mm) | Fixed-plane derived first-surface root (mm) | Root/d0 discrepancy | Exact small-ray paraxial focus offset (mm) |
| --- | ---: | ---: | ---: | ---: |
| Wide | 2119.38 | 2109.4768878753043 | 0.467265% | −0.011050771 |
| Middle | 3513.49 | 3477.652176410582 | 1.020006% | −0.040245053 |
| Tele | 5570.44 | 5545.680952746708 | 0.444472% | −0.027649322 |

- The offline derivation audit reports the middle station's distance comparison as **inconsistent** at its unchanged 1% allowance. This is retained as a residual-focus diagnostic, not converted into a successful calculated-distance verification. Eligibility here rests on an explicitly published source point and complete geometry, under the authoring contract that preserves source-rounded residual defocus. No new calculated distance is being certified. Independent exact rays from each published source at heights 0.01 / 0.005 / 0.0025 mm all trace successfully; their axial-crossing offsets approach the values above. The published distances and image plane are left untouched rather than tuned to a root.
- The existing `zoomApertureModel: "from-nominal-fno"` retains source FNO targets 4.12 / 4.36 / 4.14. Its physical iris radii are inferred, not Table 6's effective diameter phi15; no aperture metadata change is required. Glass spectral proxies, seven unresolved coordinates, and inferred non-rear clear apertures retain their existing qualifications.
- This completes the existing source configurations, not the production 0.26–0.42 m macro range. No undocumented combinations are enabled. Validation: shared source-state/conjugate/script checks, full repository quality gate, per-state center/off-axis MTF checks and live zoom/focus selector-to-closed-diagram persistence. No per-lens tests were added.
