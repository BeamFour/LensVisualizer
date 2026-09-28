# Audit Log — schneider-xenon-50f19

## 2026-09-28 — Patent figure, glass, and metadata audit

Source: `patents/CH_346706_A.pdf`, PDF p. 5, Fig. 1 (Table A). Original prescription coordinates were checked visually against the source table; published radii, axial spacings, indices, Abbe numbers and image-plane distances are preserved.

### Optical rims

600 dpi crop: 0.33,0.22,0.61,0.405; axis 0.312. Leaders and bevels contaminate automated doublet measurements. Manual optical extents (glass span ≈260 px at 1400 px page height) give front ≈14.5, front doublet ≈12, rear doublet ≈10.7 and last singlet ≈12.5 mm. Existing geometry is within about 15%; retained, preserving reduced stop-facing rims below the drawn bevels.

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

Image-circle floor audit is skipped because imageFormat is unset; production-variant uncertainty is preserved rather than inventing format metadata.

### Metadata and display

Display name now includes SCHNEIDER-KREUZNACH consistently with the catalog. Marketed f/1.9 remains distinct from the patent f/2 design.
