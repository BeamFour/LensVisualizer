# Audit Log - Zeiss Touit Makro-Planar T* 50mm f/2.8 Macro

Patent: JP 2015-161792 A, Example 1  
Catalog version: local working tree, 2026-06-25

## 2026-06-25 - APD, high-index, and semi-diameter audit

### Phase 1 - Glass corrections

| Element / surface | Field | Before | After | Justification |
|---|---|---|---|---|
| All elements | `glass`, `nd`, `vd` | Existing OHARA/HOYA class labels and patent constants | Retained | The local `patents/` folder does not contain JP2015161792A, so the patent was checked from Google Patents and its downloadable PDF. The tables provide `nd`/`vd` but no clear-aperture data. The existing labels preserve the patent constants and current catalog-near assignments; the remaining generated-report issue is the unresolved S-BAH10 row. |

### Phase 2 - Retained-information audit

- Rechecked the patent description for Example 1. It defines the basic lens table, specifications table, moving-distance table, and aspheric coefficients, but no semi-diameter column.
- Stored SDs remain inferred values constrained by the f/2.88 stop, edge thickness, front/rear SD ratios, and cross-gap sag intrusion limits.
- The PP cover-glass exclusion and folded final BFD remain consistent with the data header and project convention.

### Phase 3 - Spectral / metadata enrichment

- Existing inferred APD metadata on S-FPM2 L12/L42 and S-PHM52 L43 was retained. The patent itself gives no `dPgF` or line-index columns; these APD flags are catalog-inferred.
- High-index status for the S-TIH53, E-FDS1/MP-FDS1, and related dense-flint elements is already represented in labels and role prose.

## 2026-09-23 — Rear plate modeled as `rearPlates`

- Replaced the air-equivalent fold (stored d26 = 24.6143248945 mm) with the patent's physical rear stack from Example 1
  Table 1 (PDF p. 15): d26 = 1.00 mm, then `rearPlates` PP 1.22 mm, nd 1.51680, νd 64.20 (N-BK7), and 22.81 mm to the
  image plane. The plate is traced by every analysis and hidden from the diagram and element lists. `closeFocusM` 0.15 m
  is the published specification and was left unchanged.
- Paraxial check against the previous data: EFL and defocus identical at all three focus keyframes (the old fold was
  stored unrounded). Physical track grows by 1.22 × (1 − 1/1.51680) = 0.416 mm, to the 95.37 mm first-surface-to-image
  length the analysis already quotes.


## 2026-09-27 — Source-state review

Source-state review outcome: verified.

- Retrieved the exact JP2015161792A PDF into local `patents/JP2015161792A.pdf` and visually rechecked Example 1, Tables 1–4, PDF pages 15–17. All twenty-five refractive lens rows, fourteen nd/vd pairs, stop row 13 and physical plate PP reproduce the source. Table 4's full odd/even coefficients for surfaces 4 and 7 and even coefficients for surface 6 match the stored aspheres; KA = 1 maps to K = 0.
- All three inventory candidates are enabled at exact focus 0 / 0.7599103882848731 / 1, zoom 0, using published signed magnifications 0 / -0.5 / -0.98. Source DD5 = 1.60 / 5.25 / 9.61; DD10 = 9.10 / 5.45 / 1.10; DD13 = 12.68 / 6.82 / 2.47; DD18 = 1.52 / 2.54 / 1.51; DD20 = 1.85 / 6.69 / 12.08 mm. The non-monotonic DD18 and source-rounded track differences are preserved.
- The existing rear plate remains physical: surface 26 has 1.00 mm air to PP, which is 1.22 mm thick with nd 1.51680 / vd 64.20, followed by 22.81 mm air to the image. The shared rear-plate path traces it without drawing it, and worker regression coverage retains exactly-once expansion. No plate or gap is changed.

| State | First-surface distance (mm) | Physical image track including PP (mm) | Calculated image-plane distance (mm) | Derived magnification | Source-magnitude error |
| --- | ---: | ---: | ---: | ---: | ---: |
| Half life-size | 102.43737064279449 | 95.37 | 197.80737064279447 | -0.4990764425130808 | 0.184711% |
| Near life-size | 58.78577153748488 | 95.39 | 154.17577153748488 | -0.9844621127062071 | 0.455318% |

- Independent exact-ray checks use the existing adaptive small-height procedure. The initial 0.01 mm samples have axial residuals 1.547e-7 / 2.062e-7 mm, so they do not pass the 1e-7 mm limit. The next three consecutive heights 0.005 / 0.0025 / 0.00125 mm pass all unchanged bounds, resolving the odd-asphere paraxial limit. Their roots are 102.43896427249524 / 102.43816892722316 / 102.43777016506552 mm and 58.786389627356066 / 58.78608115908306 / 58.78592648988099 mm; maximum accepted axial residual is 5.176e-8 mm. Both source magnifications pass the unchanged 1% allowance.
- The closest state is labeled 0.98×, not silently rounded to 1×. Source FNO 2.88 / 3.06 / 3.59, inferred physical iris, clear apertures and glass approximations retain their qualifications. Production minimum focus is not a derivation input; no reference values or tolerances are changed.
- Validation: shared source-state/conjugate/inventory and worker/rear-plate regressions, full repository quality gate, per-state center/off-axis MTF, desktop/mobile exact-state/closed-diagram/shared-URL persistence, and production build. No per-lens test was added.
