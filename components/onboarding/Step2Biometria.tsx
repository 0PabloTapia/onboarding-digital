"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { drawFakeIdFrame } from "@/lib/onboarding/drawFakeId";

type CameraStatus = "idle" | "loading" | "active" | "error" | "demo";

interface Props {
  active: boolean;
  onLivenessChange: (ok: boolean) => void;
  onIdPhotoChange: (ok: boolean) => void;
}

export default function Step2Biometria({
  active,
  onLivenessChange,
  onIdPhotoChange,
}: Props) {
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>("idle");
  const [liveMsg, setLiveMsg] = useState("Busca buena iluminación y mira a la cámara.");
  const [idMsg, setIdMsg] = useState("Enfoca el anverso de tu cédula o pasaporte.");
  const [livenessOk, setLivenessOk] = useState(false);
  const [idPhotoOk, setIdPhotoOk] = useState(false);
  const [showLivenessOverlay, setShowLivenessOverlay] = useState(false);
  const [showIdCanvas, setShowIdCanvas] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const idCanvasRef = useRef<HTMLCanvasElement>(null);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  useEffect(() => {
    if (!active) stopCamera();
  }, [active, stopCamera]);

  const startCamera = useCallback(async () => {
    setCameraStatus("loading");
    setLiveMsg("Iniciando cámara…");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraStatus("active");
      setLiveMsg("Cámara lista. Puedes iniciar la prueba de vida.");
    } catch {
      setCameraStatus("error");
      setLiveMsg("No se pudo acceder a la cámara. Usa 'Demostración'.");
    }
  }, []);

  const runLivenessCheck = useCallback(() => {
    setShowLivenessOverlay(true);
    setTimeout(() => {
      setShowLivenessOverlay(false);
      setLiveMsg("✓ Prueba de vida completada.");
      setLivenessOk(true);
      onLivenessChange(true);
      setIdMsg("Toca 'Tomar foto del documento' cuando estés listo.");
      setShowIdCanvas(true);
    }, 2200);
  }, [onLivenessChange]);

  const captureIdPhoto = useCallback(() => {
    const canvas = idCanvasRef.current;
    const video = videoRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (video && cameraStatus === "active") {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    } else {
      drawFakeIdFrame(ctx, canvas.width, canvas.height);
    }
    setIdPhotoOk(true);
    onIdPhotoChange(true);
    setShowIdCanvas(false);
    stopCamera();
    setCameraStatus("idle");
    setIdMsg("✓ Documento capturado correctamente.");
  }, [cameraStatus, stopCamera, onIdPhotoChange]);

  const startDemo = useCallback(() => {
    setCameraStatus("demo");
    setLiveMsg("Modo demostración: simulando verificación…");
    setTimeout(() => {
      setLivenessOk(true);
      onLivenessChange(true);
      setLiveMsg("✓ Prueba de vida completada (demo).");
      setIdPhotoOk(true);
      onIdPhotoChange(true);
      setIdMsg("✓ Documento capturado (demo).");
    }, 1500);
  }, [onLivenessChange, onIdPhotoChange]);

  return (
    <section
      className="card card--wide"
      hidden={!active}
      aria-labelledby="step2-title"
    >
      <h2 className="card__title" id="step2-title">
        Verifica tu identidad
      </h2>

      <div className="bio-grid">
        {/* Column 1: Liveness */}
        <div className="bio-block">
          <p className="bio-block__title">1. Prueba de vida</p>
          <div className="bio-cam">
            <video
              ref={videoRef}
              className="bio-cam__video"
              muted
              playsInline
              hidden={cameraStatus !== "active"}
            />
            {cameraStatus !== "active" && (
              <div className="bio-cam__placeholder" aria-hidden>
                <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                  <circle cx="24" cy="24" r="22" stroke="#b0bec5" strokeWidth="2" />
                  <circle cx="24" cy="20" r="7" stroke="#b0bec5" strokeWidth="2" />
                  <path d="M10 38c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#b0bec5" strokeWidth="2" />
                </svg>
                {livenessOk && (
                  <span style={{ color: "#2e7d32", fontWeight: 700, marginTop: "0.4rem" }}>
                    ✓ Completado
                  </span>
                )}
              </div>
            )}
            {showLivenessOverlay && (
              <div className="bio-cam__overlay">
                <span className="bio-cam__ok">Mira a la cámara…</span>
              </div>
            )}
          </div>
          <p className="bio-hint" role="status" aria-live="polite">{liveMsg}</p>
          <div className="bio-actions">
            {cameraStatus === "idle" && !livenessOk && (
              <button type="button" className="btn btn--secondary" onClick={startCamera}>
                Iniciar cámara
              </button>
            )}
            {cameraStatus === "active" && !livenessOk && (
              <button type="button" className="btn btn--primary" onClick={runLivenessCheck}>
                Iniciar liveness
              </button>
            )}
            {(cameraStatus === "idle" || cameraStatus === "error") && !livenessOk && (
              <button type="button" className="btn btn--ghost" onClick={startDemo}>
                Demostración
              </button>
            )}
          </div>
        </div>

        {/* Column 2: ID Photo */}
        <div className="bio-block">
          <p className="bio-block__title">2. Foto del documento</p>
          <div className="bio-cam bio-cam--id">
            {!showIdCanvas && !idPhotoOk && (
              <div className="bio-id__mock">
                <div className="bio-id__chip" />
                <div className="bio-id__line" />
                <div className="bio-id__line" />
                <div className="bio-id__line bio-id__line--short" />
                <p className="bio-id__text">Anverso de tu cédula o pasaporte</p>
              </div>
            )}
            {idPhotoOk && !showIdCanvas && (
              <div className="bio-cam__placeholder" aria-hidden>
                <span style={{ color: "#2e7d32", fontWeight: 700 }}>✓ Capturado</span>
              </div>
            )}
            {showIdCanvas && (
              <canvas
                ref={idCanvasRef}
                className="bio-cam__canvas"
                width={320}
                height={200}
                aria-label="Vista previa del documento"
              />
            )}
          </div>
          <p className="bio-hint" role="status" aria-live="polite">{idMsg}</p>
          <div className="bio-actions">
            {livenessOk && !idPhotoOk && cameraStatus === "active" && (
              <button type="button" className="btn btn--primary" onClick={captureIdPhoto}>
                Tomar foto del documento
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
