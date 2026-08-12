// API Route para verificar configuración (SOLO PARA DEBUG)
import { NextResponse } from 'next/server';

export async function GET() {
  const config = {
    openai: !!process.env.OPENAI_API_KEY,
    cloudflareAccount: !!process.env.CLOUDFLARE_ACCOUNT_ID,
    cloudflareToken: !!process.env.CLOUDFLARE_API_TOKEN,
    nodeEnv: process.env.NODE_ENV,
  };

  return NextResponse.json({
    message: 'Environment Check',
    config,
    timestamp: new Date().toISOString(),
  });
}
