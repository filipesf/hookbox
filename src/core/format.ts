import { article } from './article';
import { poolFor, type SlotKey } from './slots';
import { renderTitle } from './title';
import type { PitchState } from './roll';
import type { PitchData } from './types';

export function slotText(data: PitchData, state: PitchState, slot: SlotKey): string {
  return poolFor(data, slot)[state.picks[slot]]?.text ?? '';
}

export function formatSentences(data: PitchData, state: PitchState): [string, string] {
  const text = (slot: SlotKey) => slotText(data, state, slot);
  const a = (slot: SlotKey) => `${article(text(slot))} ${text(slot)}`;
  const title = renderTitle(data.titles, state.title);
  return [
    `${title} is ${a('genre')} about ${text('premise')}, where ${text('hook')}.`,
    `It's like ${a('comboA')} meets ${a('comboB')}, but ${text('twist')}.`,
  ];
}

export function formatExtras(data: PitchData, state: PitchState): string {
  const text = (slot: SlotKey) => slotText(data, state, slot);
  return `${text('artStyle')} · ${text('platform')} · ${text('playerCount')} · ${text('scope')}`;
}

export function formatPitchText(data: PitchData, state: PitchState): string {
  const [first, second] = formatSentences(data, state);
  return `${first}\n${second}\n${formatExtras(data, state)}`;
}
