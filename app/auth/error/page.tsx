export default function AuthErrorPage() {
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
        textAlign: "center",
      }}>
        <div style={{ fontSize: "48px", marginBottom: "20px" }}>❌</div>
        <h1 style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#f1f5f9",
          marginBottom: "12px",
        }}>Authentication Error</h1>
        <p style={{
          color: "#94a3b8",
          fontSize: "14px",
          marginBottom: "24px",
        }}>Something went wrong during authentication. Please try again.</p>
        <a href="/login" style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
          color: "#ffffff",
          padding: "12px 24px",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "14px",
        }}>
          Back to Login
        </a>
      </div>
    </div>
  );
}
