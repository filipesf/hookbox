/** Letters whose spoken name starts with a vowel sound (eff, aitch, em, en, ess, ex...). */
const VOWEL_SOUND_LETTERS = 'AEFHILMNORSX';
const SILENT_H = /^(hour|honest|honou?r|heir)/i;
const YOO_SOUND = /^(uni(?!n)|use|usu|uti|ubiq|eu|one|once|ewe)/i;

function firstToken(phrase: string): string {
  return phrase.trim().split(/[\s-]+/)[0] ?? '';
}

function acronymTakesAn(token: string): boolean {
  return VOWEL_SOUND_LETTERS.includes(token.charAt(0));
}

function numberTakesAn(token: string): boolean {
  return /^(8|11|18)(\D|$)/.test(token);
}

export function article(phrase: string): 'a' | 'an' {
  const token = firstToken(phrase).replace(/^[^A-Za-z0-9]+/, '');
  if (token === '') return 'a';
  if (/^[A-Z]{2,}s?$/.test(token)) return acronymTakesAn(token) ? 'an' : 'a';
  if (/^\d/.test(token)) return numberTakesAn(token) ? 'an' : 'a';
  if (SILENT_H.test(token)) return 'an';
  if (YOO_SOUND.test(token)) return 'a';
  return /^[aeiou]/i.test(token) ? 'an' : 'a';
}

export function withArticle(phrase: string): string {
  return `${article(phrase)} ${phrase}`;
}
