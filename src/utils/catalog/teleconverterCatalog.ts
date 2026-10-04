/**
 * Teleconverter catalog — auto-registered from `*.teleconverter.ts` files under src/lens-data.
 *
 * A teleconverter is never a catalog lens: it has no route of its own and only renders mounted on a host. This
 * module pairs converters with host lenses through the single fit predicate and builds the composed prescription
 * the viewer hands to `buildLens()`. Index-style pages must use the generated summaries instead so they do not ship
 * full prescriptions.
 */

import { attachTeleconverter, teleconverterCompatibility } from "../../optics/teleconverter.js";
import type { LensData } from "../../types/optics.js";
import type { TeleconverterData } from "../../types/teleconverter.js";
import { catalogCollator } from "./collation.js";
import { LENS_CATALOG } from "./lensCatalog.js";

export interface TeleconverterOption {
  key: string;
  name: string;
  /** Compact toggle label, e.g. "1.4×". */
  label: string;
  magnification: number;
}

/* Eagerly import every teleconverter file — the glob pattern is relative to this file, like lensCatalog.ts. */
const _modules = import.meta.glob<{ default: TeleconverterData }>("../../lens-data/**/*.teleconverter.ts", {
  eager: true,
});
const TELECONVERTER_CATALOG: Record<string, TeleconverterData> = {};
for (const [path, mod] of Object.entries(_modules)) {
  const data = mod.default;
  if (data?.key) {
    TELECONVERTER_CATALOG[data.key] = data;
  } else {
    console.warn(`[LensVisualizer] Skipped ${path}: no "key" field in default export`);
  }
}

/* Weakest converter first, then by display name, so toggle order is stable across lenses. */
const TELECONVERTER_KEYS: string[] = Object.keys(TELECONVERTER_CATALOG).sort(
  (a, b) =>
    TELECONVERTER_CATALOG[a].magnification - TELECONVERTER_CATALOG[b].magnification ||
    catalogCollator.compare(TELECONVERTER_CATALOG[a].name, TELECONVERTER_CATALOG[b].name),
);

const OPTIONS_BY_LENS = new Map<string, ReadonlyArray<TeleconverterOption>>();

/**
 * Converters that can be mounted on a catalog lens, weakest first.
 *
 * @param lensKey - catalog lens key (a configuration variant key is a lens key too)
 * @returns mountable converters; empty for unknown keys and lenses that take none
 */
function teleconverterOptionsForLens(lensKey: string): ReadonlyArray<TeleconverterOption> {
  const cached = OPTIONS_BY_LENS.get(lensKey);
  if (cached) return cached;
  const host = LENS_CATALOG[lensKey];
  const options: TeleconverterOption[] = [];
  if (host) {
    for (const key of TELECONVERTER_KEYS) {
      const tc = TELECONVERTER_CATALOG[key];
      if (teleconverterCompatibility(host, tc).ok) {
        options.push({ key, name: tc.name, label: `${tc.magnification}×`, magnification: tc.magnification });
      }
    }
  }
  OPTIONS_BY_LENS.set(lensKey, options);
  return options;
}

/**
 * Resolve a requested converter against the lens it should mount on.
 *
 * @param lensKey - catalog lens key the converter would mount on
 * @param requestedKey - converter key from the URL or prior state
 * @returns the key when that converter fits the lens, otherwise null
 */
function resolveTeleconverterKey(lensKey: string, requestedKey: string | null | undefined): string | null {
  if (!requestedKey) return null;
  return teleconverterOptionsForLens(lensKey).some((option) => option.key === requestedKey) ? requestedKey : null;
}

/**
 * Prescription for a lens with an optional converter attached.
 *
 * A converter that does not fit is ignored rather than thrown on, so stale state can never break a lens that
 * renders fine on its own. Composition is not memoized here; callers memoize around `buildLens()`.
 *
 * @param lensKey - catalog lens key
 * @param teleconverterKey - converter key, or null/undefined for the bare lens
 * @returns catalog lens data, or the composed host + converter data
 */
function resolveLensSystemData(lensKey: string, teleconverterKey: string | null | undefined): LensData {
  const host = LENS_CATALOG[lensKey];
  const resolvedKey = resolveTeleconverterKey(lensKey, teleconverterKey);
  return resolvedKey ? attachTeleconverter(host, TELECONVERTER_CATALOG[resolvedKey]) : host;
}

/**
 * Stable identity for a lens-plus-converter system, for keys and resets that must change when either part does.
 *
 * @param lensKey - catalog lens key
 * @param teleconverterKey - converter key, or null/undefined for the bare lens
 * @returns the lens key alone, or `lens+converter`
 */
function lensSystemKey(lensKey: string, teleconverterKey: string | null | undefined): string {
  return teleconverterKey ? `${lensKey}+${teleconverterKey}` : lensKey;
}

export {
  TELECONVERTER_CATALOG,
  TELECONVERTER_KEYS,
  teleconverterOptionsForLens,
  resolveTeleconverterKey,
  resolveLensSystemData,
  lensSystemKey,
};
