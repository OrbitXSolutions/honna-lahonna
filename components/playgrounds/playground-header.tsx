import { ROUTES } from "@/lib/constants/routes";
import Logo from "../atoms/logo";
import { Playground } from "../playground";
import { NavLinkButton } from "../atoms/nav-link-button";
import HeaderNavs from "../molecules/header-navs";

export function PlaygroundHeader({
    children,
    ...props
}: Readonly<{
    children?: React.ReactNode;
}>) {
    return (<Playground {...props}>
        <header
            className="container mx-auto py-4 px-4 flex items-center justify-between bg-secondary/30 backdrop-blur-sm sticky top-0 z-50">
            <Logo />
            <HeaderNavs />
            <div></div>
        </header>

        {children}

    </Playground>)
}