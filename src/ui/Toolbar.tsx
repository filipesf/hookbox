type Props = {
  isFavourite: boolean;
  status: string;
  onRoll: () => void;
  onCopyText: () => void;
  onCopyPrompt: () => void;
  onCopyLink: () => void;
  onToggleFavourite: () => void;
};

export function Toolbar({ isFavourite, status, onRoll, onCopyText, onCopyPrompt, onCopyLink, onToggleFavourite }: Props) {
  return (
    <div className="toolbar">
      <button type="button" className="btn btn--roll" onClick={onRoll}>
        Roll <span className="btn__hint">space</span>
      </button>
      <div className="toolbar__row">
        <button type="button" className="btn" onClick={onCopyText}>Copy text</button>
        <button type="button" className="btn" onClick={onCopyPrompt}>Copy prompt</button>
        <button type="button" className="btn" onClick={onCopyLink}>Copy link</button>
        <button type="button" className="btn" aria-pressed={isFavourite} onClick={onToggleFavourite}>
          {isFavourite ? 'Favourited' : 'Favourite'}
        </button>
      </div>
      <p className="toolbar__status" role="status">{status}</p>
    </div>
  );
}
