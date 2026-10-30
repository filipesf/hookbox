import { describe, expect, it } from 'vitest';
import { fixtureData } from './fixtures';
import { createRng } from './rng';
import { rollPitch } from './roll';
import { setSlot } from './setSlot';
import { SLOT_ORDER } from './slots';

describe('setSlot', () => {
  const first = rollPitch(fixtureData, createRng('set'));

  it('changes only the chosen slot', () => {
    const next = setSlot(fixtureData, first, 'platform', 1);
    expect(next.picks.platform).toBe(1);
    expect(next.title).toEqual(first.title);
    for (const slot of SLOT_ORDER.filter((s) => s !== 'platform')) expect(next.picks[slot]).toBe(first.picks[slot]);
  });

  it('ignores out-of-range indices', () => {
    expect(setSlot(fixtureData, first, 'scope', 99)).toBe(first);
    expect(setSlot(fixtureData, first, 'scope', -1)).toBe(first);
  });

  it('a chosen slot survives a locked roll and steers coherence', () => {
    const chosen = setSlot(fixtureData, first, 'playerCount', 0);
    const rng = createRng('after');
    for (let i = 0; i < 50; i++) {
      const next = rollPitch(fixtureData, rng, chosen, { playerCount: true });
      expect(next.picks.playerCount).toBe(0);
    }
  });
});
