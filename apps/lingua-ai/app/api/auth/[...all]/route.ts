import { getAuth } from "@/lib/auth/server";

async function handleAuth(request: Request): Promise<Response> {
  const auth = await getAuth();
  return auth.handler(request);
}

export const GET = handleAuth;
export const POST = handleAuth;
