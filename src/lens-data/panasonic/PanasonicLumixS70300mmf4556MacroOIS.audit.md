# PANASONIC LUMIX S 70-300mm f/4.5-5.6 MACRO O.I.S. Audit

## 2026-07-31 — Patent-figure SD, glass, and identity pass

**Source:** JP 2022-125453 A, Numerical Example 1, Figure 1.

### Semi-diameters

- Compared the wide-state section with Figure 1 at 600 dpi and checked the full-frame image-circle floor.
- Retained the submitted SDs. The clean figure/data ratios cluster around unity, and no reliable rim differs by more
  than the patent-figure audit threshold.

### Glass

- Reviewed all 17 glass elements. Every element already resolves through representative patent line indices or a
  coefficient-backed catalog curve, so no classification change was needed.
- Retained representative labels where the patent does not identify the production supplier.

### Identity

- Confirmed the official product styling and project naming convention. The display name
  `PANASONIC LUMIX S 70-300mm f/4.5-5.6 MACRO O.I.S.` is correct and was retained.
- Romanized the inventor names and normalized the assignee to the existing
  `Panasonic Intellectual Property Management Co., Ltd.` catalog identity.


## 2026-09-26 — Source-state review

Source-state review outcome: verified.

- Reviewed the exact local `patents/JP2022125453A.pdf`, Numerical Example 1, Tables 1–3A on PDF pages 24–25. The source explicitly identifies the configurations as infinity focus and states there are no aspheres. Enabled all three distinct authored inventory candidates at focus 0 and zoom 0 / 0.5 / 1; identical focus pairs do not create additional finite states.
- The retained surface prescription reproduces the source radii and source glass coordinates with the already documented normalization of six 0.010 mm adhesive layers into downstream elements. The source f = 72.8000 / 144.7974 / 287.9970 mm remains distinct from the normalized model focal lengths. No surface, glass, rear spacing or image-plane value changed.

| Gap | Wide (mm) | Middle (mm) | Tele (mm) |
| --- | ---: | ---: | ---: |
| d6 | 3.2665 | 33.0367 | 62.7665 |
| d12 | 35.1758 | 19.5944 | 4.0000 |
| d19 (STO) | 9.6870 | 5.5015 | 4.7730 |
| d23 | 4.2909 | 7.8833 | 3.9453 |
| d27 | 11.3199 | 19.9125 | 36.7084 |
| d31 | 28.6871 | 15.0691 | 1.0000 |
| BF | 22.63464 | 43.83449 | 61.26739 |

- All seven source gap rows reproduce exactly. Source total tracks are 165.8343 / 195.6045 / 225.2331 mm; sums of the retained rounded rows differ only at source rounding precision. The previously documented apparent G2 drift is retained rather than changing published spacings.
- Enabled the calculated `from-nominal-fno` iris schedule for the source f-numbers 4.54605 / 5.43172 / 5.85441. The source publishes no physical iris radii, so the approximate calculated radii 9.6987 / 10.2763 / 10.8881 mm remain explicitly inferred. This replaces the fixed baseline physical iris at middle/tele without changing the published f-number schedule or inferred lens rims.
- No additional eligible finite state: source ¶0041 identifies G5 as the imageward focusing group but provides no close-focus spacing or travel. Production 0.54 m and 0.5× specifications are not source configuration evidence. The existing focus pairs remain identical, and no movement is invented.
- Validation: shared source-state/conjugate/script suites, shared build/iris tests, full repository quality gate and grouped production build. Live selector checks retain exact zoom coordinates after closing MTF; unsupported and unconverged fields remain qualified.
