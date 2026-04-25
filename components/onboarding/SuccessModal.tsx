interface Props {
  onRestart: () => void;
}

export default function SuccessModal({ onRestart }: Props) {
  return (
    <div className="modal" role="presentation">
      <div
        className="modal__box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
      >
        <h2 className="modal__title" id="success-title">
          ¡Listo! Alta iniciada
        </h2>
        <p className="modal__text">
          Completaste el flujo de prueba. En un entorno productivo se
          confirmaría el número de trámite y el siguiente paso a seguir.
        </p>
        <button
          type="button"
          className="btn btn--primary"
          onClick={onRestart}
        >
          Empezar de nuevo
        </button>
      </div>
    </div>
  );
}
