import { ROUTES } from "@/lib/constants/routes";
import { NavLinkButton } from "../atoms/nav-link-button";

export default function HeaderNavs({
    children,
    ...props
}: Readonly<{
    children?: React.ReactNode;
}>) {
    return (
        <nav
            {...props}
        >
            {[
                { title: 'الرئيسية', href: ROUTES.HOME },
                { title: 'من نحن', href: ROUTES.ABOUT },
                { title: 'خدماتنا', href: ROUTES.SERVICES },
                { title: 'شركاء النجاح', href: ROUTES.PARTNERS },
                { title: 'الآراء', href: ROUTES.TESTIMONIALS },
                { title: 'الأسئلة الشائعة', href: ROUTES.FAQ },
            ].map((item) => (<NavLinkButton
                key={item.href}
                href={item.href}
            >
                {item.title}
            </NavLinkButton>))}
        </nav>
    );
}