// app/api/service-categories/route.ts
import { getAllCategories } from "@/lib/api/categories";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const serviceCategories = await getAllCategories();
    return NextResponse.json(serviceCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
