"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type KeyboardEvent,
  type ClipboardEvent,
  type ChangeEvent,
} from "react";

const PIN_LENGTH = 6;
const RESEND_SECONDS = 30;

interface Props {
  active: boolean;
  onValidChange: (valid: boolean) => void;
}

export default function Step3PinSms({ active, onValidChange }: Props) {
  const [smsSent, setSmsSent] = useState(false);
  const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(""));
  const [pinError, setPinError] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const id = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [countdown]);

  useEffect(() => {
    const filled = pin.join("").length === PIN_LENGTH;
    onValidChange(smsSent && filled && !pinError);
  }, [pin, smsSent, pinError, onValidChange]);

  const sendSms = useCallback(() => {
    setSmsSent(true);
    setPin(Array(PIN_LENGTH).fill(""));
    setPinError(false);
    setCountdown(RESEND_SECONDS);
    onValidChange(false);
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  }, [onValidChange]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, idx: number) => {
      const val = e.target.value.replace(/\D/g, "").slice(-1);
      const next = [...pin];
      next[idx] = val;
      setPin(next);
      setPinError(false);
      if (val && idx < PIN_LENGTH - 1) inputRefs.current[idx + 1]?.focus();
    },
    [pin]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
      if (e.key === "Backspace" && !pin[idx] && idx > 0) {
        inputRefs.current[idx - 1]?.focus();
      }
    },
    [pin]
  );

  const handlePaste = useCallback((e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, PIN_LENGTH)
      .split("");
    const next = Array(PIN_LENGTH).fill("");
    digits.forEach((d, i) => (next[i] = d));
    setPin(next);
    setPinError(false);
    inputRefs.current[Math.min(digits.length, PIN_LENGTH - 1)]?.focus();
  }, []);

  return (
    <section
      className="card pin-step"
      hidden={!active}
      aria-labelledby="step3-title"
    >
      <h2 className="card__title" id="step3-title">
        Verificación por SMS
      </h2>

      {!smsSent ? (
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <p className="card__lead">
            Te enviaremos un código de 6 dígitos al número de teléfono
            registrado en tu cuenta.
          </p>
          <button type="button" className="btn btn--primary pin-send" onClick={sendSms}>
            Enviar código SMS
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p className="pin-step__lead">
            Ingresa el código de 6 dígitos enviado a tu teléfono.
          </p>

          <div
            className="pin-inputs"
            role="group"
            aria-label="Código PIN de 6 dígitos"
          >
            {pin.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className={`pin-digit${digit ? " pin-digit--filled" : ""}${pinError ? " pin-digit--error" : ""}`}
                value={digit}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
                aria-label={`Dígito ${i + 1}`}
                autoComplete="one-time-code"
              />
            ))}
          </div>

          {pinError && (
            <p className="pin-error" role="alert">
              Código incorrecto. Inténtalo de nuevo.
            </p>
          )}

          {pin.join("").length === PIN_LENGTH && !pinError && (
            <p className="sms-success" role="status">
              ✓ Código ingresado correctamente
            </p>
          )}

          <div className="pin-resend">
            {countdown > 0 ? (
              <span>Reenviar código en {countdown}s</span>
            ) : (
              <button
                type="button"
                className="pin-resend__link"
                onClick={sendSms}
              >
                Reenviar código
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
