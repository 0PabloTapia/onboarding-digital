import type { FormState } from "./types";

export function isDocumentPlausible(v: string): boolean {
  if (!v || v.trim().length < 1) return false;
  return v.replace(/\D/g, "").length >= 7;
}

export function isCanvasSigned(canvas: HTMLCanvasElement | null): boolean {
  if (!canvas) return false;
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;
  const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] > 0 && (d[i] < 255 || d[i + 1] < 255 || d[i + 2] < 255)) {
      return true;
    }
  }
  return false;
}

export function isEmailPlausible(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export function isStep1Valid(f: FormState): boolean {
  return (
    isDocumentPlausible(f.documento) &&
    Boolean(f.sexo) &&
    Boolean(f.paisNac) &&
    Boolean(f.nacionalidad) &&
    Boolean(f.profesion) &&
    Boolean(f.estadoCivil) &&
    f.ingreso.replace(/\D/g, "").length > 0 &&
    isEmailPlausible(f.email)
  );
}
