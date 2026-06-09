import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (!token || !verifyAdminToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Total bookings
  const { count: totalBookings } = await supabaseAdmin.from("bookings").select("*", { count: "exact", head: true });
  // New bookings (last 7 days)
  const week = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { count: newBookings } = await supabaseAdmin.from("bookings").select("*", { count: "exact", head: true }).gte("created_at", week);
  // Bookings by status
  const { data: statusData } = await supabaseAdmin.from("bookings").select("status");
  const statusCounts = (statusData || []).reduce((acc: Record<string, number>, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {});
  // Bookings by service
  const { data: serviceData } = await supabaseAdmin.from("bookings").select("service");
  const serviceCounts = (serviceData || []).reduce((acc: Record<string, number>, b) => {
    if (b.service) acc[b.service] = (acc[b.service] || 0) + 1;
    return acc;
  }, {});
  // Total photos
  const { count: totalPhotos } = await supabaseAdmin.from("photos").select("*", { count: "exact", head: true });
  // Total blogs
  const { count: totalBlogs } = await supabaseAdmin.from("blog_posts").select("*", { count: "exact", head: true });
  const { count: publishedBlogs } = await supabaseAdmin.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true);
  // Bookings last 30 days by day
  const month = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data: recentBookings } = await supabaseAdmin.from("bookings").select("created_at").gte("created_at", month).order("created_at");

  return NextResponse.json({
    totalBookings, newBookings, statusCounts, serviceCounts,
    totalPhotos, totalBlogs, publishedBlogs, recentBookings
  });
}
