import { NextResponse } from "next/server";

export async function GET() {
  // Diagnostic endpoints must never disclose deployment configuration in production.
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.json({
    message: "Development diagnostics",
    aiProvider: "Cloudflare Workers AI",
    nodeEnv: process.env.NODE_ENV || "development",
    note: "Validate the AI binding through the local Worker preview; do not expose credentials here.",
  });
}
