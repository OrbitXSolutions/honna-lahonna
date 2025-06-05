import FooterBio from "../molecules/footer-bio";
import FooterContact from "../molecules/footer-contact";
import FooterPolicy from "../molecules/footer-policy";
import FooterSiteLinks from "../molecules/footer-site-links";
import GridBackground from "../molecules/grid-background";
import { Separator } from "../ui/separator";

interface Props {
    className?: string;
    [key: string]: any;
}

export function AppFooter({
    className,
    ...props
}: Props) {
    return (
        <footer
            {...props}
            className={'relative'} >
            <GridBackground>
                <div className="container mx-auto p-3 md:p-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 space-x-16 space-y-10 py-3">
                        <FooterBio />
                        <FooterSiteLinks />
                        <FooterContact />
                    </div>
                    <Separator className="bg-gray-300" />
                    <FooterPolicy />
                </div>


            </GridBackground>
        </footer>
    );
}

