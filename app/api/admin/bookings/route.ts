import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (!token || !verifyAdminToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const status = req.nextUrl.searchParams.get("status");
  let query = supabaseAdmin.from("bookings").select("*").order("created_at", { ascending: false });
  if (status && status !== "all") query = query.eq("status", status);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ bookings: data });
}

export async function PUT(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (!token || !verifyAdminToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status } = await req.json();
  const { data, error } = await supabaseAdmin.from("bookings").update({ status }).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ booking: data });
}
