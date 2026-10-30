import { TAGS, type Entry, type PitchData, type Tag, type TitleWords } from './types';

function isTag(value: unknown): value is Tag {
  return TAGS.some((tag) => tag === value);
}

function isEntry(value: unknown): value is Entry {
  if (typeof value !== 'object' || value === null) return false;
  const { text, tags } = value as { text?: unknown; tags?: unknown };
  if (typeof text !== 'string' || text === '') return false;
  return tags === undefined || (Array.isArray(tags) && tags.every(isTag));
}

export function parseEntries(raw: unknown, name: string): Entry[] {
  if (!Array.isArray(raw) || raw.length === 0 || !raw.every(isEntry)) {
    throw new Error(`Invalid ${name}: expected a non-empty array of { text, tags? }`);
  }
  return raw;
}

function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.every((v) => typeof v === 'string');
}

export function parseTitleWords(raw: unknown): TitleWords {
  const { adjectives, nouns } = (raw ?? {}) as Partial<Record<keyof TitleWords, unknown>>;
  if (!isStringList(adjectives) || !isStringList(nouns)) {
    throw new Error('Invalid titles: expected { adjectives: string[], nouns: string[] }');
  }
  return { adjectives, nouns };
}

export type RawPitchData = Record<Exclude<keyof PitchData, 'titles'>, unknown> & { titles: unknown };

export function parsePitchData(raw: RawPitchData): PitchData {
  return {
    genres: parseEntries(raw.genres, 'genres'),
    premises: parseEntries(raw.premises, 'premises'),
    hooks: parseEntries(raw.hooks, 'hooks'),
    combos: parseEntries(raw.combos, 'combos'),
    twists: parseEntries(raw.twists, 'twists'),
    artStyles: parseEntries(raw.artStyles, 'artStyles'),
    platforms: parseEntries(raw.platforms, 'platforms'),
    playerCounts: parseEntries(raw.playerCounts, 'playerCounts'),
    scopes: parseEntries(raw.scopes, 'scopes'),
    titles: parseTitleWords(raw.titles),
  };
}
