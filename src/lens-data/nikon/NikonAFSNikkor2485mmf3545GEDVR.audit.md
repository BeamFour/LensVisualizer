# Nikon AF-S Nikkor 24–85mm f/3.5–4.5G ED VR audit

## 2026-09-29 — Initial repository integration

**Evidence:** exact local `patents/JP2011221421A.pdf`, Example 4, Table 13 on pp. 19–20 and Figure 7 on p. 25.
The figure was screened at 600 dpi and visually checked at 300 dpi. Numerous surface-number leader lines contaminate
automatic ENV/RIM readings in the rotated crop; those readings are not valid enlargement evidence. Direct optical
outlines agree closely with the modeled rims, so all semi-diameters were retained. In particular the flat outer blank
of CL1 and group brackets are not clear-aperture targets. Surface, field, and renderer checks support retaining the rims.

**Root cause:** the initial metadata test failed because `patentMetadata.test.ts` requires romanized
`patentAuthors`. The new file used 山本 浩史. Replaced it with the catalog's existing `Hiroshi Yamamoto`, retaining the
Japanese spelling in the analysis bibliography. No metadata validator or optical-engine behavior was weakened.

**Glass:** all Table 13 material coordinates checked. L33's `498825` label had no catalog-code match, although J-FKH1
already supplies compatible coefficients (1.49782/82.57 versus source 1.49782/82.52). Named it explicitly as a
supplier-neutral ED-class spectral proxy; coverage improves 15/18 → 16/18 modeled regions. Both 1.53610/41.42 thin
regions remain unmatched. Exact-coordinate searches found patent prescriptions but no named, coefficient-backed
commercial material. Their chemistry and production method remain unspecified. No new catalog curve is justified.
The remaining 15 regions already use compatible curves; no APD flag or source line indices were invented.

**Display:** retained ED VR, distinct from the original IF-ED 24–85mm. The selected production correlation remains
unconfirmed, and the patent's f/5.78 tele calibration is not presented as the production f/4.5 specification.
