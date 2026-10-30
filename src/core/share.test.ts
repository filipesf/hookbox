import { describe, expect, it } from 'vitest';
import { formatPitchText } from './format';
import { fixtureData } from './fixtures';
import { createRng } from './rng';
import { rollPitch } from './roll';
import { decodeState, encodeState } from './share';

describe('share encoding', () => {
  it('round-trips state', () => {
    const rng = createRng('share');
    for (let i = 0; i < 50; i++) {
      const state = rollPitch(fixtureData, rng);
      expect(decodeState(encodeState(state), fixtureData)).toEqual(state);
    }
  });

  it.each([null, '', 'nonsense', '1.2.3', 'z.z.z.z.z.z.z.z.z.z.z.z.z.z', '0.0.0.0.0.0.0.0.0.0.0.0.0.-1'])(
    'rejects invalid code %s',
    (code) => {
      expect(decodeState(code, fixtureData)).toBeNull();
    },
  );

  it('rejects equal combos', () => {
    const state = rollPitch(fixtureData, createRng('eq'));
    const broken = { ...state, picks: { ...state.picks, comboB: state.picks.comboA } };
    expect(decodeState(encodeState(broken), fixtureData)).toBeNull();
  });
});

describe('formatPitchText', () => {
  it('returns two sentences plus an extras line', () => {
    const lines = formatPitchText(fixtureData, rollPitch(fixtureData, createRng('t'))).split('\n');
    expect(lines).toHaveLength(3);
    expect(lines[0]).toMatch(/ is an? .+ about .+, where .+\.$/);
    expect(lines[1]).toMatch(/^It's like an? .+ meets an? .+, but .+\.$/);
    expect(lines[2]?.split(' · ')).toHaveLength(4);
  });
});
