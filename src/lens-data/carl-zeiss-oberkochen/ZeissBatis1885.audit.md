# ZEISS BATIS 85mm f/1.8 — integration audit

## 2026-09-15 (UTC)

### Patent geometry

Source: local untracked `patents/JP2015096915A.pdf`, PDF page 35, Fig. 6; inspected at 600 dpi.

S18–S20: 12.35 → 15.8 mm, matching the rear cemented component (about 650 px full height at 47.52 µm/px). S22: 13.678 → 16.8 mm. S21: 12.652 → 14.5 mm; the approximately 16.3 mm figure-sized candidate overlapped the preceding gap under the validator. S5/S6: 16.34 → 16.0 mm, allowing removal of gapSagFrac = 0.95 and passing the default 0.90 policy. The VC bracket is not an optical rim; ignore the automated 22.14 mm L8 reading.

### Glass classification

The patent nd/νd coordinates are retained. The following existing catalog curves pass the shared coordinate guard; they are dispersion proxies, not evidence of a production supplier or historical melt. No complete per-element nC/nF/ng or unsupported partial-dispersion values were introduced. All 11 elements resolve; no additional catalog type is required.

| Element | Patent nd / νd | Runtime curve | Catalog minus patent nd / νd |
| --- | --- | --- | --- |
| L1 | 1.9037 / 31.31 | N-LASF46B | -0.000040 / 0.010 |
| L2 | 1.497 / 81.61 | H-FK61 | 0.000000 / 0.003 |
| L3 | 1.7408 / 27.76 | E-FD13 | -0.000030 / 0.000 |
| L4 | 1.6584 / 50.85 | BACED5 | 0.000040 / 0.010 |
| L5 | 1.4875 / 70.44 | H-QK3L | -0.000010 / 0.000 |
| L6 | 1.7847 / 25.72 | H-ZF13 | 0.000020 / 0.000 |
| L7 | 1.5928 / 68.62 | FCD515 | 0.000020 / 0.010 |
| L8 | 1.8042 / 46.5 | N-LASF44 | 0.000000 / 0.000 |
| L9 | 1.8061 / 33.27 | J-LASFH6 | 0.000000 / 0.075 |
| L10 | 1.4875 / 70.44 | H-QK3L | -0.000010 / 0.000 |
| L11 | 1.5182 / 58.96 | S-NSL3 | 0.000029 / -0.058 |

### Metadata

Display names follow the catalog's uppercase manufacturer/line convention. Canonical maker and assignee spelling and romanized inventor names are used while the analysis preserves source wording and qualified production correlations.


