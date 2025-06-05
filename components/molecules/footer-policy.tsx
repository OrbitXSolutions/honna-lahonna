import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";

export default function FooterPolicy() {
    return (
        <div className="flex items-center py-3 justify-between gap-3 text-sm text-gray-500">
            <p>
                {"جميع الحقوق محفوظة لدي هن لهن ©  2025"}
            </p>
            <div className="flex gap-3">
                <Link href={ROUTES.PRIVACY_POLICY} className="hover:underline">
                    {"سياسة الخصوصية"}
                </Link>
                <div>
                    {"●"}
                </div>
                <Link href={ROUTES.TERMS_OF_SERVICE} className="hover:underline">
                    {"شروط الإستخدام"}
                </Link>
            </div>
        </div>)
}