# Audit Log — FUJIFILM FUJINON TELECONVERTER XF2X TC WR

## 2026-10-04 — Adapted from the reviewed master-plus-converter package

- Source: JP 2017-173692 A, Example 1 (Tetsuya Ori, Michio Cho / Fujifilm Corporation; filed 25 March 2016, published
  28 September 2017). The package modeled the complete published system, master lens plus converter, as one lens.
  This file keeps the converter only: the bold-framed Table 3 rows 41–54, relabelled 1–14.
- Designations are the patent's: RL11–RL42 in groups RG1–RG4 (¶0018, ¶0021–¶0030, reference signs ¶0091, FIG. 1,
  FIG. 5) and optical member PP for the plane member of rows 55–56 (¶0060, ¶0063, FIG. 5). Element roles restate
  ¶0018–¶0030, the Table 11 ratio f3/f3a = 0.080 and the element focal lengths; no aberration share was computed.
- Dropped: the 23 master elements, the stop, the zoom tables, `nominalFno` and the other lens-only fields. The catalog
  host `fuji-xf-50140mm-f28` supplies them when the converter is mounted. That file is authored from
  US 2017/0090163 A1; its 40 surfaces, glass values and zoom gaps are identical to Table 3 rows 1–40 here.
- Geometry: `masterImageDistanceMm` 26.91 is the master back focus in air that Table 2 prints, 29.41 mm, minus the
  Table 3 gap d40 = 2.500 mm. The last gap, 23.596 mm, is the physical distance to PP (2.85 mm, nd 1.5168, then
  0.001 mm), which is listed in `rearPlates`; in air that is 25.476 mm, where Table 4 prints 25.47.
- Semi-diameters are the package's inferred rims, not source values, sized on the patent master system across the
  zoom range. Surfaces 6–14 are 1% over the envelope of the source-field chief rays, which land at 14.5–14.8 mm and
  so cover the 14.175 mm format corner; the package enlarged them after its corner-coverage review. Surfaces 1–5
  keep its earlier rims, 2–27% over the same envelope. The full-aperture axial beam needs less at every surface
  (4.93 mm at surface 1). The patent figures corroborate topology only; the rims are not figure-audited.
- Glass review: the patent prints nd/νd only and the package delivered `Unmatched (…)` labels. Seven printed pairs
  equal Ohara catalog entries to the printed precision — S-LAH58 (1.88300 / 40.76, RL11, RL21, RL31), S-TIM2 (1.62004
  / 36.26), S-TIH13 (1.74077 / 27.79), S-TIL27 (1.57501 / 41.50) and S-NBH52 (1.67300 / 38.15). Ohara has no glass at
  RL33's 1.90043 / 37.37 or RL42's 2.00069 / 25.46; those equal Hoya TAFD37 (TAFD37A has the same coordinates) and
  Hoya TAFD40 (Hikari J-LASFH17 has the same coordinates), with Hoya kept for both. All nine are relabelled `<glass>
  (<vendor> coordinate match; supplier unconfirmed)` and resolve to catalog Sellmeier data. RL31's νd is 40.76 as
  Table 3 row 47 prints it (an earlier package transcription read 40.00).
- Source discrepancies carried without correction:
  - Master back focus: the rear rows of Table 1 (26.389 + 2.850 / 1.51633 + 3.617) sum to 31.8855 mm in air against
    the 29.41 mm of Table 2. 29.41 is used; the master rows trace to a paraxial back focus of 29.36–29.37 mm.
  - Plate glass: Table 1 gives nd 1.51633, νd 64.14 behind the master alone; Table 3 gives PP as nd 1.51680,
    νd 64.20, which `rearPlates` follows.
  - Focus: the master's paraxial focus sits 0.04–0.05 mm short of its image plane and the converter magnifies that
    about four times, so a virtual object at `masterImageDistanceMm` images 0.159 mm beyond the printed 25.476 mm.
    The printed spacings are kept.
  - Focal length: with the printed 2.500 mm gap the prescription traces to 102.924 / 167.215 / 271.909 mm,
    0.07–0.11 mm from Table 4.
  - Lettering: FIG. 1 marks the fourth group "RG41"; the description, the reference signs and FIG. 5 give RG4.
- Fit: `minHostFno: 2.8`, because the rims were inferred on the patent's f/2.88 master and are not sized for a faster
  beam. This also keeps the converter off the f/2 XF 200mm, which Fujifilm's compatibility chart for this converter
  marks "Not compatible" (fujifilm-x.com support pages, read 2026-10-04).
- On the catalog host `fuji-xf-50140mm-f28`: junction gap 2.4971 mm (patent 2.500; the host's back focus in air is
  29.4071 mm), focal length 102.939 / 167.239 / 271.947 mm against the printed 102.997 / 167.327 / 271.837 (host
  alone 51.505 / 83.685 / 135.982), f/5.756 / 5.755 / 5.760 against 5.76 / 5.80 / 5.76, host stop radius unchanged.
