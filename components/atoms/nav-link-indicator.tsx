'use client';

import { usePathname } from 'next/navigation';
import AppButton from './app-button';
interface Props {
    href: string
    children: React.ReactNode
    className?: string
}
export default function NavLinkIndicator({
    href,
    children,
    className,
}: Props) {
    const pathname = usePathname();

    return (
        <AppButton asChild variant={pathname === href ? "navActive" : "nav"} className={className}>
            {children}
        </AppButton>

    )
}
