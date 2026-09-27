# Audit Log - Sony E 30mm F3.5 Macro

Patent: JP 2012-159613 A, Example 1

## 2026-06-23 - Sony folder patent audit / APD + SD review

- Reviewed local `patents/JP2012159613A.pdf` against `SonySEL30mmf35.data.ts` and the companion analysis sidecar.
- Patent Example 1 confirms the stored R/d/nd/vd prescription, variable focus gaps `D11` and `D14`, Fno, focal length, and image height.
- The patent text does not publish clear apertures or effective diameters. Existing `sd` values are retained as renderer-safe estimates rather than patent-derived values.
- Updated L114 from untagged APD to `apd: "inferred"` because the patent nd/vd and line indices map to the advertised ED fluorophosphate catalog class; no patent dPgF is assigned.
- Current generated glass reports show no active Sony catalog-mismatch row for this lens.


## 2026-09-27 — Source-state review

Source-state review outcome: verified.

- Visually checked exact local `patents/JP2012159613A.pdf`, Example 1, paragraphs 0054–0056, PDF pages 9–10. All fifteen refractive surfaces, nine optical media (including the two resin caps), stop row 6 and four K/A4–A10 sets reproduce the published prescription. Surface 16 retains the published 27.30 mm image gap.
- Both inventory candidates are enabled at focus 0 / 1, zoom 0. Infinity uses D11/D14 = 1.51/12.43 mm; closest focus uses 7.57/6.36 mm. The 0.01 mm rounded track difference is preserved. No intermediate finite configuration is certified.
- The closest fixed geometry gives A = -0.9911134409214337, B = 23.355048993100038 mm and s = -B/A = 23.56445592281238 mm before the first surface. The physical image track is 71.30 mm, giving calculated image-plane distance 94.8644559228124 mm.
- Independent exact-ray roots at heights 0.01 / 0.005 / 0.0025 mm are 23.564446265156413 / 23.564453508740552 / 23.564455319294375 mm. Axial residuals are at most 4.062e-9 mm and all three pass the unchanged consistency limits. Magnifications approach -0.9911134409214337.
- No full-system magnification is published in the reviewed table. Paragraph 0060's |β2mod| = 2.0 applies only to group G12 and is not used as whole-system evidence. Production 1:1 and 0.095 m are not certification inputs or selector magnification labels.
- Source FNO 3.60 / 4.23 and the nominal f/3.5/inferred physical iris remain qualified; no aperture, glass, geometry, reference value or tolerance changes are made. Source-backed distance does not remove diffraction or convergence restrictions.
- Validation: shared source-state, conjugate and inventory/script regression coverage, full repository quality gate, per-state center/off-axis MTF and live selector/closed-diagram persistence. No per-lens test was added.
