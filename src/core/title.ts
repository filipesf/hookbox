import { randomIndex, type Rng } from './rng';
import type { TitleWords } from './types';

export const TITLE_PATTERNS = [
  'adjNoun',
  'nounOfNoun',
  'theNoun',
  'nounColonAdjNoun',
  'noun',
] as const;

/** Indices into TITLE_PATTERNS and the title word lists. */
export type TitleSpec = {
  pattern: number;
  adjective: number;
  noun: number;
  secondNoun: number;
};

export function generateTitle(words: TitleWords, rng: Rng): TitleSpec {
  const noun = randomIndex(rng, words.nouns.length);
  let secondNoun = randomIndex(rng, words.nouns.length);
  if (words.nouns.length > 1 && secondNoun === noun) {
    secondNoun = (noun + 1 + randomIndex(rng, words.nouns.length - 1)) % words.nouns.length;
  }
  return {
    pattern: randomIndex(rng, TITLE_PATTERNS.length),
    adjective: randomIndex(rng, words.adjectives.length),
    noun,
    secondNoun,
  };
}

export function renderTitle(words: TitleWords, spec: TitleSpec): string {
  const adjective = words.adjectives[spec.adjective] ?? '';
  const noun = words.nouns[spec.noun] ?? '';
  const secondNoun = words.nouns[spec.secondNoun] ?? '';
  switch (TITLE_PATTERNS[spec.pattern]) {
    case 'nounOfNoun':
      return `${noun} of ${secondNoun}`;
    case 'theNoun':
      return `The ${noun}`;
    case 'nounColonAdjNoun':
      return `${noun}: ${adjective} ${secondNoun}`;
    case 'noun':
      return noun;
    default:
      return `${adjective} ${noun}`;
  }
}
