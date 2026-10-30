import { describe, expect, it } from 'vitest';
import { conflictsWithPicked } from './coherence';
import { conflictingData, fixtureData } from './fixtures';
import { createRng } from './rng';
import { rerollSlot, rollPitch } from './roll';
import { poolFor, SLOT_ORDER } from './slots';

describe('rollPitch', () => {
  it('is deterministic for the same seed', () => {
    expect(rollPitch(fixtureData, createRng('s'))).toEqual(rollPitch(fixtureData, createRng('s')));
  });

  it('always picks different combos', () => {
    const rng = createRng('combos');
    for (let i = 0; i < 200; i++) {
      const { picks } = rollPitch(fixtureData, rng);
      expect(picks.comboA).not.toBe(picks.comboB);
    }
  });

  it('keeps locked slots and the locked title on re-roll', () => {
    const rng = createRng('locks');
    const first = rollPitch(fixtureData, rng);
    for (let i = 0; i < 50; i++) {
      const next = rollPitch(fixtureData, rng, first, { genre: true, hook: true, title: true });
      expect(next.picks.genre).toBe(first.picks.genre);
      expect(next.picks.hook).toBe(first.picks.hook);
      expect(next.title).toEqual(first.title);
    }
  });

  it('rerollSlot changes only the targeted slot', () => {
    const rng = createRng('single');
    const first = rollPitch(fixtureData, rng);
    for (let i = 0; i < 50; i++) {
      const next = rerollSlot(fixtureData, rng, first, 'twist');
      expect(next.title).toEqual(first.title);
      for (const slot of SLOT_ORDER.filter((s) => s !== 'twist')) {
        expect(next.picks[slot]).toBe(first.picks[slot]);
      }
    }
  });

  it('filters out entries that conflict with locked tags', () => {
    const rng = createRng('conflict');
    const horror = rollPitch(fixtureData, rng);
    const locked = { ...horror, picks: { ...horror.picks, genre: 2 } };
    for (let i = 0; i < 100; i++) {
      const next = rollPitch(fixtureData, rng, locked, { genre: true });
      const cozyEntries = SLOT_ORDER.filter(
        (slot) => poolFor(fixtureData, slot)[next.picks[slot]]?.tags?.includes('cozy'),
      );
      expect(cozyEntries).toEqual([]);
    }
  });

  it('never yields tag conflicts when a coherent choice exists', () => {
    const rng = createRng('coherent');
    for (let i = 0; i < 200; i++) {
      const { picks } = rollPitch(fixtureData, rng);
      const tags = SLOT_ORDER.flatMap((slot) => poolFor(fixtureData, slot)[picks[slot]]?.tags ?? []);
      const seen = new Set<(typeof tags)[number]>();
      for (const tag of tags) {
        expect(conflictsWithPicked([tag], seen)).toBe(false);
        seen.add(tag);
      }
    }
  });

  it('falls back to the full pool when filtering empties it', () => {
    const state = rollPitch(conflictingData, createRng('fallback'));
    expect(state.picks.genre).toBe(0);
    expect(state.picks.premise).toBe(0);
  });
});
