const PREVIEW_COOKIE = '__max_preview';

const STATIC_PATHS = new Set(['/coming-soon.html', '/favicon.svg', '/logo.svg', '/icons.svg']);

function formatDateInBrazil(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function isSiteLaunchedFromEnv(env: Record<string, string | undefined>): boolean {
  const siteLaunched = env.SITE_LAUNCHED?.trim() ?? '';
  const launchDate = env.LAUNCH_DATE?.trim() ?? '';

  if (siteLaunched === 'true') return true;

  if (!launchDate) {
    if (siteLaunched === 'false') return false;
    return env.VERCEL_ENV !== 'production';
  }

  return formatDateInBrazil(new Date()) >= launchDate;
}

async function hashPreviewSecret(secret: string): Promise<string> {
  const data = new TextEncoder().encode(secret);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function getPreviewCookieFromHeader(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  for (const part of cookieHeader.split(';')) {
    const [name, ...valueParts] = part.trim().split('=');
    if (name === PREVIEW_COOKIE) {
      return valueParts.join('=');
    }
  }

  return null;
}

function hasValidPreviewAccess(
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

function buildPreviewCookie(token: string, maxAgeSeconds = 60 * 60 * 24 * 7): string {
  return `${PREVIEW_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}

function shouldBypassMiddleware(pathname: string): boolean {
  if (STATIC_PATHS.has(pathname)) return true;
  if (pathname.startsWith('/fonts/')) return true;
  if (pathname.startsWith('/assets/')) return true;
  if (pathname === '/api/launch-status') return true;
  if (pathname.startsWith('/api/cron/')) return true;
  if (/\.[a-z0-9]+$/i.test(pathname)) return true;
  return false;
}

async function passThrough(request: Request, previewCookie?: string): Promise<Response> {
  const response = await fetch(request);

  if (!previewCookie) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.append('Set-Cookie', previewCookie);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (shouldBypassMiddleware(url.pathname)) {
    return fetch(request);
  }

  const env = process.env;
  const previewSecret = env.PREVIEW_SECRET?.trim();
  const previewHash = previewSecret ? await hashPreviewSecret(previewSecret) : null;
  const launched = isSiteLaunchedFromEnv(env);
  const hasPreview = hasValidPreviewAccess(
    url,
    request.headers.get('cookie'),
    previewSecret,
    previewHash,
  );

  if (launched || hasPreview) {
    const previewParam = url.searchParams.get('preview');
    const shouldSetPreviewCookie =
      !launched &&
      previewSecret &&
      previewHash &&
      previewParam === previewSecret &&
      getPreviewCookieFromHeader(request.headers.get('cookie')) !== previewHash;

    return passThrough(
      request,
      shouldSetPreviewCookie ? buildPreviewCookie(previewHash) : undefined,
    );
  }

  if (url.pathname === '/api/clippings') {
    return Response.json({ error: 'Not available yet' }, { status: 403 });
  }

  return Response.redirect(new URL('/coming-soon.html', request.url), 307);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
