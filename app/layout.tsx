import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Onboarding digital — Nuevo cliente",
  description: "Flujo de alta (mock) con biometría y firma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={lato.className}>{children}</body>
    </html>
  );
}
