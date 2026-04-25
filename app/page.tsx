"use client";

import { useState } from "react";
import LandingScreen from "@/components/onboarding/LandingScreen";
import OnboardingApp from "@/components/onboarding/OnboardingApp";

export default function Home() {
  const [started, setStarted] = useState(false);

  if (!started) return <LandingScreen onStart={() => setStarted(true)} />;
  return <OnboardingApp />;
}
