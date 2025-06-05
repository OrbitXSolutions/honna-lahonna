"use client"

import * as React from "react"

import AppButton from "../atoms/app-button";
import { IconCelebration, IconArrow, IconKnowMore, IconCall } from "../icons";
import { Playground } from "../playground";
import Link from "next/link";

export function PlaygroundsIconsButtons({
    children,
    ...props
}: Readonly<{
    children?: React.ReactNode;
}>) {
    return (
        <Playground {...props}>
            <div className="flex gap-4 w-full  items-center justify-center">
                <AppButton  >
                    <IconCelebration />
                    <IconArrow />
                    <IconKnowMore />
                    <IconCall />
                    {'سجلي الأن كمقدمة خدمة'}
                </AppButton>


                <AppButton asChild variant="outline" className="w-full sm:w-auto">
                    <Link href="/login">Login</Link>
                </AppButton>

                <AppButton asChild variant="nav" className="w-full sm:w-auto">
                    <Link href="/login">NAV</Link>
                </AppButton>
            </div>

        </Playground>
    )
}


