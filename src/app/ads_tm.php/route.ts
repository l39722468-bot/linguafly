import { adsTxtResponseHeaders, getAdsTxtContent } from '@/lib/ads-txt';

export const runtime = 'nodejs';

/**
 * Equivalente a ads_tm.php de The Moneytizer en hosting PHP.
 * Moneytizer verifica que /ads.txt y /ads_tm.php devuelvan el mismo contenido.
 */
export async function GET() {
  const body = await getAdsTxtContent();

  return new Response(body, {
    headers: adsTxtResponseHeaders(),
  });
}
