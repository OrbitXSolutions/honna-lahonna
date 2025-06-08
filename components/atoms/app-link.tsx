import Link, { LinkProps } from "next/link";
import React from "react";
import LoadingIndicator from "./loading-indicator";

interface Props extends LinkProps, React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export default function AppLink({ children, ...props }: Props) {
  return (
    <Link {...props}>
      {children}
      <LoadingIndicator />
    </Link>
  );
}
