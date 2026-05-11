"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
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
        }}>Create Account</h1>
        <p style={{
          color: "#94a3b8",
          fontSize: "14px",
          textAlign: "center",
          marginBottom: "32px",
        }}>Sign up to get started</p>

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

        {success && (
          <div style={{
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.3)",
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "20px",
            color: "#86efac",
            fontSize: "13px",
          }}>
            ✅ Account created! Check your email to confirm. Redirecting...
          </div>
        )}

        <form onSubmit={handleSignUp} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", color: "#e2e8f0", fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(0,0,0,0.2)",
                color: "#f1f5f9",
                fontSize: "14px",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", color: "#e2e8f0", fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(0,0,0,0.2)",
                color: "#f1f5f9",
                fontSize: "14px",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", color: "#e2e8f0", fontSize: "13px", fontWeight: "600", marginBottom: "8px" }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(0,0,0,0.2)",
                color: "#f1f5f9",
                fontSize: "14px",
                fontFamily: "inherit",
              }}
            />
          </div>

          <button
            type="submit"
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p style={{ color: "#718096", fontSize: "13px", textAlign: "center", marginTop: "24px" }}>
          Already have an account?{" "}
          <Link href="/login" style={{
            color: "#60a5fa",
            textDecoration: "none",
            fontWeight: "600",
            cursor: "pointer",
          }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
