// app/api/services/route.ts
import { getServiceCategories } from "@/lib/data/prisma/service-categories";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const serviceCategories = await getServiceCategories();
  return NextResponse.json(serviceCategories);
}
