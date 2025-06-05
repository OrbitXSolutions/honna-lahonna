import Link from "next/link";
import { IconCall, IconEmail, IconLocation } from "../icons";
import AppButton from "../atoms/app-button";

interface Props {
    className?: string;
    [key: string]: any;
}
export default function ContactLinks({ className, ...props }: Props) {
    return (
        <>
            {[
                {
                    icon: IconCall,
                    href: '',
                    content: '01011111111',
                    label: 'phone',
                    variant: 'outline' as 'outline' | 'default',
                },
                {
                    icon: IconEmail,
                    href: 'mailto',
                    content: 'Honalahona@gmail.com',
                    label: 'email',
                    variant: 'outline' as 'outline' | 'default',
                },
                {
                    icon: IconLocation,
                    href: 'https://goo.gl/maps/yourlocation',
                    content: 'السعودية - الرياض - حي الياسمين',
                    label: 'location',
                    variant: 'default' as 'outline' | 'default',
                }
            ].map((item, index) => (
                <Link href={item.href} key={index} className="flex gap-2 items-center cursor-pointer" >
                    <AppButton variant={item.variant} className="cursor-pointer" >
                        <item.icon className="w-6 h-6" />
                    </AppButton>
                    <span className="text-gray-500">
                        {item.content}
                    </span>
                </Link>
            ))}
        </>
    )
}