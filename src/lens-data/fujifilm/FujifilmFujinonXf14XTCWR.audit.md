# Audit Log — FUJIFILM FUJINON TELECONVERTER XF1.4X TC WR

## 2026-10-04 — Adapted from the reviewed master-plus-converter package

- Source: US 2017/0090163 A1, Example 1 (Tetsuya Ori / Fujifilm Corporation). The package modeled the complete
  published system, master lens plus converter, as one lens. This file keeps the converter only: Table 3 rows 41–50,
  relabelled 1–10, with the patent's designations RL11–RL32 in groups RG1–RG3.
- Dropped: the 23 master elements, the stop, the zoom tables, `nominalFno` and the other lens-only fields. The catalog
  host `fuji-xf-50140mm-f28` is the same patent's master lens and supplies them when the converter is mounted.
- Geometry: master back focus in air 26.4281 + 2.85 / 1.5168 + 1.10 = 29.4071 mm (Table 2 prints 29.41); the Table 3
  gap d40 = 2.5000 mm gives `masterImageDistanceMm` 26.9071. The last gap, 13.1685 mm, is the physical distance to
  optical member PP (2.85 mm, nd 1.5168, then 1.10 mm), which is listed in `rearPlates`.
- Semi-diameters are the package's inferred rims, not source values: about 1% over the envelope of the full-aperture
  axial beam and the source and format-corner (14.175 mm) chief rays of the patent master system across the zoom
  range. The package enlarged the rims of surfaces 3–10 over an earlier axial-only set after its corner-coverage
  review. The patent figures corroborate topology only; the rims are not figure-audited.
- Glass review: the patent prints nd/νd only and the package delivered `Unmatched (…)` labels. Every printed pair
  equals an Ohara catalog entry to the printed precision — S-LAH58 (1.88300 / 40.76, RL11, RL21, RL23), S-TIM25
  (1.67270 / 32.10), S-FTM16 (1.59270 / 35.31), S-LAM60 (1.74320 / 49.34) and S-NPH2 (1.92286 / 18.90) — so the
  elements are relabelled `<glass> (OHARA coordinate match; supplier unconfirmed)` and resolve to catalog Sellmeier
  data. Hoya TAFD30 (νd 40.80) and Hikari J-LASF08A (40.69) are near S-LAH58 but not equal, and CDGM H-ZF72A has
  S-NPH2's coordinates; the Ohara set is kept because it alone matches all five pairs.
- Source discrepancies carried without correction: the rounded prescription traces slightly off the printed summary
  (below), and the master's paraxial focus sits 0.03–0.05 mm short of its image plane, which the converter magnifies
  to about 0.1 mm at the combined image plane. The printed spacings are kept.
- Fit: `minHostFno: 2.8`, because the rims are sized for the f/2.88 master beam. This also keeps the converter off
  the f/2 XF 200mm, which Fujifilm's compatibility chart for this converter marks "Not compatible" (fujifilm-x.com
  support pages, read 2026-10-04); that lens takes the XF1.4X TC F2 WR supplied with it.
- On the catalog host: junction gap 2.5000 mm, final gap 13.1685 mm, focal length 72.072 / 117.098 / 190.351 mm
  against the printed 72.10 / 117.14 / 190.30, f/4.03 at all three stations against 4.04 / 4.05 / 4.04, and the
  host's stop radius unchanged.
- `reference-xf-14x-teleconverter` in `lens-data/reference/` is the same prescription with larger estimated rims. It is
  a hidden engine test model and is not this converter's catalog entry.
