import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
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
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
            {user.user_metadata?.picture && (
              <img
                src={user.user_metadata.picture}
                alt={user.user_metadata?.name || "User"}
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.1)",
                }}
              />
            )}
            <div>
              <h1 style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#f1f5f9",
                margin: "0 0 4px 0",
              }}>
                Welcome, {user.user_metadata?.name || "User"}
              </h1>
              <p style={{ color: "#94a3b8", margin: 0 }}>{user.email}</p>
            </div>
          </div>

          <div style={{
            background: "rgba(167,139,250,0.1)",
            border: "1px solid rgba(167,139,250,0.3)",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "32px",
          }}>
            <p style={{ color: "#e9d5ff", margin: 0, fontSize: "14px" }}>
              ✅ You are authenticated with Supabase!
            </p>
          </div>

          <div style={{
            background: "rgba(0,0,0,0.2)",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "32px",
          }}>
            <h2 style={{ color: "#e2e8f0", fontSize: "16px", marginBottom: "12px", margin: "0 0 12px 0" }}>User Info</h2>
            <div style={{ display: "grid", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: "14px" }}>
                <span>User ID:</span>
                <code style={{ color: "#a78bfa", fontFamily: "monospace", fontSize: "12px" }}>{user.id}</code>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: "14px" }}>
                <span>Provider:</span>
                <span style={{ color: "#60a5fa" }}>{user.app_metadata?.provider?.toUpperCase() || "N/A"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: "14px" }}>
                <span>Sign-in Count:</span>
                <span style={{ color: "#34d399" }}>{user.user_metadata?.sign_in_count || 0}</span>
              </div>
            </div>
          </div>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
