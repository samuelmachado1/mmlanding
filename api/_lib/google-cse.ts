import { getSearchQueries } from './search-queries';
import { normalizeUrl } from './normalize-url';

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

export interface SearchResult {
  query: string;
  items: GoogleCseItem[];
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

  const response = await fetch(url.toString(), {
    signal: AbortSignal.timeout(6_000),
  });

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

/** Opcional: usa Custom Search API se GOOGLE_CSE_API_KEY + GOOGLE_CSE_ID estão no .env */
export async function searchClippings(
  apiKey: string,
  cx: string,
): Promise<SearchResult[]> {
  const queries = getSearchQueries();
  const seen = new Set<string>();
  const settled = await Promise.allSettled(
    queries.map((query) => fetchQuery(apiKey, cx, query)),
  );

  return queries.map((query, index) => {
    const outcome = settled[index];

    if (!outcome || outcome.status === 'rejected') {
      console.error(
        `Google CSE search failed for "${query}":`,
        outcome?.status === 'rejected' ? outcome.reason : 'missing result',
      );
      return { query, items: [] };
    }

    const uniqueItems: GoogleCseItem[] = [];

    for (const item of outcome.value) {
      const key = normalizeUrl(item.link);
      if (seen.has(key)) continue;
      seen.add(key);
      uniqueItems.push(item);
    }

    return { query, items: uniqueItems };
  });
}
