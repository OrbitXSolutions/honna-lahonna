import Logo from "../atoms/logo";
import HeaderNavs from "../molecules/header-navs";
import HeaderButtons from "../molecules/header-buttons";
import NavMenuToggle from "../molecules/nav-menu-toggle";

export function AppHeader({
    children,
    ...props
}: Readonly<{
    children?: React.ReactNode;
}>) {
    return (
        <header
            className="mx-auto  py-4 px-4   backdrop-blur-md sticky top-0 z-50 w-full"
            {...props}>
            <div className="flex items-center justify-between container mx-auto ">
                <Logo />
                <HeaderNavs className="max-lg:hidden" />
                <HeaderButtons className="max-lg:hidden" />
                <NavMenuToggle className="lg:hidden" />
            </div>

        </header>
    );
}