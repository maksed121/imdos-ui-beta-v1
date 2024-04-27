import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signJWT, verifyJWT } from "@/lib/token";

export async function GET(request) {
  try {
    const token = request.cookies.get("imdos-access-token")?.value || undefined;
    const { name, role } = await verifyJWT(token);
    return NextResponse.json({ name, role }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  }
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const api = await fetch(process.env.API_ENDPOINT + "read.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-KEY": "d2dcx343kn532k3nx045nt56j43msd0d9sdj3",
      },
      body: JSON.stringify({
        table: "authentication",
        select: [
          "authentication.id",
          "authentication.name",
          "authentication.email",
          "authentication.role",
          "authentication.branch_id",
        ],
        conditions: [
          {
            on: "authentication.email",
            type: "=",
            value: email,
          },
          {
            on: "authentication.password",
            type: "=",
            value: password,
          },
        ],
      }),
    });

    const { data } = await api.json();

    if (!data?.length) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await signJWT(
      {
        id: data[0].id,
        name: data[0].name,
        role: data[0].role,
      },
      { exp: "168h" }
    );

    const cookieOptions = {
      name: "imdos-access-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 604800,
    };

    await Promise.all([cookies().set(cookieOptions)]);

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
