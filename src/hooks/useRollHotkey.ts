import { useEffect } from 'react';

const INTERACTIVE = 'button, a, input, textarea, select';

/** Space rolls, unless focus is on something that already uses Space. */
export function useRollHotkey(roll: () => void) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space' || event.repeat) return;
      if (event.target instanceof Element && event.target.closest(INTERACTIVE)) return;
      event.preventDefault();
      roll();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [roll]);
}
