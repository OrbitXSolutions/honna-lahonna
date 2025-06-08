// components/atoms/form-help-text.tsx
import React from "react";

interface FormHelpTextProps {
  text?: string;
  className?: string;
}

export function FormHelpText({ text, className = "" }: FormHelpTextProps) {
  if (!text) return null;

  return <p className={`text-xs text-muted-foreground ${className}`}>{text}</p>;
}
