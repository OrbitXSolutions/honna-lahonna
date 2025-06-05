interface Props {
    children: React.ReactNode;
    className?: string;
    color?: string;
    fade?: boolean;
    [key: string]: any;
}

export default function GridBackground({
    children,
    className = '',
    color = 'text-accent',
    fade = true,
    ...props
}: Props) {
    return (
        <>
            <div
                {...props}
                style={{ position: 'absolute' }}
                className={`absolute h-full w-full top-0 left-0 bottom-0 right-0 linear-grid ${fade ? 'fade' : ''} ${color ?? 'text-accent'} p-1 `}
            >
            </div>
            <div className={`relative ${className ?? ''}`}>
                {children}
            </div>
        </>
    );
}