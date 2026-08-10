export interface GoogleCseItem {
  title: string;
  link: string;
  displayLink: string;
  snippet?: string;
  pagemap?: {
    cse_image?: Array<{ src: string }>;
    metatags?: Array<Record<string, string>>;
  };
}

interface GoogleCseResponse {
  items?: GoogleCseItem[];
  error?: { message: string };
}

const SEARCH_QUERIES = ['"Max Maciel" deputado', '"Deputado Max Maciel"'];

export function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hash = '';
    parsed.search = '';
    return `${parsed.protocol}//${parsed.host.toLowerCase()}${parsed.pathname.replace(/\/$/, '')}`;
  } catch {
    return url.toLowerCase();
  }
}

async function fetchQuery(
  apiKey: string,
  cx: string,
  query: string,
): Promise<GoogleCseItem[]> {
  const url = new URL('https://www.googleapis.com/customsearch/v1');
  url.searchParams.set('key', apiKey);
  url.searchParams.set('cx', cx);
  url.searchParams.set('q', query);
  url.searchParams.set('dateRestrict', 'm1');
  url.searchParams.set('lr', 'lang_pt');
  url.searchParams.set('num', '10');

  const response = await fetch(url.toString());

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google CSE error ${response.status}: ${body}`);
  }

  const data = (await response.json()) as GoogleCseResponse;

  if (data.error) {
    throw new Error(`Google CSE error: ${data.error.message}`);
  }

  return data.items ?? [];
}

export async function searchClippings(
  apiKey: string,
  cx: string,
): Promise<GoogleCseItem[]> {
  const seen = new Set<string>();
  const results: GoogleCseItem[] = [];

  for (const query of SEARCH_QUERIES) {
    const items = await fetchQuery(apiKey, cx, query);

    for (const item of items) {
      const key = normalizeUrl(item.link);
      if (seen.has(key)) continue;
      seen.add(key);
      results.push(item);
    }
  }

  return results;
}
