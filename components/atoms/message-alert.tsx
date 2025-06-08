interface MessageAlertProps {
  type: "success" | "error";
  message: string;
}

export function MessageAlert({ type, message }: MessageAlertProps) {
  const baseClasses = "p-3 text-sm border rounded-md";
  const typeClasses = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
  };

  return <div className={`${baseClasses} ${typeClasses[type]}`}>{message}</div>;
}
