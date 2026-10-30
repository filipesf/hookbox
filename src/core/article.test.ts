import { describe, expect, it } from 'vitest';
import { withArticle } from './article';

describe('withArticle', () => {
  it.each([
    ['roguelike', 'a roguelike'],
    ['action game', 'an action game'],
    ['hour of dread', 'an hour of dread'],
    ['honest mistake', 'an honest mistake'],
    ['unicorn farm', 'a unicorn farm'],
    ['user interface', 'a user interface'],
    ['one-button runner', 'a one-button runner'],
    ['uninhabited island', 'an uninhabited island'],
    ['umbrella shop', 'an umbrella shop'],
    ['MMO', 'an MMO'],
    ['FPS', 'an FPS'],
    ['RPG', 'an RPG'],
    ['UI puzzle', 'a UI puzzle'],
    ['8-bit platformer', 'an 8-bit platformer'],
    ['2D brawler', 'a 2D brawler'],
    ['heist movie', 'a heist movie'],
  ])('%s -> %s', (phrase, expected) => {
    expect(withArticle(phrase)).toBe(expected);
  });
});
