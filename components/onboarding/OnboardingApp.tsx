"use client";

import { useState, useMemo, useCallback } from "react";
import StepperNav from "./StepperNav";
import Step1DatosForm from "./Step1DatosForm";
import Step2Biometria from "./Step2Biometria";
import Step3PinSms from "./Step3PinSms";
import Step4Firma from "./Step4Firma";
import PepNotice from "./PepNotice";
import FlowFooter from "./FlowFooter";
import SuccessModal from "./SuccessModal";
import { type FormState, INITIAL_FORM } from "@/lib/onboarding/types";
import { isStep1Valid } from "@/lib/onboarding/validation";

export default function OnboardingApp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormState>({ ...INITIAL_FORM });
  const [livenessOk, setLivenessOk] = useState(false);
  const [idPhotoOk, setIdPhotoOk] = useState(false);
  const [step3Valid, setStep3Valid] = useState(false);
  const [step4Valid, setStep4Valid] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const canContinue = useMemo(() => {
    if (currentStep === 1) return isStep1Valid(form);
    if (currentStep === 2) return livenessOk && idPhotoOk;
    if (currentStep === 3) return step3Valid;
    return step4Valid;
  }, [currentStep, form, livenessOk, idPhotoOk, step3Valid, step4Valid]);

  const handleFormChange = useCallback(
    (key: keyof FormState, value: string) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    []
  );

  const handleContinue = useCallback(() => {
    if (currentStep < 4) setCurrentStep((s) => s + 1);
    else setSuccessOpen(true);
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  }, [currentStep]);

  const handleRestart = useCallback(() => {
    setSuccessOpen(false);
    setCurrentStep(1);
    setForm({ ...INITIAL_FORM });
    setLivenessOk(false);
    setIdPhotoOk(false);
    setStep3Valid(false);
    setStep4Valid(false);
  }, []);

  return (
    <>
      <div className="page__hero">
        <div className="page__hero-inner">
          <p className="page__tagline">
            Ahora, desde donde estés, puedes acceder a nuestros productos.
          </p>
          <StepperNav currentStep={currentStep} />
        </div>
      </div>

      <div className="page__body">
        <Step1DatosForm
          active={currentStep === 1}
          form={form}
          onChange={handleFormChange}
        />
        <Step2Biometria
          active={currentStep === 2}
          onLivenessChange={setLivenessOk}
          onIdPhotoChange={setIdPhotoOk}
        />
        <Step3PinSms
          active={currentStep === 3}
          onValidChange={setStep3Valid}
        />
        <Step4Firma
          active={currentStep === 4}
          onValidChange={setStep4Valid}
        />

        <PepNotice />
        <FlowFooter
          onBack={handleBack}
          onContinue={handleContinue}
          canContinue={canContinue}
        />
      </div>

      {successOpen && <SuccessModal onRestart={handleRestart} />}
    </>
  );
}
