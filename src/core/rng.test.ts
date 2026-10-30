import { describe, expect, it } from 'vitest';
import { createRng, mulberry32, seedFromString } from './rng';

describe('rng', () => {
  it('produces the same sequence for the same seed string', () => {
    const a = createRng('hookbox');
    const b = createRng('hookbox');
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  it('differs across seeds and stays within [0, 1)', () => {
    expect(seedFromString('a')).not.toBe(seedFromString('b'));
    const rng = mulberry32(1);
    for (let i = 0; i < 100; i++) {
      const value = rng();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});
