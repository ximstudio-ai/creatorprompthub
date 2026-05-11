import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function SettingsPage() {
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
        <div style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "40px",
        }}>
          <h1 style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#f1f5f9",
            marginBottom: "32px",
          }}>Settings</h1>

          <div style={{ marginBottom: "32px" }}>
            <h2 style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#e2e8f0",
              marginBottom: "16px",
            }}>Account Information</h2>
            <div style={{
              background: "rgba(0,0,0,0.2)",
              borderRadius: "12px",
              padding: "20px",
              display: "grid",
              gap: "12px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: "14px" }}>
                <span>Email:</span>
                <span style={{ color: "#e2e8f0", fontWeight: "500" }}>{user.email}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: "14px" }}>
                <span>User ID:</span>
                <code style={{ color: "#a78bfa", fontFamily: "monospace", fontSize: "12px" }}>{user.id}</code>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: "14px" }}>
                <span>Created:</span>
                <span style={{ color: "#e2e8f0" }}>{new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "32px",
          }}>
            <h2 style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#fca5a5",
              marginBottom: "12px",
            }}>Danger Zone</h2>
            <p style={{ color: "#f87171", fontSize: "14px", marginBottom: "16px" }}>
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button style={{
              background: "rgba(239,68,68,0.2)",
              border: "1px solid rgba(239,68,68,0.4)",
              color: "#fca5a5",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.2)";
            }}
            >
              Delete Account
            </button>
          </div>

          <div style={{ marginTop: "32px" }}>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
