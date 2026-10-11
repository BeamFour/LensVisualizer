/**
 * Engine differential driver.
 *
 * Compares what the optics engine returns at a base ref with what it returns in the working tree, for one tier of
 * requests, under a declared change class. It adds a detached git worktree at the base in the system temp
 * directory, copies the working tree's `src/benchmarks/engineDiff/` into it, bundles the capture entry once per
 * side with this checkout's Vite, and then captures and compares one lens at a time:
 *
 * - engine drift: every head prescription on the base engine and on the head engine, under the class;
 * - a format-only data change (the prescription differs, its semantic fingerprint does not): the base and head
 *   prescriptions on the head engine, which must be bit-identical in every class;
 * - a semantic data change or a new lens: the same pair as an impact report, which blocks only on a new failed
 *   status, a newly non-finite value, or a lens that no longer builds;
 * - a lens the base engine cannot build is uncompared, and the uncompared lenses must be exactly the exceptions
 *   declared in the file given as `--exceptions`.
 *
 * Converter pairs are requested for every pair either engine's fit predicate permits for the head's prescriptions,
 * and the two engines must permit the same ones. A pair the base engine cannot compose and build, while the head
 * engine can, is uncompared instead, and one that only the head's prescriptions permit is compared as a new lens.
 * A record that throws on both engines fails the run in any class.
 *
 * It writes gzip NDJSON payloads under `<out>/payloads/` and the small files under `<out>/reports/`: summary.json,
 * summary.md, data-impact.md, uncompared.json and failing-records.ndjson.gz. Nothing it writes belongs in the
 * repository. The exit code is 0 when the run passes and 1 when it fails or cannot run. Told to stop by SIGINT or
 * SIGTERM, it removes its base worktree and its temporary directories first.
 *
 * Usage:
 *   node scripts/engine-diff.mjs --base <ref> [--tier p] [--class c0|c1|c2|c3] [--lens <id>]
 *     [--exceptions <file>] [--out <dir>]
 */

