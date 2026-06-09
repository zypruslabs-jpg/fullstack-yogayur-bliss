import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, service, message } = body;
  if (!name || !email) return NextResponse.json({ error: "Name and email required" }, { status: 400 });

  const { data, error } = await supabaseAdmin.from("bookings").insert({
    name, email, phone, service, message, status: "new"
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, booking: data });
}
