"use client";

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/shared/stepper";
import { useLanguage } from "@/i18n/language-provider";
import React, { useState } from "react";

interface SubmitStepperProps {
  initialStep?: number;
}

export function SubmitStepper({ initialStep = 1 }: SubmitStepperProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(initialStep);

  const steps = [
    { title: t("submit.stepDetails"), description: "Enter product information" },
    { title: t("submit.stepPayment"), description: "Select pricing plan" },
    { title: t("submit.stepPublish"), description: "Publish your product" },
  ];

  return (
    <Stepper>
      {steps.map((step, index) => (
        <React.Fragment key={step.title}>
          <StepperItem step={index + 1}>
            {/* disable click on stepper trigger */}
            <StepperTrigger
              // onClick={() => setCurrentStep(index + 1)}
              active={currentStep === index + 1}
              className="cursor-default"
            >
              <StepperIndicator
                completed={currentStep > index + 1}
                active={currentStep === index + 1}
              >
                {index + 1}
              </StepperIndicator>
              <div>
                <StepperTitle>{step.title}</StepperTitle>
                {/* hidden on mobile, to make separator visible */}
                {/* <StepperDescription className='hidden lg:block'>
                                    {step.description}
                                </StepperDescription> */}
              </div>
            </StepperTrigger>
          </StepperItem>
          {index < steps.length - 1 && (
            <StepperSeparator completed={currentStep > index + 1} />
          )}
        </React.Fragment>
      ))}
    </Stepper>
  );
}
