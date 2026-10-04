# Teleconverter Data Specification

Reference for creating `*.teleconverter.ts` files in `lens-data/`. A teleconverter is a detachable rear converter
that mounts between a host lens and the camera. It is a catalog entity of its own, not a lens: it has no aperture
stop, is never drawn or traced alone, and has no `/lens/` page. The viewer composes it onto a compatible host with
`attachTeleconverter()` (`src/optics/prescription/teleconverter.ts`) and builds the result as one lens.

Converters built into a single lens (switchable TC IN / TC OUT) are not teleconverter entities; they stay on
`opticalConfiguration` in [LENS_DATA_SPEC.md](LENS_DATA_SPEC.md).

## Quick Start

1. Copy `TEMPLATE.teleconverter.ts.template` to `lens-data/<maker>/YourConverter.teleconverter.ts`.
2. Transcribe the converter's surfaces and elements exactly as for a lens (same sign, label and pairing rules as
   [LENS_DATA_SPEC.md](LENS_DATA_SPEC.md) § Surface Object and § Element Object).
3. Set `masterImageDistanceMm` and the last surface `d` from the source (see Geometry below).
4. Set `acceptsTeleconverters: true` on each host lens that takes the converter, unless the converter is `universal`.
5. Run `npm run test`. No imports, catalog edits, or per-converter tests are needed.

File naming: `lens-data/**/*.teleconverter.ts`, using `satisfies TeleconverterDataInput`. The suffix keeps the file out
of every lens scan, so the import must stay type-only.

## Fields

### Required

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | Lowercase a-z/0-9 words joined by single hyphens. Becomes the `/teleconverters/<key>` URL and the `tc` query value. |
| `name` | `string` | Display name, following the lens display-name convention. |
| `magnification` | `number` | Nominal focal-length multiplier (`1.4`, `1.7`, `2`). Must be > 1. |
| `lensMounts` | `LensMountId[]` | Canonical mount ids the converter is made in. A host must share at least one. |
| `elements` | `ElementData[]` | Same shape as lens elements. Explicit `fromSurface` / `toSurface` spans are not supported. |
| `surfaces` | `SurfaceData[]` | Refracting surfaces only, front to rear. No `"STO"` and no `interaction`. |
| `masterImageDistanceMm` | `number` | Air-equivalent distance from the converter's first vertex to the host's native image plane. |

### Optional

| Field | Type | Description |
|-------|------|-------------|
| `maker`, `subtitle`, `specs`, `publishedAt` | | Same meaning as on a lens. |
| `universal` | `boolean` | `true` when the converter fits any host sharing a mount. Otherwise the host must declare `acceptsTeleconverters`. |
| `minHostFno` | `number` | Fastest host f-number whose axial beam the converter's clear apertures pass. Faster hosts are rejected. |
| `incompatibleLensKeys` | `string[]` | Host lens keys excluded for reasons vertex geometry cannot express (rim contact, mechanical interference). |
| `patentNumber`, `patentAuthors`, `patentAssignees`, `patentYear` | | Same rules as [LENS_DATA_SPEC.md](LENS_DATA_SPEC.md) § Patent Metadata. |
| `elementCount`, `groupCount` | `number` | The converter's own counts. The composed header shows host + converter. |
| `asph`, `groups`, `doublets` | | Keyed by the converter's own surface labels. |
| `rearPlates` | `RearPlateData[]` | Plates the source lists behind the converter, with their physical gaps. |

Lens-only fields (`var`, `zoomPositions`, `nominalFno`, `projection`, `opticalPath`, `perspectiveControl`,
`aberrationControl`, `acceptsTeleconverters`) are rejected: a converter has no moving groups and no stop.

## Geometry

A converter is positioned by its **virtual object**: the host's native image plane, which lies
`masterImageDistanceMm` behind the converter's first vertex. From a patent that prints a combined master + converter
table:

```text
masterImageDistanceMm = master back focus in air − gap from the master's last vertex to the converter's first vertex
```

Use the air-equivalent master back focus (the value patents usually print as `Bf`). If the source prints only
physical spacings through a cover plate, fold each plate as `t / n`.

The last surface `d` follows the lens convention: the back focus to the image plane, or the physical gap to the first
plate when `rearPlates` is present. Do not fold plate thickness into it by hand; list the plates.

When a converter is attached the engine uses air-equivalent distances throughout, so a host that lists a sensor cover
plate and a host that folds it into its back focus resolve to the same system:

- Junction gap = host back focus (air) − `masterImageDistanceMm`. It replaces the host's last gap in every focus,
  zoom and aberration-control state.
- Final gap = converter back focus (air) − the host's plate stack (air). The host's `rearPlates` stay behind the
  converter; the converter's own `rearPlates` only convert its authored last gap and are never emitted.

## Compatibility

`teleconverterCompatibility()` in `src/optics/prescription/teleconverterCompatibility.ts` is the single rule set, used
by the viewer and by the build-time host lists. A converter mounts on a host when all of these hold:

1. The two share a mount id.
2. The converter is `universal`, or the host sets `acceptsTeleconverters: true`.
3. The host is not in `incompatibleLensKeys` and is not faster than `minHostFno`.
4. The junction gap and the final gap are at least 0.1 mm in every authored host state.
5. The host is an ordinary sequential rectilinear lens: not folded or mirror, not fisheye, not perspective-control.
6. The host has no rear plate ahead of the converter (a drop-in filter tens of millimetres in front of the image).

A zoom host that clears the converter only over part of its range is excluded entirely.

## Semi-Diameters

Converter semi-diameters are physical and are shared by every host. Size them for the fastest and widest host the
converter is meant for, and set `minHostFno` when a faster host's axial beam would be clipped: the engine keeps the
host's stop, so a clipped beam would otherwise report an f-number the system cannot deliver.

## Validation

`validateTeleconverterData()` in `src/optics/validateTeleconverterData.ts` checks:

1. Identity and fit fields: `key` pattern, `magnification` > 1, known unique `lensMounts`, the optional fit fields,
   and a positive `masterImageDistanceMm`.
2. No lens-only fields, no `"STO"`, refracting surfaces only, no explicit element spans; the first surface starts a
   glass element and the last exits into air with a positive gap.
3. Every lens surface, element and asphere rule, by merging the converter behind a powerless reference host and
   running `validateLensData()` under the project default thresholds. Messages name composed labels (`TC1`, `TC2`).
4. First-order self-consistency: the paraxial image of an object `masterImageDistanceMm` behind the first vertex must
   land within 0.1 mm of the authored air-equivalent back focus, and the computed lateral magnification must be within
   5% of `magnification`. A back-focus mismatch usually means a physical distance was used where an air-equivalent one
   is required.

Corpus sweeps additionally compose every converter onto every compatible catalog host and build the result.

## Composed System

Authors do not write composed data, but the conventions matter when reading the viewer:

- Converter surface labels gain the reserved `TC` prefix and element ids continue after the host's. Authored lens
  surfaces may not use that prefix.
- The host's stop is the system stop. `nominalFno` is rescaled per zoom station by the exact focal ratio so the
  physical iris is unchanged.
- The composed data carries an `attachedTeleconverter` descriptor. It is written only by the composer and is not an
  authorable lens field.
