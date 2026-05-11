"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      style={{
        width: "100%",
        background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
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
      {loading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
