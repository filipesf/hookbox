import { describe, expect, it } from 'vitest';
import { fixtureData } from './fixtures';
import { formatPrompt } from './prompt';
import { createRng } from './rng';
import { rollPitch } from './roll';
import { slotText } from './format';
import { renderTitle } from './title';
import { article } from './article';

describe('formatPrompt', () => {
  it('returns the full LLM prompt for a pitch', () => {
    const state = rollPitch(fixtureData, createRng('prompt'));
    const t = (slot: Parameters<typeof slotText>[2]) => slotText(fixtureData, state, slot);
    const a = (slot: Parameters<typeof slotText>[2]) => `${article(t(slot))} ${t(slot)}`;
    const expected = `You are a senior game designer. Expand the concept below into a one-page game design document.

## Concept spec
- Title: ${renderTitle(fixtureData.titles, state.title)}
- Genre: ${t('genre')}
- Premise: ${t('premise')}
- Hook: ${t('hook')}
- Comparison: ${a('comboA')} meets ${a('comboB')}
- Twist: ${t('twist')}
- Art style: ${t('artStyle')}
- Platform: ${t('platform')}
- Players: ${t('playerCount')}
- Scope: ${t('scope')}

## Deliver
1. Core loop (30s / 5min / session)
2. Key mechanics and how the hook drives them
3. Progression
4. Art & audio direction
5. MVP scope for the stated scope
6. Top 3 design risks`;
    expect(formatPrompt(fixtureData, state)).toBe(expected);
  });
});
