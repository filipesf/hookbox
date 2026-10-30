import artStyles from './data/artStyles.json';
import combos from './data/combos.json';
import genres from './data/genres.json';
import hooks from './data/hooks.json';
import platforms from './data/platforms.json';
import playerCounts from './data/playerCounts.json';
import premises from './data/premises.json';
import scopes from './data/scopes.json';
import titles from './data/titles.json';
import twists from './data/twists.json';
import { parsePitchData } from './core/validate';

export const pitchData = parsePitchData({
  genres,
  premises,
  hooks,
  combos,
  twists,
  artStyles,
  platforms,
  playerCounts,
  scopes,
  titles,
});
