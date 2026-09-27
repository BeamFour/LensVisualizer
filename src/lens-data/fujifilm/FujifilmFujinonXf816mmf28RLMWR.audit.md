# Audit Log — Fujinon XF 8-16mm f/2.8 R LM WR

Patent figure: `US20190302431A1.pdf, p. 3 Fig. 2 (Example 1, wide/tele)` in local `patents/`.

## 2026-09-27 — Source figure, glass, and metadata audit

### Semi-diameters

The exact source section was inspected at 600 dpi. Optical curve endpoints, not rectangular blank shoulders, leaders, rays, or movement arrows, control the comparison. Values remain estimates rather than published clear apertures.

No SD change. Manual optical-rim review found no defensible large discrepancy; smaller differences are within figure/scale uncertainty. Automated outliers were leader/bracket ink or mechanical shoulders, so they were rejected. Cemented interfaces and stepped rims were inspected individually.

### Glass classification

Catalog curves are coordinate-compatible spectral proxies, not evidence of production suppliers or historical melts. Patent nd/vd values are unchanged.

| Element | nd / vd | Runtime catalog curve |
|---|---|---|
| L11 | 1.8515 / 40.78 | S-LAH89 |
| L12 | 1.69259 / 53.07 | Unresolved; patent-coordinate fallback |
| L13 | 1.85108 / 40.12 | Q-LASFH58S |
| L14 | 1.43875 / 94.66 | S-FPL55 |
| L15 | 1.95375 / 32.32 | S-LAH98 |
| L21 | 1.6935 / 53.18 | L-LAL13 |
| L22 | 1.755 / 52.32 | S-LAH97 |
| L23 | 1.59522 / 67.73 | S-FPM2 |
| L24 | 1.816 / 46.62 | S-LAH59 |
| L25 | 1.64769 / 33.79 | S-TIM22 |
| L31 | 1.816 / 46.62 | S-LAH59 |
| L32 | 1.59282 / 68.62 | FCD505 |
| L33 | 1.8515 / 40.78 | S-LAH89 |
| L34 | 1.43875 / 94.66 | S-FPL55 |
| L35 | 1.43875 / 94.66 | S-FPL55 |
| L41 | 1.85343 / 40.56 | Unresolved; patent-coordinate fallback |
| L42 | 1.883 / 40.76 | S-LAH58 |
| L43 | 1.497 / 81.54 | S-FPL51 |
| L44 | 1.883 / 39.22 | H-ZLaF68N |
| L51 | 1.94595 / 17.98 | FDS18 |

Removed catalog-derived authored nC/nF/ng values so the runtime resolver supplies qualified catalog dispersion rather than presenting it as measured patent evidence.

Converted every Table 1 theta_gF to the engine normal-line convention: dPgF = theta_gF − (0.6438 − 0.001682 × vd). This replaces catalog-derived deviations on L21/L44 and retains the published ratio on all 20 elements, including unresolved L12/L41. No APO or patent-explicit APD identity is inferred from the ratio alone.

### Rear plate

Table 1: restored 8.949 mm air + 2.850 mm PP (nd=1.51680, vd=64.20) + 1.000 mm air through rearPlates. The plate is traced but not drawn.

### Display and metadata

Normalized display capitalization and retained distinguishing product suffixes. Patent-to-production correlation remains qualified. Assignee spelling follows the existing catalog identity.

Cemented membership now explicitly accompanies the source interface topology so the Element Inspector identifies the connected doublets/triplet, not just the diagram bracket.
