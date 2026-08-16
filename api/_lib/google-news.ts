import Parser from 'rss-parser';
import { getSearchQueries } from './search-queries';
import { normalizeUrl } from './normalize-url';

const parser = new Parser({
  headers: {
    'User-Agent': 'max-maciel-landing/1.0',
    Accept: 'application/rss+xml, application/xml, text/xml',
  },
});

const RSS_BASE = 'https://news.google.com/rss/search';
const FETCH_TIMEOUT_MS = 6_000;

async function fetchRssFeed(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'max-maciel-landing/1.0',
      Accept: 'application/rss+xml, application/xml, text/xml',
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Google News RSS HTTP ${response.status}`);
  }

  return response.text();
}

export interface NewsSearchItem {
  title: string;
  link: string;
  source: string;
  date: string;
  snippet?: string;
  imageUrl?: string;
  rssHtml?: string;
}

export interface SearchResult {
  query: string;
  items: NewsSearchItem[];
}

function parseTitleAndPublisher(rawTitle: string): { title: string; publisher?: string } {
  const sep = ' - ';
  const idx = rawTitle.lastIndexOf(sep);
  if (idx > 0) {
    return {
      title: rawTitle.slice(0, idx).trim(),
      publisher: rawTitle.slice(idx + sep.length).trim(),
    };
  }
  return { title: rawTitle.trim() };
}

function formatDate(raw?: string): string {
  if (!raw) return 'Recente';

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return 'Recente';

  return parsed.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

async function fetchQuery(query: string): Promise<NewsSearchItem[]> {
  const params = new URLSearchParams({
    q: query,
    hl: 'pt-BR',
    gl: 'BR',
    ceid: 'BR:pt-419',
  });

  const url = `${RSS_BASE}?${params.toString()}`;
  const xml = await fetchRssFeed(url);
  const feed = await parser.parseString(xml);

  return (feed.items ?? [])
    .filter((item) => item.title && item.link)
    .map((item) => {
      const link = item.link!;
      const { title, publisher } = parseTitleAndPublisher(item.title!);

      return {
        title,
        link,
        source: publisher ?? 'Google News',
        date: formatDate(item.isoDate ?? item.pubDate),
        snippet: item.contentSnippet ?? item.content ?? undefined,
        rssHtml: item.content ?? undefined,
      };
    });
}

export async function searchGoogleNews(): Promise<SearchResult[]> {
  const queries = getSearchQueries();
  const seen = new Set<string>();
  const settled = await Promise.allSettled(queries.map((query) => fetchQuery(query)));

  return queries.map((query, index) => {
    const outcome = settled[index];

    if (!outcome || outcome.status === 'rejected') {
      console.error(
        `Google News search failed for "${query}":`,
        outcome?.status === 'rejected' ? outcome.reason : 'missing result',
      );
      return { query, items: [] };
    }

    const uniqueItems: NewsSearchItem[] = [];

    for (const item of outcome.value) {
      const key = normalizeUrl(item.link);
      if (seen.has(key)) continue;
      seen.add(key);
      uniqueItems.push(item);
    }

    return { query, items: uniqueItems };
  });
}
