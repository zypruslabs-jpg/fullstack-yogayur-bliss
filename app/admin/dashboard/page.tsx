"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// ─── Types ───────────────────────────────────────────────
type Tab = "dashboard" | "photos" | "blogs" | "bookings" | "analytics";
type Photo = { id: string; url: string; section: string; alt: string; title?: string };
type Blog = { id: string; title: string; slug: string; category: string; published: boolean; excerpt: string; content: string; cover_image: string; created_at: string };
type Booking = { id: string; name: string; email: string; phone: string; service: string; message: string; status: string; created_at: string };

const SECTIONS = ["hero","services","programs","gallery","blog","team","about"];
const STATUS_COLORS: Record<string, string> = {
  new: "#3B82F6", contacted: "#F59E0B", confirmed: "#10B981",
  completed: "#6B7280", cancelled: "#EF4444"
};
const BLOG_CATS = ["Ayurveda","Yoga","Meditation","Nutrition","Lifestyle","Women's Health"];

// ─── Helpers ─────────────────────────────────────────────
function apiCall(url: string, method = "GET", body?: object, isFormData = false) {
  const token = localStorage.getItem("admin_token") || "";
  const opts: RequestInit = {
    method,
    headers: isFormData ? { "x-admin-token": token } : { "Content-Type": "application/json", "x-admin-token": token },
    body: isFormData ? (body as FormData) : body ? JSON.stringify(body) : undefined,
  };
  return fetch(url, opts).then(r => r.json());
}

