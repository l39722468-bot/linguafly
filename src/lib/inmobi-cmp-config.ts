export const INMOBI_CMP_ACCOUNT_ID =
  process.env.NEXT_PUBLIC_INMOBI_CMP_ACCOUNT_ID || '6Fv0cGNfc_bw8';

/** Host registrado en el tag de The Moneytizer / InMobi Choice. */
export const INMOBI_CMP_PUBLISHER_HOST =
  process.env.NEXT_PUBLIC_INMOBI_CMP_PUBLISHER_HOST || 'www.themoneytizer.com';

const DEFAULT_AUTHORIZED_HOSTS = [
  'www.linguafly.app',
  'linguafly.app',
  'localhost',
  '127.0.0.1',
];

export function getInMobiCmpAuthorizedHosts(): string[] {
  const fromEnv = process.env.NEXT_PUBLIC_INMOBI_CMP_HOSTS;
  if (!fromEnv) return DEFAULT_AUTHORIZED_HOSTS;
  return fromEnv
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
}

export function isInMobiCmpHost(hostname: string): boolean {
  const normalized = hostname.toLowerCase();
  return getInMobiCmpAuthorizedHosts().some(
    (host) => normalized === host || normalized.endsWith(`.${host}`),
  );
}

export function shouldLoadInMobiCmp(hostname?: string): boolean {
  if (process.env.NEXT_PUBLIC_INMOBI_CMP_ENABLED === 'false') return false;
  if (!hostname) return false;
  return isInMobiCmpHost(hostname);
}
