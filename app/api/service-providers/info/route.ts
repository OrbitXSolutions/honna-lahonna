import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://back.honnalahonna.com";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        console.log("📤 API Route - Service Provider Info Request:", JSON.stringify(body, null, 2));

        // Get auth token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "غير مصرح. يرجى تسجيل الدخول أولاً." },
                { status: 401 }
            );
        }

        const response = await fetch(`${API_BASE_URL}/api/ServiceProviders/info`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        console.log("📥 API Route - Service Provider Info Response:", JSON.stringify(data, null, 2));

        // Translate known error messages to Arabic
        if (data.message === "You already have a service provider profile") {
            data.message = "لديك بالفعل خدمة مسجلة على حسابك";
        }

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("API Route - Service Provider Info Error:", error);
        return NextResponse.json(
            { success: false, message: "حدث خطأ في الخادم" },
            { status: 500 }
        );
    }
}
