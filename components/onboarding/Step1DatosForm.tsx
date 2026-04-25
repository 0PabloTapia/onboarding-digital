"use client";

import { useState, useCallback } from "react";
import type { FormState } from "@/lib/onboarding/types";
import { isDocumentPlausible, isEmailPlausible } from "@/lib/onboarding/validation";

const SEXO_OPTS = ["Masculino", "Femenino", "No binario", "Prefiero no decir"];
const PAIS_OPTS = ["Chile", "Argentina", "Bolivia", "Brasil", "Colombia", "Ecuador", "Paraguay", "Perú", "Uruguay", "Venezuela", "Otro"];
const PROFESION_OPTS = ["Asalariado/a", "Independiente", "Empresario/a", "Estudiante", "Pensionado/a", "Otro"];
const CIVIL_OPTS = ["Soltero/a", "Casado/a", "Conviviente civil", "Divorciado/a", "Viudo/a"];

interface Props {
  active: boolean;
  form: FormState;
  onChange: (key: keyof FormState, value: string) => void;
}

export default function Step1DatosForm({ active, form, onChange }: Props) {
  const [docError, setDocError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleDocBlur = useCallback(() => {
    setDocError(Boolean(form.documento) && !isDocumentPlausible(form.documento));
  }, [form.documento]);

  const handleDocChange = useCallback(
    (v: string) => {
      onChange("documento", v);
      if (docError && isDocumentPlausible(v)) setDocError(false);
    },
    [docError, onChange]
  );

  return (
    <section className="card" hidden={!active} aria-labelledby="step1-title">
      <h2 className="card__title" id="step1-title">
        Ingresa tus datos
      </h2>

      <div className="info-banner">
        Documento <strong>vigente</strong> requerido
      </div>

      <form className="form" noValidate>
        {/* Row 1: Documento + Sexo */}
        <div className="form__row">
          <div className={`field${docError ? " field--error" : ""}`}>
            <div className="field__label-row">
              <label className="field__label" htmlFor="documento">
                Nº de documento
              </label>
              <button
                type="button"
                className="field__hint"
                aria-expanded={tooltipOpen}
                aria-controls="doc-tooltip"
                onClick={() => setTooltipOpen((o) => !o)}
              >
                ?
              </button>
            </div>
            {tooltipOpen && (
              <div id="doc-tooltip" className="field__tooltip" role="tooltip">
                Ingresa el número sin puntos ni guion. Ejemplo: 12345678
              </div>
            )}
            <input
              id="documento"
              className="field__input"
              type="text"
              inputMode="numeric"
              placeholder="Ej: 12345678"
              value={form.documento}
              onChange={(e) => handleDocChange(e.target.value)}
              onBlur={handleDocBlur}
              autoComplete="off"
            />
            {docError && (
              <span className="field__error" role="alert">
                <span className="field__error-icon" aria-hidden>!</span>
                Número de documento incorrecto
              </span>
            )}
          </div>

          <div className="field">
            <label className="field__label" htmlFor="sexo">
              Sexo registral
            </label>
            <div className="field__select-wrap">
              <select
                id="sexo"
                className="field__input field__input--select"
                value={form.sexo}
                onChange={(e) => onChange("sexo", e.target.value)}
              >
                <option value="">Selecciona tu sexo</option>
                {SEXO_OPTS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <span className="field__chev" aria-hidden />
            </div>
          </div>
        </div>

        {/* Row 2: País de nacimiento + Nacionalidad */}
        <div className="form__row">
          <div className="field">
            <label className="field__label" htmlFor="pais-nac">
              País de nacimiento
            </label>
            <div className="field__select-wrap">
              <select
                id="pais-nac"
                className="field__input field__input--select"
                value={form.paisNac}
                onChange={(e) => onChange("paisNac", e.target.value)}
              >
                <option value="">Selecciona tu país</option>
                {PAIS_OPTS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <span className="field__chev" aria-hidden />
            </div>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="nacionalidad">
              Nacionalidad
            </label>
            <div className="field__select-wrap">
              <select
                id="nacionalidad"
                className="field__input field__input--select"
                value={form.nacionalidad}
                onChange={(e) => onChange("nacionalidad", e.target.value)}
              >
                <option value="">Selecciona tu nacionalidad</option>
                {PAIS_OPTS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <span className="field__chev" aria-hidden />
            </div>
          </div>
        </div>

        {/* Row 3: Profesión + Estado civil */}
        <div className="form__row">
          <div className="field">
            <label className="field__label" htmlFor="profesion">
              Ocupación / Profesión
            </label>
            <div className="field__select-wrap">
              <select
                id="profesion"
                className="field__input field__input--select"
                value={form.profesion}
                onChange={(e) => onChange("profesion", e.target.value)}
              >
                <option value="">Selecciona tu profesión</option>
                {PROFESION_OPTS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <span className="field__chev" aria-hidden />
            </div>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="estado-civil">
              Estado civil
            </label>
            <div className="field__select-wrap">
              <select
                id="estado-civil"
                className="field__input field__input--select"
                value={form.estadoCivil}
                onChange={(e) => onChange("estadoCivil", e.target.value)}
              >
                <option value="">Selecciona tu estado civil</option>
                {CIVIL_OPTS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <span className="field__chev" aria-hidden />
            </div>
          </div>
        </div>

        {/* Row 4: Ingreso + Email */}
        <div className="form__row">
          <div className="field">
            <label className="field__label" htmlFor="ingreso">
              Ingreso mensual estimado (CLP)
            </label>
            <input
              id="ingreso"
              className="field__input"
              type="text"
              inputMode="numeric"
              placeholder="Ej. 500000"
              value={form.ingreso}
              onChange={(e) => onChange("ingreso", e.target.value)}
            />
          </div>

          <div className={`field${emailError ? " field--error" : ""}`}>
            <label className="field__label" htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              className="field__input"
              type="email"
              inputMode="email"
              placeholder="ejemplo@correo.com"
              value={form.email}
              onChange={(e) => {
                onChange("email", e.target.value);
                if (emailError && isEmailPlausible(e.target.value)) setEmailError(false);
              }}
              onBlur={() => setEmailError(Boolean(form.email) && !isEmailPlausible(form.email))}
              autoComplete="email"
            />
            {emailError && (
              <span className="field__error" role="alert">
                <span className="field__error-icon" aria-hidden>!</span>
                Correo electrónico inválido
              </span>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
