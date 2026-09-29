# Nikon AF-S Zoom-Nikkor 17–35mm f/2.8D IF-ED audit

## 2026-09-29 — Initial repository integration

**Evidence:** exact local `patents/JP_2001083421_A.pdf`, Example 1, Table 1 on pp. 4–5 and Figure 2 on p. 7.
The Figure 2 crop was inspected at 600 dpi. Its 112.06 mm glass span gives approximately 0.1052 mm/pixel.
Automatic ENV/RIM readings around G1 and G3 include neighboring outlines/brackets and were rejected there.
Direct optical-rim measurements put G4 near 15.2–16.5 mm; original 12.4–13.0 mm rims visibly undersized it.

| Surfaces | Before sd (mm) | After sd (mm) | Reason |
|---|---|---|---|
| 18 / 19 | 12.4 / 12.7 | 15.2 / 15.2 | Figure 2 L10 optical extent |
| 20 / 21 / 22 | 12.7 / 12.5 / 12.7 | 15.5 / 15.5 / 15.5 | Shared cemented rim; 16.0 mm rejected with -0.200 mm L12 edge thickness |
| 23A / 24 | 12.7 / 13.0 | 16.3 / 16.3 | Final asphere optical extent, no turnover at revised rim |

Other rims and stop retained. At 23A's new 16.3 mm rim, polynomial departure from the conic is -0.808661 mm;
departure from the sphere is approximately -0.7450 mm. The analysis was updated using the former convention.

**Glass:** Table 1 coordinates retained. L1 now names Q-LASFPH3S (catalog 1.795256/45.25) as a qualified proxy for
1.796681/45.37; this is the closest-index compatible existing row and does not establish molding process or supplier.
L5 now names J-LAF7 (1.74950/35.25) for 1.749501/35.19 instead of unresolved `750352 — LAF7`.
Coverage improves 11/14 → 13/14 modeled material regions. L2's 1.495210/56.34 resin remains unmatched: exact-coordinate
source searches found no reusable published coefficients. No catalog additions or APD assertions are justified.
All other regions already resolve within the unchanged compatibility guard.

**Display:** removed the space between `f/2.8` and `D`, matching Nikon's
[official product name](https://downloadcenter.nikonimglib.com/fr/products/270/AF-S_Zoom-Nikkor_17-35mm_f_28D_IF-ED.html).
Marketed f/2.8 remains separate from the patent's modeled f/2.9.
