# Benchmarks

On-demand benchmark records for optics computation, SVG rendering, and aberration-panel analysis/rendering.

## Command

Run the benchmark manually:

```bash
npm run benchmark:optics-rendering
```

Useful options:

```bash
npm run benchmark:optics-rendering -- --dry-run
npm run benchmark:optics-rendering -- --report-only
npm run benchmark:optics-rendering -- --iterations=5 --warmups=2
npm run benchmark:optics-rendering -- --base d49857ae --iterations=15 --warmups=2
npm run benchmark:optics-rendering -- --base d49857ae --heavy --iterations=15 --warmups=2
npm run benchmark:optics-rendering -- --base d49857ae --memory
```

- `--dry-run` validates the benchmark module and default lens keys without writing output.
- `--report-only` regenerates the Markdown report from existing JSON records without creating a new run.
- `--iterations` and `--warmups` tune the measured and warmup passes. Defaults are 3 measured iterations and 1 warmup.
- `--base <ref>` (or `--base=<ref>`) makes the run a paired run against that ref. See [Paired Runs](#paired-runs).
- `--heavy` runs the heavy set of cells in place of the whole matrix. See [Heavy Set](#heavy-set).
- `--memory` runs the scripted memory session and no timed pass. See [Memory Session](#memory-session).

An argument the runner does not know is an error. `--report-only` takes none of `--base`, `--heavy` and `--memory`;
`--memory` takes none of `--dry-run`, `--iterations` and `--warmups`. `--dry-run` with `--base` builds both sides' bundles
and validates the lenses on each, so it shows whether the working tree's benchmark entry still builds against a base.

A run with none of `--base`, `--heavy` and `--memory` is a plain run: the whole matrix on the working tree, one record
under `runs/`, and the trend report rebuilt.

## Paired Runs

`--base <ref>` compares the working tree (the head) with a base ref in one run.

1. The runner adds a detached git worktree of the base in the system temp directory, as `scripts/engine-diff.mjs` does
   (the two share `scripts/base-worktree.mjs`), and removes it when the run ends or is interrupted.
2. It copies the working tree's `src/benchmarks/` into that worktree, so the same benchmark entry runs on both engines,
   and links this checkout's `node_modules` there. The entry imports React and the component tree, so the base needs
   dependencies: a base whose `package-lock.json` differs from the working tree's stops the run with a message.
3. It builds two bundles per side with this checkout's Vite and config: one with the engine's work counters off, which is
   timed, and one with them on, which is not.
4. The timed pass runs in two child processes, one after the other. Each loads both timed bundles and samples every
   case as pairs, one call per side. The base goes first in the first pair and the order swaps with every pair
   (base>head, head>base, base>head, …). Warmup pairs alternate the same way and are counted apart from the measured
   pairs, so the first measured pair is base-first whatever the number of warmups.
   - The first process loads the base's bundle and prepares the base's lenses, cells and setups before the head's. The
     second does the head's first. Two copies of one engine in one process do not time alike, and in a run of a ref
     against itself most cases lean toward one side, which changes with the bundle that was loaded first. The
     alternation of pairs cancels what changes from pair to pair and nothing that lasts a whole process.
   - The measured pairs are shared as evenly as possible, the extra one going to the first process. Each process runs
     every warmup. `--iterations=15` is 8 pairs in the first process and 7 in the second; `--iterations=1` runs the
     first process alone.
   - The pairs of both processes are pooled: a case's `samplesMs` lists the first process's samples and then the
     second's, and `config.timedProcesses` says how many pairs each gave.
5. The untimed pass loads each counting bundle into a child process of its own and calls every case once. It records
   what each case completed and, where that side's engine has them, its work counters. A base that predates
   `src/optics/diagnostics.ts` has none: only the head is counted and the record's `counters.base` is `null`.

The measured passes run in `scripts/benchmark-child.mjs`, in processes that import prebuilt bundles and build nothing.
The process that ran the builds is not measured in: the bundler's objects share V8's shape tree with the engine's, and a
build of a base worktree in the measuring process left `evaluateAperture` deoptimizing in a loop, which slowed the heavy
cases on both sides and made two copies of one engine differ. A plain run still builds and measures in one process, as
it always has.

### Statistic and Verdicts

- The statistic of a case is `median(head) / median(base)` over its measured samples, those of both processes pooled.
- Its 95% interval is a percentile bootstrap over pair indices: 10,000 resamples, drawn by a seeded generator. The seed
  is a constant combined with a hash of the case id, so no two cases share a stream and an interval can be recomputed
  from the record.
- A case is **regressed** when the interval's lower bound exceeds 1.05 **and** the head median exceeds the base median by
  more than 1 ms.
- A case that **threw** on either side, in either process, is listed with its message. The other side is still sampled
  to the end.
- A run with fewer than 9 measured samples per case is a check that the tool works; its summary says so. The plan's
  method asks for at least 2 warmups and 9 samples, and 15 samples for cases above 100 ms. `--iterations=15` with
  `--warmups=2` gives every case that.
- Where both sides are counted, the record lists the cases whose counters differ and those with a counter higher on the
  head. The summary counts the first and names the second.

A run of a ref against itself (`--base HEAD` on a clean tree) checks the tool: no case may be unequal work, none may be
work not verified, and the counters of the two sides must be equal. It also shows the method's own offset: the interval
measures the noise between the pairs it was given and not what differs between two loaded copies of one engine, so some
cases still come out up to a few percent apart with an interval that excludes 1.0, on either side of it. Read the small
ratios of a paired run against that, and run a flagged case again before reading it as a regression.

### What the Work Comparison Checks

A side that gives up early is fast, and its time says nothing about the engine. So each case is also compared by what
it completed, and a case that is **unequal work** is listed with both sides' facts and left out of the regression
verdict and of its category row. Three things are compared.

1. **Status.** Both sides ran, both were skipped for the same reason, or the case is unequal work.
2. **`output`**, what the timed callback returned: counts of rays, samples and surfaces, and a few flags. Four facts
   describe a result and are not compared, because the last bits of a float move them: `imageZ`, `bestFocusZ`, `value`
   and `markupLength`.
3. **Tallies** of the engine results the case computed, taken in the untimed pass. Every member of a result is tallied
   in a way that the last bits of a float cannot move:
   - the length of every list, lists of numbers included;
   - each flag by its value, each status or reason string by its text, and each integer count (a member named
     `…Count`, `…Rays` or `…Size`) by its sum;
   - each member that is null, undefined, `NaN` or infinite;
   - every other number and string as present. What it holds is not read.

   The tallies of one result are summed over its samples, to four levels of nesting; an object below that is tallied
   as present.

A tally that differs makes the case unequal work. So does a member that one side's results have and the other's lack:
it is listed as `present` on one side and `absent` on the other. There is one exception.

- A member the **head** has and the **base** lacks is passed over when the base's results hold the object the member
  would sit in. An object that is there without the member is what a result type with no such member looks like, and a
  head that adds a member to a type has done no less than the base. The comparison cannot tell that from a base that
  left the member out of one result, so it does not trust it silently either: the summary and the record list every
  such member, by category, under "Result members only the head has".
- The same gap the other way round is never passed over. A head whose results lack what the base's have is unequal
  work.

Three kinds of case return too little for the tallies above, and get facts of their own in the untimed pass:

- **`analysis.bestFocus`** returns one position. Its case, and the bokeh pair, the whole analysis and the two totals,
  which solve best focus on the way, tally two things. The untimed pass traces the 44 on-axis profile rays that best
  focus is fitted to, as the solve traces them, and tallies each ray as it tallies any other result: clipped or not,
  at the image plane or not. And it solves once more and tallies whether the answer is the layout's image plane, which
  is what the solve returns when too few rays survive. This runs after the case's counters are read, so the case's
  counters are its own. The ray set is a copy of the engine's list, and a test holds the two equal.
- **`render.aberrationsTab` and `render.comaTab`** compute their data inside the render. The untimed pass hands the tab
  a wrapped analysis context and tallies each data section the tab computes through it, as it tallies any other result.
- **Every render case** tallies the number of elements in its markup, which the printed coordinates do not move.

What the comparison does not check:

- any float. Two sides that trace the same rays to different places are equal work;
- how much the engine computed to reach an outcome. Two sides whose results hold the same counts, flags and statuses
  are equal work, however many surface evaluations or solver steps each took. Only the work counters show that, and a
  base that predates the counters has none to compare;
- that a case traced the rays it should have. The best-focus tally re-traces the ray set and does not watch the solve:
  a solve that traced fewer rays and still returned a focus of its own shows only in the counters too;
- the text of a string that is not a status, and the values inside a list of numbers;
- anything a result holds more than four levels down.

A case with nothing to compare (no `output` fact beyond the four descriptive ones, and no tally both sides hold) is
listed as **work not verified** in the summary and in the record. Its timing is judged like any other, and nothing
vouches for it. No case of the current matrix is in that state, and a tooling test holds one cell of it to that.

### Summary

The run prints a Markdown summary to stdout that can be pasted into a pull request; progress goes to stderr. It starts
with the two PC-Nikkor 19mm rows, `default analysis` and `stopped-close analysis`. A heavy run then lists the main
pipeline cases of each cell, and a run of the whole matrix lists one row per category. Each row has the base median, the
head median, their ratio, the interval and any flags. A "Verdict" section counts the regressed, unequal-work, unverified
and thrown cases, and each kind is then listed, whatever its category: the unequal-work cases with every differing fact
on both sides, and the members only the head's results have.

## Heavy Set

`--heavy` runs seven cells of the matrix, about half of its run time:

- `nikon-pc-nikkor-19mm-f4e-ed` at `default`, `stopped-close` and `interactive-drag`
- `canon-tse-50f28l-macro` at `stopped-close` and `interactive-drag`
- `sony-fe-24-70mm-f28-gm-ii` at `default`
- `fujifilm-gf-20-35mm-f4-r-wr` at `default`

The list is `HEAVY_BENCHMARK_CELLS` in `src/benchmarks/opticsRenderingBenchmark.tsx`, typed against the lens and
scenario lists. A cell runs on the caches the cells before it left, so a heavy record is comparable with other heavy
records and not with the same cells of a full run.

## Memory Session

`--memory` reports the heap a scripted viewer session leaves in use. With `--base` it runs on both sides; with `--heavy`
it uses the heavy set's four lenses, otherwise all fifteen.

- Each side runs in a child process of its own, started with `--expose-gc` and importing one prebuilt bundle. Two
  engines never share a heap, and the build's heap is not counted.
- One cycle builds each lens in turn, sweeps focus, zoom (zoom lenses), aperture and, for perspective-control lenses,
  shift and tilt, one control at a time, computes the diagram rays and the settled analysis at every state, and drops
  every reference to the lens before the next. A session is three cycles.
- The retained heap is read after forced collections before the first cycle, after each cycle and at the end. It is
  `heapUsed` plus `arrayBuffers` of `process.memoryUsage()`. A typed array keeps its numbers in an array buffer, outside
  the JavaScript heap, so `heapUsed` alone does not see a cache of typed arrays. The record holds both figures and their
  sum at every reading, and the comparison uses the sum.
- The summary gives two figures per side: the absolute retained heap at the end, and its growth over the figure before
  the session, with the end figure split into heap and array buffers. The gate (retained heap within 5% of the anchor)
  reads the absolute figure, and the summary prints the head / base ratio of it against the limit of 1.05. The absolute
  figure includes the loaded bundle and its lens catalog, so a base with a different catalog moves it; the growth figure
  does not have that term.

Timed passes never run with `--expose-gc`, and their records say `heapMode: "raw"`. A memory record says
`heapMode: "gc"`. It runs none of the scenarios, so its `config.scenarios` is empty and `config.memorySession` holds
what a session does: the state each lens is set to first, and the values each control is swept through.

## Output Policy

Each plain run writes one machine-readable record:

```text
agent_docs/benchmarks/runs/<timestamp>-<short-sha>.json
```

When the run directory contains 15 or more JSON records, the runner removes the oldest records until 14 remain. Dry runs
do not write or prune files.

The human-readable report is regenerated from the newest 10 run records:

```text
agent_docs/benchmarks/benchmark-report.md
```

Paired, heavy and memory runs write to a second directory:

```text
agent_docs/benchmarks/paired/<timestamp>[-base-<short-sha>]-head-<short-sha>[-heavy][-memory].json
```

- Nothing there is pruned, and the trend report does not read it: a subset of the matrix, or a second side, would skew a
  comparison of whole-matrix medians.
- Commit a record from `paired/` when a plan step or a stage gate asks for one, such as a recorded baseline. Delete the
  records of trial runs.
- These records are written one entry per line; the records under `runs/` stay indented member by member.

Do not hand-edit run JSON files. If report formatting changes, run `npm run benchmark:optics-rendering -- --report-only`
instead of creating another benchmark record.

### Record Schema

Records carry `schemaVersion: 3`. A plain run's record has the shape it had at version 2. A record under `paired/` keeps
the head side where a plain record has its only side, and adds:

- `stats.samplesMs` on every measured entry: the raw samples, warmups excluded, the first timed process's and then the
  second's, each in run order;
- `config.timedProcesses`: the timed processes in the order they ran, each with the side it loaded and prepared first
  and the measured pairs it gave. Pair i of a case came from the first process when i is below that process's `pairs`;
- `work` and `counters` on every entry, from the untimed pass, and the top-level `counters` block naming the counters
  each side's engine has (`null` for a side that was not counted);
- `workTallies`: the tallies that `work` points into. An entry's `work` lists, for each result the case computed, the
  place of that result's tallies in this list. Equal tallies are kept once: the same result is tallied in several
  cases of a cell, and alike on both sides when they completed the same work;
- `base`: the ref as given, its commit, and the base side's `results`, `aberrationPanels` and `summary`;
- `comparison`: the alternation, the bootstrap's resamples and seed, the regression rule, one entry per case and per
  category, and the lists of regressed, unequal-work, unverified (`workNotVerified`) and thrown cases, and of the
  members only the head's results have (`headOnlyMembers`);
- `config.cells` and `config.caseSet` on a subset run;
- `environment.totalMemoryBytes`, `environment.osRelease` and `environment.timedBundleCounters` (always `false`),
  beside the Node, V8, platform, architecture and CPU fields every record has. The sample counts are in `config`;
- `memory` on a memory run, which has no timed results, and `config.memorySession` in place of scenarios.

## MTF Benchmark

The MTF benchmark is separate from render-time analysis. Run it with the TypeScript specifier hook:

```bash
node --import ./scripts/ts-js-specifier-hook-register.mjs scripts/benchmark-mtf.mjs
node --import ./scripts/ts-js-specifier-hook-register.mjs scripts/benchmark-mtf.mjs --method=diffraction --spectrum=photopic --fields=11
node --import ./scripts/ts-js-specifier-hook-register.mjs scripts/benchmark-mtf.mjs --method=diffraction --spectrum=cdf --stopped-down --sweep
node --import ./scripts/ts-js-specifier-hook-register.mjs scripts/benchmark-mtf.mjs --method=diffraction --finite --stopped-down
node --import ./scripts/ts-js-specifier-hook-register.mjs scripts/benchmark-mtf.mjs --iterations=15 --warmups=2 --base d49857ae
```

It warms `--warmups` times (default 1), then reports every one of `--iterations` timing samples (default 3) in run order
(`samplesMs`) and their median at grid caps 32/64/128/256, with the image-height axis and per-field availability and
convergence. `--method` is `geometric` (default) or `diffraction`; `--spectrum` is `reference` (default), `cdf` or
`photopic`. `--fields=N` requests N evenly spaced fractions of the reference image height (default 3; `--sweep` is 9).
`--stopped-down` uses one quarter of the wide-open pupil/stop radii. `--finite` selects the documented GF80mm station.
`--diffraction` and `--cdf` remain aliases. A flag that takes a value takes it after an equals sign or as the next
argument, and an argument the script does not know is an error.

`--base <ref>` is a paired run. The script adds a base worktree, loads the engine from the working tree and from the
worktree into one process, and gives both engines the working tree's prescriptions. Each row is sampled as pairs with
the alternation, statistic, bootstrap and regression rule of the rendering benchmark. A row then also carries the base
side under `base` and a `comparison` with the ratio, its interval and the verdict. A row is unequal work when the two
sides disagree on the support verdict or on a field's status, reason or grid size; an image height and a convergence
delta may differ in their last bits. A paired run also prints a Markdown table to stderr. With fewer than 9 measured
samples per row, no row is marked regressed: the table carries the notice the rendering summary prints, and the JSON
carries it as `comparison.notice`. The script times in one process and has no build step, so it runs with the engine's
counters off and counts nothing.

Redirect stdout to JSON; `mtf-geometric.json`, `mtf-diffraction.json`, `mtf-spectral.json` and `mtf-finite.json` retain
the latest corresponding unpaired measurements, not a branch history. A rejected field is not a completed MTF timing.
Browser interaction timings also include debouncing, worker startup, message transfer and rendering; Node measurements
do not predict mobile latency.

## Coverage

The rendering suite measures 15 representative lenses across four scenarios:

- simple classic prime
- Voigtlander APO-Lanthar 50mm f/2
- compact modern wide/aspheric
- fast high-correction prime
- standard and tele zooms
- macro/focus-heavy lens
- perspective-control wide (Nikon PC Nikkor 19mm f/4E ED)
- perspective-control close-focus macro (Canon TS-E 50mm f/2.8L Macro)
- fisheye/projection path
- large-format wide zoom
- fully Sellmeier-covered complex APO zoom
- Sigma APO Macro 180mm f/2.8 and 150mm f/2.8 heavy macro lenses
- folded mirror/reference path

The scenarios are `default`, `stopped-close`, `tele-dense-chromatic` and `interactive-drag`. `stopped-close` and
`interactive-drag` carry shift and tilt, which move the two perspective-control lenses and leave every other lens
centered; `interactive-drag` also uses reduced analysis sampling to represent slider-drag responsiveness.

Each run records:

- main pipeline categories: `build`, `layout`, `rays`, `analysis`, `svgRender`, `totalCold`, and `totalWarm`
- analysis subcategories for a centered lens: optical summary, distortion curve, distortion field grid, vignetting, pupil
  aberration, bokeh pair, and best focus
- analysis subcategories for a moved lens: perspective focus, field aberrations, chromatic, distortion, vignetting, and
  pupils, which replace the centered ones other than the optical summary
- aberration-panel data categories: spherical aberration, SA profile, SA blur character, field curvature, chromatic field
  curvature, field-curvature bundle, and coma
- aberration-panel render categories: full tabs plus section-level spherical, field curvature, astigmatism, meridional
  coma, sagittal coma, and coma preview rendering
- explicit skips for folded-system sections guarded by the UI, and for the centered sections a moved lens replaces

## Notes

The runner builds the benchmark module through Vite SSR so TypeScript, TSX, React, and `import.meta.glob` catalog imports
resolve the same way they do in the app. It is intentionally opt-in and is not called by `test`, `build`, `lint`,
metadata generation, glass reports, or mirror reports.
