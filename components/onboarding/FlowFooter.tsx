interface Props {
  onBack: () => void;
  onContinue: () => void;
  canContinue: boolean;
}

export default function FlowFooter({ onBack, onContinue, canContinue }: Props) {
  return (
    <footer className="flow-footer">
      <button type="button" className="back-link" onClick={onBack}>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          width="14"
          height="14"
          aria-hidden
        >
          <path
            d="M10 12L6 8l4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Volver
      </button>

      <button
        type="button"
        className="btn btn--continue"
        onClick={onContinue}
        disabled={!canContinue}
        aria-label="Continuar al siguiente paso"
      >
        <span>Continuar</span>
        <span className="btn--continue__icon" aria-hidden>
          <svg viewBox="0 0 22 22" fill="none" width="22" height="22">
            <circle cx="11" cy="11" r="9.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M9 7.5l4 3.5-4 3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </footer>
  );
}
