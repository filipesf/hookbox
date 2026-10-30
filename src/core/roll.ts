import { pickIndex } from './coherence';
import { generateTitle, type TitleSpec } from './title';
import { mapSlots, poolFor, SLOT_ORDER, type LockKey, type Locks, type SlotKey } from './slots';
import type { Rng } from './rng';
import type { PitchData, Tag } from './types';

export type PitchState = { title: TitleSpec; picks: Record<SlotKey, number> };

function tagsOf(data: PitchData, slot: SlotKey, index: number): Tag[] {
  return poolFor(data, slot)[index]?.tags ?? [];
}

function otherComboIndex(slot: SlotKey, picks: Partial<Record<SlotKey, number>>) {
  if (slot === 'comboA') return picks.comboB;
  if (slot === 'comboB') return picks.comboA;
  return undefined;
}

/** Re-rolls every slot that is not locked. Without `current`, nothing is kept. */
export function rollPitch(
  data: PitchData,
  rng: Rng,
  current?: PitchState,
  locks: Locks = {},
): PitchState {
  const keep = (key: LockKey) => current !== undefined && locks[key] === true;
  const kept: Partial<Record<SlotKey, number>> = {};
  const picked = new Set<Tag>();
  for (const slot of SLOT_ORDER) {
    if (current && keep(slot)) {
      kept[slot] = current.picks[slot];
      tagsOf(data, slot, current.picks[slot]).forEach((tag) => picked.add(tag));
    }
  }
  const chosen: Partial<Record<SlotKey, number>> = { ...kept };
  const picks = mapSlots((slot) => {
    const existing = kept[slot];
    if (existing !== undefined) return existing;
    const index = pickIndex(poolFor(data, slot), picked, rng, otherComboIndex(slot, chosen));
    tagsOf(data, slot, index).forEach((tag) => picked.add(tag));
    chosen[slot] = index;
    return index;
  });
  const title = current && keep('title') ? current.title : generateTitle(data.titles, rng);
  return { title, picks };
}

export function rerollSlot(data: PitchData, rng: Rng, current: PitchState, target: LockKey) {
  const locks: Locks = { title: true };
  for (const slot of SLOT_ORDER) locks[slot] = true;
  locks[target] = false;
  return rollPitch(data, rng, current, locks);
}
