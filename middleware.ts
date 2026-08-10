import {
  buildPreviewCookie,
  getPreviewCookie,
  hasValidPreviewAccess,
  hashPreviewSecret,
  isSiteLaunched,
} from './lib/site-launch.ts';

const STATIC_PATHS = new Set(['/coming-soon.html', '/favicon.svg', '/logo.svg', '/icons.svg']);

function shouldBypassMiddleware(pathname: string): boolean {
  if (STATIC_PATHS.has(pathname)) return true;
  if (pathname.startsWith('/fonts/')) return true;
  if (pathname.startsWith('/assets/')) return true;
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
  const previewSecret = env.PREVIEW_SECRET;
  const previewHash = previewSecret ? await hashPreviewSecret(previewSecret) : null;
  const launched = isSiteLaunched(env);
  const hasPreview = hasValidPreviewAccess(request, previewSecret, previewHash);

  if (launched || hasPreview) {
    const previewParam = url.searchParams.get('preview');
    const shouldSetPreviewCookie =
      !launched &&
      previewSecret &&
      previewHash &&
      previewParam === previewSecret &&
      getPreviewCookie(request) !== previewHash;

    return passThrough(
      request,
      shouldSetPreviewCookie ? buildPreviewCookie(previewHash) : undefined,
    );
  }

  if (url.pathname === '/api/clippings') {
    return Response.json({ error: 'Not available yet' }, { status: 403 });
  }

  if (url.pathname === '/coming-soon.html') {
    return fetch(request);
  }

  const rewriteUrl = new URL('/coming-soon.html', request.url);
  return fetch(rewriteUrl.toString(), {
    headers: request.headers,
    method: request.method,
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
