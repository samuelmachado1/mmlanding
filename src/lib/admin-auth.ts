const SESSION_KEY = 'midia_admin_token';

export function getAdminToken(): string | null {
  return sessionStorage.getItem(SESSION_KEY);
}

export function setAdminToken(token: string): void {
  sessionStorage.setItem(SESSION_KEY, token);
}

export function clearAdminToken(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function captureAdminTokenFromUrl(): boolean {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('admin');
  if (!token) return false;

  setAdminToken(token);
  return true;
}

export async function adminFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = getAdminToken();
  if (!token) {
    throw new Error('Token de admin não configurado');
  }

  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${token}`);
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(path, { ...options, headers });
}
