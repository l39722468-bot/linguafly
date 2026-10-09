import { loginPost } from "@/lib/billing/auth-actions";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  return loginPost(request);
}
