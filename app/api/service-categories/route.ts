// app/api/services/route.ts
import { NextResponse } from "next/server";
import { getServiceCategories } from "@/lib/data/service-categories";
export const revalidate = 60 * 60; // Revalidate every hour

export async function GET(request: Request) {
  const serviceCategories = await getServiceCategories();
  return NextResponse.json(serviceCategories);
}
