"use client";
import { useFormStatus } from "react-dom";
import AppButton from "./app-button";
import { Spinner } from "../ui/spinner";

interface FormButtonProps {
  children: React.ReactNode;
  [key: string]: any; // Allow additional props for flexibility
}

export function FormButton({ children, ...props }: FormButtonProps) {
  const status = useFormStatus();
  return (
    <>
      <AppButton
        id="search-button"
        size={"lg"}
        disabled={status.pending}
        className="px-10"
        {...props}
        type="submit"
      >
        {status.pending ? (
          <Spinner size={"small"} className="text-white" />
        ) : (
          children
        )}
      </AppButton>
    </>
  );
}
