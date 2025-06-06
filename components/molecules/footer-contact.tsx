import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";
import AppButton from "../atoms/app-button";
import { IconArrow } from "../icons";
import ContactLinks from "./contact-links";

interface Props {
    className?: string;
    [key: string]: any;
}

export default function FooterContact({
    className,
    ...props
}: Props) {
    return (
        <div
            className={`flex flex-col ${className} gap-3  max-md:text-center max-md:items-center `}
            {...props}>
            <h2 className="text-lg font-semibold">{"تعرف علينا"}</h2>
            <ContactLinks />
        </div>
    );
}