import { describe, expect, it } from 'vitest';
import { fixtureData } from './fixtures';
import { createRng } from './rng';
import { generateTitle, renderTitle, TITLE_PATTERNS } from './title';

describe('title', () => {
  const words = fixtureData.titles;

  it('is deterministic for a seed', () => {
    expect(generateTitle(words, createRng('x'))).toEqual(generateTitle(words, createRng('x')));
  });

  it('uses every pattern eventually and never repeats a noun in two-noun patterns', () => {
    const rng = createRng('patterns');
    const seen = new Set<number>();
    for (let i = 0; i < 200; i++) {
      const spec = generateTitle(words, rng);
      seen.add(spec.pattern);
      expect(spec.noun).not.toBe(spec.secondNoun);
    }
    expect(seen.size).toBe(TITLE_PATTERNS.length);
  });

  it('renders each pattern', () => {
    const base = { adjective: 0, noun: 0, secondNoun: 1 };
    expect(renderTitle(words, { ...base, pattern: 0 })).toBe('Hollow Tide');
    expect(renderTitle(words, { ...base, pattern: 1 })).toBe('Tide of Ember');
    expect(renderTitle(words, { ...base, pattern: 2 })).toBe('The Tide');
    expect(renderTitle(words, { ...base, pattern: 3 })).toBe('Tide: Hollow Ember');
    expect(renderTitle(words, { ...base, pattern: 4 })).toBe('Tide');
  });
});
