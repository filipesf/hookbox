import { describe, expect, it } from 'vitest';
import { dedupe, pushUnique, toggleUnique } from './uniqueList';

describe('pushUnique', () => {
  it('adds a new code at the top', () => expect(pushUnique(['a', 'b'], 'c', 5)).toEqual(['c', 'a', 'b']));
  it('moves an existing code to the top', () => expect(pushUnique(['a', 'b', 'c'], 'c', 5)).toEqual(['c', 'a', 'b']));
  it('keeps a code already on top', () => expect(pushUnique(['a', 'b'], 'a', 5)).toEqual(['a', 'b']));
  it('respects the cap', () => expect(pushUnique(['a', 'b', 'c'], 'd', 3)).toEqual(['d', 'a', 'b']));
  it('cleans stored duplicates', () => expect(pushUnique(['a', 'a', 'b'], 'c', 5)).toEqual(['c', 'a', 'b']));
});

describe('dedupe', () => {
  it('keeps the first occurrence', () => expect(dedupe(['a', 'b', 'a', 'a', 'c', 'b'], 10)).toEqual(['a', 'b', 'c']));
  it('applies the cap', () => expect(dedupe(['a', 'b', 'c'], 2)).toEqual(['a', 'b']));
});

describe('toggleUnique', () => {
  it('adds when missing', () => expect(toggleUnique(['a'], 'b', 5)).toEqual(['b', 'a']));
  it('removes when present', () => expect(toggleUnique(['a', 'b'], 'a', 5)).toEqual(['b']));
});
