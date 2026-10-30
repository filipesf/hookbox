import type { PitchState } from '../core/roll';
import { EXTRA_SLOTS, type LockKey, type Locks, type SlotKey } from '../core/slots';
import type { PitchData } from '../core/types';
import { ExtraSelect } from './ExtraSelect';

type Props = {
  data: PitchData;
  pitch: PitchState;
  locks: Locks;
  onChoose: (slot: SlotKey, index: number) => void;
  onReroll: (slot: LockKey) => void;
  onToggleLock: (slot: LockKey) => void;
};

export function Chips({ data, pitch, locks, onChoose, onReroll, onToggleLock }: Props) {
  return (
    <ul className="chips">
      {EXTRA_SLOTS.map((slot) => (
        <li key={slot} className="chips__item">
          <ExtraSelect
            data={data}
            slot={slot}
            value={pitch.picks[slot]}
            locked={!!locks[slot]}
            onChoose={onChoose}
            onReroll={onReroll}
            onToggleLock={onToggleLock}
          />
        </li>
      ))}
    </ul>
  );
}
