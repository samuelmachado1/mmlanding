/** Vercel Edge injects env at deploy; avoid node:process for middleware typecheck. */
declare const process: { env: Record<string, string | undefined> };

const ADMIN_COOKIE = '__max_admin';
const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24;

async function hashAdminSecret(secret: string): Promise<string> {
  const data = new TextEncoder().encode(secret);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function getCookieFromHeader(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;

  for (const part of cookieHeader.split(';')) {
    const [cookieName, ...valueParts] = part.trim().split('=');
    if (cookieName === name) {
      return valueParts.join('=');
    }
  }

  return null;
}

function buildAdminCookie(hash: string, maxAgeSeconds = ADMIN_COOKIE_MAX_AGE): string {
  return `${ADMIN_COOKIE}=${hash}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}

function getAdminSecret(): string | undefined {
  return process.env.ADMIN_SECRET?.trim() || undefined;
}

async function passThrough(request: Request, setCookies?: string[]): Promise<Response> {
  const response = await fetch(request);

  if (!setCookies || setCookies.length === 0) {
    return response;
  }

  const headers = new Headers(response.headers);
  for (const cookie of setCookies) {
    headers.append('Set-Cookie', cookie);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Edge middleware — only `/max-admin` (cookie on ?admin= link).
 * `/api/admin/*` bypasses middleware so Vercel injects OIDC for Blob auth.
 * API routes still enforce Bearer token in the serverless handler.
 */
export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname.startsWith('/admin')) {
    return new Response('Not Found', { status: 404 });
  }

  const adminSecret = getAdminSecret();
  if (!adminSecret) {
    return passThrough(request);
  }

  const expectedHash = await hashAdminSecret(adminSecret);
  const adminParam = url.searchParams.get('admin');
  const cookie = getCookieFromHeader(request.headers.get('cookie'), ADMIN_COOKIE);
  const shouldSetCookie = adminParam === adminSecret && cookie !== expectedHash;

  return passThrough(
    request,
    shouldSetCookie ? [buildAdminCookie(expectedHash)] : undefined,
  );
}

export const config = {
  matcher: ['/max-admin/:path*', '/admin/:path*'],
};
