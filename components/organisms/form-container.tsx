import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { MessageAlert } from "@/components/atoms/message-alert";
import { DynamicForm } from "./dynamic-form";
import { FormConfig } from "@/lib/validation/form-config";
import { ValidationState } from "@/lib/validation/schemas";

export interface FormContainerProps {
  config: FormConfig;
  formData: Record<string, string>;
  validation: Record<string, ValidationState>;
  isValid: boolean;
  isPending: boolean;
  serverState?: {
    success: boolean;
    message?: string;
    errors?: Record<string, string[]>;
  };
  onFieldChange: (fieldName: string, value: string) => void;
  onSubmit: (formData: FormData) => void;
  submitLabel: string;
  submitIcon?: React.ReactNode;
  footerContent?: React.ReactNode;
  className?: string;
}

/**
 * Reusable form container with built-in state management and UI
 */
export const FormContainer: React.FC<FormContainerProps> = ({
  config,
  formData,
  validation,
  isValid,
  isPending,
  serverState,
  onFieldChange,
  onSubmit,
  submitLabel,
  submitIcon,
  footerContent,
  className = "",
}) => {
  return (
    <div className={`w-full space-y-5 ${className}`}>
      <form action={onSubmit}>
        <CardContent className="space-y-4">
          {/* Success Message */}
          {serverState?.success && serverState.message && (
            <MessageAlert type="success" message={serverState.message} />
          )}

          {/* Error Message */}
          {!serverState?.success && serverState?.message && (
            <MessageAlert type="error" message={serverState.message} />
          )}

          {/* Dynamic Form Fields */}
          <DynamicForm
            config={config}
            formData={formData}
            validation={validation}
            serverErrors={serverState?.errors}
            disabled={isPending}
            onFieldChange={onFieldChange}
          />
        </CardContent>

        <div className="m-4"></div>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !isValid}
          >
            {isPending ? (
              <Spinner size="small" show={true} />
            ) : (
              <>
                {submitLabel}
                {submitIcon}
              </>
            )}
          </Button>

          {/* Additional footer content */}
          {footerContent}
        </CardFooter>
      </form>
    </div>
  );
};
