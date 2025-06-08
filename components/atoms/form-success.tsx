// components/atoms/form-success.tsx
import React from "react";

interface FormSuccessProps {
  message: string;
  className?: string;
}

export function FormSuccess({ message, className = "" }: FormSuccessProps) {
  return <p className={`text-sm text-green-600 ${className}`}>{message}</p>;
}
