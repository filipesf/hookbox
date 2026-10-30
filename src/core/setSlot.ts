import type { PitchState } from './roll';
import { poolFor, type SlotKey } from './slots';
import type { PitchData } from './types';

/** Sets one slot to a chosen index. Out-of-range indices leave the state unchanged. */
export function setSlot(data: PitchData, current: PitchState, slot: SlotKey, index: number): PitchState {
  if (!Number.isInteger(index) || index < 0 || index >= poolFor(data, slot).length) return current;
  return { ...current, picks: { ...current.picks, [slot]: index } };
}
