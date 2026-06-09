import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword, getAdminToken } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (checkAdminPassword(password)) {
    return NextResponse.json({ success: true, token: getAdminToken() });
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
