import type { Entry, PitchData } from './types';

export const SLOT_ORDER = [
  'genre',
  'premise',
  'hook',
  'comboA',
  'comboB',
  'twist',
  'artStyle',
  'platform',
  'playerCount',
  'scope',
] as const;

export type SlotKey = (typeof SLOT_ORDER)[number];
export type LockKey = SlotKey | 'title';
export type Locks = Partial<Record<LockKey, boolean>>;

export const EXTRA_SLOTS = ['artStyle', 'platform', 'playerCount', 'scope'] as const;

type PoolKey = Exclude<keyof PitchData, 'titles'>;

const POOL_KEY: Record<SlotKey, PoolKey> = {
  genre: 'genres',
  premise: 'premises',
  hook: 'hooks',
  comboA: 'combos',
  comboB: 'combos',
  twist: 'twists',
  artStyle: 'artStyles',
  platform: 'platforms',
  playerCount: 'playerCounts',
  scope: 'scopes',
};

export function poolFor(data: PitchData, slot: SlotKey): Entry[] {
  return data[POOL_KEY[slot]];
}

/** Builds a record by visiting slots in SLOT_ORDER, so `build` may depend on earlier results. */
export function mapSlots<T>(build: (slot: SlotKey) => T): Record<SlotKey, T> {
  const result = {} as Record<SlotKey, T>;
  for (const slot of SLOT_ORDER) result[slot] = build(slot);
  return result;
}
