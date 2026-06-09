"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Already logged in?
    if (localStorage.getItem("admin_token")) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("admin_token", data.token);
        router.push("/admin/dashboard");
      } else {
        setError("Wrong password. Try again.");
      }
    } catch {
      setError("Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg,#083D26,#0D5C3A,#1A7A4F)"
    }}>
      <div style={{
        background: "#fff", borderRadius: 24, padding: "48px 40px",
        width: "100%", maxWidth: 400,
        boxShadow: "0 20px 60px rgba(0,0,0,.2)"
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "linear-gradient(135deg,#0D5C3A,#C9A84C)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, margin: "0 auto 16px"
          }}>✿</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: "#1C1C1E", marginBottom: 4 }}>
            Admin Panel
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#888" }}>
            YogAyur Bliss
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: "#555", marginBottom: 8 }}>
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              style={{
                width: "100%", padding: "13px 16px",
                border: "1.5px solid #e8e8e8", borderRadius: 12,
                fontFamily: "'Inter',sans-serif", fontSize: 15,
                outline: "none", boxSizing: "border-box"
              }}
            />
          </div>

          {error && (
            <div style={{
              background: "#FEF2F2", border: "1px solid #FECACA",
              borderRadius: 10, padding: "10px 14px", marginBottom: 16,
              fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#DC2626"
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", background: "linear-gradient(135deg,#0D5C3A,#1A7A4F)",
              color: "#fff", border: "none", borderRadius: 12,
              padding: "14px", fontFamily: "'Inter',sans-serif",
              fontWeight: 600, fontSize: 15, cursor: "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Logging in..." : "Login to Admin Panel →"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 24, fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#bbb" }}>
          <a href="/" style={{ color: "#0D5C3A", textDecoration: "none" }}>← Back to Website</a>
        </p>
      </div>
    </div>
  );
}
