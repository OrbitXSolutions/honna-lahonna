import { Input } from "@/components/ui/input";

interface FormFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  className?: string;
  validation?: {
    isValid: boolean;
    message: string;
  };
  serverError?: string[];
  helpText?: string;
}

export function FormField({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  dir = "ltr",
  className = "",
  validation,
  serverError,
  helpText,
}: FormFieldProps) {
  const hasError = serverError || (validation && !validation.isValid);
  const isValid = validation?.isValid && value;

  const inputClassName = `${
    hasError ? "border-red-500" : isValid ? "border-green-500" : ""
  } ${className}`;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        dir={dir}
        className={inputClassName}
      />

      {/* Server errors */}
      {serverError && <p className="text-sm text-red-500">{serverError[0]}</p>}

      {/* Client validation errors */}
      {validation && !validation.isValid && validation.message && (
        <p className="text-sm text-red-500">{validation.message}</p>
      )}

      {/* Success message for confirm password */}
      {validation?.isValid &&
        value &&
        type === "password" &&
        name === "confirmPassword" && (
          <p className="text-sm text-green-600">كلمات المرور متطابقة ✓</p>
        )}

      {/* Help text */}
      {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
    </div>
  );
}
