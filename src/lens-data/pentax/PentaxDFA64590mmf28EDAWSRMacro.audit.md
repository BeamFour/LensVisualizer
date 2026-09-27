# Audit Log - Pentax HD D FA645 Macro 90mm f/2.8 ED AW SR

Patent: US 2013/0222925 A1, Numerical Embodiment 4

## 2026-07-28 - Integration, semi-diameter, and glass audit

### Patent evidence

- Reviewed the ignored local source `patents/US20130222925A1.pdf`.
- Compared the prescription with Figure 25 on PDF page 17.
- The patent does not publish clear-aperture values, glass names, line indices, or partial-dispersion data.

### Identity correction

- Normalized the display name from `PENTAX HD PENTAX-D ...` to the repository form
  `PENTAX HD D FA645 MACRO 90mm f/2.8 ED AW SR`.

### Semi-diameter corrections

| Surface set | Before | After | Justification |
|---|---|---|---|
| 1-6 | 24.5-31.5 mm | 21.5-26.5 mm | Removes the oversized front outline while retaining the Figure 25 taper and ray clearance. |
| 7-9 | 18.8-20.5 mm | 16.5-18.0 mm | Matches the compact stabilizing doublet outline. |
| 11-13 | 18.2 / 18.7 / 22.2 mm | 17.2 / 17.5 / 18.2 mm | Restores the smaller cemented L16-L17 pair; surface 13 retains a close-focus ray floor. |
| 14 / 15A | 22.8 / 22.8 mm | 19.9 / 19.9 mm | Tightens the aspheric L18 outline while preserving the close-focus 0.60-field envelope. |
| 16-21 | 21.2-21.8 mm | 18.1-18.8 mm | Removes the oversized rear focusing-group outline and follows Figure 25. |

The Figure 25 proportions are used where possible; the larger of the infinity/close-focus ray envelope and a small
clearance allowance controls any surface that needs more aperture.

### Glass disposition

| Elements | Patent coordinate | Result |
|---|---|---|
| L14 / L21 | 1.63980 / 34.6 (`640346`) | Added obsolete HOYA E-FD7 as an exact code-equivalent formula-3 catalog source; this also represents the S-TIM27 class without asserting the patent vendor. |
| Remaining elements | Patent nd/vd rows | Existing catalog code matches retained. |

The lens now has coefficient-backed dispersion on all 11 glass elements. The two ED identifications remain
classifications based on the patent coordinates and product correlation, not claimed melt identities.


## 2026-09-26 — Source-state review

Source-state review outcome: verified.

- Visually rechecked exact local `patents/US20130222925A1.pdf`, Numerical Embodiment 4, Tables 13–15 on PDF page 145 (printed page 18), including paragraph 0356 identifying Figures 25–32C. The later patent pages lack extractable text; the page image, not another embodiment's OCR, supplies this check.
- All twenty refractive radii/thicknesses, eleven glass coordinates, the source diaphragm row 10 (stored as STO), and surface-15 asphere K = 0 / A4 = 1.173e−6 match the retained unscaled prescription. Table 14 explicitly pairs infinity and −0.50:1 with d15 = 5.680 / 11.958 mm and fB = 69.09 / 98.18 mm. These reproduce both inventory candidates at focus 0 / 1, zoom 0.
- Both states are enabled. The calculated close distance holds all source geometry fixed: first-order s = −B/A = 205.5959961088574 mm before the first surface, plus the physical image track 207.248 mm, gives 412.8439961088574 mm from the image plane. The source's rounded close track is 207.25 mm. Derived magnification −0.5000140291758332 differs from published −0.5 by 0.00280584%, passing the unchanged 1% allowance.
- Independent exact-ray roots at heights 0.01 / 0.005 / 0.0025 mm are 205.595995079673 / 205.595995845578 / 205.595996060988 mm; maximum axial residual is below 2.497e−11 mm. Neither the production 0.413 m distance nor inferred intermediate travel is used to establish the finite state.
- Table 14 gives FNO 2.85 at infinity and 4.06 at close focus. The latter is the finite-conjugate effective value, not evidence of a separately changed physical iris; the retained f/2.85 model keeps its inferred physical aperture. Glass spectral proxies and clear apertures remain qualified. No optical values, reference values or tolerances are changed, and no rear plate is listed or added.
- Validation: shared source-state/conjugate/script checks, full repository quality gate, per-state center/off-axis MTF checks and live selector-to-closed-diagram persistence. No per-lens tests were added.
