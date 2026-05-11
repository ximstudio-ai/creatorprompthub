import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      padding: "40px 20px",
    }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
      }}>
        <div style={{ display: "flex", gap: "20px", marginBottom: "32px" }}>
          <Link href="/dashboard" style={{
            color: "#94a3b8",
            textDecoration: "none",
            fontSize: "14px",
            padding: "8px 16px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            ← Back to Dashboard
          </Link>
        </div>

        <div style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "40px",
        }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
            }}>
              👤
            </div>
            <h1 style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#f1f5f9",
              marginBottom: "8px",
            }}>My Profile</h1>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>{user.email}</p>
          </div>

          <div style={{
            background: "rgba(0,0,0,0.2)",
            borderRadius: "12px",
            padding: "24px",
            display: "grid",
            gap: "16px",
          }}>
            <div>
              <span style={{ color: "#718096", fontSize: "12px", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.05em" }}>Email Address</span>
              <p style={{ color: "#e2e8f0", marginTop: "4px", fontSize: "16px" }}>{user.email}</p>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px" }}>
              <span style={{ color: "#718096", fontSize: "12px", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.05em" }}>User ID</span>
              <code style={{ color: "#a78bfa", fontFamily: "monospace", fontSize: "12px", display: "block", marginTop: "4px", wordBreak: "break-all" }}>{user.id}</code>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px" }}>
              <span style={{ color: "#718096", fontSize: "12px", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.05em" }}>Member Since</span>
              <p style={{ color: "#e2e8f0", marginTop: "4px", fontSize: "16px" }}>{new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <Link href="/settings" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
            }}>
              Edit Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