Inventor romanization corroboration: [Hirofumi Tabata](https://patents.google.com/patent/JP2017026716A/en) and [Yasuhiko Obikane](https://patents.google.com/patent/JP2017040874A/en) identify the same Japanese-script names in Tamron publications.

### Second figure, glass and live-diagram review

The second live-site comparison retains the corrected rims. The rear-face limits exclude the patent's short mechanical steps and keep the preceding air gap open. L2 and L7 now carry inferred APD tags with H-FK61 and FCD515 proxy evidence, respectively; no measured patent partial-dispersion values are claimed. Catalog proxy names are explicit in the element inspector. The patent label preserves the leading zero in JP 2015-096915 A, and the specifications identify the VC group without implying that lateral stabilization is simulated.

Infinity, the intermediate |β|=0.025 keyframe, and the |β|=0.125 endpoint are correctly ordered. The live control increases the G1–G2 gap 4.538 → 5.870 → 11.462 mm and decreases G2–STO 13.725 → 12.393 → 6.801 mm: G2 moves imageward.

## 2026-09-23 — Rear plate modeled as `rearPlates`

- Read Example 2 Table 5 on PDF page 21 at 110 dpi: surface 22 d = 14.700; surfaces 23–24 are one plate, 2.500 mm,
  nd 1.5168, νd 64.20; 24 → IMG is 1.000 mm. Fig. 6 (PDF page 35) labels the plate CG. The focus gaps d1/d2
  lie ahead of the stop, so the rear path is fixed at all three published states.
- Surface 22 now stores the printed 14.700 mm, with `rearPlates` CG (N-BK7, the catalog match for 1.5168 / 64.2) and
  gapAfter 1.000 mm. Paraxial check against the previous data: EFL identical and defocus unchanged at all three focus
  states (the old 17.348206751055 mm fold was exact). Physical track grows by 0.852 mm, to 1.190 × EFL.

## 2026-10-03 — Iris calibration, finite-focus aperture and retained geometry

### Source limits and calibration

- Rechecked original `patents/JP2015096915A.pdf`, Example 2 Tables 4–6 (PDF pp.21–22), Fig.6 (p.35) and Fig.9 (p.36). The source prints Fno=1.85/1.85/1.93 at INF/1/40/MOD, with |β|=0/.025/.125. It publishes neither surface clear apertures nor a physical iris diameter or focus-dependent iris law. The Batis production correlation remains inferential.
- Paragraph 0108 defines Fno only as the F value. It does not identify a real-ray versus paraxial convention. The generic adjustable-iris discussion concerns exposure/depth-of-field control; it does not establish automatic focus compensation. [Patent text](https://patents.google.com/patent/JP2015096915A/en).
- Authored STO.sd=11.1700166517 mm is the **paraxial** stop height for the infinity entrance ray `EFL/(2×1.85)=22.4089271183 mm`. `runtimeLens.ts` recalibrates an ordinary air stop using the **exact** marginal ray at the same entrance height, producing runtime radius 11.5591419145 mm. The 3.48% difference is pupil-calibration behavior, not published diaphragm evidence. Simply preserving the authored radius would change the exact infinity image cone.
- Independent checks used explicit height/slope refraction and translation matrices, including the cover plate, and finite conjugate `s=-B/A`. Exact rays were shot directly to iris points without the app's pupil/chief/conjugate helpers. Derived object-to-image distances at 1/40/MOD are 3484.11325/809.95343 mm; magnifications are −.02477035/−.12292549 versus the rounded source .025/.125.

### F-number definitions and measured results

The real working metric below is `1/(2 NA_image)`, using the outgoing exact ray angle in air. The first-order working slope metric is `1/(2|u_par|)`. The app's effective-F readout is a separate thin-lens magnification estimate; marked aperture, configuration infinity-conjugate focal-length/pupil ratio, working cone and readout must not be interchanged. [OpticStudio image-space definition](https://ansyshelp.ansys.com/public/Views/Secured/Zemax/v251/en/OpticStudio_User_Guide/OpticStudio_Help/topics/Image_Space_F.html) and [real working definition](https://ansyshelp.ansys.com/public/Views/Secured/Zemax/v251/en/OpticStudio_User_Guide/OpticStudio_Help/topics/Working_F.html) clarify terminology, not the patent's software/convention.

| Metric | INF | 1/40 | MOD |
| --- | ---: | ---: | ---: |
| Published Fno | 1.85 | 1.85 | 1.93 |
| Authored fixed iris: exact real working F | 1.910762 | 1.910294 | 1.907734 |
| Runtime fixed iris: exact real working F | 1.849698 | 1.849438 | Full boundary not traceable |
| Authored fixed iris: first-order working slope F | 1.850000 | 1.850311 | 1.850311 |
| App effective-F estimate at nominal 1.85 | 1.850000 | 1.935277 | 2.230561 |

Only G2 moves; the stop, downstream G3 and image stay fixed. The fixed runtime iris therefore yields a nearly constant real output cone where its boundary is traceable. Focus breathing alone does not explain the printed closest-focus F/1.93. The F/2.23 estimate is not evidence that the traced cone matches that source value.

### Conditional aperture solutions and physical clearance

- The 16.34-mm S5/S6 trial at gapSagFrac=.95 was tested at 22 focus states (0..1 in .05 steps plus the exact 1/40 state). It recovers some rays but does not clear the full runtime pupil: solved axis S5 footprints reach 16.462429 mm at focus .75 and 16.649544 mm at .90. Failed shooting and later trace failures remain separate from aperture clipping.
- For the published 1.501-mm S5→S6 gap, current 16.0-mm shared rims require fraction .895833861 and leave +.156353374 mm clearance. The 16.34 trial requires .947566355 and leaves +.078702901 mm. Supporting 16.649544 at both faces would require .997005921 and leave only +.004494112 mm before an inferred margin; this is outside the .95 trial.
- **If** source Fno means the real working metric, matching 1.85/1.85/1.93 requires effective iris radii 11.557151/11.555428/11.031097 mm. Required S5 radii are 15.514114/15.769245/16.125000 mm; S6 peaks at 16.114848 mm. A conditional linear Fno interpolation tested at 102 focus positions stays within that axis envelope. It is not a published iris law.
- That conditional S5 bound plus 1% is 16.286250 mm. A rounded 16.29-mm equal-rim trial passes .95 and leaves +.090369502 mm at the gap. An 8% allowance would reach 17.415000 mm and physically intersect by .194860501 mm. These are derived model dimensions, not manufacturer apertures or tolerances.
- Two mechanisms can fit the three real-working source values: a focus-dependent effective iris, or the runtime fixed iris with a fixed limiting rim near 16.125 mm. The latter is physically clear (+.128259 mm at this gap) and would limit the closest axis cone to F/1.93 while passing the full iris farther away. It is a fitted mathematical explanation, not proof that S5/S6 is the source's limiting aperture; it also supplies no independently established radial margin.
- With an unchanged iris, current S5=16.0 limits the closest fully clear axis cone to about F/1.94650; S5=16.34 would permit about F/1.90218. An SD-only increase therefore does not establish the source's F/1.93 mechanism.
- Under the alternative first-order-working interpretation, required source-state iris radii are 11.170017/11.171895/10.708811 mm. Exact tracing of that conditional pupil gives maximum S5/S6 footprints 15.722470/15.705545 mm, already inside current 16.0-mm rims. Source convention ambiguity materially changes the proposed correction.

### Field checks and decision

Fig.9 explicitly uses image height Y=21.633 mm. Independently targeting chiefs at axis, 60% of that image height and full height at all three source states gives clear chiefs with unchanged image positions in current and conditional 16.29/.95 geometry. With the conditional real-F/1.93 pupil at MOD, current rims clip 18 of 89 axis samples; the trial admits all 89. Off-axis vignetting and failed paths remain; this is not an unvignetted full-field aperture envelope. Diagnostic sample counts are not measured transmission.

First-surface-reference angles needed for full Y=21.633 are 14.300006/14.090634/13.341016 degrees versus printed source half-fields 14.3/13.695/11.53. The patent does not identify that finite-angle reference. Earlier direct-angle finite-field samples are controlled model diagnostics, not a complete source-pupil reconstruction; the axis finding does not depend on the angular reference.

**Retain executable Batis data unchanged.** The investigation explains calibration and demonstrates physically clear conditional solutions, but it does not select a unique source-faithful pupil mechanism. Fig.6's mechanical flanges/VC bracket and drawing precision cannot resolve the disputed ~2% radius difference. Before adopting an aperture adjustment, establish or explicitly qualify the source Fno convention, iris/effective-pupil settings, actual limiting clear aperture and finite-field reference. Do not infer a global calibration change, focus-dependent iris law or larger aperture from the full-runtime-pupil footprint alone.
