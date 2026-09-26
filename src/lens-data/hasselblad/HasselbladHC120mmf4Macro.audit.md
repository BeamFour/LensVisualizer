# Audit Log - Hasselblad HC Macro 4/120

Patent: JP 2004-302170 A, Example 4 / Table 4

## 2026-09-26 — Source-state review

Source-state review outcome: verified. Both authored candidates reviewed; scaled-design infinity and
life-size are enabled. The finite distance is calculated; intermediate movement is not certified.

Visually inspected local `patents/JP2004302170A.pdf` page 13, Example 4 Table 4. The source publishes
19 surface rows, f=100 mm, FNo=4.10 and infinity/life-size D13=2.52643/51.78443 mm. All retained
radii and published gaps reproduce the existing 1.187 model scale within their storage rounding
(maximum radius difference 0.0000435 mm; gap difference 0.00000464 mm). Model D13 remains
2.99887/61.46812 mm at focusT=0/1. No scaling or movement is changed.

Table 4 leaves D19 blank. The existing 83.678 mm rear image gap is calculated, not a source value;
the infinity matrix implies an additional 0.000173 mm paraxial image displacement at the stored
precision. That small residual is retained. The model's nominal f/4 and inferred physical iris are
unchanged; neither the source's f/4.10 nor the production label establishes a published stop diameter.

At life-size, the fixed first-vertex-to-image matrix gives A=-1.0001696667580529 and
B=144.36236590258054 mm. Thus s=-B/A=144.33787656299987 mm before the first surface,
or 387.9987165629999 mm object-to-image. Independent exact-ray roots at 0.01/0.005/0.0025 mm
first-vertex heights give 144.337875649329/144.337876336158/144.337876504189 mm. Axial residuals
stay below 6.33e-11 mm; signed exact magnification approaches -1.000169666821, within 0.0170%
of the source's life-size condition. Numeric precision supports repeatability, not source accuracy.

The declaration identifies the retained scaled model, not a measured production construction or
object distance. Estimated rims, qualified glass counterparts and the calculated image gap remain
limitations. No geometry, image-plane, physical aperture or glass changes.

## 2026-05-20 - Catalog-mismatch queue audit

### Patent evidence

- Local patent file checked: `patents/JP2004302170A.pdf`.
- The patent table is image-based in the local PDF; Table 4 was checked by rendering the local page.
- Example 4 / Table 4 rows confirmed:
  - S3 / L2: nd = 1.72342, vd = 38.0.
  - S8 / L4: nd = 1.67270, vd = 32.2.
  - S10 / L5: nd = 1.77250, vd = 49.6.
  - S14 / L7: nd = 1.80518, vd = 25.5.

### Glass corrections

| Element / surface | Before | After | Disposition |
|---|---|---|---|
| L2 / S3 | `E-FD5 (HOYA)` | `S-BAH28 (OHARA)` | Exact nd/vd catalog match. |
| L4 / S8 | `E-FD4 (HOYA)` | `E-FD5 (HOYA)` | Exact nd/vd catalog match. |
| L5 / S10 | `TAFD30 (HOYA)` | `S-LAH66 (OHARA)` | Exact nd/vd catalog match. |
| L7 / S14 | `E-FD2 (HOYA)` | `S-TIH6 (OHARA)` | Exact nd/vd catalog match. |

### Catalog-search disposition

- Checked public OHARA/HOYA catalog data and existing coefficient-backed catalog entries.
- No new catalog entries were required.

### Analysis sync

- Updated the glass-selection table and source note to match the corrected labels.

## 2026-06-24 - APD, high-index, and SD audit

- Rechecked `patents/JP2004302170A.pdf`, Example 4 / Table 4, against the current data file.
- Confirmed no ED, fluorophosphate, KZFS, or patent-published partial-dispersion elements are present. No APD metadata was added.
- Confirmed the high-index elements remain L7 `S-TIH6` and L8 `NBFD10 (HOYA)` (nd >= 1.8). `NBFD10` remains the only unresolved/Sellmeier-missing glass disposition for this lens.
- Rendered and reviewed the patent drawing. The existing SD profile matches the macro layout: broad front group ahead of the stop, smaller rear negative/positive correction elements, and a final rear element sized for the 645 field. No SD edits were made.
- Verification: `npm run generate:glass-reports`, `npm run typecheck`, `npm run format:check`, `npm run lint`, `npm run test`, and `git diff --check` passed.

## 2026-07-29 - Catalog-mismatch follow-up

- Rechecked L8 against Example 4 / Table 4: the stored `nd=1.80440`, `vd=39.6` row is correct.
- Replaced the false `NBFD10 (HOYA)` annotation (`nd=1.83400`, `vd=37.34`) with coefficient-backed
  `S-LAH63 (OHARA coordinate match)`, whose published coordinate is `nd=1.80440`, `vd=39.59`.
- This is a catalog-coordinate identification, not a claim that Fuji procured OHARA glass for the production lens.
- Synchronized the analysis and removed this lens from the catalog-mismatch queue.
