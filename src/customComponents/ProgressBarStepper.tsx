"use client"

import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface IStep {
  id: number
  title?: string
  description?: string
  rightControlBtnLabel?: string
  leftControlBtnLabel?: string
  stepHeaderStyle?: string
  stepHeaderDescriptionStyle?: string
  content: React.ReactNode
}

export interface IProgressBarStepperCardProps {
  steps: IStep[]
  title?: string
  description?: string | React.ReactNode
  cardClass?: string
  cardContentClass?: string
  mainContentClass?: string
  progressBarClass?: string
  stepperHeaderClass?: string
  hideControlButtons?: boolean
  currentStepHeaderClass?: string
  currentStepHeaderDescriptionClass?: string
  rightBtnClicked?: (callback: () => void) => void
  leftBtnClicked?: (callback: () => void) => void
  getCurrentStep?: (val: number) => void
}

export interface ProgressBarStepperRef {
  handleNext: () => void
  handlePrevious: () => void
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const ProgressBarStepperCard = forwardRef<ProgressBarStepperRef, IProgressBarStepperCardProps>(
  (
    {
      title,
      description,
      cardClass,
      cardContentClass,
      mainContentClass,
      currentStepHeaderClass,
      currentStepHeaderDescriptionClass,
      progressBarClass,
      stepperHeaderClass,
      steps,
      hideControlButtons = false,
      rightBtnClicked,
      leftBtnClicked,
      getCurrentStep
    },
    ref
  ) => {
    const [currentStep, setCurrentStep] = useState(1)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])

    const totalSteps = steps.length

    const handleNext = () => {
      if (currentStep < totalSteps) {
        setCompletedSteps((prev) => [...prev, currentStep])
        setCurrentStep(currentStep + 1)
      }
    }

    const handlePrevious = () => {
      if (currentStep > 1) {
        setCompletedSteps((prev) => prev.filter((step) => step !== currentStep - 1))
        setCurrentStep(currentStep - 1)
      }
    }

    useImperativeHandle(ref, () => ({
      handleNext,
      handlePrevious,
      currentStep,
      setCurrentStep,
    }), [currentStep])

    // send the current step to the parent on update of the steps
    useEffect(() => {
      getCurrentStep?.(currentStep)
      return () => {
      }
    }, [currentStep])


    return (
      <div className="w-full mx-auto h-full overflow-hidden">
        <Card className={cn("h-full flex flex-col py-1", cardClass)}>
          <CardContent className={cn("p-4 flex flex-col justify-between h-full gap-4 overflow-hidden", cardContentClass)}>
            {/* Stepper Header */}
            <div className={cn("mb-8", stepperHeaderClass)}>
              {title && <h2 className={cn("text-2xl font-bold text-center mb-4", !description && "mb-8")}>{title}</h2>}
              {description && <p className="text-gray-600 text-center mb-8">{description}</p>}

              {/* Progress Bar Container */}
              <div className={cn("flex gap-2 mb-8", progressBarClass)}>
                {steps.map((step, index) => (
                  <div key={step.id} className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden relative">
                      <div
                        className={`h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out transform origin-left ${step.id <= currentStep ? "w-full scale-x-100" : "w-0 scale-x-0"
                          }`}
                        style={{
                          transitionDelay: step.id <= currentStep ? `${(step.id - 1) * 150}ms` : "0ms",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* step header */}
            <div className="stepHeader">
              {steps[currentStep - 1].title && <h3 className={cn("text-lg font-semibold text-center", currentStepHeaderClass, steps[currentStep - 1].stepHeaderStyle)}>{steps[currentStep - 1].title}</h3>}
              {steps[currentStep - 1].description && <p className={cn("text-gray-500 text-sm text-center", currentStepHeaderDescriptionClass, steps[currentStep - 1].stepHeaderDescriptionStyle)}>{steps[currentStep - 1].description}</p>}
            </div>

            {/* Step Content */}
            <div className={cn("stepContentMain flex-1 mb-8 h-full max-h-[75%]", mainContentClass)}>
              <div className="animate-in slide-in-from-right-5 fade-in duration-500 flex flex-col h-full">
                <div className="stepContent overflow-y-auto h-full">{steps[currentStep - 1].content}</div>
              </div>
            </div>

            {/* Navigation Buttons */}
            {!hideControlButtons && <div className="flex items-center justify-between flex-wrap">
              <div className="flex-1"></div>
              <div className="flex flex-1 justify-center items-center gap-2 text-sm text-gray-500">
                Step {currentStep} of {totalSteps}
              </div>
              <div className="stepControls flex-1 flex items-center justify-end gap-4 ">
                <Button
                  variant="outline"
                  onClick={() => {
                    leftBtnClicked && leftBtnClicked(handlePrevious)
                  }}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 transition-all duration-200 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {steps[currentStep]?.leftControlBtnLabel ? steps[currentStep].leftControlBtnLabel : "Previous"}
                </Button>
                <Button
                  onClick={() => {
                    rightBtnClicked && rightBtnClicked(handleNext)
                  }}
                  className="flex items-center gap-2 transition-all duration-200"
                >
                  {steps[currentStep]?.rightControlBtnLabel
                    ? steps[currentStep].rightControlBtnLabel
                    : currentStep === totalSteps
                      ? "Complete"
                      : "Next"}
                  {currentStep !== totalSteps && <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>
            </div>}
          </CardContent>
        </Card>
      </div>
    )
  }
)

export default ProgressBarStepperCard 