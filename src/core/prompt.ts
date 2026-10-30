import { article } from './article';
import { slotText } from './format';
import { renderTitle } from './title';
import type { PitchState } from './roll';
import type { PitchData } from './types';

export function formatPrompt(data: PitchData, state: PitchState): string {
  const text = (slot: Parameters<typeof slotText>[2]) => slotText(data, state, slot);
  const a = (slot: Parameters<typeof slotText>[2]) => `${article(text(slot))} ${text(slot)}`;
  const title = renderTitle(data.titles, state.title);
  return [
    'You are a senior game designer. Expand the concept below into a one-page game design document.',
    '',
    '## Concept spec',
    `- Title: ${title}`,
    `- Genre: ${text('genre')}`,
    `- Premise: ${text('premise')}`,
    `- Hook: ${text('hook')}`,
    `- Comparison: ${a('comboA')} meets ${a('comboB')}`,
    `- Twist: ${text('twist')}`,
    `- Art style: ${text('artStyle')}`,
    `- Platform: ${text('platform')}`,
    `- Players: ${text('playerCount')}`,
    `- Scope: ${text('scope')}`,
    '',
    '## Deliver',
    '1. Core loop (30s / 5min / session)',
    '2. Key mechanics and how the hook drives them',
    '3. Progression',
    '4. Art & audio direction',
    '5. MVP scope for the stated scope',
    '6. Top 3 design risks',
  ].join('\n');
}
