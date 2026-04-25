const STEPS = ["Datos", "Biometría", "Verificación", "Firma"] as const;

interface Props {
  currentStep: number;
}

export default function StepperNav({ currentStep }: Props) {
  return (
    <nav className="stepper" aria-label="Progreso de registro">
      <div className="stepper__track" role="list">
        {STEPS.map((label, i) => {
          const step = i + 1;
          const active = currentStep === step;
          return (
            <div key={step} style={{ display: "contents" }}>
              <button
                type="button"
                className={`stepper__item${active ? " stepper__item--active" : ""}`}
                disabled
                role="listitem"
                aria-current={active ? "step" : undefined}
              >
                <span className="stepper__num">{step}</span>
                <span className="stepper__label">{label}</span>
              </button>
              {i < 3 && <div className="stepper__line" aria-hidden />}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
