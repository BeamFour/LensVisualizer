# Audit Log — NIKON PC-E MICRO-NIKKOR 45mm f/2.8D ED

Patent: US 7,656,591 B2, Example 1

## 2026-05-20 — Six-digit missing-Sellmeier code review

### Patent evidence

- Reviewed the actual local file `patents/US7656591.pdf`.
- Table 1 confirms the relevant rows:
  - surface 3 / L12: nd = 1.75692, νd = 31.59
  - surface 8 / L23: nd = 1.56732, νd = 42.72

### Glass corrections

| Element | Before | After | Disposition |
|---|---|---|---|
| L12 | `Proprietary high-dispersion lanthanum flint (757/316)` | `757316 — high-dispersion lanthanum flint...` | No exact public coefficient-backed match found; kept unresolved with unbroken code. |
| L23 | `Proprietary flint (567/427)` | `S-TIL26 (OHARA, 567428)` | Existing coefficient-backed catalog entry close to the patent row. |

### Catalog-search disposition

- Search for `757316` found no defensible exact match in public coefficient-backed catalogs.
- `S-TIL26` is close enough to the rounded patent row to replace the previous generic proprietary label for L23.
- Updated the analysis table to move L23 out of the unmatched set and leave L12 unresolved.

## 2026-06-04 — Sweep 3 local patent recheck

Local patent source: `patents/US7656591.pdf` (untracked local file).

- Re-extracted the local PDF with `pdftotext -layout`.
- The patent prescription publishes `nd` and `νd` for the glass rows, including L12 and the ED L21, but no `nC`, `nF`, `ng`, `θgF`, or `dPgF` rows were found in the extracted text.
- No data-file spectral backfill was made from this pass.

## 2026-08-11 — E-LAF11 catalog correction

- Rechecked the retained Hikari catalog data and found E-LAF11 at `nd = 1.75692`, `νd = 31.591329`, code `757316`.
- Replaced the stale unmatched disposition for L12 with an E-LAF11 catalog-equivalent label. The match supplies a
  coefficient-backed curve while leaving the production supplier unidentified.

## 2026-09-26 — Source-state review

Source-state review outcome: partial. Both authored candidates reviewed: infinity
enabled; close focus remains uncertified pending magnification/source-plane reconciliation.

Visually checked local `patents/US7656591.pdf`, Example 1 / Table 1, PDF page 12.
All 18 source rows, nine glass coordinates and source stop position match the unscaled
prescription. Table 1 gives infinity/close gaps d4=1.00/5.28 and d9=6.50/2.21 mm,
source beta=0/-0.50, and explicitly defines close d0=72.3 mm from the object to the
first lens surface. Bf is named but not numerically tabulated. Retained 56.50/78.14 mm
rear gaps are calculated. The source's 0.01 mm group-spacing discrepancy is preserved.

The fixed close geometry derives 72.310652041528 mm before the first surface,
225.440652041528 mm from the image plane, and beta=-0.505111836767. Independent exact
rays at heights 0.01/0.005/0.0025 mm solve 72.310643356187 / 72.310649869666 /
72.310651502772 mm; axial residuals stay below 6.068e-10 mm. The distance differs from
published 72.3 mm by 0.0147%, but the magnification differs from -0.50 by 1.02237%.
The unchanged 1% published-evidence allowance therefore returns inconsistent. This is a
small unresolved discrepancy, not proof of the production lens's behavior. Source rounding
and the calculated rear plane require reconciliation before certification; neither the
plane nor the tolerance is adjusted to pass, and calculated distance is not used to
bypass the magnification check. The formal 3.393 km infinity root is not a finite state.

The earlier analysis attributed the 225 mm model versus 253 mm production minimum-focus
difference to barrel overhang. Both distances are object-to-image, so that explanation
was removed. Production metadata does not replace source conjugate evidence.

The source f/2.89 differs from the retained nominal f/2.8 control; physical iris and rims
remain inferred. Infinity selection does not override active tilt/shift, unsupported-path,
clipping or numerical-domain guards. No optical prescription, movement, aperture or
reference values changed in this review.
