"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOAuth = async (provider: "google" | "github") => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "48px 40px",
        maxWidth: "400px",
        width: "100%",
      }}>
        <h1 style={{
          fontSize: "28px",
          fontWeight: "700",
          color: "#f1f5f9",
          marginBottom: "8px",
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}>CreatorPrompt Hub</h1>
        <p style={{
          color: "#94a3b8",
          fontSize: "14px",
          textAlign: "center",
          marginBottom: "32px",
        }}>Sign in to continue</p>

        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "20px",
            color: "#fca5a5",
            fontSize: "13px",
          }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            onClick={() => handleOAuth("google")}
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "12px 20px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {loading ? "Signing in..." : "🔵 Continue with Google"}
          </button>

          <button
            onClick={() => handleOAuth("github")}
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #6b7280 0%, #374151 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "12px 20px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {loading ? "Signing in..." : "⚫ Continue with GitHub"}
          </button>
        </div>
      </div>
    </div>
  );
}
