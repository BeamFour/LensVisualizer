# Audit Log — smc Pentax 67 100mm f/4 Macro

Patent: US 6,002,533, Embodiment 1 / Table 1

## 2026-06-23 — Pentax folder patent audit

### Patent evidence

- Local file `patents/US6002533.pdf` was not present, so this pass used the public Google Patents page/PDF for US 6,002,533.
- Checked the public patent text and first drawing sheet against the current attachment-plus-main-lens data.
- The drawing confirms the close-up attachment ahead of the main lens, the attachment/main-lens split, and the larger object-side attachment envelope represented by the current SDs.

### Disposition

- Glass labels remain unchanged; the current OHARA/legacy labels match the patent nd/vd coordinates used by the data file.
- APD status remains `false`; the patent lists nd/vd only and does not provide partial-dispersion constants.
- No patent clear-aperture or semi-diameter table was found. Existing SDs remain unchanged after drawing review.


## 2026-09-26 — Source-state review

Source-state review outcome: partial.

- Retrieved the exact missing source PDF from [Google Patents](https://patentimages.storage.googleapis.com/1f/0b/dd/94ad135d433606/US6002533.pdf) to ignored `patents/US6002533.pdf` and visually rechecked Embodiment 1 / Table 1 on PDF page 10 (printed columns 5–6). All ten main-lens surface radii/thicknesses and six glass coordinates match retained surfaces 7–16, without scaling. Source surfaces 1–6 are the omitted close-up attachment, not hidden rear plates.
- Source d11 = 13.30 / 15.58 mm is reproduced by gap 11 = 9.30 / 11.58 plus the explicit source stop-to-surface-12 gap of 4 mm. The text identifies the lower value as the main lens's infinity setting and the upper as its shortest focus setting while used with the attachment. Table 1's −0.455 / −1.087 magnifications and f/4–f/6 range describe the complete attachment-plus-main-lens system.
- Candidate focus 0, zoom 0 is enabled as **Main lens at infinity**. Its existing 77.425842 mm image gap is a calculated paraxial infinity BFD, explicitly qualified in the declaration, not a published image-plane dimension. The fixed authored plane gives ABCD A = 1.8950e−9 and B = 99.9687277 mm; no real finite source is established there.
- Candidate focus 1, zoom 0 remains blocked. Although its internal d11 = 15.58 mm is published, the stored 76.823842 mm rear gap is likewise the calculated infinity BFD (A = 2.1215e−9, B = 100.9706170 mm), rather than source-backed finite-focus extension. The independent fixed-plane audit cannot establish a real finite source. Neither the combined-system magnification nor the production 0.443 m / 0.52× specifications supply the missing standalone image-plane geometry. No second infinity state is manufactured from this close-labeled configuration.
- Both inventory candidates now have explicit dispositions. No lens movement, image plane, reference value or tolerance is changed to force a finite solution. Existing inferred iris, clear apertures and spectral glass proxies remain qualified. No attachment or rear plate is added.
- Validation: shared source-state/conjugate/script checks, full repository quality gate, infinity center/off-axis MTF checks and live single-state selection with blocked finite focus. No per-lens tests were added.
