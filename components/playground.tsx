"use client"

import * as React from "react"


export function Playground({
  children,
  ...props
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <div {...props} className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-full max-w-3xl flex-col items-center justify-center gap-4 p-4">
        {children}
      </div>
    </div>
  )
}