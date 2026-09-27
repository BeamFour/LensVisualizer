# Nikon AI AF MICRO-NIKKOR 105mm f/2.8 S — Source-state audit

Patent: JP H02-19814 A, Example 5 / Table 5.

## 2026-09-26 — Source-state review

Source-state review outcome: verified. All three authored candidates enabled: infinity,
half life-size and life-size. Intermediate finite positions remain uncertified.

Visually checked local `patents/JP_H0219814_A.pdf`, PDF page 7, Table 5. All seventeen
source surfaces, nine glass rows and thicknesses match the retained file. Source d6 is
split by the modeled stop, with 5.5 mm from stop to source surface 7; the prose below
Table 5 describes the stop offset and motion with G2. The exact d6/d11/d15 rows are
22.982/3.807/10.000, 19.805/31.432/7.238 and 17.682/56.809/10.000 mm.
Bf stays 43.966 mm. The middle focusT=0.8113045208264971 keyframe reproduces
the published reversing rear-group motion, not a uniform endpoint interpolation.

Published D0=240.890/141.864 mm and beta=-0.500/-1.000 are retained. The first-vertex
convention is independently consistent with the full prescription: ABCD gives
240.890200779396/141.865262884038 mm and beta=-0.500001707987/-0.999986153777.
Object-to-image distances are correspondingly about 387.031201/314.022263 mm;
D0 is not a production minimum-focus-distance label.

Independent exact first-vertex roots at 0.01/0.005/0.0025 mm ray heights are
240.890198346638/240.890200162443/240.890200611136 and
141.865261686679/141.865262586763/141.865262809719 mm. Axial residuals remain
below 8.443e-11 mm. Source distance differences are 0.0002008/0.0012629 mm
(0.0000834%/0.0008902%); magnification differences are 0.000342%/0.001385%.
These pass standard evidence checks without changing source distances or image gaps.
The calculation verifies the retained model, not a production measurement.

No optical values changed. The inferred physical stop radius, clear apertures and
coordinate-compatible dispersion proxies retain their existing qualifications.
The conditional-expression correction sheet does not supply replacement optical rows;
Table 5 remains the numerical authority for these source-state declarations.