// ─── Stat Card ───────────────────────────────────────────
function StatCard({ icon, label, value, color }: { icon: string; label: string; value: number | string; color: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 2px 12px rgba(0,0,0,.05)" }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{icon}</div>
      <div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#999", marginBottom: 4 }}>{label}</div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#1C1C1E" }}>{value}</div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [token, setToken] = useState("");

  // Photos state
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoSection, setPhotoSection] = useState("hero");
  const [photoAlt, setPhotoAlt] = useState("");
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoMsg, setPhotoMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Blog state
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editBlog, setEditBlog] = useState<Partial<Blog> | null>(null);
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogMsg, setBlogMsg] = useState("");

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingFilter, setBookingFilter] = useState("all");

  // Analytics state
  const [analytics, setAnalytics] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) { router.push("/admin"); return; }
    setToken(t);
    loadAnalytics();
    loadBookings();
  }, [router]);

  const logout = () => { localStorage.removeItem("admin_token"); router.push("/admin"); };

  async function loadPhotos(section = photoSection) {
    const data = await apiCall(`/api/admin/photos?section=${section}`);
    setPhotos(data.photos || []);
  }

  async function loadBlogs() {
    const data = await apiCall("/api/admin/blogs");
    setBlogs(data.posts || []);
  }

  async function loadBookings() {
    const data = await apiCall(`/api/admin/bookings?status=${bookingFilter}`);
    setBookings(data.bookings || []);
  }

  async function loadAnalytics() {
    const data = await apiCall("/api/admin/analytics");
    setAnalytics(data);
  }

  useEffect(() => { if (tab === "photos") loadPhotos(); }, [tab]);
  useEffect(() => { if (tab === "blogs") loadBlogs(); }, [tab]);
  useEffect(() => { if (tab === "bookings") loadBookings(); }, [tab, bookingFilter]);
  useEffect(() => { if (tab === "analytics") loadAnalytics(); }, [tab]);

  async function uploadPhoto() {
    if (!photoFile || !photoAlt) { setPhotoMsg("Please select a file and add alt text"); return; }
    setPhotoUploading(true);
    const fd = new FormData();
    fd.append("file", photoFile);
    fd.append("section", photoSection);
    fd.append("alt", photoAlt);
    fd.append("title", photoTitle);
    const data = await apiCall("/api/admin/photos", "POST", fd as unknown as object, true);
    if (data.photo) {
      setPhotoMsg("✓ Photo uploaded successfully!");
      setPhotoFile(null); setPhotoAlt(""); setPhotoTitle("");
      if (fileRef.current) fileRef.current.value = "";
      loadPhotos();
    } else { setPhotoMsg("Error: " + data.error); }
    setPhotoUploading(false);
    setTimeout(() => setPhotoMsg(""), 4000);
  }

  async function deletePhoto(id: string, url: string) {
    if (!confirm("Delete this photo?")) return;
    await apiCall("/api/admin/photos", "DELETE", { id, url });
    loadPhotos();
  }

  async function saveBlog() {
    if (!editBlog?.title || !editBlog?.content) { setBlogMsg("Title and content required"); return; }
    setBlogSaving(true);
    const method = editBlog.id ? "PUT" : "POST";
    const data = await apiCall("/api/admin/blogs", method, editBlog);
    if (data.post) {
      setBlogMsg("✓ Blog saved successfully!");
      setEditBlog(null);
      loadBlogs();
    } else { setBlogMsg("Error: " + data.error); }
    setBlogSaving(false);
    setTimeout(() => setBlogMsg(""), 4000);
  }

  async function deleteBlog(id: string) {
    if (!confirm("Delete this blog post?")) return;
    await apiCall("/api/admin/blogs", "DELETE", { id });
    loadBlogs();
  }

  async function updateBookingStatus(id: string, status: string) {
    await apiCall("/api/admin/bookings", "PUT", { id, status });
    loadBookings();
  }

  const s = (obj: Record<string, unknown>, key: string) => (obj[key] as number) || 0;

  // ─── Sidebar ─────────────────────────────────────────────
  const sideItems: { id: Tab; icon: string; label: string }[] = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "photos", icon: "🖼️", label: "Photos" },
    { id: "blogs", icon: "✍️", label: "Blog Posts" },
    { id: "bookings", icon: "📅", label: "Bookings" },
    { id: "analytics", icon: "📈", label: "Analytics" },
  ];

  const base: React.CSSProperties = { fontFamily: "'Inter',sans-serif" };
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", border: "1.5px solid #e8e8e8",
    borderRadius: 10, fontFamily: "'Inter',sans-serif", fontSize: 14,
    outline: "none", boxSizing: "border-box" as const, background: "#fff"
  };
  const btnPrimary: React.CSSProperties = {
    background: "linear-gradient(135deg,#0D5C3A,#1A7A4F)", color: "#fff",
    border: "none", borderRadius: 10, padding: "11px 20px",
    fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14,
    cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8F9FA", ...base }}>

      {/* Sidebar */}
      <div style={{ width: 240, background: "#083D26", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#C9A84C,#A88835)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✿</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: 15, fontWeight: 700 }}>YogAyur</div>
              <div style={{ color: "#C9A84C", fontSize: 12 }}>Admin Panel</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {sideItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "12px 14px", borderRadius: 10, border: "none", cursor: "pointer",
              marginBottom: 4, fontSize: 14, fontWeight: 500, textAlign: "left",
              background: tab === item.id ? "rgba(201,168,76,.2)" : "transparent",
              color: tab === item.id ? "#C9A84C" : "rgba(255,255,255,.65)",
              borderLeft: tab === item.id ? "3px solid #C9A84C" : "3px solid transparent",
              transition: "all .2s"
            }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,.1)" }}>
          <button onClick={logout} style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.6)", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>
            Logout →
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: "auto" }}>

        {/* Header */}
        <div style={{ background: "#fff", padding: "20px 32px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#1C1C1E", margin: 0 }}>
              {sideItems.find(s => s.id === tab)?.label}
            </h1>
            <p style={{ color: "#999", fontSize: 13, margin: "4px 0 0" }}>YogAyur Bliss Admin</p>
          </div>
          <a href="/" target="_blank" style={{ color: "#0D5C3A", fontSize: 13, textDecoration: "none", background: "#E8F5EF", padding: "8px 16px", borderRadius: 8 }}>
            View Website ↗
          </a>
        </div>

        <div style={{ padding: 32 }}>

          {/* ── DASHBOARD TAB ── */}
          {tab === "dashboard" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, marginBottom: 32 }}>
                <StatCard icon="📅" label="Total Bookings" value={s(analytics, "totalBookings")} color="#0D5C3A" />
                <StatCard icon="🆕" label="New This Week" value={s(analytics, "newBookings")} color="#C9A84C" />
                <StatCard icon="🖼️" label="Photos Uploaded" value={s(analytics, "totalPhotos")} color="#E07B39" />
                <StatCard icon="✍️" label="Blog Posts" value={s(analytics, "totalBlogs")} color="#6B7FD4" />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {/* Recent Bookings */}
                <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0f0f0" }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, marginBottom: 16 }}>Recent Bookings</h3>
                  {bookings.slice(0, 5).map(b => (
                    <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f8f8f8" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1E" }}>{b.name}</div>
                        <div style={{ fontSize: 12, color: "#999" }}>{b.service}</div>
                      </div>
                      <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, background: `${STATUS_COLORS[b.status]}20`, color: STATUS_COLORS[b.status] }}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                  {bookings.length === 0 && <p style={{ color: "#bbb", fontSize: 14 }}>No bookings yet</p>}
                  <button onClick={() => setTab("bookings")} style={{ ...btnPrimary, marginTop: 16, width: "100%", justifyContent: "center" }}>
                    View All Bookings
                  </button>
                </div>

                {/* Quick Actions */}
                <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0f0f0" }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, marginBottom: 16 }}>Quick Actions</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <button onClick={() => { setTab("photos"); }} style={{ ...btnPrimary, justifyContent: "center" }}>🖼️ Upload New Photo</button>
                    <button onClick={() => { setTab("blogs"); setEditBlog({}); }} style={{ ...btnPrimary, background: "linear-gradient(135deg,#C9A84C,#A88835)", justifyContent: "center" }}>✍️ Write New Blog Post</button>
                    <button onClick={() => setTab("bookings")} style={{ ...btnPrimary, background: "linear-gradient(135deg,#6B7FD4,#4A5FB5)", justifyContent: "center" }}>📅 Check New Bookings</button>
                    <a href="https://wa.me/91XXXXXXXXXX" target="_blank" style={{ ...btnPrimary, background: "linear-gradient(135deg,#25D366,#1da851)", justifyContent: "center", textDecoration: "none" }}>
                      💬 WhatsApp Clients
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── PHOTOS TAB ── */}
          {tab === "photos" && (
            <div>
              {/* Upload Form */}
              <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f0f0f0", marginBottom: 28 }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, marginBottom: 20 }}>Upload New Photo</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#555", marginBottom: 6 }}>Section *</label>
                    <select value={photoSection} onChange={e => { setPhotoSection(e.target.value); loadPhotos(e.target.value); }} style={inputStyle}>
                      {SECTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#555", marginBottom: 6 }}>Alt Text * (for SEO)</label>
                    <input style={inputStyle} placeholder="e.g. Yoga therapy session" value={photoAlt} onChange={e => setPhotoAlt(e.target.value)} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#555", marginBottom: 6 }}>Title (optional)</label>
                    <input style={inputStyle} placeholder="e.g. Our yoga studio" value={photoTitle} onChange={e => setPhotoTitle(e.target.value)} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#555", marginBottom: 6 }}>Photo File *</label>
                    <input ref={fileRef} type="file" accept="image/*" onChange={e => setPhotoFile(e.target.files?.[0] || null)} style={{ ...inputStyle, padding: "9px 14px" }} />
                  </div>
                </div>

                {photoFile && (
                  <div style={{ marginBottom: 16, padding: 12, background: "#F8F9FA", borderRadius: 10, fontSize: 13, color: "#555" }}>
                    Selected: {photoFile.name} ({(photoFile.size / 1024).toFixed(1)} KB)
                  </div>
                )}

                {photoMsg && (
                  <div style={{ marginBottom: 16, padding: "10px 14px", background: photoMsg.startsWith("✓") ? "#F0FDF4" : "#FEF2F2", borderRadius: 10, fontSize: 13, color: photoMsg.startsWith("✓") ? "#16A34A" : "#DC2626" }}>
                    {photoMsg}
                  </div>
                )}

                <button onClick={uploadPhoto} disabled={photoUploading} style={{ ...btnPrimary, opacity: photoUploading ? 0.7 : 1 }}>
                  {photoUploading ? "Uploading..." : "🚀 Upload Photo"}
                </button>
              </div>

              {/* Photo Grid */}
              <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18 }}>
                    {photoSection.charAt(0).toUpperCase() + photoSection.slice(1)} Photos ({photos.length})
                  </h3>
                  <div style={{ display: "flex", gap: 8 }}>
                    {SECTIONS.map(s => (
                      <button key={s} onClick={() => { setPhotoSection(s); loadPhotos(s); }} style={{
                        padding: "6px 14px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500,
                        background: photoSection === s ? "#0D5C3A" : "#f0f0f0",
                        color: photoSection === s ? "#fff" : "#666"
                      }}>{s}</button>
                    ))}
                  </div>
                </div>

                {photos.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "48px 0", color: "#bbb" }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📷</div>
                    <p>No photos in {photoSection} section yet. Upload your first photo!</p>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16 }}>
                    {photos.map(photo => (
                      <div key={photo.id} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #f0f0f0", background: "#f8f8f8" }}>
                        <div style={{ height: 140, overflow: "hidden", position: "relative" }}>
                          <img src={photo.url} alt={photo.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ padding: "10px 12px" }}>
                          <p style={{ fontSize: 12, color: "#555", margin: "0 0 8px", lineHeight: 1.4 }}>{photo.alt}</p>
                          <button onClick={() => deletePhoto(photo.id, photo.url)} style={{ fontSize: 12, color: "#EF4444", background: "#FEF2F2", border: "none", borderRadius: 6, padding: "5px 10px", cursor: "pointer", width: "100%" }}>
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── BLOGS TAB ── */}
          {tab === "blogs" && (
            <div>
              {/* Blog Editor */}
              {editBlog !== null ? (
                <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f0f0f0", marginBottom: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18 }}>
                      {editBlog.id ? "Edit Blog Post" : "Write New Blog Post"}
                    </h3>
                    <button onClick={() => setEditBlog(null)} style={{ background: "#f0f0f0", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13 }}>
                      Cancel
                    </button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#555", marginBottom: 6 }}>Title *</label>
                      <input style={inputStyle} placeholder="Blog post title" value={editBlog.title || ""} onChange={e => setEditBlog({ ...editBlog, title: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#555", marginBottom: 6 }}>Category</label>
                      <select style={inputStyle} value={editBlog.category || ""} onChange={e => setEditBlog({ ...editBlog, category: e.target.value })}>
                        <option value="">Select category</option>
                        {BLOG_CATS.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#555", marginBottom: 6 }}>Cover Image URL</label>
                      <input style={inputStyle} placeholder="https://..." value={editBlog.cover_image || ""} onChange={e => setEditBlog({ ...editBlog, cover_image: e.target.value })} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 24 }}>
                      <input type="checkbox" id="pub" checked={editBlog.published || false} onChange={e => setEditBlog({ ...editBlog, published: e.target.checked })} style={{ width: 18, height: 18 }} />
                      <label htmlFor="pub" style={{ fontSize: 14, color: "#555" }}>Publish immediately</label>
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#555", marginBottom: 6 }}>Excerpt (short summary)</label>
                    <textarea style={{ ...inputStyle, height: 80, resize: "none" }} placeholder="Brief description shown in blog listing..." value={editBlog.excerpt || ""} onChange={e => setEditBlog({ ...editBlog, excerpt: e.target.value })} />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#555", marginBottom: 6 }}>Content * (HTML supported)</label>
                    <textarea style={{ ...inputStyle, height: 280, resize: "vertical" }} placeholder="Write your blog post here. You can use HTML tags like <h2>, <p>, <strong>, <em>, <ul>, <li>..." value={editBlog.content || ""} onChange={e => setEditBlog({ ...editBlog, content: e.target.value })} />
                  </div>

                  {blogMsg && (
                    <div style={{ marginBottom: 16, padding: "10px 14px", background: blogMsg.startsWith("✓") ? "#F0FDF4" : "#FEF2F2", borderRadius: 10, fontSize: 13, color: blogMsg.startsWith("✓") ? "#16A34A" : "#DC2626" }}>
                      {blogMsg}
                    </div>
                  )}

                  <button onClick={saveBlog} disabled={blogSaving} style={{ ...btnPrimary, opacity: blogSaving ? 0.7 : 1 }}>
                    {blogSaving ? "Saving..." : "💾 Save Blog Post"}
                  </button>
                </div>
              ) : (
                <div style={{ marginBottom: 20 }}>
                  <button onClick={() => setEditBlog({})} style={btnPrimary}>✍️ Write New Blog Post</button>
                </div>
              )}

              {/* Blog List */}
              <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f0f0f0" }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, marginBottom: 20 }}>All Blog Posts ({blogs.length})</h3>
                {blogs.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "48px 0", color: "#bbb" }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>✍️</div>
                    <p>No blog posts yet. Write your first post!</p>
                  </div>
                ) : blogs.map(blog => (
                  <div key={blog.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #f8f8f8" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <span style={{ fontWeight: 600, fontSize: 15, color: "#1C1C1E" }}>{blog.title}</span>
                        <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: blog.published ? "#F0FDF4" : "#FFF7ED", color: blog.published ? "#16A34A" : "#D97706" }}>
                          {blog.published ? "Published" : "Draft"}
                        </span>
                        {blog.category && <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: "#EEF2FF", color: "#4338CA" }}>{blog.category}</span>}
                      </div>
                      <div style={{ fontSize: 13, color: "#999" }}>{new Date(blog.created_at).toLocaleDateString("en-IN")}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setEditBlog(blog)} style={{ fontSize: 13, background: "#EEF2FF", color: "#4338CA", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => deleteBlog(blog.id)} style={{ fontSize: 13, background: "#FEF2F2", color: "#EF4444", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer" }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── BOOKINGS TAB ── */}
          {tab === "bookings" && (
            <div>
              {/* Filter */}
              <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
                {["all", "new", "contacted", "confirmed", "completed", "cancelled"].map(s => (
                  <button key={s} onClick={() => setBookingFilter(s)} style={{
                    padding: "8px 18px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
                    background: bookingFilter === s ? "#0D5C3A" : "#fff",
                    color: bookingFilter === s ? "#fff" : "#666",
                    boxShadow: "0 2px 8px rgba(0,0,0,.06)"
                  }}>
                    {s.charAt(0).toUpperCase() + s.slice(1)} {s === "new" && bookings.filter(b => b.status === "new").length > 0 ? `(${bookings.filter(b => b.status === "new").length})` : ""}
                  </button>
                ))}
              </div>

              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", overflow: "hidden" }}>
                {bookings.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "64px 0", color: "#bbb" }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📅</div>
                    <p>No bookings found</p>
                  </div>
                ) : bookings.map(b => (
                  <div key={b.id} style={{ padding: "20px 28px", borderBottom: "1px solid #f8f8f8", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#E8F5EF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#0D5C3A", fontSize: 16 }}>
                          {b.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 16, color: "#1C1C1E" }}>{b.name}</div>
                          <div style={{ fontSize: 13, color: "#999" }}>{new Date(b.created_at).toLocaleString("en-IN")}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#666", flexWrap: "wrap", marginBottom: b.message ? 8 : 0 }}>
                        <span>📧 {b.email}</span>
                        {b.phone && <span>📞 {b.phone}</span>}
                        {b.service && <span>🧘 {b.service}</span>}
                      </div>
                      {b.message && <p style={{ fontSize: 13, color: "#888", background: "#F8F9FA", padding: "10px 14px", borderRadius: 8, marginTop: 8 }}>{b.message}</p>}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                      <span style={{ fontSize: 12, padding: "5px 14px", borderRadius: 999, background: `${STATUS_COLORS[b.status]}18`, color: STATUS_COLORS[b.status], fontWeight: 600 }}>
                        {b.status}
                      </span>
                      <select value={b.status} onChange={e => updateBookingStatus(b.id, e.target.value)} style={{ fontSize: 13, padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e8e8e8", cursor: "pointer", background: "#fff" }}>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <a href={`mailto:${b.email}`} style={{ fontSize: 13, padding: "8px 14px", background: "#EEF2FF", color: "#4338CA", borderRadius: 8, textDecoration: "none" }}>
                        📧 Email
                      </a>
                      {b.phone && (
                        <a href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, padding: "8px 14px", background: "#F0FDF4", color: "#16A34A", borderRadius: 8, textDecoration: "none" }}>
                          💬 WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ANALYTICS TAB ── */}
          {tab === "analytics" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 20, marginBottom: 32 }}>
                <StatCard icon="📅" label="Total Bookings" value={s(analytics, "totalBookings")} color="#0D5C3A" />
                <StatCard icon="🆕" label="New This Week" value={s(analytics, "newBookings")} color="#C9A84C" />
                <StatCard icon="🖼️" label="Photos" value={s(analytics, "totalPhotos")} color="#E07B39" />
                <StatCard icon="📝" label="Blog Posts" value={`${s(analytics, "publishedBlogs")}/${s(analytics, "totalBlogs")}`} color="#6B7FD4" />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {/* Bookings by Status */}
                <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0f0f0" }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, marginBottom: 20 }}>Bookings by Status</h3>
                  {Object.entries((analytics.statusCounts as Record<string, number>) || {}).map(([status, count]) => (
                    <div key={status} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ fontSize: 14, textTransform: "capitalize", color: "#555" }}>{status}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ height: 8, borderRadius: 4, background: `${STATUS_COLORS[status]}40`, width: Math.max(40, count * 20), maxWidth: 120 }}>
                          <div style={{ height: "100%", borderRadius: 4, background: STATUS_COLORS[status], width: "100%" }} />
                        </div>
                        <span style={{ fontWeight: 700, color: "#1C1C1E", minWidth: 24 }}>{count}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bookings by Service */}
                <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0f0f0" }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, marginBottom: 20 }}>Popular Services</h3>
                  {Object.entries((analytics.serviceCounts as Record<string, number>) || {})
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 6)
                    .map(([service, count]) => (
                      <div key={service} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                        <span style={{ fontSize: 13, color: "#555", flex: 1 }}>{service}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ height: 8, borderRadius: 4, background: "#E8F5EF", width: Math.max(40, count * 20), maxWidth: 100 }}>
                            <div style={{ height: "100%", borderRadius: 4, background: "#0D5C3A", width: "100%" }} />
                          </div>
                          <span style={{ fontWeight: 700, color: "#1C1C1E", minWidth: 24 }}>{count}</span>
                        </div>
                      </div>
                    ))}
                  {Object.keys((analytics.serviceCounts as Record<string, number>) || {}).length === 0 && (
                    <p style={{ color: "#bbb", fontSize: 14 }}>No data yet</p>
                  )}
                </div>
              </div>

              {/* Setup Guide */}
              <div style={{ background: "linear-gradient(135deg,#083D26,#0D5C3A)", borderRadius: 16, padding: 28, marginTop: 24, color: "#fff" }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, marginBottom: 8 }}>💡 Add Google Analytics for Page Views</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,.7)", lineHeight: 1.7, marginBottom: 16 }}>
                  Add your GA4 Tracking ID in environment variables to track website visitors, page views, and user behavior.
                </p>
                <code style={{ background: "rgba(255,255,255,.1)", padding: "12px 16px", borderRadius: 10, fontSize: 13, display: "block", fontFamily: "monospace" }}>
                  NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
                </code>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
