import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormLabel } from "@/components/atoms/form-label";
import { FormError } from "@/components/atoms/form-error";
import { FormSuccess } from "@/components/atoms/form-success";
import { FormHelpText } from "@/components/atoms/form-help-text";
import { FileUpload } from "@/components/molecules/file-upload";
import { ServiceCategorySelect } from "@/components/molecules/service-category-select";
import { GovernorateSelect } from "@/components/molecules/governorate-select";

interface SelectOption {
  value: string;
  label: string;
}

interface FormFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  value: string | string[] | File[];
  onChange: (value: string | string[] | File[]) => void;
  onBlur?: () => void;
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
  showSuccess?: boolean;
  // Enhanced props for different field types
  options?: SelectOption[];
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  rows?: number;
  // Conditional display
  showIf?: (values: Record<string, any>) => boolean;
  allValues?: Record<string, any>;
}

export function FormField({
  id,
  name,
  type,
  label,
  placeholder = "",
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  dir = "ltr",
  className = "",
  validation,
  serverError,
  helpText,
  showSuccess = false,
  options = [],
  accept,
  multiple = false,
  maxFiles,
  maxSize,
  rows = 3,
  showIf,
  allValues = {},
}: FormFieldProps) {
  // Check conditional display
  if (showIf && !showIf(allValues)) {
    return null;
  }

  const hasError = serverError || (validation && !validation.isValid && value);
  const isValid = validation?.isValid && value;

  const inputClassName = `${
    hasError ? "border-red-500" : isValid ? "border-green-500" : ""
  } ${className}`;

  // Handle different field types
  const renderField = () => {
    switch (type) {
      case "select":
        return (
          <Select
            value={typeof value === "string" ? value : ""}
            onValueChange={onChange}
            disabled={disabled}
          >
            <SelectTrigger className={inputClassName}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "service-category":
        return (
          <ServiceCategorySelect
            value={typeof value === "string" ? value : ""}
            onValueChange={onChange}
            disabled={disabled}
            className={inputClassName}
            placeholder={placeholder}
          />
        );

      case "governorate":
        return (
          <GovernorateSelect
            value={typeof value === "string" ? value : ""}
            onValueChange={onChange}
            disabled={disabled}
            className={inputClassName}
            placeholder={placeholder}
          />
        );

      case "textarea":
        return (
          <Textarea
            id={id}
            name={name}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            dir={dir}
            rows={rows}
            className={inputClassName}
            aria-invalid={!!hasError}
            aria-describedby={`${id}-error ${id}-help`}
          />
        );

      case "file":
        return (
          <FileUpload
            id={id}
            name={name}
            accept={accept}
            multiple={multiple}
            maxFiles={maxFiles}
            maxSize={maxSize}
            value={Array.isArray(value) ? (value as File[]) : []}
            onChange={onChange}
            disabled={disabled}
            className={inputClassName}
            aria-invalid={!!hasError}
            aria-describedby={`${id}-error ${id}-help`}
          />
        );

      default:
        return (
          <Input
            id={id}
            name={name}
            type={type}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            dir={dir}
            className={inputClassName}
            aria-invalid={!!hasError}
            aria-describedby={`${id}-error ${id}-help`}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <FormLabel htmlFor={id} required={required}>
        {label}
      </FormLabel>

      {renderField()}

      {/* Server errors take priority */}
      {serverError && <FormError message={serverError[0]} />}

      {/* Client validation errors */}
      {!serverError && validation && !validation.isValid && value && (
        <FormError message={validation.message} />
      )}

      {/* Success message */}
      {showSuccess &&
        isValid &&
        type === "password" &&
        name === "confirmPassword" && (
          <FormSuccess message="كلمات المرور متطابقة ✓" />
        )}

      {/* Help text */}
      <FormHelpText text={helpText} />
    </div>
  );
}
