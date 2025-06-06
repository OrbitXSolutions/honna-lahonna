// app/api/services/route.ts
import { NextResponse } from "next/server";
import { getServiceCategories } from "@/lib/data/service-categories";

export async function GET(request: Request) {
  const serviceCategories = await getServiceCategories();
  return NextResponse.json(serviceCategories);
}
