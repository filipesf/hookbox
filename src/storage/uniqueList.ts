/** Removes repeated codes, keeping the first occurrence (the most recent) and applying the cap. */
export function dedupe(list: readonly string[], cap: number): string[] {
  return [...new Set(list)].slice(0, cap);
}

/** Puts `code` at the top of the list, moving it if already present, and applies the cap. */
export function pushUnique(list: readonly string[], code: string, cap: number): string[] {
  return list[0] === code ? dedupe(list, cap) : dedupe([code, ...list], cap);
}

/** Adds `code` at the top, or removes it if already present. */
export function toggleUnique(list: readonly string[], code: string, cap: number): string[] {
  return list.includes(code) ? list.filter((c) => c !== code) : pushUnique(list, code, cap);
}
