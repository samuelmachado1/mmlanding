const PREVIEW_STORAGE_KEY = '__max_preview';

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

export function hasPreviewAccess(previewSecret: string): boolean {
  const secret = previewSecret.trim();
  if (!secret) return false;

  const url = new URL(window.location.href);
  const previewParam = url.searchParams.get('preview');

  if (previewParam === secret) {
    sessionStorage.setItem(PREVIEW_STORAGE_KEY, secret);
    return true;
  }

  return sessionStorage.getItem(PREVIEW_STORAGE_KEY) === secret;
}

export function shouldShowSite(
  siteLaunched: string,
  launchDate: string,
  previewSecret: string,
  isProductionBuild: boolean,
): boolean {
  if (isSiteLaunched(siteLaunched, launchDate, isProductionBuild)) return true;
  return hasPreviewAccess(previewSecret);
}
