import Logo from "../atoms/logo";
import HeaderNavs from "../molecules/header-navs";
import HeaderButtons from "../molecules/header-buttons";

export function AppHeader({
    children,
    ...props
}: Readonly<{
    children?: React.ReactNode;
}>) {
    return (
        <header
            className="mx-auto py-4 px-4 flex items-center justify-between bg-secondary/30 backdrop-blur-sm sticky top-0 z-50"
            {...props}>
            <Logo />
            <HeaderNavs />
            <HeaderButtons />
        </header>
    );
}