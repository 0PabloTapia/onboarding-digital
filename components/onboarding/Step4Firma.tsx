"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type PointerEvent,
} from "react";
import { isCanvasSigned } from "@/lib/onboarding/validation";

interface Props {
  active: boolean;
  onValidChange: (valid: boolean) => void;
}

export default function Step4Firma({ active, onValidChange }: Props) {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [legalAtEnd, setLegalAtEnd] = useState(false);
  const [drawing, setDrawing] = useState(false);

  const signCanvasRef = useRef<HTMLCanvasElement>(null);
  const legalRef = useRef<HTMLDivElement>(null);

  /* Init canvas size when step becomes visible */
  useEffect(() => {
    if (!active) return;
    const canvas = signCanvasRef.current;
    if (!canvas) return;
    setTimeout(() => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    }, 0);
  }, [active]);

  const notifyValid = useCallback(() => {
    onValidChange(acceptTerms && legalAtEnd && isCanvasSigned(signCanvasRef.current));
  }, [acceptTerms, legalAtEnd, onValidChange]);

  useEffect(() => { notifyValid(); }, [notifyValid]);

  const handleLegalScroll = useCallback(() => {
    const el = legalRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 4) setLegalAtEnd(true);
  }, []);

  const getXY = (e: PointerEvent<HTMLCanvasElement>) => {
    const rect = signCanvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = useCallback((e: PointerEvent<HTMLCanvasElement>) => {
    const canvas = signCanvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    setDrawing(true);
    const ctx = canvas.getContext("2d")!;
    const { x, y } = getXY(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, []);

  const draw = useCallback(
    (e: PointerEvent<HTMLCanvasElement>) => {
      if (!drawing) return;
      const canvas = signCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;
      ctx.strokeStyle = "#1a1a2e";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const { x, y } = getXY(e);
      ctx.lineTo(x, y);
      ctx.stroke();
    },
    [drawing]
  );

  const endDraw = useCallback(() => {
    setDrawing(false);
    notifyValid();
  }, [notifyValid]);

  const clearSignature = useCallback(() => {
    const canvas = signCanvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    onValidChange(false);
  }, [onValidChange]);

  return (
    <section className="card" hidden={!active} aria-labelledby="step4-title">
      <h2 className="card__title" id="step4-title">
        Revisa las condiciones y firma
      </h2>

      <div
        ref={legalRef}
        className={`legal-box${legalAtEnd ? " legal-box--ok" : ""}`}
        onScroll={handleLegalScroll}
        tabIndex={0}
        aria-label="Términos y condiciones (desliza hasta el final)"
      >
        <h3 className="legal-box__h">Términos y condiciones</h3>
        <p>
          Al aceptar, declaras bajo juramento que la información proporcionada
          es verídica y que contratas este producto de forma voluntaria. Los
          fondos utilizados provienen de actividades lícitas.
        </p>
        <p>
          El banco se reserva el derecho de verificar los datos entregados y de
          rechazar la solicitud si se detectan inconsistencias. El uso del
          producto queda sujeto a los términos y condiciones generales
          publicados en el sitio web institucional.
        </p>
        <p>
          Esta firma electrónica simple tiene el mismo valor legal que una firma
          manuscrita según la Ley Nº 19.799 de Chile sobre documentos
          electrónicos y firma electrónica.
        </p>
      </div>

      <label className="check-row">
        <input
          type="checkbox"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          disabled={!legalAtEnd}
          aria-label="Acepto los términos y condiciones"
        />
        <span>Acepto los términos y condiciones</span>
      </label>
      {!legalAtEnd && (
        <p className="form-hint">Desliza hasta el final para aceptar</p>
      )}

      <div className="field field--sign">
        <p className="field__label" style={{ marginBottom: "0.3rem" }}>
          Firma aquí:
        </p>
        <div className="sign-box">
          <canvas
            ref={signCanvasRef}
            id="sign-canvas"
            onPointerDown={startDraw}
            onPointerMove={draw}
            onPointerUp={endDraw}
            onPointerLeave={endDraw}
            aria-label="Área de firma electrónica"
          />
          <button
            type="button"
            className="btn btn--ghost sign-box__clear"
            onClick={clearSignature}
          >
            Limpiar
          </button>
        </div>
      </div>
    </section>
  );
}
