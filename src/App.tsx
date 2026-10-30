import { useCallback, useEffect, useState } from 'react';
import { formatPitchText } from './core/format';
import { formatPrompt } from './core/prompt';
import { encodeState } from './core/share';
import chest from './assets/chest.svg';
import wordmark from './assets/wordmark.svg';
import { pitchData } from './pitchData';
import { usePitchState } from './hooks/usePitchState';
import { useRollHotkey } from './hooks/useRollHotkey';
import { useStoredCodes } from './hooks/useStoredCodes';
import { copyToClipboard, updateShareUrl } from './ui/clipboard';
import { Chips } from './ui/Chips';
import { PitchText } from './ui/PitchText';
import { SavedList } from './ui/SavedList';
import { Toolbar } from './ui/Toolbar';

export function App() {
  const { pitch, locks, roll, reroll, toggleLock, choose, restore } = usePitchState(pitchData);
  const history = useStoredCodes('hookbox.history', 20);
  const favourites = useStoredCodes('hookbox.favourites', 100);
  const [status, setStatus] = useState('');
  const code = encodeState(pitch);
  const { push: pushHistory } = history;

  useRollHotkey(roll);
  useEffect(() => pushHistory(code), [code, pushHistory]);
  useEffect(() => setStatus(''), [code]);

  const copy = useCallback(async (text: string, done: string) => {
    setStatus((await copyToClipboard(text)) ? done : 'Copy failed: clipboard unavailable');
  }, []);

  return (
    <main className="app">
      <h1 className="app__logo">
        <img src={chest} alt="" width={48} height={48} />
        <img src={wordmark} alt="Hookbox" width={190} height={48} />
      </h1>
      {/* Toolbar sits before the stage in the DOM so Roll is the first tab stop; CSS places it at the bottom. */}
      <Toolbar
        isFavourite={favourites.codes.includes(code)}
        status={status}
        onRoll={roll}
        onCopyText={() => copy(formatPitchText(pitchData, pitch), 'Pitch copied')}
        onCopyPrompt={() => copy(formatPrompt(pitchData, pitch), 'Prompt copied')}
        onCopyLink={() => copy(updateShareUrl(code), 'Link copied')}
        onToggleFavourite={() => favourites.toggle(code)}
      />
      <section className="stage">
        <PitchText data={pitchData} pitch={pitch} locks={locks} onReroll={reroll} onToggleLock={toggleLock} />
        <Chips data={pitchData} pitch={pitch} locks={locks} onChoose={choose} onReroll={reroll} onToggleLock={toggleLock} />
      </section>
      <details className="panel">
        <summary className="panel__summary">Favourites · History</summary>
        <SavedList heading="Favourites" emptyText="Nothing saved yet." codes={favourites.codes} data={pitchData} onRestore={restore} onRemove={favourites.remove} />
        <SavedList heading="History" emptyText="Roll to start." codes={history.codes} data={pitchData} onRestore={restore} />
      </details>
    </main>
  );
}
