import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectTo = requestUrl.searchParams.get("redirectTo") || "/dashboard";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Make sure redirectTo is safe (starts with /)
      const safeRedirectTo = redirectTo.startsWith("/") ? redirectTo : "/dashboard";
      return NextResponse.redirect(
        new URL(safeRedirectTo, requestUrl.origin)
      );
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(
    new URL("/auth/auth-code-error", requestUrl.origin)
  );
}
