import Image from 'next/image'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export default function Logo({ width = 50, height = 50, ...props }: React.ComponentProps<any>) {
    return (
        <Link href={ROUTES.HOME} className="inline-block">
            <Image
                src="/icon.png"
                alt="Logo"
                width={width}
                height={height}
                {...props}
            />
        </Link>
    )
}