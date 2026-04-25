export default function PepNotice() {
  return (
    <div className="pep" role="complementary" aria-label="Aviso PEP">
      <span className="pep__icon" aria-hidden>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 9.5v5h3.5l5.5 4.5V5L6.5 9.5H3z"
            fill="#1565c0"
            stroke="#1565c0"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          <path
            d="M15.5 8.5a5 5 0 010 7"
            stroke="#1565c0"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M18 6a8.5 8.5 0 010 12"
            stroke="#1976d2"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />
        </svg>
      </span>
      <p>
        Este producto <strong>no considera a personas PEP</strong> (Persona
        Políticamente Expuesta). Si estás dentro de esta categoría, te
        recomendamos acercarte a una de nuestras sucursales para solicitar tu
        producto.
      </p>
    </div>
  );
}
