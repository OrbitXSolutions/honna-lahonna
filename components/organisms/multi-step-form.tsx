"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { FormField } from '@/components/molecules/form-field';
import { FormError } from '@/components/atoms/form-error';
import { FormSuccess } from '@/components/atoms/form-success';
import type { FormConfig, FieldConfig } from '@/lib/validation/types';

interface MultiStepFormProps {
  steps: FormConfig[];
  values: Record<string, any>;
  validations: Record<string, { isValid: boolean; message: string }>;
  serverErrors: Record<string, string[]>;
  onFieldChange: (name: string, value: any) => void;
  onFieldBlur: (name: string) => void;
  onSubmit: (stepIndex: number) => Promise<void>;
  isSubmitting: boolean;
  currentStep: number;
  onStepChange: (step: number) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function MultiStepForm({
  steps,
  values,
  validations,
  serverErrors,
  onFieldChange,
  onFieldBlur,
  onSubmit,
  isSubmitting,
  currentStep,
  onStepChange,
  successMessage,
  errorMessage,
}: MultiStepFormProps) {
  const currentStepConfig = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Check if current step is valid
  const isCurrentStepValid = () => {
    const currentFields = currentStepConfig.fields;
    return currentFields.every(field => {
      const fieldValue = values[field.name];
      const fieldValidation = validations[field.name];
      
      // Required field check
      if (field.required && (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0))) {
        return false;
      }
      
      // Validation check
      if (fieldValidation && !fieldValidation.isValid && fieldValue) {
        return false;
      }
      
      return true;
    });
  };

  const handleNextStep = () => {
    if (isCurrentStepValid() && currentStep < steps.length - 1) {
      onStepChange(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(currentStep);
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {/* Step circle */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                index < currentStep
                  ? "bg-green-500 text-white"
                  : index === currentStep
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              )}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>
            
            {/* Step label */}
            <div className="mr-2 text-xs font-medium text-gray-600 hidden sm:block">
              {step.title}
            </div>
            
            {/* Progress line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-12 sm:w-16 mx-2 transition-colors",
                  index < currentStep ? "bg-green-500" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}      </div>
    </div>
  );

  const renderField = (field: FieldConfig) => {
    // Check conditional display
    const shouldShow = !field.conditionalDisplay || 
      field.conditionalDisplay.values.includes(values[field.conditionalDisplay.field]);
    
    if (!shouldShow) return null;

    return (
      <div key={field.name} className={cn(
        field.gridCols && `col-span-${field.gridCols}`
      )}>
        <FormField
          id={field.name}
          name={field.name}
          type={field.type}
          label={field.label}
          placeholder={field.placeholder}
          value={values[field.name] || (field.type === 'file' ? [] : '')}
          onChange={(value) => onFieldChange(field.name, value)}
          onBlur={() => onFieldBlur(field.name)}
          required={field.required}
          disabled={isSubmitting}
          dir={field.dir}
          validation={validations[field.name]}
          serverError={serverErrors[field.name]}
          helpText={field.helpText}
          options={field.options}
          accept={field.accept}
          multiple={field.multiple}
          rows={field.rows}
        />
      </div>
    );
  };
        rows={field.rows}
        showIf={field.showIf}
        allValues={values}
      />
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      {renderProgressBar()}

      <Card>
        <CardHeader>
          <CardTitle className="text-right">{currentStepConfig.title}</CardTitle>
          {currentStepConfig.description && (
            <p className="text-muted-foreground text-right">{currentStepConfig.description}</p>
          )}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success Message */}
            {successMessage && (
              <FormSuccess message={successMessage} />
            )}

            {/* Error Message */}
            {errorMessage && (
              <FormError message={errorMessage} />
            )}            {/* Form Fields */}
            <div className="grid gap-4 grid-cols-1">
              {currentStepConfig.fields.map(renderField)}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handlePreviousStep}
                disabled={isFirstStep || isSubmitting}
                className="flex items-center gap-2"
              >
                <ChevronRight className="w-4 h-4" />
                السابق
              </Button>

              <div className="flex gap-2">
                {!isLastStep ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!isCurrentStepValid() || isSubmitting}
                    className="flex items-center gap-2"
                  >
                    التالي
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!isCurrentStepValid() || isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? "جاري الإرسال..." : currentStepConfig.submitButtonText || "إرسال"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
