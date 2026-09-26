# Audit Log — LEICA MACRO-ELMAR-M 90mm f/4

## 2026-09-26 — Source-state review

Source-state review outcome: verified. The single authored candidate (focusT=0, zoomT=0)
is the scaled patent infinity design. No additional eligible finite configuration is published
for this retained fixed prescription; production macro capability does not supply focus travel.

Visually checked local `patents/DE_2246966_A1.pdf`, PDF pages 4–6, especially claim 3 on
page 6 (printed page -5-). All eight radii and seven separations reproduce the normalized
source at the retained 90× scale. The source defines s' as rear focal distance from the last
surface to the image; 0.5102×90=45.918 mm is retained. Native ne/ve glass coordinates remain
unchanged. The inferred stop splits source d6=0.2543×90=22.887 mm into
7.459+15.428 mm; neither its station nor calibrated physical diameter is claimed as published.

The native-e fixed-plane matrix gives A=-0.000757312987409664,
B=90.03305131629116 mm and C=-0.011116334266940172 mm^-1. Its EFL is
89.957712317 mm, consistent with the existing rounded-source model. The formal finite root
118884.86373942021 mm is residual defocus, not evidence for a finite source state; preserve
the source infinity conjugate and published rear gap. Best axial focus remains a diagnostic.

This review certifies the stated scaled prescription configuration, not a measured production
construction. Inferred apertures, coordinate-compatible spectral proxies and the unconfirmed
patent-to-product correlation remain. No geometry, glass, aperture or image-plane changes.

## 2026-09-15 — Patent figure, glass and integration review

### Source and semi-diameters

Local source: `patents/DE_2246966_A1.pdf`, Fig. 1, Example 1 / claim 3; native-e table on PDF p. 6. The exact local PDF was inspected; the glass coordinates and reference line were checked in the cited table.

Figure screening: `npm run audit:patent-figure -- src/lens-data/leica/LeicaMacroElmarM90mmf4.data.ts patents/DE_2246966_A1.pdf 7 0.162,0.14,0.751,0.365 --axis=0.250 --dpi=600`. Optical rims were inspected visually; stop lines, leaders, plate P, and mechanical flanges were excluded. No patent publishes the authored per-surface clear apertures.

No SD changes. Manual optical-rim readings are roughly 9–10 mm at the axial drawing scale, while the 90 mm f/4 entrance pupil alone requires about 11.25 mm on-axis at the first surface. The scanned drawing is tilted and not a reliable uniform radial/axial metric for the clear aperture of this scaled prescription. Automatic L1 readings map into the adjacent outline and disagree with the visible rim. The ray-envelope apertures were retained rather than clipping the calibrated full pupil to a schematic silhouette; L3/L4 already agree within the review noise band.

### Glass classification

| Element | Retained patent index / Abbe | Runtime curve | Native-reference residual (index / Abbe) |
|---|---|---|---|
| L1 | 1.64304 / 59.85 (e) | N-LAK21 | -0.000003 / 0.008 |
| L2 | 1.64304 / 59.85 (e) | N-LAK21 | -0.000003 / 0.008 |
| L3 | 1.75458 / 34.72 (e) | LAFN7 | 0.000003 / -0.003 |
| L4 | 1.79180 / 25.87 (e) | SF56A | -0.000001 / 0.003 |

4/4 elements resolve to trusted catalog dispersion. Catalog names are supplier-neutral spectral proxies, not proof of patent or production glass identity. Patent indices/Abbe numbers remain unchanged. Coefficients for existing rows retain their vendor provenance in the shared catalog; no resolver tolerance was relaxed.

Added SCHOTT N-LAK21 from the official Optical Glass datasheet collection (May 2019), PDF p. 54, sheet dated 2014-02-01: B=[1.22718116, 0.420783743, 1.012848430], C=[0.00602075682, 0.0196862889, 88.4370099], nd=1.64049, vd=60.10, ne=1.64304, ve=59.86. [Vendor source](https://www.schott.com/en-gb/products/optical-glass/-/media/Project/OnEx/Products/O/optical-glass/Downloads/schott-optical-glass-collection-datasheets-english-may2019.pdf). The sheet was visually checked against its extracted constants.

Removed all four elements' catalog-derived nC/nF/ng/dPgF overrides. Those values were not patent measurements and bypassed shared catalog resolution. The native-e patent coordinates remain intact; dispersion now comes from the validated shared catalog.

### Display and verification

Display name: **LEICA MACRO-ELMAR-M 90mm f/4**. Marketing focal lengths/apertures remain separate from the patent design values, and production correlations stay qualified. Focus is labeled “Not modeled”; no finite-focus motion was invented.

- Surface validator and image-circle audit: passed, zero undersized surfaces.
- Production SVG render diagnostics at the static prescription: no SD trims.
- Minimum sampled common-aperture element thickness: 0.3132 mm; maximum authored rim angle: 50.52°.
- Focused dispersion, buildLens and element-render suites passed (142 tests), including catalog consistency.
- Maximum positive shared-rim sag intrusion / air-gap ratio across sampled states: 0.3452, below the 0.90 policy.
- Full repository gates passed: typecheck, format check, lint, all 274 test files / 2,700 tests, and production build (1,351 prerendered pages).
- Changelog entries use the UTC date 2026-09-15, verified against 2026-09-15T14:27:20Z; existing entries retain their dates and identities.
- Loaded the final lens route in the local application and visually compared its SVG silhouette and display labels with the inspected patent figure.

## 2026-09-15 — Local-site diagram and movement follow-up

Compared the local-site cross-section with the exact local patent figure again, including glass silhouettes, asphere marks, numbered elements, cemented boundaries, group signs and the stop/image labels. All element shape labels agree with the signs of the retained prescription radii.

No further SD change: the remaining rim differences do not provide strong evidence beyond the prior audit, or include mechanical outlines rather than optical aperture.

**Movement:** The static prescription has no zoom or authored finite-focus travel. The disabled focus control correctly reports Not modeled. Published wide/middle/tele rows remain in increasing focal-length order; no unsupported focus displacement was added.

**Glass and labels:** all resolved entries now name the actual runtime spectral proxy and explicitly retain supplier uncertainty. No APD tag is justified for this native-e prescription. No additional complete, compatible published dispersion curve was found for the six remaining batch gaps; coverage stays 56/62 elements.

**Assignees:** reviewed the 64-name corpus inventory and this publication. The four Panasonic publications share Panasonic Intellectual Property Management Co., Ltd.; the two German publications share Ernst Leitz GmbH. Existing canonical names are already consolidated. Historical legal renames and distinct subsidiaries remain separate.

**Verification:** surface/image-circle audits, five-state render diagnostics, local-site wide/tele controls (zooms), disabled focus controls, and the required typecheck/format/lint/test/build gates.
