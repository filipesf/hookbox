import { useCallback, useState } from 'react';
import { rerollSlot, rollPitch, type PitchState } from '../core/roll';
import { setSlot } from '../core/setSlot';
import { decodeState } from '../core/share';
import type { LockKey, Locks, SlotKey } from '../core/slots';
import type { PitchData } from '../core/types';

export function usePitchState(data: PitchData) {
  const [pitch, setPitch] = useState<PitchState>(
    () => decodeState(new URLSearchParams(window.location.search).get('p'), data) ?? rollPitch(data, Math.random),
  );
  const [locks, setLocks] = useState<Locks>({});

  const roll = useCallback(() => setPitch((p) => rollPitch(data, Math.random, p, locks)), [data, locks]);
  const reroll = useCallback((key: LockKey) => setPitch((p) => rerollSlot(data, Math.random, p, key)), [data]);
  const toggleLock = useCallback((key: LockKey) => setLocks((l) => ({ ...l, [key]: !l[key] })), []);
  const choose = useCallback((slot: SlotKey, index: number) => {
    setPitch((p) => setSlot(data, p, slot, index));
    setLocks((l) => ({ ...l, [slot]: true }));
  }, [data]);
  const restore = useCallback((state: PitchState) => {
    setPitch(state);
    setLocks({});
  }, []);

  return { pitch, locks, roll, reroll, toggleLock, choose, restore };
}
