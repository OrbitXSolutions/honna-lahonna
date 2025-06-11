import Link, { LinkProps } from "next/link";
import React from "react";
import LoadingIndicator from "./loading-indicator";

interface Props extends LinkProps, React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  loaderClassName?: string;
}

export default function AppLink({
  children,
  loaderClassName,
  ...props
}: Props) {
  return (
    <Link {...props}>
      {children}
      <LoadingIndicator loaderClassName={loaderClassName} />
    </Link>
  );
}
