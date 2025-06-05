
import AppButton from "../atoms/app-button";
import { IconArrow, IconCall } from "../icons";

export default function HeaderButtons({
    children,
    ...props
}: Readonly<{
    children?: React.ReactNode;
}>) {
    return (
        <div className="flex gap-1">
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