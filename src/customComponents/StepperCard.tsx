"use client"

import type React from "react"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface IStep {
    id: number
    title?: string
    description?: string
    content: React.ReactNode
}

export interface IStepperCardProps {
    steps: IStep[]
    title?: string,
    description?: string | React.ReactNode
}

export default function StepperCard({ title, description, steps }: IStepperCardProps) {
    const [currentStep, setCurrentStep] = useState(1)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])

    // stepper container manipulation
    // This is used to calculate the width of the stepper container for responsive design
    // and to ensure the progress bar and step indicators are correctly aligned.
    // It uses a ref to access the DOM element and state to store the width.
    // This is useful for dynamic layouts where the width may change based on screen size or content
    const progressContainerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useLayoutEffect(() => {
        if (progressContainerRef.current) {
            setContainerWidth(progressContainerRef.current.offsetWidth);
            // Or: progressContainerRef.current.getBoundingClientRect().width
        }
    }, []);




    const totalSteps = steps.length

    // step label height manipulation
    // this is used to know how much margin top to apply to the step content since the step labels are positioned absolutely
    // and we need to ensure the content is not hidden behind them.
    // This is useful for dynamic layouts where the height may change based on screen size or content
    // It uses a ref to access the DOM element and state to store the height.
    const itemLabelRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [maxLabelHeight, setMaxLabelHeight] = useState(0);

    useLayoutEffect(() => {
        const heights = itemLabelRefs.current.map((ref) => ref?.offsetHeight || 0);
        setMaxLabelHeight(Math.max(...heights));
    }, [containerWidth, steps.length, currentStep]);

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

    const handleStepClick = (stepNumber: number) => {
        if (stepNumber <= currentStep || completedSteps.includes(stepNumber)) {
            setCurrentStep(stepNumber)
        }
    }

    const getStepStatus = (stepNumber: number) => {
        if (completedSteps.includes(stepNumber)) return "completed"
        if (stepNumber === currentStep) return "current"
        if (stepNumber < currentStep) return "completed"
        return "upcoming"
    }

    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100

    return (
        <div className="w-full mx-auto h-full overflow-hidden">
            <Card className="h-full flex flex-col py-1">
                <CardContent className="p-4 flex flex-col justify-between h-full gap-4  overflow-hidden">
                    {/* Stepper Header */}
                    <div className="mb-8 ">
                        {title && <h2 className={cn("text-2xl font-bold text-center mb-4", !description && 'mb-8')}>{title}</h2>}
                        {/* stepper description */}
                        {description && <p className="text-gray-600 text-center mb-8">{description}</p>}

                        {/* Progress Bar Container */}
                        <div className="relative  ">
                            {/* Background Progress Bar */}
                            <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full transform -translate-y-1/2 z-0"></div>

                            {/* Animated Progress Bar */}
                            <div
                                className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform -translate-y-1/2 z-10 transition-all duration-700 ease-in-out"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>

                            {/* Step Indicators */}
                            <div className="relative flex justify-between z-20" ref={progressContainerRef}>
                                {steps.map((step, idx) => {
                                    const status = getStepStatus(step.id)
                                    return (
                                        <div className="btn relative w-fit"
                                            key={step.id}
                                        >
                                            <button
                                                onClick={() => handleStepClick(step.id)}
                                                className={`
                        w-10 h-10 rounded-full border-4 flex hover:scale-110 items-center justify-center font-semibold text-sm
                        transition-all duration-500 ease-in-out transform ${status === "completed"
                                                        ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                                                        : status === "current"
                                                            ? "bg-white border-blue-600 text-blue-600 shadow-lg ring-4 ring-blue-100"
                                                            : "bg-white border-gray-300 text-gray-400 hover:border-gray-400"
                                                    }
                      `}
                                            >
                                                {status === "completed" ? (
                                                    <Check className="w-5 h-5 animate-in zoom-in duration-300" />
                                                ) : (
                                                    <span className="animate-in fade-in duration-300">{step.id}</span>
                                                )}


                                            </button>


                                            {/* step label */}
                                            <div ref={el => { itemLabelRefs.current[idx] = el }} key={step.id} style={{
                                                width: `${(containerWidth / steps.length) - 45}px`,
                                            }} className={cn(`itemLabel  flex- absolute top-14`, idx === 0 ? "text-left left-0" : idx === steps.length - 1 ? "text-right right-0" : "text-center right-1/2 translate-x-1/2")}>
                                                <h3
                                                    className={`
                      text-sm font-medium transition-colors duration-300
                      ${status === "current" ? "text-blue-600" : status === "completed" ? "text-blue-600" : "text-gray-500"}
                    `}
                                                >
                                                    {step.title}
                                                </h3>
                                                <p
                                                    className={`                                                    {step.title}
                                                    {step.title}

                      text-xs mt-1 transition-colors duration-300
                      ${status === "current" ? "text-blue-500" : status === "completed" ? "text-blue-500" : "text-gray-400"}
                    `}
                                                >
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>


                    </div>




                    {/* Step Content */}
                    <div className="stepContentMain !overflow-y-auto mb-8 h-full " style={{ marginTop: maxLabelHeight }}>
                        <div className="animate-in slide-in-from-right-5 fade-in duration-500">

                            {/*step content */}
                            <div className="stepContent">
                                {steps[currentStep - 1].content}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="grid grid-cols-3 ">
                        <div className=""></div>

                        <div className="flex  justify-center items-center gap-2 text-sm text-gray-500">
                            Step {currentStep} of {totalSteps}
                        </div>


                        <div className="stepControls flex items-center justify-end gap-4 ">
                            {/* prev */}
                            <Button
                                variant="outline"
                                onClick={handlePrevious}
                                disabled={currentStep === 1}
                                className="flex items-center gap-2 transition-all duration-200 bg-transparent"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                            </Button>

                            {/* next */}
                            <Button
                                onClick={handleNext}
                                disabled={currentStep === totalSteps}
                                className="flex items-center gap-2 transition-all duration-200"
                            >
                                {currentStep === totalSteps ? "Complete" : "Next"}
                                {currentStep !== totalSteps && <ChevronRight className="w-4 h-4" />}
                            </Button>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
