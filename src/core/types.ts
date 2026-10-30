export const TAGS = [
  'cozy',
  'horror',
  'comedic',
  'grim',
  'solo',
  'multiplayer',
  'fast',
  'slow',
] as const;

export type Tag = (typeof TAGS)[number];

export type Entry = { text: string; tags?: Tag[] };

export type TitleWords = { adjectives: string[]; nouns: string[] };

export type PitchData = {
  genres: Entry[];
  premises: Entry[];
  hooks: Entry[];
  combos: Entry[];
  twists: Entry[];
  artStyles: Entry[];
  platforms: Entry[];
  playerCounts: Entry[];
  scopes: Entry[];
  titles: TitleWords;
};
