import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const payloads = await request.formData();
    const { table } = params;

    const apiRequest = await fetch(process.env.API_ENDPOINT + "delete.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        table: table,
        conditions: [{ on: "id", type: "=", value: payloads.get("refId") }],
      }),
    });

    const apiResponse = await apiRequest.json();

    if (!apiRequest.ok) {
      return NextResponse.json({ error: apiResponse.message }, { status: 500 });
    }

    return NextResponse.json({ message: apiResponse.message }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while deleting record" },
      { status: 500 }
    );
  }
}
