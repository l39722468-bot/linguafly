import { shouldLoadInMobiCmp } from '@/lib/inmobi-cmp-config';

export const COOKIEBOT_ID =
  process.env.NEXT_PUBLIC_COOKIEBOT_ID || '474b1dce-7229-40d3-88c2-a2323b9a57f9';

const DEFAULT_AUTHORIZED_HOSTS = [
  'linguafly.app',
  'www.linguafly.app',
  'www.focus-on-english.com',
  'focus-on-english.com',
  'localhost',
  '127.0.0.1',
];

export function getCookiebotAuthorizedHosts(): string[] {
  const fromEnv = process.env.NEXT_PUBLIC_COOKIEBOT_HOSTS;
  if (!fromEnv) return DEFAULT_AUTHORIZED_HOSTS;
  return fromEnv
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
}

export function isCookiebotHost(hostname: string): boolean {
  const normalized = hostname.toLowerCase();
  return getCookiebotAuthorizedHosts().some(
    (host) => normalized === host || normalized.endsWith(`.${host}`)
  );
}

export function shouldLoadCookiebot(hostname?: string): boolean {
  if (process.env.NEXT_PUBLIC_COOKIEBOT_ENABLED === 'false') return false;
  if (!hostname) return false;
  if (shouldLoadInMobiCmp(hostname)) return false;
  return isCookiebotHost(hostname);
}
