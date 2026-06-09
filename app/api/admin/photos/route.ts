import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (!token || !verifyAdminToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const section = req.nextUrl.searchParams.get("section");
  let query = supabaseAdmin.from("photos").select("*").order("order_index");
  if (section) query = query.eq("section", section);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ photos: data });
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (!token || !verifyAdminToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const section = formData.get("section") as string;
  const alt = formData.get("alt") as string;
  const title = formData.get("title") as string;

  // Upload to Supabase Storage
  const fileExt = file.name.split(".").pop();
  const fileName = `${section}/${Date.now()}.${fileExt}`;
  const { error: uploadError } = await supabaseAdmin.storage
    .from("yogayur-photos")
    .upload(fileName, file, { contentType: file.type });

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

  const { data: urlData } = supabaseAdmin.storage.from("yogayur-photos").getPublicUrl(fileName);

  // Save to DB
  const { data, error } = await supabaseAdmin.from("photos").insert({
    url: urlData.publicUrl, section, alt, title, order_index: Date.now()
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ photo: data });
}

export async function DELETE(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (!token || !verifyAdminToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, url } = await req.json();
  // Delete from storage
  const path = url.split("/yogayur-photos/")[1];
  await supabaseAdmin.storage.from("yogayur-photos").remove([path]);
  // Delete from DB
  const { error } = await supabaseAdmin.from("photos").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
