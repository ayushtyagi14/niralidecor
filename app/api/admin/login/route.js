import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("admin_users")
      .select("id, username, password")
      .eq("username", username)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (data.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = process.env.ADMIN_TOKEN;

    if (!token) {
      return NextResponse.json({ error: "Admin token is not configured" }, { status: 500 });
    }

    return NextResponse.json({ token });
  } catch (err) {
    console.error("Error during admin login:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
