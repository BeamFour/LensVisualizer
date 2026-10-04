# Canon EF 400mm f/2.8 L IS USM Patent Audit

Patent: US 6,115,188 A, Numerical Example 25

## 2026-09-23 — Rear plate modeled as `rearPlates`

- Read Numerical Example 25 on `patents/US6115188.pdf` PDF page 79 (cols. 33–34): D29 = 15.00, R30/R31 = ∞ with
  D30 = 2.20, N17 = 1.516330, ν17 = 64.1, D31 = 15.28 to the inactive flare-cutter plane R32, and D32 = 38.95 to the
  image plane. The filter FL is now a `rearPlates` entry (`S-BSL7`, catalog-compatible at 1.51633 / 64.1) with
  `gapAfterMm` 54.23 (D31 + D32; FC omitted as a non-medium bookkeeping plane).
- The legacy file stored a paraxially normalized air-equivalent R29→IMG of 70.697755606 mm (printed fold
  70.680871512 mm plus +0.016884094 mm to the independently traced infinity focus). That image-plane choice is kept:
  R29→FL = 70.697755606 − 2.20/1.51633 − 54.23 = 15.016884094 mm (printed 15.00). The close-focus D12/D15 solve is
  unchanged.
- Paraxial check against the previous data: EFL identical and defocus unchanged at infinity and at the 3.0 m keyframe
  (worst difference 1.4e-10 mm). Physical R1→IMG track grows by 2.20(1 − 1/1.51633) = 0.749128 mm to 372.206884 mm.

## 2026-10-04 — Drop-in filter drawn as an element

- The rear drop-in filter plate FL moved out of `rearPlates` into the drawn prescription: surfaces 30–31 and element
  17 (`Plane-Parallel Plate`), with the same thickness, index and gaps. The lens is computed with the filter in place
  and a teleconverter mounts behind it, so it is part of the lens rather than a camera-side plate.
- The source lists no clear aperture for the plate. Its semi-diameter, 20.5 mm, is a ray-trace estimate: the largest
  height on the plate of any ray that reaches the 135 format or the diagram's off-axis field at infinity, mid and
  close focus (19.47 mm), plus 5%, rounded up to 0.5 mm. Not figure-audited.
- Before/after check: EFL, entrance pupil, stop radius, image plane, half-field, analysis half-field and the traced
  axial, mid-field, corner and diagram bundles are unchanged. `npm run audit:field-coverage` still reports 100% of the
  corner.
