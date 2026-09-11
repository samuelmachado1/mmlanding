export const INSTITUTIONAL_CONTACT_EMAIL = 'contato@maxmaciel.com.br';
export const CAMPAIGN_CONTACT_EMAIL = 'contato@maxmaciel50100.com.br';

const CAMPAIGN_HOST = 'maxmaciel50100.com.br';

function normalizeHostname(hostname: string): string {
  return hostname.replace(/^www\./i, '').toLowerCase();
}

export function getContactEmail(hostname?: string): string {
  const host = normalizeHostname(
    hostname ?? (typeof window !== 'undefined' ? window.location.hostname : ''),
  );

  if (host === CAMPAIGN_HOST || host.endsWith(`.${CAMPAIGN_HOST}`)) {
    return CAMPAIGN_CONTACT_EMAIL;
  }

  return INSTITUTIONAL_CONTACT_EMAIL;
}
