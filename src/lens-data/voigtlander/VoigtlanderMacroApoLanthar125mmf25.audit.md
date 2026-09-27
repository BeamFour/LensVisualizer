# Audit Log — Voigtlander Macro APO-Lanthar 125mm f/2.5 SL

Patent: JP 2002-090622 A, Example 2

## 2026-06-23 — Full Voigtländer local-patent sweep

- Local patent source: `patents/JP_2002090622_A.pdf` (untracked local file).
- Re-rendered the image-only PDF and visually rechecked Example 2, Table 2. The stored prescription is the patent table scaled by 1.25 to the production 125 mm focal length.
- Confirmed the split of patent D6 into the displayed L43-to-stop gap plus the inferred stop-to-L44 gap preserves the original total spacing.
- Updated L44 from `SF5 (Schott) / K-SFS5 (Sumita)` to `E-FD5 (HOYA, patent nd/vd match) / SF5-class dense flint` so the glass resolver uses an exact catalog proxy for nd=1.67270, vd=32.2.
- The patent does not list dPgF or semidiameters. The ED dPgF values on L42/L43 remain catalog-inferred from S-FPL51, and the SDs remain ray/envelope-derived display apertures.

## 2026-05-20 — Glass relabel follow-up

### Patent evidence

- Reviewed local patent file `patents/JP_2002090622_A.pdf`.
- Example 2 row confirmed L47 / surface 12 nd = 1.58913, vd = 61.3.

### Glass corrections

| Element / surface | Before | After | Disposition |
|---|---|---|---|
| L47 / S12 | `S-BAL14 (OHARA) / K-BAL14 (Sumita)` | `S-BAL35 (OHARA)` | Public OHARA catalog row matches the patent nd/vd pair. |

### Analysis sync

- Updated the L47 element paragraph and glass table.


## 2026-09-27 — Source-state review

Source-state review outcome: verified.

- Visually checked exact local `patents/JP_2002090622_A.pdf`, Example 2 / Table 2 / paragraph 0022, PDF page 4. Nineteen refractive surfaces and ten nd/vd pairs reproduce the source after the existing ×1.25 uniform scaling and stored radius rounding. The inserted stop splits source d6 = 9.14 mm into 10.8 + 0.625 = 11.425 mm at model scale. Its location/diameter remain inferred; the fixed 46.662 mm image gap remains calculated rather than published.
- The two existing infinity/life-size candidates are verified. The source also prints a half life-size pair already described in the analysis but absent from the authored keyframes: D13/D15 = 27.38/9.67 mm. Added only that exact source-backed row as 34.225/12.0875 mm at model scale, at focus 0.5. Infinity and life-size values remain unchanged. This adds one inventory candidate; the resulting three candidates all have declarations at focus 0 / 0.5 / 1, zoom 0.
- This corrects intermediate diagram travel to pass through the published pair instead of the former straight interpolation between endpoints. It does not estimate a finite conjugate for any neighboring slider position. Source infinity D13/D15 = 3.96/4.83 mm and life-size = 52.78/10.22 mm remain exact under the existing scale.

| State | Model-scale first-surface distance (mm) | Physical track (mm) | Calculated image-plane distance (mm) | Derived magnitude |
| --- | ---: | ---: | ---: | ---: |
| Half life-size | 343.815661732056 | 165.7995 | 509.615161732056 | 0.49995253611435686 |
| Life-size | 215.32318621854725 | 198.237 | 413.5601862185473 | 0.9998327184606646 |

- Independent exact-ray roots at heights 0.01 / 0.005 / 0.0025 mm are 343.81566089152244 / 343.815661531929 / 343.8156616520052 mm and 215.32318579554294 / 215.32318611201276 / 215.32318619348027 mm. Axial residuals are at most 1.966e-11 mm. Both pass the unchanged consistency and 1% magnification checks; published-magnitude discrepancies are 0.0094928% and 0.0167282%.
- Distances describe the scaled Example 2 model, not production measurements. The production 0.38 m specification is not an input and is not substituted for the 413.5602 mm calculated distance. Existing Example 2/production construction-count differences, inferred apertures and glass proxies remain qualified.
- Validation: shared source-state/conjugate/inventory tests, full corpus quality gate, center/off-axis MTF at all three states and live selector/exact-half-station/closed-diagram persistence. No per-lens tests or optical reference updates were added.
