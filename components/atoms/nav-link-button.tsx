
import Link from 'next/link'
import LoadingIndicator from './loading-indicator'
import AppButton from './app-button'
import NavLinkIndicator from './nav-link-indicator'
interface Props {
    href: string
    children: React.ReactNode
    className?: string
}
export function NavLinkButton({
    href,
    children,
    className,
}: Props) {
    return (
        <NavLinkIndicator href={href} className={className}>
            <Link href={href}>
                {children}
                <LoadingIndicator />
            </Link>
        </NavLinkIndicator>

    )
}
