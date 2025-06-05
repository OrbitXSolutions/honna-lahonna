
import AppButton from "../atoms/app-button";
import { IconArrow, IconCall } from "../icons";

export default function HeaderButtons({
    children,
    className = '',

    ...props
}: Readonly<{
    className?: string;

    children?: React.ReactNode;
}>) {
    return (
        <div className={`flex gap-1 ${className ?? ''}`} >
            <AppButton variant='outline' >
                <span>{'تواصلي معنا'}</span>
                <IconCall />
            </AppButton>
            <AppButton >
                <span>{'سجلي الأن'}</span>
                <IconArrow />
            </AppButton>
        </div>
    );
}