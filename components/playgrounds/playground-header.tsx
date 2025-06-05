import { Playground } from "../playground";

export function PlaygroundHeader({
    children,
    ...props
}: Readonly<{
    children?: React.ReactNode;
}>) {
    return (<Playground {...props}>
        {children}

    </Playground>)
}