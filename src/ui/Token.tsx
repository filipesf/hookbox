import type { LockKey } from '../core/slots';
import { SLOT_LABELS } from './slotLabels';

type Props = {
  slot: LockKey;
  text: string;
  locked: boolean;
  variant?: 'inline' | 'title' | 'chip';
  /** Punctuation rendered inside the label so it can never wrap away from the text. */
  suffix?: string;
  onReroll: (slot: LockKey) => void;
  onToggleLock: (slot: LockKey) => void;
};

export function Token({ slot, text, locked, variant = 'inline', suffix, onReroll, onToggleLock }: Props) {
  const label = SLOT_LABELS[slot];
  return (
    <span className={`token token--${variant}${locked ? ' is-locked' : ''}`}>
      <button type="button" className="token__text" onClick={() => onReroll(slot)} title={`Re-roll ${label}`}>
        <span className="token__label">{text}{suffix}</span>
      </button>
      <button
        type="button"
        className="token__lock"
        aria-pressed={locked}
        aria-label={`Lock ${label}`}
        title={`Lock ${label}`}
        onClick={() => onToggleLock(slot)}
      />
    </span>
  );
}
