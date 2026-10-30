import type { Entry, PitchData } from './types';

const plain = (...texts: string[]): Entry[] => texts.map((text) => ({ text }));

export const fixtureData: PitchData = {
  genres: [{ text: 'roguelike deckbuilder' }, { text: 'farming sim', tags: ['cozy', 'slow'] }, { text: 'survival horror', tags: ['horror'] }],
  premises: plain('a lighthouse keeper', 'an exiled chef', 'two rival wizards'),
  hooks: [{ text: 'every card ages you', tags: ['grim'] }, { text: 'time runs backwards' }],
  combos: plain('heist movie', 'farming sim', 'dating show', 'tax audit'),
  twists: [{ text: 'the crops are the alarm', tags: ['comedic'] }, { text: 'nobody is real' }],
  artStyles: plain('pixel art', 'watercolour'),
  platforms: plain('PC', 'Switch'),
  playerCounts: [{ text: 'single player', tags: ['solo'] }, { text: '4-player co-op', tags: ['multiplayer'] }],
  scopes: plain('jam-sized', 'AAA'),
  titles: { adjectives: ['Hollow', 'Quiet', 'Last'], nouns: ['Tide', 'Ember', 'Crown', 'Orchard'] },
};

/** Every entry carries a conflicting tag pair to exercise the fallback path. */
export const conflictingData: PitchData = {
  ...fixtureData,
  genres: [{ text: 'grim thing', tags: ['grim'] }],
  premises: [{ text: 'a cosy thing', tags: ['cozy'] }],
};
