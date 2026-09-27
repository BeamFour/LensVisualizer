# Audit Log — OLYMPUS ZUIKO AUTO-MACRO 50mm f/2

Patent: US 4,708,445, Embodiment 6

## 2026-05-20 — Six-digit missing-Sellmeier code review

### Patent evidence

- Reviewed the actual local file `patents/US4708445.pdf`.
- Embodiment 6 confirms the relevant rows:
  - L4: nd = 1.58144, νd = 40.75
  - L5: nd = 1.68250, νd = 44.65
  - L6: nd = 1.72000, νd = 46.03

### Glass corrections

| Element | Before | After | Disposition |
|---|---|---|---|
| L4 | `581/408 (short flint family)` | `PBL25 (OHARA, 581408)` | Existing coefficient-backed catalog entry. |
| L5 | `683/447...` | `683447 — barium/lanthanum flint family...` | No exact public coefficient-backed match found; kept unresolved. |
| L6 | `720/460...` | `S-LAM61 (OHARA, 720460)` | Existing coefficient-backed catalog entry. |

### Catalog-search disposition

- Public catalog search resolved `581408` and `720460` to existing coefficient-backed entries.
- Search for `683447` found no exact coefficient-backed public match.
- Updated analysis element notes, glass summary, and the production-scale prescription table.

## 2026-07-29 — Dispersion-coordinate follow-up

- Corrected L2 from `S-LAL59 (729/547)` to `S-LAL18 (OHARA; 729/547)`. S-LAL18 exactly matches 1.72916 / 54.68 and the embedded code; S-LAL59 has νd = 51.47.
- Synchronized all L2 glass references in the analysis.

## 2026-07-29 - Remaining catalog-mismatch audit

- Rechecked US 4,708,445 Embodiment 6 surfaces 5, 12, and 14 after the documented normalization scale; all three rows retain the patent's 1.77250 / 49.66 coordinate and the stored `R`/`d` values.
- Replaced the false HOYA `LAC14` attribution on L3, L7, and L8 with code-first `773497` lanthanum-crown wording. The nearest coefficient-backed rows are 773496 and do not establish the patent supplier.
- Synchronized all three analysis sections and the prescription table. No geometry changed.

## 2026-07-30 - `773497` catalog-equivalent review

- Revisited the three `1.77250 / 49.66` rows against the full coefficient-backed catalog.
- Schott N-LAF34 (`1.77250 / 49.62`, code `773496`) retains the exact index and differs by only `-0.04` in Abbe
  number, within the runtime safety window.
- Relabeled L3, L7, and L8 as N-LAF34 catalog equivalents while leaving the production supplier unidentified.
  Synchronized the analysis and prescription table; no geometry changed.

## 2026-07-30 - Remaining 683447 source audit

- Rechecked L5 at `nd = 1.68250`, `vd = 44.65` against the expanded current and discontinued-inclusive catalogs.
- No verified first-party coefficient row is inside the runtime d-line safety window; family cross-references alone
  do not justify borrowing a dispersion curve.
- Reworded L5 as explicit unmatched `683447`; no prescription, focus, aperture, or semi-diameter values changed.

## 2026-08-07 - Legacy BAF22 catalog recovery

- Visually rechecked US 4,708,445 Embodiment 6: L5 remains `nd=1.68250`, `νd=44.65`, code 683447.
- HOYA's obsolete BAF22 row (`1.682496 / 44.671672`) is the exact coefficient-backed catalog equivalent. The
  production supplier remains unspecified.
- Strict and trusted catalog coverage are now complete at `9/9`; no geometry changed.

## 2026-09-26 — Source-state review

Source-state review outcome: verified. Both authored candidates enabled: infinity and
half life-size; finite distance is calculated and the rear image plane remains qualified.

Visually checked local `patents/US4708445.pdf`, Embodiment 6 on PDF page 31. The
source gives 16 refractive surfaces, nine glass coordinates, f=1, F/2.0, half-field
22.8 degrees and d4=0.0024 at infinity / 0.0802 at unsigned beta=0.50. The retained
approximately 50.016 scale and rounded dimensions reproduce those rows: maximum
radius difference from multiplication by 50.016 is 0.001735 mm; maximum internal
thickness/gap difference is 0.004628 mm, within the authored rounding precision.
The source stop-containing d8=0.2032 becomes the retained 6.00+4.16 mm split; its exact
position and physical aperture are inferred. No rear cover/filter plate is present.

The source does not tabulate the rear image distance or object distance. Existing
rear gaps 38.37/63.47 mm are calculated; the close gap uses the published half-size
magnification with the source d4 endpoint. No new movement or image-plane fit was made.
At focusT=1, d4=4.01 and rear gap=63.47 mm, the first-order audit derives a source
122.432471401546 mm before the first surface, 229.932471401546 mm from the image
plane, with beta=-0.500056825179. The source ratio is stored as the published unsigned 0.5.

Independent exact rays at 0.01/0.005/0.0025 mm heights solve
122.432468504621 / 122.432470674643 / 122.432471216257 mm; axial residuals stay below
1.183e-10 mm. The 0.01137% magnification difference meets the unchanged 1% source
allowance. Because the rear gap was originally derived from the same magnification,
this agreement is not independent evidence for that plane; the exact-ray solve checks
the fixed authored model. Calculated-distance provenance carries that qualification.
The source infinity configuration remains explicitly infinity; its formal approximately
248 m finite root from rounded/calculated spacing is not another source state.

The production 0.24 m minimum-focus label is not substituted for the model conjugate.
Existing stop/rim and spectral approximations, physical clipping and numerical-domain
restrictions continue to apply. No prescription, image-plane gap, aperture, slider
coordinate or optical reference value changed in this review.
