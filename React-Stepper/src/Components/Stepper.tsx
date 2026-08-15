import React, { useState } from 'react';

export default function Stepper ({ steps }) {
    const [currentStep, setCurrentStep] = useState(0); 

    const handleContinue = () => {
        if(currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };
    const handleBack = () => {
        if(currentStep > 0) setCurrentStep(currentStep - 1);
    }


    return (
        <div className="stepper">
            <div>
                {steps.map(({ label, content}, index) => {
                    return(
                        <div key={label} className='stepper-container'>
                            <div className={`step-number ${index <= currentStep ? "active" : ""}`}>{index + 1}{" "}
                            {index < steps.length - 1 && (
                  <div
                    className={`step-line ${
                      index < currentStep ? "active" : ""
                    }`}
                  ></div>
                )}
                            </div>
                            <div className='step-label'>{label}</div>
                        </div>
                    )
                })}
            </div>
            <div className='stepper-content'>{steps[currentStep].content}</div>
            <div className='stepper-controls'>
                <button className='btn' onClick={handleBack}>Back</button>
                <button className='btn' onClick={handleContinue}>Continue</button>
            </div>
        </div>
    )
}