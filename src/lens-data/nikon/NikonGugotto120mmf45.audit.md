# Audit Log — Nikon Gugutto Macro 120mm f/4.5

Patent: US 5,764,425, Example 4 / Table 4

## 2026-05-20 — Six-digit missing-Sellmeier code review

### Phase 1 — Glass corrections

| Element / surface | Field | Before | After | Justification |
|---|---|---|---|---|
| L2 / S2 | `glass` | `Unmatched (804/339 dense flint; exact public catalog match not identified)` | `804339 — dense flint (patent nd=1.80384, νd=33.89; exact public catalog match not identified)` | Local patent `patents/US5764425.pdf`, Table 4 row 2 lists nd=1.80384 and νd=33.89. The stored values match. |

### Catalog-search disposition

- Searched public catalog/refractiveindex.info-style sources for `804339` and the exact 1.80384 / 33.89 pair.
- No coefficient-backed exact match was found. Hikari E-LAFH2-class historical context remains plausible but not a current coefficient-backed assignment for this file.

### Analysis sync

- Updated the L2 narrative and glass table to use the unbroken `804339` code label.

## 2026-07-29 — Catalog coverage follow-up

- The catalog now contains coefficient-backed historical Hikari E-LAFH2 at exact code `804339`,
  `nd=1.80384`, and `vd=33.89`.
- Confirmed that the existing data label resolves to E-LAFH2 and updated the stale analysis/audit narrative that
  previously described the row as unresolved.

## 2026-09-26 — Source-state review

Source-state review outcome: partial. Both authored candidates reviewed: infinity
enabled; the inferred production close-focus endpoint remains uncertified.

Visually checked local `patents/US5764425.pdf`, PDF page 28, Table 4 and fourth-embodiment
text. Five refractive surfaces, aperture stop S and fixed stop FS are represented in
source order. All radii, internal spaces, indices and Abbe numbers match after scaling,
with one transcription correction: printed d6=5.6667 was stored as 5.6657 before scaling.
The rear-element thickness changes from 6.79884 to 6.80004 mm. This directly reproduces
the printed source; it is not a focus adjustment. Source Bf=40.6570 remains 48.7884 mm.
The calculated design EFL is now 119.999895 mm and paraxial BFD 48.788284 mm. The
computed rear-element focal-length annotation and analysis calculations were refreshed;
no optical reference assertions or tolerances were changed.

Table 4 gives f=100, FNO=4.60 and full angle 20.2 degrees. It supplies no finite object
distance or close-focus rear gap. The retained 88.55647 mm close gap was calculated from
the production approximately 0.64 m minimum focusing distance. A consistent ray solution
does not make that inferred movement source-backed. The alternate Sarani Gugutto and
Fuwatto Soft reassemblies are not authored configurations and are not added as states.

After the thickness correction, the offline fixed-geometry audit derives a close source
490.014195972396 mm before the first surface, 639.970825972396 mm from the image plane,
with magnification -0.331401838285. Independent exact rays at heights 0.01/0.005/0.0025 mm
solve 490.014185789836 / 490.014193405364 / 490.014195287855 mm, with axial residuals
below 6.885e-11 mm. Missing published close-focus geometry remains the blocker. The formal
124 km finite root at the rounded infinity image plane is not a new finite source state.

Physical stop and rim radii remain inferred, including the fixed flare stop. The retained
nominal f/4.5 control differs from source f/4.60; certification concerns source geometry
and conjugate, not matching the source's wide-open aberration charts. Spectral catalog
proxies and ordinary MTF clipping, convergence and numerical-domain limits remain qualified.
