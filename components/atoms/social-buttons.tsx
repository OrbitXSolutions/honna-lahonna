import { IconFacebook, IconInstagram, IconLinkedin, IconSnapchat, IconX, IconYoutube } from "../icons";
import AppButton from "./app-button";

export default function SocialButtons() {
    return (<>
        {[
            {
                icon: IconFacebook,
                href: 'https://www.facebook.com/yourpage',
                label: 'Facebook',
            },
            {
                icon: IconInstagram,
                href: 'https://www.instagram.com/yourpage',
                label: 'Instagram',
            },
            // {
            //     icon: IconSnapchat,
            //     href: 'https://www.snapchat.com/add/yourpage',
            //     label: 'Snapchat',
            // },
            {
                icon: IconX,
                href: 'https://x.com/yourpage',
                label: 'X',
            },
            // {
            //     icon: IconYoutube,
            //     href: 'https://www.youtube.com/yourpage',
            //     label: 'YouTube',
            // },
            {
                icon: IconLinkedin,
                href: 'https://www.linkedin.com/in/yourpage',
                label: 'LinkedIn',
            }
        ].map((item, index) => (
            <AppButton key={index} asChild variant={'icon'}>
                <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                >
                    <item.icon className="w-6 h-6" />
                </a>
            </AppButton>

        ))}
    </>)
}