# Audit Log — Fujinon XC 16-50mm f/3.5-5.6 OIS II

Patent figure: `US20140368925A1.pdf, p. 2 Fig. 1 (Example 1, wide)` in local `patents/`.

## 2026-09-27 — Source figure, glass, and metadata audit

### Semi-diameters

The exact source section was inspected at 600 dpi. Optical curve endpoints, not rectangular blank shoulders, leaders, rays, or movement arrows, control the comparison. Values remain estimates rather than published clear apertures.

| Surface | Before (mm) | After (mm) | Evidence |
|---|---:|---:|---|
| 1 | 14.65 | 20.2 | Exact figure optical rim, capped by surface/gap geometry |
| 2 | 14.15 | 17.9 | Exact figure optical rim, capped by surface/gap geometry |
| 3 | 13.45 | 17.9 | Exact figure optical rim, capped by surface/gap geometry |
| 4 | 8.65 | 13.1 | Exact figure optical rim, capped by surface/gap geometry |
| 5 | 7.35 | 8.5 | Exact figure optical rim, capped by surface/gap geometry |
| 6A | 6.95 | 9.5 | Exact figure optical rim, capped by surface/gap geometry |
| 7A | 6.95 | 9.5 | Exact figure optical rim, capped by surface/gap geometry |
| 8 | 7 | 9.1 | Exact figure optical rim, capped by surface/gap geometry |
| 9 | 6.75 | 9.1 | Exact figure optical rim, capped by surface/gap geometry |
| 18 | 6.7 | 8.6 | Exact figure optical rim, capped by surface/gap geometry |
| 19 | 6.85 | 8.6 | Exact figure optical rim, capped by surface/gap geometry |
| 20 | 6.65 | 10 | Exact figure optical rim, capped by surface/gap geometry |
| 21 | 6.85 | 10 | Exact figure optical rim, capped by surface/gap geometry |
| 22 | 8.65 | 13.9 | Exact figure optical rim, capped by surface/gap geometry |
| 23 | 8.8 | 13.9 | Exact figure optical rim, capped by surface/gap geometry |

Figure scale was approximately 0.0428 mm/pixel at 600 dpi. The OIS arrow falsely inflated the L34 screening measurement; 16A/17A retain their constrained radii. Surface 5 at 9.5 mm fails both slope and gap constraints; 8.5 mm preserves clearance. Larger G1, G2, G4, and G5 rims follow the visible curves. The stop was retained.

### Glass classification

Catalog curves are coordinate-compatible spectral proxies, not evidence of production suppliers or historical melts. Patent nd/vd values are unchanged.

| Element | nd / vd | Runtime catalog curve |
|---|---|---|
| L11 | 1.92286 / 18.9 | S-NPH2 |
| L12 | 1.83481 / 42.73 | S-LAH55 |
| L21 | 1.883 / 40.76 | S-LAH58 |
| L22 | 1.58254 / 59.47 | Unresolved; patent-coordinate fallback |
| L23 | 1.94595 / 17.98 | FDS18 |
| L31 | 1.80348 / 40.44 | Unresolved; patent-coordinate fallback |
| L32 | 1.8 / 29.84 | S-NBH55 |
| L33 | 1.497 / 81.54 | S-FPL51 |
| L34 | 1.58517 / 59.41 | Unresolved; patent-coordinate fallback |
| L41 | 1.618 / 63.33 | S-PHM52 |
| L42 | 1.54072 / 47.23 | S-TIL2 |
| L5 | 1.71299 / 53.87 | S-LAL8 |

Removed catalog-derived authored nC/nF/ng values so the runtime resolver supplies qualified catalog dispersion rather than presenting it as measured patent evidence.

L22 (1.58254/59.47), L31 (1.80348/40.44), and L34 (1.58517/59.41) have multiple nearby catalog candidates, without source evidence establishing a unique curve. They remain unresolved rather than assigning the nearest index alone.

### Rear plate

Table 1: restored the source 11.95 mm air gap and 2.85 mm PP (nd=1.51680, vd=64.20). The source does not list the final image gap. Retained the prior inferred image plane using 2.421486317 mm after PP; this gap is not claimed as published.

### Display and metadata

Normalized display capitalization and retained distinguishing product suffixes. Patent-to-production correlation remains qualified. Assignee spelling follows the existing catalog identity.

Updated all quoted aspheric rim departures in the analysis to the revised SDs.
