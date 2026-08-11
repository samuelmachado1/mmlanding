export const PREVIEW_SESSION_KEY = '__max_preview_access';

export function formatDateInBrazil(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function isSiteLaunched(
  siteLaunched: string,
  launchDate: string,
  isProductionBuild: boolean,
): boolean {
  const launched = siteLaunched.trim();
  const date = launchDate.trim();

  if (launched === 'true') return true;

  if (!date) {
    if (launched === 'false') return false;
    return !isProductionBuild;
  }

  return formatDateInBrazil(new Date()) >= date;
}

export function isSiteAccessGated(
  siteLaunched: string = __SITE_LAUNCHED__,
  launchDate: string = __LAUNCH_DATE__,
  isProductionBuild: boolean = __IS_PROD_BUILD__,
): boolean {
  return !isSiteLaunched(siteLaunched, launchDate, isProductionBuild);
}

export function hasStoredPreviewAccess(): boolean {
  try {
    return sessionStorage.getItem(PREVIEW_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function markPreviewAccessGranted(): void {
  try {
    sessionStorage.setItem(PREVIEW_SESSION_KEY, '1');
  } catch {
    // Ignore storage errors (private mode, etc.)
  }
}

export async function checkLaunchAccess(search = window.location.search): Promise<boolean> {
  if (hasStoredPreviewAccess()) {
    return true;
  }

  const params = new URLSearchParams(search);
  const preview = params.get('preview');

  if (preview && __PREVIEW_SECRET__ && preview === __PREVIEW_SECRET__) {
    markPreviewAccessGranted();
    return true;
  }

  const apiUrl = preview
    ? `/api/launch-status?preview=${encodeURIComponent(preview)}`
    : '/api/launch-status';

  try {
    const response = await fetch(apiUrl, { credentials: 'same-origin' });
    if (!response.ok) return false;

    const data = (await response.json()) as { allowed?: boolean };
    if (data.allowed) {
      markPreviewAccessGranted();
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
