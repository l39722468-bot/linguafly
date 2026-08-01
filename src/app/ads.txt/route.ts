import { adsTxtResponseHeaders, getAdsTxtContent } from '@/lib/ads-txt';

export const runtime = 'nodejs';

export async function GET() {
  const body = await getAdsTxtContent();

  return new Response(body, {
    headers: adsTxtResponseHeaders(),
  });
}
