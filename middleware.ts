import {
  buildPreviewCookie,
  getPreviewCookieFromHeader,
  hasValidPreviewAccess,
  hashPreviewSecret,
  isSiteLaunchedFromEnv,
} from './lib/launch-gate.ts';

const STATIC_PATHS = new Set(['/coming-soon.html', '/favicon.svg', '/logo.svg', '/icons.svg']);

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
