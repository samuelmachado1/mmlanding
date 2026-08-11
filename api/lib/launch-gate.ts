export const PREVIEW_COOKIE = '__max_preview';

export function formatDateInBrazil(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function isSiteLaunchedFromEnv(env: Record<string, string | undefined>): boolean {
  const siteLaunched = env.SITE_LAUNCHED?.trim() ?? '';
  const launchDate = env.LAUNCH_DATE?.trim() ?? '';

  if (siteLaunched === 'true') return true;

  if (!launchDate) {
    if (siteLaunched === 'false') return false;
    return env.VERCEL_ENV !== 'production';
  }

  return formatDateInBrazil(new Date()) >= launchDate;
}

export async function hashPreviewSecret(secret: string): Promise<string> {
  const data = new TextEncoder().encode(secret);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function getPreviewCookieFromHeader(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  for (const part of cookieHeader.split(';')) {
    const [name, ...valueParts] = part.trim().split('=');
    if (name === PREVIEW_COOKIE) {
      return valueParts.join('=');
    }
  }

  return null;
}

export function hasValidPreviewAccess(
  url: URL,
  cookieHeader: string | null,
  previewSecret: string | undefined,
  expectedHash: string | null,
): boolean {
  if (!previewSecret || !expectedHash) return false;

  const previewParam = url.searchParams.get('preview');
  if (previewParam && previewParam === previewSecret) return true;

  return getPreviewCookieFromHeader(cookieHeader) === expectedHash;
}

export function buildPreviewCookie(token: string, maxAgeSeconds = 60 * 60 * 24 * 7): string {
  return `${PREVIEW_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}
