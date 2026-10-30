import { slotText } from '../core/format';
import type { PitchState } from '../core/roll';
import { decodeState } from '../core/share';
import { renderTitle } from '../core/title';
import type { PitchData } from '../core/types';

type Props = {
  heading: string;
  emptyText: string;
  codes: string[];
  data: PitchData;
  onRestore: (state: PitchState) => void;
  onRemove?: (code: string) => void;
};

export function SavedList({ heading, emptyText, codes, data, onRestore, onRemove }: Props) {
  const items = codes.flatMap((code) => {
    const state = decodeState(code, data);
    return state ? [{ code, state }] : [];
  });
  return (
    <section className="saved">
      <h2 className="saved__heading">{heading}</h2>
      {items.length === 0 ? (
        <p className="saved__empty">{emptyText}</p>
      ) : (
        <ul className="saved__list">
          {items.map(({ code, state }) => (
            <li key={code} className="saved__item">
              <button type="button" className="saved__restore" onClick={() => onRestore(state)}>
                <strong>{renderTitle(data.titles, state.title)}</strong>
                <span>{slotText(data, state, 'genre')}</span>
              </button>
              {onRemove && (
                <button type="button" className="saved__remove" aria-label="Remove favourite" title="Remove favourite" onClick={() => onRemove(code)}>
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
