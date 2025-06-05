import Image from 'next/image'

export default function Logo({ width = 50, height = 50, ...props }: React.ComponentProps<any>) {
    return (<Image
        src="/icon.png"
        alt="Logo"
        width={width}
        height={height}
        {...props} />)
}