# Audit Log — schneider-retina-xenon-c-50f2

## 2026-09-28 — Patent figure, glass, and metadata audit

Source: `patents/CH_352844_A.pdf`, PDF p. 6, Fig. 1 (Example A). Original prescription coordinates were checked visually against the source table; published radii, axial spacings, indices, Abbe numbers and image-plane distances are preserved.

### Optical rims

600 dpi crop: 0.29,0.19,0.59,0.38; axis 0.288. Manual optical rims exclude leader lines and bevels; front ≈14, front doublet ≈11.3, rear doublet ≈10.2 and last singlet ≈11.5 mm. Existing geometry is within about 15%; retained. The identical Example A prescription in CH 346706 was independently checked in each source.

Stop diameter and inferred stop location are unchanged. No focus-motion law is added.

### Glass classification

| Element | Before resolution | After resolution | Patent nd / νd |
| --- | --- | --- | --- |
| L1 | H-ZBaF52 | H-ZBaF52 | 1.67003 / 47.2 |
| L2 | Abbe fallback | LAC13 | 1.69347 / 53.5 |
| L3 | J-BASF2 | J-BASF2 | 1.66446 / 35.9 |
| L4 | J-SF7 | J-SF7 | 1.6398 / 34.6 |
| L5 | J-SSK5 | J-SSK5 | 1.65844 / 50.8 |
| L6 | Abbe fallback | N-LAF2 | 1.74472 / 44.7 |

Resolved catalog curves are qualified spectral proxies. They do not identify historical suppliers or melts. No patent coordinates are changed and no catalog line indices or anomalous-dispersion flags are copied into the lens data. The analysis glass table is synchronized.

### Metadata and display

Canonical assignee spelling is Jos. Schneider & Co., Optische Werke. The missing comma caused pretest metadata generation to abort. Retina-Xenon C and Kodak Retina IIIc display qualifiers are retained separately from manufacturer and assignee.

The derived L1 focal-length literal was normalized from 61.406279864072494 to 61.406279864072495, its existing IEEE-754 runtime value, to remove the no-loss-of-precision lint error. Published prescription values are unaffected.
