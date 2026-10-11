export interface EngineDiffOptions {
  base: string;
  tier: string;
  changeClass: string;
  lens: string | null;
  exceptions: string | null;
  out: string | null;
}

export const USAGE: string;

export function parseArgs(argv: readonly string[]): EngineDiffOptions;

export function runEngineDiff(
  options: EngineDiffOptions,
  log?: (line: string) => void,
  warn?: (line: string) => void,
): Promise<{ passed: boolean; outDir: string }>;
