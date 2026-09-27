# Audit Log — Nikon AF Zoom-Micro Nikkor ED 70-180mm f/4.5-5.6D

Patent: US 5,717,527, seventh embodiment, Table 8.

## 2026-09-26 — Source-state review

Source-state review outcome: verified. All six authored pairs enabled: infinity and
closest focus at zoomT=0/0.5/1 (82.4/135/194 mm patent stations). No intermediate
finite focus or zoom combination is certified.

Visually checked local `patents/US5717527.pdf`, PDF page 69, Table 8 / seventh
embodiment. The 33 rows including source stop 23 match the retained prescription;
notably r5=1559.0379, d19=5.4006, d23=1.0000 and r26=27.2830 mm. Rechecked the
complete d10/d17/d22/Bf rows at all six states. Closest d10 values are
40.66459/41.55746/40.66449 mm, exactly 38.65343 mm above the respective infinity
values 2.01116/2.90403/2.01106 mm. Other gaps stay at their published zoom rows.

Printed column 23 defines R as object-to-image distance. All three close columns
publish R=391.90000 mm, with beta=-0.31850/-0.52182/-0.74988. These values are
retained, independently of the production 0.37 m minimum-focus metadata. At the fixed
image plane, ABCD derives image-plane distances
391.904388587990/391.901275330028/391.899456397160 mm and magnifications
-0.318501868525/-0.521825072198/-0.749888090798. Distance discrepancies remain
0.001120%/0.000325%/0.000139%; no spacing or source distance was tuned.
Independent exact first-vertex roots at 0.01/0.005/0.0025 mm heights are:

| Zoom station | Exact first-vertex distances (mm) |
|---|---|
| Wide | 141.037903367602 / 141.037914778788 / 141.037917635690 |
| Middle | 141.034794131469 / 141.034795034493 / 141.034795264353 |
| Tele | 141.032983819471 / 141.032985752738 / 141.032986232976 |

All axial residuals are below 3.438e-10 mm. Source-rounded infinity residuals do
not authorize finite states; the formal telephoto root near 148 km is not certified.

The sum of the printed surface/gap rows is 250.86647/250.86648/250.86647 mm
at closest focus. The printed TL summary gives 250.86586/250.86588/250.66589 mm.
Besides the conspicuous telephoto discrepancy already documented, the first two differ
by about 0.0006 mm. The source spacings remain authoritative and unchanged; this audit
does not establish the cause of the inconsistent summary values.

Source stop position and its motion with G4 are retained. The patent prints no physical
iris diameter. The existing authored radius and runtime aperture inference, using
nominalFno=[4.5,5.3,5.6], are preserved; they are not the source's F=[4.14,5.10,5.73]
schedule. Selecting geometry does not claim to reproduce the source aberration plots'
wide-open aperture. No source-backed physical zoom-iris schedule can be certified from
these tables alone. Catalog dispersion, inferred rims and normal MTF restrictions remain.

## 2026-06-19 — Glass mismatch cleanup

### Phase 1 — Glass corrections

| Element / surface | Field | Before | After | Justification |
|---|---|---|---|---|
| L1 / surface 1 | `glass` | `TAFD25 / J-LASFH13HS class (Nikon/Hikari, 861/230)` | `861230 — high-index dense flint (patent nd=1.86074, νd=23.01; no source-backed catalog match)` | Patent Table 8 lists `νd=23.01`, `nd=1.86074`; the old label resolved to HOYA TAFD25 at `nd=1.90366`, so the safety net correctly rejected it. |
| L2 / surface 3 | `glass` | `TAFD25 / J-LASFH13HS class (Nikon/Hikari, 861/230)` | `861230 — high-index dense flint (patent nd=1.86074, νd=23.01; no source-backed catalog match)` | Same Table 8 row values as L1. The generated relabel candidate `S-NPH5` is numerically close but not source-backed for patent code 861/230. |

### Phase 2 — Retained-information audit

- Confirmed the affected stored values against local `patents/US5717527.pdf`: L1 and L2 remain `nd=1.86074`, `νd=23.01`.
- No radius, spacing, semi-diameter, or variable-gap changes were made in this pass.

### Phase 3 — Spectral / metadata enrichment

- No `nC`, `nF`, `ng`, or `dPgF` rows were found for these elements in the extracted local patent text. The elements remain on the Abbe path until a coefficient-backed 861230 catalog source is found.

### Phase 4 — Analysis sync

- Updated the L1/L2 descriptions and glass-identification table to remove the misleading TAFD25/J-LASFH13HS class wording.

## 2026-07-29 — Glass coverage follow-up

- Current Hikari J-SFH2 provides a source-backed coordinate successor for L1/L2: it retains `nd=1.86074`, while
  current code `861231` / `vd=23.08` differs from the patent's `861230` / `vd=23.01` only in the last rounded digit.
- Hikari E-LAFH2 is an exact code and coordinate match for L15 (`804339`, `nd=1.80384`, `vd=33.89`).
- Relabeled all three elements and synchronized the analysis. This replaces the prior Abbe fallbacks with catalog
  dispersion without changing the patent prescription.

## 2026-07-30 - `748523` family review

- Rechecked the L5 patent row at `nd = 1.74810`, `vd = 52.30`.
- No reviewed public coefficient row reproduces both coordinates within the runtime safety window. The closest
  plausible rows are around `1.741 / 52.6` or `1.755 / 52.3`, outside the accepted d-line residual.
- Retained the explicit unmatched `748523` annotation without a supplier or APD claim. No prescription, zoom,
  focus, aperture, or semi-diameter values changed.

## 2026-08-11 — Phase 92 patent-coordinate catalog recovery

- Visually rechecked US 5,717,527 Table 8 on rendered PDF page 69: L3 is `1.61720 / 54.01`, L4 is
  `1.79504 / 28.56`, and L17 is `1.74077 / 27.63`.
- Recovered HOYA BACED1 (`1.617203 / 53.945664`) and matched the other rows to existing coefficient-backed
  J-LAFH3 (`1.79504 / 28.692277`) and E-FD13 (`1.74077 / 27.76`) models.
- Relabeled all three as supplier-neutral optical equivalents and synchronized the analysis. L6 `748523` remains
  unresolved; no prescription, zoom, focus, aperture, or semi-diameter values changed.

## 2026-08-21 — E-LAKH1 discontinued-catalog recovery

- Hikari's official 2022-07-01 catalog supplies the previously missing discontinued E-LAKH1 row at code `748523`,
  `nd = 1.748099`, `νd = 52.304982`, exactly matching L6 at the patent's printed precision.
- Relabeled L6 as a supplier-neutral E-LAKH1 catalog equivalent and synchronized the analysis. This supersedes the
  earlier current-catalog no-match disposition; no prescription, zoom, focus, aperture, or semi-diameter values changed.
