import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://back.honnalahonna.com";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const serviceProviderId = parseInt(id, 10);

        if (isNaN(serviceProviderId)) {
            return NextResponse.json(
                { success: false, message: "معرف مقدم الخدمة غير صالح" },
                { status: 400 }
            );
        }

        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "غير مصرح. يرجى تسجيل الدخول أولاً." },
                { status: 401 }
            );
        }

        // Get the form data from the request
        const formData = await request.formData();

        console.log("📤 API Route - Service Provider Files Request:", {
            serviceProviderId,
            hasLogoImage: formData.has("logoImage"),
            hasCoverImage: formData.has("coverImage"),
            hasIdCardFront: formData.has("idCardFront"),
            hasIdCardBack: formData.has("idCardBack"),
            hasCertificates: formData.has("certificates"),
        });

        const response = await fetch(`${API_BASE_URL}/api/ServiceProviders/${serviceProviderId}/files`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();

        console.log("📥 API Route - Service Provider Files Response:", JSON.stringify(data, null, 2));

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("API Route - Service Provider Files Error:", error);
        return NextResponse.json(
            { success: false, message: "حدث خطأ في الخادم" },
            { status: 500 }
        );
    }
}
