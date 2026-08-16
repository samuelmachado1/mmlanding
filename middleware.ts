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

function jsonResponse(status: number, body: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
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

function hasAdminAccess(
  request: Request,
  adminSecret: string,
  expectedHash: string,
): boolean {
  const url = new URL(request.url);
  const adminParam = url.searchParams.get('admin');
  const cookie = getCookieFromHeader(request.headers.get('cookie'), ADMIN_COOKIE);
  const bearer = request.headers.get('authorization');

  return (
    cookie === expectedHash ||
    adminParam === adminSecret ||
    bearer === `Bearer ${adminSecret}`
  );
}

/** Edge middleware — gates `/max-admin/*` SPA routes and `/api/admin/*` with ADMIN_SECRET. */
export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const isAdminApi = pathname.startsWith('/api/admin');
  const isAdminPage = pathname.startsWith('/max-admin');
  const isLegacyAdminPage = pathname.startsWith('/admin');

  if (isLegacyAdminPage) {
    return new Response('Not Found', { status: 404 });
  }

  if (!isAdminApi && !isAdminPage) {
    return fetch(request);
  }

  const adminSecret = getAdminSecret();
  if (!adminSecret) {
    if (isAdminApi) {
      return jsonResponse(503, { error: 'Admin access is not configured' });
    }
    return new Response('Not Found', { status: 404 });
  }

  const expectedHash = await hashAdminSecret(adminSecret);

  if (!hasAdminAccess(request, adminSecret, expectedHash)) {
    if (isAdminApi) {
      return jsonResponse(401, { error: 'Unauthorized' });
    }
    return new Response('Not Found', { status: 404 });
  }

  const adminParam = url.searchParams.get('admin');
  const cookie = getCookieFromHeader(request.headers.get('cookie'), ADMIN_COOKIE);
  const shouldSetCookie = adminParam === adminSecret && cookie !== expectedHash;

  if (isAdminApi) {
    return fetch(request);
  }

  return passThrough(
    request,
    shouldSetCookie ? [buildAdminCookie(expectedHash)] : undefined,
  );
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
