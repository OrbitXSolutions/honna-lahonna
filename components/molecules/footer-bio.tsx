import Image from "next/image";
import Logo from "../atoms/logo";
import SocialButtons from "../atoms/social-buttons";

interface Props {
    className?: string;
    [key: string]: any;
}

export default function FooterBio({
    className,
    ...props
}: Props) {
    return (
        <div
            className={`flex flex-col ${className} gap-3 max-md:text-center max-md:items-center`}
            {...props}>
            <Logo />
            <p className="text-gray-500 ">
                {'أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم، كما تستحقين بالإضافة إلي تقديم خدمات استشارية مخصصة لكي …'}
            </p>
            <div className="flex gap-2">
                <SocialButtons />
            </div>
        </div>
    );
}