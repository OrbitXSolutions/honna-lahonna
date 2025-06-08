// components/atoms/form-label.tsx
import React from 'react';

interface FormLabelProps {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormLabel({ htmlFor, required, children, className = '' }: FormLabelProps) {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`text-sm font-medium text-foreground ${className}`}
    >
      {children} 
      {required && <span className="text-destructive ml-1">*</span>}
    </label>
  );
}
