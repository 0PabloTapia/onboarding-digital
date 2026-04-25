interface Props {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: Props) {
  return (
    <div className="landing">
      {/* Header */}
      <header className="landing__header">
        <span className="landing__logo" aria-label="BancoCL">
          BancoCL<span className="landing__logo-dot">.</span>
        </span>
      </header>

      {/* Main */}
      <main className="landing__main">
        {/* Left: content */}
        <div className="landing__content">
          <span className="landing__badge">NUEVO</span>

          <h1 className="landing__title">
            Abre tu cuenta 100% online desde donde estés
          </h1>

          <p className="landing__sub">Para contratarla vas a necesitar:</p>

          <ul className="landing__req" aria-label="Requisitos">
            <li className="landing__req-item">
              <span className="landing__req-icon" aria-hidden>
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                  <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="7.5" cy="10" r="2" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M12 8h3M12 12h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
              Cédula de identidad vigente
            </li>
            <li className="landing__req-item">
              <span className="landing__req-icon" aria-hidden>
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                  <rect x="5" y="1" width="10" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="10" cy="16" r="1" fill="currentColor" />
                </svg>
              </span>
              Tu celular con número activo
            </li>
          </ul>

          <button
            type="button"
            className="btn landing__cta"
            onClick={onStart}
          >
            ¡Comencemos!
          </button>
        </div>

        {/* Right: hero photo */}
        <div
          className="landing__hero"
          role="presentation"
          style={{ backgroundImage: "url('/landing-hero-person.png')" }}
        />
      </main>
    </div>
  );
}
