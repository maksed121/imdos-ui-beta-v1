import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const payloads = await request.formData();
    const { table } = params;

    const apiRequest = await fetch(process.env.API_ENDPOINT + "read.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        table: table,
        select: JSON.parse(payloads.get("select")),
        join: JSON.parse(payloads.get("join")) || null,
        order: { on: "id", type: "DESC" },
        conditions: JSON.parse(payloads.get("conditions") || null),
        limit: payloads.get("limit") || null,
      }),
    });

    const apiResponse = await apiRequest.json();

    if (!apiRequest.ok) {
      return NextResponse.json({ error: apiResponse.message }, { status: 500 });
    }

    return NextResponse.json({ data: apiResponse.data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while reading record" },
      { status: 500 }
    );
  }
}
