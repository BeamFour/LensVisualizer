# Audit Log - Nikon AI Micro-Nikkor 105mm f/2.8S

Patent: US 4,392,724, Example 1

## 2026-09-26 — Source-state review

Source-state review outcome: verified. Both authored candidates enabled: infinity and
half life-size. No intermediate finite configuration or accessory extension is certified.

Visually checked local `patents/US4392724.pdf`, PDF page 21, Table 1 / First Embodiment.
All nineteen powered-interface radii, source glass rows and internal spacings match the
retained file. The source publishes d6=13.9866/20.6820 and d11=8.1258/34.3666 mm.
It places the diaphragm 1.5 mm ahead of L22, matching the retained 1.5+1.5 mm split
of d9=3.0 mm. The physical iris radius and clear apertures remain inferred.

The table gives d0=254.9907 mm at close; printed column 7 (PDF page 20) identifies
this state as beta=-0.5. The first-vertex distance convention is independently confirmed
by the retained fixed-geometry calculation, rather than substituting Nikon's production
0.41 m object-to-film specification. Rear image gap 43.1068 mm is the existing calculated
infinity image distance; the source does not tabulate it. It is retained unchanged.

At close, ABCD gives a first-vertex distance of 254.995956699800 mm and magnification
-0.499957316562. Independent exact roots at 0.01/0.005/0.0025 mm first-vertex heights
are 254.995954221066/254.995956076405/254.995956551372 mm, with axial residuals
below 4.863e-11 mm. The distance differs from the printed value by 0.0052567 mm
(0.002062%) and magnification magnitude by 0.008537%; standard evidence checks pass.
The source distance remains authoritative, and no spacing is adjusted to erase residuals.

At infinity, the small residual matrix A produces a formal finite root near 759 km;
this is not a source-backed finite configuration. The selected states preserve all ordinary
MTF numerical and optical-domain checks. Catalog dispersion and inferred clear apertures
remain model qualifications, not evidence of production accuracy.

## 2026-06-24 - Patent glass and retained-data audit

### Phase 1 - Glass review

- Rechecked the Example 1 glass table against the current data file. No data changes were made in this pass.
- Retained `TAF1 / TAF105 class (HOYA, 773/496)`, `LAF3 class`, `E-LAF7 / S-LAM7 class`, `E-FD8 / S-TIM28 class`, `LAC13 class`, `TAF2 / J-LASF017 class`, and `NBFD3 class` labels as appropriate catalog or class-level matches for the published `nd`/`vd` pairs.
- Retained `TAC4 class (HOYA, 734/511)` as an Abbe-only historical HOYA class because no coefficient-backed public catalog entry in the current resolver was verified.
- Retained the two `Unmatched (595/355 vintage flint...)` rows because the patent glass is close to FF5 / S-FTM16 class but is measurably higher-index than the available public catalog entries.
- The front positive and several rear elements are high-index lanthanum/crown-flint classes as already documented; no new high-index metadata field was required.

### Phase 2 - Geometry and SD review

- Rechecked the radii, thicknesses, and glass assignments against Example 1. The existing data matches the published prescription.
- Confirmed that the patent publishes floating macro variables but does not publish per-surface clear apertures or a semi-diameter table.
- Retained the existing semi-diameters as visualization estimates. They taper rationally around the stop, preserve plausible edge clearance through the macro group, and remain consistent with the patent drawing and the documented no-clear-aperture source limitation.

### Phase 3 - Spectral / APD review

- The patent provides only `nd` and `vd`; no line-index table, partial-dispersion table, ED/APD claim, or aspherical data was found.
- No APD flags were added.
