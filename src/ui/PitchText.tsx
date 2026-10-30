import { article } from '../core/article';
import { slotText } from '../core/format';
import type { PitchState } from '../core/roll';
import type { LockKey, Locks, SlotKey } from '../core/slots';
import { renderTitle } from '../core/title';
import type { PitchData } from '../core/types';
import { Token } from './Token';

type Props = {
  data: PitchData;
  pitch: PitchState;
  locks: Locks;
  onReroll: (slot: LockKey) => void;
  onToggleLock: (slot: LockKey) => void;
};

export function PitchText({ data, pitch, locks, onReroll, onToggleLock }: Props) {
  const slot = (key: SlotKey, suffix?: string) => (
    <Token slot={key} suffix={suffix} text={slotText(data, pitch, key)} locked={!!locks[key]} onReroll={onReroll} onToggleLock={onToggleLock} />
  );
  const a = (key: SlotKey) => `${article(slotText(data, pitch, key))} `;
  return (
    <p className="pitch">
      <Token
        slot="title"
        variant="title"
        text={renderTitle(data.titles, pitch.title)}
        locked={!!locks.title}
        onReroll={onReroll}
        onToggleLock={onToggleLock}
      />{' '}
      is {a('genre')}
      {slot('genre')} about {slot('premise', ',')} where {slot('hook', '.')}
      <br />
      It's like {a('comboA')}
      {slot('comboA')} meets {a('comboB')}
      {slot('comboB', ',')} but {slot('twist', '.')}
    </p>
  );
}
