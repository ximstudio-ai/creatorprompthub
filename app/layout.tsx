import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CreatorPrompt Hub",
  description: "AI Prompt Generator for Creators",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
