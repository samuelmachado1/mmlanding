const ADMIN_COOKIE = '__max_admin';

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

function buildAdminCookie(hash: string, maxAgeSeconds = 60 * 60 * 24 * 7): string {
  return `${ADMIN_COOKIE}=${hash}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
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

/** Edge middleware — gates `/admin/*` SPA routes with ADMIN_SECRET cookie. */
export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname.startsWith('/api/') || !pathname.startsWith('/admin')) {
    return fetch(request);
  }

  const adminSecret = process.env.ADMIN_SECRET?.trim();
  if (!adminSecret) {
    return new Response('Admin access is not configured', { status: 503 });
  }

  const expectedHash = await hashAdminSecret(adminSecret);
  const adminParam = url.searchParams.get('admin');
  const cookie = getCookieFromHeader(request.headers.get('cookie'), ADMIN_COOKIE);

  const hasAccess = cookie === expectedHash || adminParam === adminSecret;

  if (!hasAccess) {
    return Response.redirect(new URL('/', request.url), 307);
  }

  const shouldSetCookie =
    adminParam === adminSecret && cookie !== expectedHash;

  return passThrough(
    request,
    shouldSetCookie ? [buildAdminCookie(expectedHash)] : undefined,
  );
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
