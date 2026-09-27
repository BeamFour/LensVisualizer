# Audit Log - Nikon Ultra-Micro-NIKKOR 29.5mm f/1.2

Patent: GB 1,050,055, Example 1

## 2026-07-29 - Catalog-mismatch review

- Confirmed that the prescription stores the patent's e-line index for L4: `ne=1.69402`, `vd=31.2`.
- The SF8-class identification remains materially sound: coefficient-backed SCHOTT N-SF8 evaluates to
  approximately `ne=1.69413`, while its catalog d-line index is `nd=1.68894`.
- Added an explicit `Unmatched` marker so the resolver does not compare the stored e-line value against the catalog
  d-line value or apply a d-line Sellmeier row to this e-line-authored prescription.
- No prescription, semi-diameter, or optical-layout values changed.

## 2026-07-29 - Remaining e-line mismatch disposition

- Rechecked Example 1 in local `patents/GB_1050055_A.pdf`; stored R, d, ne, and νe remain unchanged.
- S3 `F5 class` -> explicit unmatched F5-class e-line flint at 1.60752 / 38.10.
- S7 `LAK9 / S-LAL9 class` -> explicit unmatched LAK9-class e-line lanthanum crown at 1.69451 / 54.80.
- F5 and S-LAL9 remain d-line family comparisons only. Synchronized the companion analysis.

## 2026-07-30 - F8 e-line safeguard

- Rechecked L7 alongside the newly catalog-resolved d-line F8-class rows elsewhere in the corpus.
- Retained L7 on the Abbe path and added an explicit `Unmatched` marker because its stored `ne=1.59865` is an e-line
  prescription value; applying HOYA E-F8's d-line polynomial would mix reference wavelengths.
- Synchronized the analysis. No prescription geometry or authored optical constants changed.

## 2026-07-30 - Reference-line metadata

- Added `indexReference: "e"` to all nine elements because the stored `nd` / `vd` slots preserve patent
  `ne` / `νe` values.
- The runtime and generated reports now reject d-line catalog substitution structurally rather than relying on annotation wording.
- No source values or prescription geometry changed.

## 2026-09-26 — Source-state review

Source-state review outcome: blocked. Both authored candidates reviewed: the finite
operating conjugate has an unresolved magnification discrepancy; the infinity-equivalent
endpoint is a calculated diagnostic, not a published source configuration. No state is added.

Visually checked local `patents/GB_1050055_A.pdf`, PDF page 2 definitions and page 3
Example 1. The source explicitly defines d0 from object to first lens, gives d0=2006.767,
beta=-0.04 and f=100, and describes 1/25 reduction. Refractive indices are n_e; Abbe
numbers are labeled v_d. The retained model uses e-line reference indices, a 0.295 scale,
rounded dimensions and an inferred stop splitting d4. The source does not give a stop
location, clear apertures or the rear image gap. No source infinity operating row exists.

The finite source distance scales to 591.996265 mm before the first surface. At the
retained 3.578 mm rear gap, the fixed-geometry audit derives 591.739986461192 mm,
809.644986461192 mm from the image plane, and beta=-0.039418399552. The distance
relative error is 0.04329%; the magnification relative error is 1.45400%, beyond the
unchanged 1% published-evidence allowance. The source's nominal 1/25 description does
not supply independent evidence for relaxing the check.

Independent exact-ray roots at heights 0.01/0.005/0.0025 mm are
591.739980123532 / 591.739984807889 / 591.739986461192 mm. Axial residuals are below
4.272e-12 mm, demonstrating internal agreement for the authored model but not agreement
with the published magnification. The existing analysis's unrounded-prescription values
are distinguished from this check of the actual rounded data. Source precision, the
normalization and the calculated rear plane need reconciliation before certification;
no geometry or numerical bound is adjusted to make the check pass.

At focusT=0, the 2.431 mm rear gap is the separately calculated infinity-equivalent BFD.
Its formal approximately 1.82 km finite root from rounded data is not a published source
either. Neither a manufactured infinity state nor a replacement calculated finite distance
is enabled. Native e-line support, high-NA diffraction restrictions, inferred apertures
and spectral availability remain independent limitations. No prescription, reference
wavelength, slider coordinate or calculation eligibility changed during this review.
