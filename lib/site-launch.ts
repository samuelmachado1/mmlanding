const PREVIEW_COOKIE = '__max_preview';

export function isSiteLaunched(env: NodeJS.ProcessEnv): boolean {
  if (env.SITE_LAUNCHED === 'true') return true;
  if (env.SITE_LAUNCHED === 'false' && !env.LAUNCH_DATE) return false;

  const launchDate = env.LAUNCH_DATE;
  if (!launchDate) return true;

  return isLaunchDateReached(launchDate);
}

export function isLaunchDateReached(launchDate: string): boolean {
  const today = formatDateInTimeZone(new Date(), 'America/Sao_Paulo');
  return today >= launchDate;
}

function formatDateInTimeZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export async function hashPreviewSecret(secret: string): Promise<string> {
  const data = new TextEncoder().encode(secret);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function getPreviewCookie(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie');
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
  request: Request,
  previewSecret: string | undefined,
  expectedHash: string | null,
): boolean {
  if (!previewSecret || !expectedHash) return false;

  const url = new URL(request.url);
  const previewParam = url.searchParams.get('preview');
  if (previewParam && previewParam === previewSecret) return true;

  const cookieValue = getPreviewCookie(request);
  return cookieValue === expectedHash;
}

export function buildPreviewCookie(
  token: string,
  maxAgeSeconds = 60 * 60 * 24 * 7,
): string {
  return `${PREVIEW_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}

export { PREVIEW_COOKIE };
