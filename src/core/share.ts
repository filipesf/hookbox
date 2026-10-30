import { TITLE_PATTERNS } from './title';
import { mapSlots, poolFor, SLOT_ORDER } from './slots';
import type { PitchState } from './roll';
import type { PitchData } from './types';

const SEPARATOR = '.';

export function encodeState(state: PitchState): string {
  const { pattern, adjective, noun, secondNoun } = state.title;
  const numbers = [pattern, adjective, noun, secondNoun, ...SLOT_ORDER.map((s) => state.picks[s])];
  return numbers.map((n) => n.toString(36)).join(SEPARATOR);
}

function parseBase36(part: string): number | null {
  return /^[0-9a-z]{1,4}$/.test(part) ? parseInt(part, 36) : null;
}

function inRange(value: number | undefined, length: number): value is number {
  return value !== undefined && value >= 0 && value < length;
}

/** Returns null for anything malformed or out of bounds, so callers can roll fresh. */
export function decodeState(code: string | null | undefined, data: PitchData): PitchState | null {
  if (!code) return null;
  const parts = code.split(SEPARATOR).map(parseBase36);
  if (parts.length !== 4 + SLOT_ORDER.length || parts.some((n) => n === null)) return null;
  const [pattern, adjective, noun, secondNoun, ...slotValues] = parts as number[];
  const { adjectives, nouns } = data.titles;
  if (
    !inRange(pattern, TITLE_PATTERNS.length) ||
    !inRange(adjective, adjectives.length) ||
    !inRange(noun, nouns.length) ||
    !inRange(secondNoun, nouns.length)
  ) {
    return null;
  }
  const picks = mapSlots((slot) => slotValues[SLOT_ORDER.indexOf(slot)] ?? -1);
  const valid = SLOT_ORDER.every((slot) => inRange(picks[slot], poolFor(data, slot).length));
  if (!valid) return null;
  if (data.combos.length > 1 && picks.comboA === picks.comboB) return null;
  return { title: { pattern, adjective, noun, secondNoun }, picks };
}
