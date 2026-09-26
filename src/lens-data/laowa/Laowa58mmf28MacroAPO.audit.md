# Audit Log - Laowa 58 mm f/2.8 2x Ultra-Macro APO

Patent: CN 116520542 A, Example 2

## 2026-09-26 — Source-state review

Source-state review outcome: verified. Both authored endpoints enabled, with the close endpoint
qualified as nominal 2.0× at the source label's printed precision. Finite distance is calculated.

Visually inspected local `patents/CN116520542A.pdf`, PDF pages 7–8, Example 2 ¶0051–0060.
All 26 source rows reproduce retained radii, thicknesses and d-line indices (source stop row 17
maps to STO). Infinity/maximum gaps are D4=47.7715/0.8000 mm,
D17=1.4000/40.2782 mm and D26=14.9285/23.0218 mm, matching focusT=0/1 exactly.
The retained scale is the 59.21 mm patent design, not a rescaling to marketed 58 mm.
The published 1.0× column is unauthored; its three gaps do not share a single coordinate on
the current two-endpoint interpolation. No new travel or intermediate configuration is invented.

At maximum, the fixed-plane matrix gives A=-1.9590516582779163 and
B=113.30506768663439 mm, hence s=-B/A=57.83669216065186 mm before the first surface,
or 182.71799216065182 mm object-to-image. Independent exact roots at
0.01/0.005/0.0025 mm first-vertex heights give
57.836691036228/57.836691879546/57.836692089955 mm, with axial residuals below
3.81e-10 mm. Exact magnification tends to -1.959051661189; the fixed geometry establishes
a physical source without relying on the production minimum-distance specification.

The default published-magnification check fails: 1.959051658 differs from 2 by 2.0474%,
exceeding 1%. Preserve that diagnostic. The table labels the column **2.0×**, not 2.0000×;
1.959051658 lies within its nearest-one-decimal interval [1.95, 2.05). The manual review
therefore accepts a nominal-maximum label at that precision. An explicit evidence-only
comparison at half the printed step (0.05/2 = 2.5%) passes; no default or exact-ray tolerance
is changed. This does not prove the source's intended magnification was exactly the computed
value or identify the cause of the discrepancy. The selector's source and derivation retain
the qualification; no prescription is tuned to force exact 2×.

Infinity retains matrix A=-0.0006673920756584129; the corresponding very distant finite
root is a residual of the stored model, not a source-backed finite state. Unresolved glass
spectra, inferred apertures and ordinary MTF eligibility/convergence restrictions remain.
No geometry, aperture, image plane or glass changes.

## 2026-05-20 - Glass relabel pass

- Opened the data, analysis, and local patent PDF `patents/CN116520542A.pdf`; local text extraction was spotty but confirmed the relevant nd/vd values.
- Updated L2 from `H-ZF88 (CDGM)` to `H-ZF13 (CDGM)` for nd=1.78472, vd=25.72.
- Updated L7 from `H-ZF13 (CDGM)` to `H-ZF52 (CDGM)` for nd=1.84666, vd=23.78.
- Replaced L1 and L11 with code-only patent glass annotations (`866450`, `545486`) because no exact public coefficient-backed catalog matches were found.
- Several other CDGM labels remain no-catalog coverage gaps, but they were outside this relabel queue batch.

## 2026-06-24 - Full local patent audit

### Phase 1 - Glass, APD, and high-index status

- Reopened local `patents/CN116520542A.pdf`; the text layer skips the image table, so Example 2 pages were rendered and checked visually.
- Reconfirmed the 2026-05-20 relabels: L2 remains CDGM `H-ZF13`, L7 remains CDGM `H-ZF52`, and L1 / `866450` plus L11 / `545486` remain unresolved code-label rows with no coefficient-backed exact public catalog match.
- No APD flag changes were made. The existing ED/APO-class rows remain supported by their nd/vd class and existing data-file notes; the patent itself does not publish partial-dispersion terms.

### Phase 2 - Prescription and SD check

- Checked Example 2 at f = 59.21 mm, Fno = 2.9, half-field = 19.95 deg. Stored radii, thicknesses, nd/vd rows, and published focus variables D4, D17, and D26 match the patent table.
- The patent does not publish semi-diameters or effective diameters. The existing SDs remain renderer estimates, not patent-listed clear apertures.
- The SD envelope was checked against the rendered patent drawing and macro-prime geometry: the large fixed front group, narrower moving central focus group, stop, and rear field-corrector opening are consistent with the figure and the ray envelope used for rendering. No SD values were changed.

### Phase 3 - Spectral / metadata enrichment

- The patent publishes only nd and vd for the glass rows. No nC, nF, ng, PgF, theta_gF, dPgF, or Sellmeier coefficient source was found in the local patent.
- Added a reviewed-sidecar row for L1 / `866450` and L11 / `545486`; regenerated reports now show both as reviewed sidecar hits while still missing Sellmeier coverage.

## 2026-07-30 - Unsafe named-token cleanup

- Replaced L4's unresolved `H-LAK53A (CDGM)` attribution with HOYA `TAC8`, the current first-party coefficient-backed catalog equivalent that exactly reproduces the patent's 1.72916 / 54.67 coordinate and code 729547.
- The patent table does not identify a production supplier, so the annotation records catalog equivalence rather than asserting HOYA manufacture.
- Synchronized the analysis; no prescription geometry changed.
