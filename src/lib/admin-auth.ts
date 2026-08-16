const SESSION_KEY = 'midia_admin_token';
const SESSION_EXPIRY_KEY = 'midia_admin_token_exp';
const ADMIN_SESSION_MS = 24 * 60 * 60 * 1000;

export function getAdminToken(): string | null {
  const expiry = sessionStorage.getItem(SESSION_EXPIRY_KEY);
  if (expiry && Date.now() > Number(expiry)) {
    clearAdminToken();
    return null;
  }

  return sessionStorage.getItem(SESSION_KEY);
}

export function setAdminToken(token: string): void {
  sessionStorage.setItem(SESSION_KEY, token);
  sessionStorage.setItem(SESSION_EXPIRY_KEY, String(Date.now() + ADMIN_SESSION_MS));
}

export function clearAdminToken(): void {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_EXPIRY_KEY);
}

export function captureAdminTokenFromUrl(): boolean {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('admin');
  if (!token) return false;

  setAdminToken(token);

  params.delete('admin');
  const newSearch = params.toString();
  const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}${window.location.hash}`;
  window.history.replaceState(null, '', newUrl);

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
