# Lens Mount And Image-Format Backfill

Track progress for optional `lensMounts` and `imageFormat` metadata in `src/lens-data/**/*.data.ts`.

Canonical ids live in `src/utils/catalog/lensTaxonomy.ts`. Do not free-type labels in lens files. If a lens is ambiguous, leave
the fields unset and add a note here until a source check resolves it.

## Current Coverage

- Total lens data files: **858**
- Files with both `lensMounts` and `imageFormat`: **781**
- Files missing `lensMounts`: **69**
- Files missing `imageFormat`: **28** (19 public lenses and 9 hidden reference fixtures)
- Files missing both fields: **20**
- Formats currently in use: `1-1.7-inch-type`, `1-1.8-inch-type`, `1-2.3-inch-type`, `1-2.55-inch-type`,
  `1-2.7-inch-type`, `1-inch-type`, `1.25-inch-tube`, `1.5-inch-type`, `110`, `135-full-frame`,
  `16mm-cinema`, `2-3-inch-type`, `35mm-cinema`, `44x33`, `4x5`, `5x7`, `645`, `6x6`, `6x7`, `6x9`, `8x10`,
  `aps-c`, `four-thirds`, `normal-8`, `super-35-1.9`, `super-35-cinema`, `super-8`
- Seeded mounts currently in use: `agfa-ambi-silette`, `canon-ef`, `canon-ef-m`, `canon-ef-s`, `canon-fd`,
  `canon-rf`, `contax-rf`, `contax-yashica`, `enlarging-lens`, `exakta`, `fixed-lens-camera`, `four-thirds`,
  `fujifilm-g`, `fujifilm-x`, `hasselblad-h`, `hasselblad-xcd`, `konica-ar`, `l-mount`,
  `large-format-lens-board`, `leica-ltm`, `leica-m`, `leica-r`, `m42`, `micro-four-thirds`, `minolta-sr`,
  `nikon-1`, `nikon-f`, `nikon-s`, `nikon-z`, `nikonos-rs`, `olympus-om`, `pentax-110`, `pentax-645`, `pentax-67`,
  `pentax-k`, `praktina`, `samsung-nx`, `sigma-sa`, `sony-a`, `sony-fe`, `zeiss-contaflex`, `zeiss-contarex`

## Source-Review Queue

### Needs Human Intervention / Source Review

Do not seed these from filename alone:

- Sigma interchangeable lenses:
  - `SigmaArt40mmf14` — DSLR-era DG HSM Art; exact catalog mount coverage varied by system.
  - `SigmaDGDNA35mmf14`, `SigmaDGDNA85mmf14`, `SigmaDGDNArt50mmf14` — likely Sony E and L-mount
    full-frame, but confirm the exact production variants represented by each file.
- Laowa:
  - `Laowa12mmf28ZeroD` has `imageFormat` but no mount. Confirm represented production mounts before seeding.
- Voigtländer:
  - `VoigtlanderUltron28f2`, `VoigtlanderUltron50f2` — verify historical or multi-mount variants before seeding.
  - `VoigtlanderHeliar` and `VoigtlanderHeliarF45SecondAsymmetric` are tagged as `large-format-lens-board`; leave
    `imageFormat` unset until a specific production focal length/frame-size interpretation is chosen for either
    normalized patent example.
- Vivitar:
  - `VivitarSeries1200mmf3`, `VivitarSeries13585mmf28`, `VivitarSeries170210mmf284` — Series 1 lenses were
    sold in multiple mounts; need source review before choosing one or more ids.
- Hidden reference fixtures:
  - `src/lens-data/reference/*.data.ts` are synthetic mirror/folded fixtures and intentionally remain outside public
    catalog mount/format taxonomy unless a separate reference-fixture convention is added.

### Remaining public image-format questions

The source review covers every public record still lacking `imageFormat`. Do not turn a family resemblance, chosen
patent scaling, angular field, or circular image into an unsupported rectangular recording format.

| Records | Remaining source limitation |
|---------|-----------------------------|
| Nikon S-100 | [Nikon’s history](https://imaging.nikon.com/imaging/information/chronicle/cousins20-e/) confirms a pickup tube but gives no size. Tape widths and the unrelated COOLPIX S100/JVC S-100 do not establish its active format. |
| Apple iPhone 7 Wide; iPhone 12 Wide | Apple’s cited product specifications do not give active sensor dimensions or establish the patent’s production identity. The iPhone 12 patent image circle remains explicit; neither receives a guessed inch-type format. |
| Kinoptik Super-Tegea 1.9mm | Manufacturer brochures establish an 8.7 mm circular image and multiple applications, not a single rectangular capture frame. Keep `imageCircleMm`. |
| Nikon Ultra-Micro-Nikkor 29.5mm | Fixed-conjugate photolithography objective; its reduction ratio/field does not imply a consumer film or sensor class. |
| KMZ Industar ITMO Variant 2 | Teaching prescription lacks a verified factory/camera-format mapping. |
| Zeiss Biotar 50mm f/1.4; Kodak Ektar 52mm f/1.5; Schneider Xenar 50mm f/2.8 | The cited sources do not securely identify the selected scaled patent example with a production variant’s recording frame. Family listings alone do not resolve that boundary. |
| Russar-21; Russar-22 | Experimental/patent field evidence lacks a manufacturer-issued recording-frame specification for these exact prototypes. |
| Meyer Kino-Plasmat 100mm; Double-Plasmat 135mm | Exact production mapping and format are not established by the source set; chosen scales and historic specimen names do not supply them. |
| Fujinar 210mm | The manufacturer history and museum record establish the large-format family and 21 cm product, but no specific frame or image-circle class for this example. Do not substitute Fujinon/SC specifications. |
| Agfa Color-Magnolar II 100mm; Kodak Enlarging Ektar 100mm | Finite-conjugate enlarger objectives: Kodak’s cited brochure describes a negative up to 2¼ × 3¼ inches, not the modeled image-plane frame. A catalog format needs an explicit object/image-side convention; no arbitrary output-print format is assigned. |
| Voigtländer Dynar; symmetric Heliar; second asymmetric Heliar | Normalized patent examples are not tied to a uniquely chosen production focal length/frame combination. |

Source details and the product/patent qualifications remain in each lens’s analysis. Sources for completed compact-camera,
tube and cinema assignments are centralized in `src/lens-data/LENS_MOUNT_FORMAT_OPTIONS.md`; completed production
assignments also cite the manufacturer document in their analysis. Hidden synthetic fixtures remain intentionally unset.

Useful scan commands:

```bash
rg -n "lensMounts:|imageFormat:" src/lens-data -g "*.data.ts"
rg --files-without-match "lensMounts:" src/lens-data -g "*.data.ts"
rg --files-without-match "imageFormat:" src/lens-data -g "*.data.ts"
```
