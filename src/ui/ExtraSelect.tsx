import { useId } from 'react';
import { poolFor, type LockKey, type SlotKey } from '../core/slots';
import type { PitchData } from '../core/types';
import { SLOT_LABELS } from './slotLabels';

type Props = {
  data: PitchData;
  slot: SlotKey;
  value: number;
  locked: boolean;
  onChoose: (slot: SlotKey, index: number) => void;
  onReroll: (slot: LockKey) => void;
  onToggleLock: (slot: LockKey) => void;
};

export function ExtraSelect({ data, slot, value, locked, onChoose, onReroll, onToggleLock }: Props) {
  const id = useId();
  const label = SLOT_LABELS[slot];
  return (
    <div className={`extra${locked ? ' is-locked' : ''}`}>
      <label className="extra__label" htmlFor={id}>{label}</label>
      <div className="extra__row">
        <select id={id} className="extra__select" value={value} onChange={(e) => onChoose(slot, Number(e.target.value))}>
          {poolFor(data, slot).map((entry, index) => (
            <option key={entry.text} value={index}>{entry.text}</option>
          ))}
        </select>
        <button type="button" className="extra__btn" onClick={() => onReroll(slot)} aria-label={`Re-roll ${label}`} title={`Re-roll ${label}`}>
          ↻
        </button>
        <button
          type="button"
          className="token__lock"
          aria-pressed={locked}
          aria-label={`Lock ${label}`}
          title={`Lock ${label}`}
          onClick={() => onToggleLock(slot)}
        />
      </div>
    </div>
  );
}
