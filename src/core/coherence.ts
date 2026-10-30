import { randomIndex, type Rng } from './rng';
import type { Entry, Tag } from './types';

const CONFLICT_PAIRS: ReadonlyArray<readonly [Tag, Tag]> = [
  ['cozy', 'horror'],
  ['cozy', 'grim'],
  ['comedic', 'grim'],
  ['solo', 'multiplayer'],
  ['fast', 'slow'],
];

export function tagsConflict(a: Tag, b: Tag): boolean {
  return CONFLICT_PAIRS.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}

export function conflictsWithPicked(tags: Tag[] | undefined, picked: ReadonlySet<Tag>): boolean {
  if (!tags) return false;
  return tags.some((tag) => [...picked].some((other) => tagsConflict(tag, other)));
}

/**
 * Picks an index from `pool`, avoiding entries that conflict with `picked` tags.
 * Falls back to the whole pool if filtering would leave nothing.
 * `excluded` (e.g. the other combo) is avoided whenever another choice exists.
 */
export function pickIndex(
  pool: Entry[],
  picked: ReadonlySet<Tag>,
  rng: Rng,
  excluded?: number,
): number {
  const everything = pool.map((_, index) => index);
  const withoutExcluded = everything.filter((index) => index !== excluded);
  const base = withoutExcluded.length > 0 ? withoutExcluded : everything;
  const coherent = base.filter((index) => !conflictsWithPicked(pool[index]?.tags, picked));
  const candidates = coherent.length > 0 ? coherent : base;
  return candidates[randomIndex(rng, candidates.length)] ?? 0;
}
