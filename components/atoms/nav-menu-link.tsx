"use client";
import type React from "react"
import Link from "next/link"
import LoadingIndicator from "./loading-indicator";

interface Props {
  href: string
  children: React.ReactNode
  className?: string,
  onLoad?: () => void
}

export function NavMenuLink({
  href,
  children,
  onLoad,
  className = "text-gray-700 hover:text-primary text-sm font-medium transition-colors",
}: Props) {

  return (
    <Link href={href} className={className}>
      {children}
      <LoadingIndicator callback={onLoad} />
    </Link>
  )
}