import { execFileSync } from "node:child_process";
import { once } from "node:events";
import {
  appendFileSync,
  cpSync,
  createWriteStream,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import { join, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { pathToFileURL } from "node:url";
import { createGzip } from "node:zlib";
import { build } from "vite";

const ROOT = join(import.meta.dirname, "..");
const HARNESS_DIR = join("src", "benchmarks", "engineDiff");
const CAPTURE_ENTRY = join(HARNESS_DIR, "captureEntry.ts");

const TIERS = ["p", "s", "f"];
/* Tiers S and F, and the shards that split them across runners, arrive with their request lists in S1.P2.T3. */
const DEFINED_TIERS = ["p"];
const CHANGE_CLASSES = ["c0", "c1", "c2", "c3"];
/* Failing record pairs go to reports/, which CI uploads; past this much text the rest are counted, not written. */
const MAX_FAILING_RECORD_BYTES = 32 * 1024 * 1024;
const PROGRESS_EVERY_LENSES = 100;

export const USAGE =
  "usage: node scripts/engine-diff.mjs --base <ref> [--tier p|s|f] [--class c0|c1|c2|c3] [--shard i/n] " +
  "[--lens <id>] [--exceptions <file>] [--out <dir>]";

const VALUE_FLAGS = ["base", "tier", "class", "shard", "lens", "exceptions", "out"];

/**
 * Parse the command line.
 *
 * @param {readonly string[]} argv - arguments after the script name; a value follows its flag or an "="
 * @returns {{ base: string, tier: string, changeClass: string, lens: string | null, exceptions: string | null,
 *   out: string | null }} the options, with tier "p" and class "c0" when not given
 * @throws when an argument is unknown, a value is missing or invalid, or a tier or shard is not defined yet
 */
export function parseArgs(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    const equals = arg.indexOf("=");
    const name = arg.startsWith("--") ? arg.slice(2, equals < 0 ? undefined : equals) : "";
    if (!VALUE_FLAGS.includes(name)) throw new Error(`Unknown engine-diff argument: ${arg}\n${USAGE}`);
    const value = equals < 0 ? argv[++index] : arg.slice(equals + 1);
    if (value === undefined || value === "") throw new Error(`--${name} needs a value.\n${USAGE}`);
    values[name] = value;
  }
  const { base, tier = "p", class: changeClass = "c0", shard, lens = null, exceptions = null, out = null } = values;
  if (!base) throw new Error(`--base <ref> is required.\n${USAGE}`);
  if (!TIERS.includes(tier)) throw new Error(`--tier must be one of ${TIERS.join(", ")}.`);
  if (!CHANGE_CLASSES.includes(changeClass)) throw new Error(`--class must be one of ${CHANGE_CLASSES.join(", ")}.`);
  if (shard !== undefined) {
    const [, part, parts] = /^(\d+)\/(\d+)$/.exec(shard) ?? [];
    if (!(Number(part) >= 1 && Number(part) <= Number(parts))) throw new Error("--shard must be i/n with 1 <= i <= n.");
    throw new Error("--shard is not defined yet: S1.P2.T3 adds it with tiers s and f.");
  }
  if (!DEFINED_TIERS.includes(tier)) throw new Error(`--tier ${tier} is not defined yet: S1.P2.T3 adds tiers s and f.`);
  return { base, tier, changeClass, lens, exceptions, out };
}

/* ── Git ── */

function git(args) {
  return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

/** Resolve the base to a commit: the ref as given, then the same name on origin (a CI checkout has no local main). */
function resolveBaseCommit(ref) {
  for (const candidate of [ref, `origin/${ref}`]) {
    try {
      return git(["rev-parse", "--verify", "--quiet", "--end-of-options", `${candidate}^{commit}`]);
    } catch {
      /* Not a commit under this name; try the next. */
    }
  }
  throw new Error(`engine-diff: cannot resolve the base ref "${ref}" (tried ${ref} and origin/${ref}).`);
}

function lockfileUnchangedSince(commit) {
  try {
    git(["diff", "--quiet", commit, "--", "package-lock.json"]);
    return true;
  } catch {
    return false;
  }
}

/**
 * Base worktrees of other runs that git still has registered: left behind by a run that was killed outright, or in
 * use by a run going on now. This run only reports them. Which of the two one is, only a person can tell.
 *
 * @returns {string[]} their paths
 */
function otherBaseWorktrees() {
  return git(["worktree", "list", "--porcelain"])
    .split("\n")
    .filter((line) => line.startsWith("worktree "))
    .map((line) => line.slice("worktree ".length))
    .filter((path) => /[\\/]engine-diff-base-[^\\/]+[\\/]tree$/.test(path));
}

/**
 * Check the base out as a detached worktree outside the repository, where no linter, test run or `git status`
 * of this checkout sees it, and put the working tree's harness in it.
 *
 * @param {string} commit - the base commit
 * @returns {{ worktree: string, remove: () => void }} the worktree's path and its cleanup
 */
function addBaseWorktree(commit) {
  /* Resolved, because the temp directory is a symlink on macOS and git records the real path. */
  const parent = realpathSync(mkdtempSync(join(os.tmpdir(), "engine-diff-base-")));
  const worktree = join(parent, "tree");
  try {
    git(["worktree", "add", "--detach", worktree, commit]);
  } catch (error) {
    rmSync(parent, { recursive: true, force: true });
    const detail = String(error?.stderr ?? error?.message ?? error).trim();
    throw new Error(`engine-diff: git worktree add failed: ${detail}`, { cause: error });
  }
  const remove = () => {
    try {
      /* --force, because the copied harness is untracked there. Only this worktree: never prune the others. */
      git(["worktree", "remove", "--force", worktree]);
    } catch (error) {
      console.error(`engine-diff: could not remove the worktree ${worktree}: ${error?.message ?? error}`);
    }
    rmSync(parent, { recursive: true, force: true });
  };
  try {
    /* The capture graph imports no package, so the base builds without node_modules either way. They are linked
     * when the lockfile is unchanged, so that anything resolved from the base tree finds the dependencies that
     * tree was written against. */
    const nodeModules = join(ROOT, "node_modules");
    if (existsSync(nodeModules) && lockfileUnchangedSince(commit)) {
      symlinkSync(realpathSync(nodeModules), join(worktree, "node_modules"), "dir");
    }
    /* The base may predate the harness or hold an older one; both engines run the working tree's. */
    rmSync(join(worktree, HARNESS_DIR), { recursive: true, force: true });
    cpSync(join(ROOT, HARNESS_DIR), join(worktree, HARNESS_DIR), { recursive: true });
  } catch (error) {
    remove();
    throw error;
  }
  return { worktree, remove };
}

/* ── Capture bundles ── */

/**
 * Bundle a tree's capture entry and load it.
 *
 * No config file is read: the base's own may not build under this checkout's dependencies, and the entry needs
 * none. `public/` is not copied, and every import is bundled so the output loads from a directory with no
 * node_modules.
 *
 * @param {string} root - the tree to build: this checkout, or the base worktree
 * @param {string} outDir - an empty directory for the bundle
 * @returns {Promise<Record<string, Function>>} the built capture module
 */
async function loadCapture(root, outDir) {
  await build({
    configFile: false,
    root,
    /* The compile-time flag of the engine's work counters, which a capture build runs with. A tree that never
     * names the flag is unaffected. */
    define: { __OPTICS_COUNTERS__: "true" },
    build: {
      ssr: join(root, CAPTURE_ENTRY),
      outDir,
      emptyOutDir: true,
      copyPublicDir: false,
      rollupOptions: { output: { format: "es" } },
    },
    ssr: { noExternal: true },
    logLevel: "warn",
  });
  /* The extension follows the root's package.json ("type": "module" gives .js), so the name is read, not assumed. */
  const bundles = readdirSync(outDir).filter((name) => /\.m?js$/.test(name));
  if (bundles.length !== 1) {
    throw new Error(`engine-diff: expected one capture bundle in ${outDir}, found ${bundles.join(", ") || "none"}.`);
  }
  return import(pathToFileURL(join(outDir, bundles[0])).href);
}

/* ── Output ── */

function openGzipLines(path) {
  const gzip = createGzip();
  const written = pipeline(gzip, createWriteStream(path));
  /* A failed write is reported where it is awaited, by `close`; until then it must not count as unhandled. */
  written.catch(() => {});
  return {
    async write(lines) {
      if (lines.length > 0 && !gzip.write(`${lines.join("\n")}\n`)) await once(gzip, "drain");
    },
    async close() {
      gzip.end();
      await written;
    },
  };
}

/* Wall time is reported per phase in this order. The captures, the comparison and the writing alternate lens by
 * lens, so each of those is a total over the run. */
const PHASES = [
  "Base worktree",
  "Capture bundles",
  "Catalogs and fingerprints",
  "Capture on the base engine",
  "Capture on the head engine",
  "Capture of base data on the head engine",
  "Comparison",
  "Writing payloads",
];

function createPhaseClock() {
  const milliseconds = new Map(PHASES.map((phase) => [phase, 0]));
  const add = (phase, started) => milliseconds.set(phase, milliseconds.get(phase) + performance.now() - started);
  return {
    time(phase, work) {
      const started = performance.now();
      try {
        return work();
      } finally {
        add(phase, started);
      }
    },
    async timeAsync(phase, work) {
      const started = performance.now();
      try {
        return await work();
      } finally {
        add(phase, started);
      }
    },
    seconds: () => [...milliseconds].map(([phase, elapsed]) => [phase, elapsed / 1000]),
  };
}

/* ── Interruption ── */

/**
 * Clean up when the process is told to stop, as a run cleans up when it ends.
 *
 * @param {() => void} cleanUp - removes what the run made outside its output directory
 * @returns {() => void} takes the handlers off again
 */
function cleanUpOnSignal(cleanUp) {
  const handlers = ["SIGINT", "SIGTERM"].map((signal) => {
    const handler = () => {
      console.error(`engine-diff: ${signal} received, removing the base worktree and temporary directories.`);
      cleanUp();
      /* The status a shell reports for a process a signal ended: 128 plus the signal's number. */
      process.exit(128 + os.constants.signals[signal]);
    };
    process.once(signal, handler);
    return [signal, handler];
  });
  return () => {
    for (const [signal, handler] of handlers) process.removeListener(signal, handler);
  };
}

/* A signal handler runs between turns of the event loop, and a capture is one long synchronous turn that the
 * awaits around it do not end: a write that needs no drain resolves in the same turn. The run therefore yields a
 * turn before each capture, and acts on a signal within the time the capture of one lens takes. */
const nextTurn = () => new Promise((resolve) => setImmediate(resolve));

/* ── The run ── */

/**
 * Run one differential comparison and write its reports.
 *
 * @param {ReturnType<typeof parseArgs>} options - parsed command line
 * @param {(line: string) => void} [log] - progress and result lines
 * @param {(line: string) => void} [warn] - warnings, which are no part of the result
 * @returns {Promise<{ passed: boolean, outDir: string }>} the verdict and where the output is
 */
export async function runEngineDiff(options, log = console.log, warn = console.error) {
  const started = performance.now();
  const clock = createPhaseClock();
  const baseCommit = resolveBaseCommit(options.base);
  const headCommit = git(["rev-parse", "HEAD"]);
  const uncommittedChanges = git(["status", "--porcelain"]) !== "";
  const declaredText = options.exceptions ? readFileSync(resolve(options.exceptions), "utf8") : "";

  const outDir = options.out ? resolve(options.out) : mkdtempSync(join(os.tmpdir(), "engine-diff-"));
  const payloadsDir = join(outDir, "payloads");
  const reportsDir = join(outDir, "reports");
  mkdirSync(payloadsDir, { recursive: true });
  mkdirSync(reportsDir, { recursive: true });
  const bundlesDir = mkdtempSync(join(os.tmpdir(), "engine-diff-bundles-"));

  log(
    `engine-diff: base ${baseCommit.slice(0, 9)} (${options.base}) against the working tree at ${headCommit.slice(0, 9)}`,
  );
  for (const path of otherBaseWorktrees()) {
    warn(
      `engine-diff: warning: the base worktree of another run is registered at ${path}. If no run is using it, ` +
        `remove it with: git worktree remove --force ${path}`,
    );
  }
  let base;
  const cleanUp = () => {
    base?.remove();
    rmSync(bundlesDir, { recursive: true, force: true });
  };
  const forgetSignals = cleanUpOnSignal(() => {
    cleanUp();
    /* An output directory the run made for itself holds half a run, and nothing has named it yet. */
    if (!options.out) rmSync(outDir, { recursive: true, force: true });
  });
  try {
    base = clock.time("Base worktree", () => addBaseWorktree(baseCommit));
    log(`engine-diff: base worktree ${base.worktree}`);
    const [headCapture, baseCapture] = await clock.timeAsync("Capture bundles", async () => [
      await loadCapture(ROOT, join(bundlesDir, "head")),
      await loadCapture(base.worktree, join(bundlesDir, "base")),
    ]);

    /* Both catalogs are fingerprinted by the head's rules: under two sets of rules equal data could look changed. */
    const { headCatalog, baseCatalog, changes, pairs } = clock.time("Catalogs and fingerprints", () => {
      const head = headCapture.exportCatalog();
      const baseSide = baseCapture.exportCatalog();
      const catalogChanges = headCapture.classifyCatalogChanges(
        baseSide,
        head,
        headCapture.fingerprintCatalog(baseSide),
        headCapture.fingerprintCatalog(head),
      );
      /* The fit predicate is engine code. Each engine answers for the head's prescriptions, and the head engine
       * for the base's as well, which shows a pair that the data gained or lost. */
      const permitted = {
        headEngine: headCapture.permittedPairs(head),
        baseEngine: baseCapture.permittedPairs(head),
        baseData: headCapture.permittedPairs(baseSide),
      };
      /* The base engine may predate the form a head prescription is written in. Each engine is asked to compose
       * and build every one of those pairs, once. A pair the base engine cannot build and the head engine can is
       * set aside as uncompared and not read as a difference between the two predicates. That is decided here, for
       * the whole tier, so a narrowed run that never meets the pair lists it as this run does. */
      const either = [...permitted.headEngine, ...permitted.baseEngine];
      const unbuilt = {
        headEngine: headCapture.unbuiltPairs(head, either),
        baseEngine: baseCapture.unbuiltPairs(head, either),
      };
      return {
        headCatalog: head,
        baseCatalog: baseSide,
        changes: catalogChanges,
        pairs: headCapture.comparePermittedPairs({ ...permitted, unbuilt }, catalogChanges),
      };
    });

    /* One request list for both engines, from the head's prescriptions and every pair either engine permits for
     * them: a pair one engine lost is still asked of both, and that engine throws on it. A changed or new lens, and
     * each pair of a changed or new host or converter, goes through every request of the tier, not only the rows
     * that cover every lens. */
    const requestsByLens = new Map();
    const tierRequests = headCapture.tierRequests(options.tier, {
      ...headCapture.requestCatalog({ ...headCatalog, pairs: pairs.requested }),
      changedLensKeys: Object.keys(changes.lenses),
      changedTeleconverterKeys: Object.keys(changes.teleconverters),
    });
    for (const request of tierRequests) {
      const id = headCapture.lensId(request.lens);
      if (options.lens !== null && id !== options.lens) continue;
      if (!requestsByLens.has(id)) requestsByLens.set(id, []);
      requestsByLens.get(id).push(request);
    }
    if (requestsByLens.size === 0) {
      throw new Error(`engine-diff: tier ${options.tier} has no request for the lens "${options.lens}".`);
    }

    const run = headCapture.createDifferentialRun({
      changeClass: options.changeClass,
      declaredExceptions: headCapture.parseDeclaredExceptions(declaredText),
      restricted: options.lens !== null,
      pairs: pairs.differences,
    });
    const payloads = {
      baseEngine: openGzipLines(join(payloadsDir, "base-engine.ndjson.gz")),
      headEngine: openGzipLines(join(payloadsDir, "head-engine.ndjson.gz")),
      baseData: openGzipLines(join(payloadsDir, "base-data.ndjson.gz")),
    };
    const failingRecords = openGzipLines(join(reportsDir, "failing-records.ndjson.gz"));
    const failingRecordCounts = { written: 0, bytes: 0, omitted: 0 };

    /* One lens at a time, written out before the next is captured: a tier is hundreds of megabytes per side. */
    let done = 0;
    for (const [lens, requests] of requestsByLens) {
      /* A pair the base's prescriptions do not permit is new: the base data has nothing to set it beside. */
      const dataChange = headCapture.dataChangeOf(changes, requests[0].lens, pairs.differences.headDataOnly);
      await nextTurn();
      const baseEngine = clock.time("Capture on the base engine", () =>
        baseCapture.captureRecords(headCatalog, requests),
      );
      await nextTurn();
      const headEngine = clock.time("Capture on the head engine", () =>
        headCapture.captureRecords(headCatalog, requests),
      );
      const baseData =
        dataChange === "format" || dataChange === "semantic"
          ? clock.time("Capture of base data on the head engine", () =>
              headCapture.captureRecords(baseCatalog, requests),
            )
          : null;
      const output = clock.time("Comparison", () =>
        run.addLens({ lens, dataChange, baseEngine, headEngine, baseData }),
      );
      await clock.timeAsync("Writing payloads", async () => {
        await payloads.baseEngine.write(output.lines.baseEngine);
        await payloads.headEngine.write(output.lines.headEngine);
        await payloads.baseData.write(output.lines.baseData);
        for (const line of output.failingRecords) {
          if (failingRecordCounts.bytes + line.length > MAX_FAILING_RECORD_BYTES) {
            failingRecordCounts.omitted++;
            continue;
          }
          failingRecordCounts.written++;
          failingRecordCounts.bytes += line.length;
          await failingRecords.write([line]);
        }
      });
      if (++done % PROGRESS_EVERY_LENSES === 0) log(`engine-diff: ${done} of ${requestsByLens.size} lenses`);
    }
    await clock.timeAsync("Writing payloads", async () => {
      await Promise.all([...Object.values(payloads), failingRecords].map((file) => file.close()));
    });

    const summary = run.finish();
    const context = {
      tier: options.tier,
      base: { ref: options.base, commit: baseCommit },
      head: { commit: headCommit, uncommittedChanges },
      lens: options.lens,
      removed: [...changes.removedLenses, ...changes.removedTeleconverters],
      teleconverters: changes.teleconverters,
      phases: [...clock.seconds(), ["Total", (performance.now() - started) / 1000]],
    };
    const markdown = headCapture.renderSummaryMarkdown(summary, context);
    const report = {
      ...context,
      changes,
      failingRecords: failingRecordCounts,
      /* Which export each engine capability resolved to, per side: a renamed seam shows here. */
      seam: { base: baseCapture.describeSeam(), head: headCapture.describeSeam() },
      ...summary,
    };
    writeFileSync(join(reportsDir, "summary.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
    writeFileSync(join(reportsDir, "summary.md"), markdown, "utf8");
    writeFileSync(join(reportsDir, "data-impact.md"), headCapture.renderDataImpactMarkdown(summary, context), "utf8");
    writeFileSync(join(reportsDir, "uncompared.json"), `${JSON.stringify(summary.uncompared, null, 2)}\n`, "utf8");
    if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${markdown}\n`, "utf8");

    const { engine, counts } = summary;
    log(
      `engine-diff: ${summary.passed ? "passed" : "FAILED"} (tier ${options.tier}, class ${options.changeClass}): ` +
        `${summary.lenses} lenses, ${engine.records} records and ${engine.numbers} numbers compared, ` +
        `${engine.recordsDiffering} records differ; rays ok/clipped/failed ` +
        `${counts.headEngine.rays.ok}/${counts.headEngine.rays.clipped}/${counts.headEngine.rays.failed}.`,
    );
    for (const failure of summary.failures) log(`engine-diff: ${failure}`);
    for (const warning of summary.warnings) warn(`engine-diff: warning: ${warning}`);
    const digests = engine.differences.digest;
    if (digests > 0 && (options.changeClass === "c1" || options.changeClass === "c2")) {
      warn(
        `engine-diff: warning: ${digests} changed trace digests in ${engine.digests.lenses.length} lenses were not ` +
          `budgeted under ${options.changeClass}; see "Not budgeted" in summary.md.`,
      );
    }
    if (failingRecordCounts.omitted > 0) {
      log(
        `engine-diff: ${failingRecordCounts.omitted} failing record pairs are in the payloads only, past the size cap.`,
      );
    }
    log(`engine-diff: reports in ${reportsDir}`);
    return { passed: summary.passed, outDir };
  } finally {
    forgetSignals();
    cleanUp();
  }
}

async function main() {
  const { passed } = await runEngineDiff(parseArgs(process.argv.slice(2)));
  return passed ? 0 : 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  /* The exit code is set rather than forced, so the last log lines reach a pipe before the process ends. */
  main().then(
    (exitCode) => {
      process.exitCode = exitCode;
    },
    (error) => {
      console.error(error instanceof Error ? error.message : error);
      process.exitCode = 1;
    },
  );
}
