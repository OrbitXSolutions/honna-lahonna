import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import { Search, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
            <div className="text-center max-w-lg mx-auto">
                {/* Illustration */}
                <div className="mb-8">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center">
                        <Search className="w-16 h-16 text-pink-500" />
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className="text-6xl font-bold text-pink-500 mb-4">404</h1>

                {/* Arabic Message */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    عذراً، مقدم الخدمة غير موجود
                </h2>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    لم نتمكن من العثور على مقدم الخدمة الذي تبحث عنه.
                    <br />
                    ربما تم حذف هذا الملف الشخصي أو أن الرابط غير صحيح.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link href={ROUTES.HOME} className="flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            <span>العودة للرئيسية</span>
                        </Link>
                    </Button>

                    <Button asChild variant="outline">
                        <Link href={ROUTES.SERVICES} className="flex items-center gap-2">
                            <span>تصفح الخدمات</span>
                            <ArrowRight className="w-5 h-5 rotate-180" />
                        </Link>
                    </Button>
                </div>

                {/* Decorative Elements */}
                <div className="mt-12 flex justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-300"></div>
                    <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                </div>
            </div>
        </div>
    );
}
