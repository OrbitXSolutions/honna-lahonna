import { getGovernorates } from "@/lib/data/prisma/governorates";
export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
  const governorates = await getGovernorates();

  return new Response(JSON.stringify(governorates), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
