import { ROUTES } from "@/lib/constants/routes";
import { NavLinkButton } from "../atoms/nav-link-button";

export default function HeaderNavs({
    children,
    className = '',
    ...props
}: Readonly<{
    className?: string;
    children?: React.ReactNode;
}>) {
    return (
        <nav className={className ?? ''}
            {...props}
        >
            {[
                { title: 'الرئيسية', href: ROUTES.HOME },
                { title: 'خدماتنا', href: ROUTES.SERVICES },
                { title: 'من نحن', href: ROUTES.ABOUT },

                // { title: 'شركاء النجاح', href: ROUTES.PARTNERS },
                // { title: 'الآراء', href: ROUTES.TESTIMONIALS },
                // { title: 'الأسئلة الشائعة', href: ROUTES.FAQ },
            ].map((item) => (<NavLinkButton
                key={item.href}
                href={item.href}
            >
                {item.title}
            </NavLinkButton>))}
        </nav>
    );
}