# Audit Log — Pentax FA 645 120mm f/4 Macro

Patent: US 6,154,324, Example 1 / Table 1

## 2026-06-23 — Pentax folder patent audit

### Patent evidence

- Local file `patents/US6154324.pdf` was not present, so this pass used the public Google Patents page/PDF for US 6,154,324.
- Checked the public patent text and drawing sheets for the two-group macro layout, independently moving aperture, and Example 1 prescription.
- The lens-section drawing supports the current positive front group, stop, negative rear group, and large rear working-distance proportions.

### Disposition

- Glass labels remain unchanged; current OHARA-class labels match the patent nd/vd coordinates used in the data and analysis files.
- APD status remains `false`. L4 remains described as the probable production ED element by high Abbe number and marketing context, but the patent itself does not supply partial-dispersion data.
- The patent publishes focus-dependent F-number and aperture movement data, but not element clear apertures. The current stop SD is retained from the paraxial entrance-pupil reconstruction for Example 1 F/3.8; other SDs remain ray-envelope estimates.


## 2026-09-26 — Source-state review

Source-state review outcome: verified.

- Retrieved the exact source PDF from [Google Patents' original US6154324 PDF](https://patentimages.storage.googleapis.com/af/1c/39/c28ecb29ec6722/US6154324.pdf) into local `patents/US6154324.pdf`, resolving the earlier local-file availability limitation. Visually reviewed the first embodiment, Table 1 on PDF page 18 (printed columns 5–6), including the definitions of magnification and rear image distance.
- All sixteen refractive surface radii, thicknesses and nine glass coordinates match the unscaled source prescription. The separate aperture row is modeled directly. Both authored inventory candidates qualify: infinity at focus 0 and life-size at focus 1, zoom 0.
- The three variable gaps are exactly d10 = 1.50 / 18.98 mm, stop-to-surface-11 = 2.50 / 32.27 mm and fB = 76.00 / 91.75 mm. Physical first-surface-to-image tracks are 160.43 / 223.43 mm. The source defines fB as last surface to image plane; the finite 91.75 mm is not an infinity back focal length.
- The source publishes unsigned magnification 1.000 but no object distance. With the close geometry and image plane fixed, first-order A = −0.999979226991021 and B = 170.7915664429007 mm give s = −B/A = 170.79511437134508 mm before the first surface, or **394.22511437134506 mm from the image plane**. The declared distance is calculated, not the production 395 mm specification.
- Independent exact-ray roots at heights 0.01 / 0.005 / 0.0025 mm are 170.795113409497 / 170.795114132747 / 170.795114311696 mm. Maximum axial residual is below 5.63e−11 mm. Magnification differs from the source by 0.0020773%, passing the unchanged 1% published-evidence allowance. No reference values, tolerances, spacings or image planes were fitted.
- The source says the physical iris diameter stays constant while its axial position changes. That behavior is retained. The source's F/3.8 infinity design aperture differs from the retained nominal F/4 model; lens clear apertures remain inferred and catalog dispersion remains qualified. No rear plate is listed or added.
- Validation: shared conjugate/source-state/script suites, complete quality gate, reference-line center/off-axis MTF checks and live selector-to-diagram checks. All inventory candidates are reviewed; no intermediate finite position is certified.
