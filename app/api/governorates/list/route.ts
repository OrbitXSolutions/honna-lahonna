import { getAllGovernorates } from "@/lib/api/governorates";
export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
  try {
    const governorates = await getAllGovernorates();
    return new Response(JSON.stringify(governorates), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching governorates:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch governorates" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
