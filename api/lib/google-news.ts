import Parser from 'rss-parser';
import { getSearchQueries } from './search-queries.ts';
import { normalizeUrl } from './normalize-url.ts';

const parser = new Parser({
  headers: {
    'User-Agent': 'max-maciel-landing/1.0',
    Accept: 'application/rss+xml, application/xml, text/xml',
  },
});

const RSS_BASE = 'https://news.google.com/rss/search';

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
  const feed = await parser.parseURL(url);

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
  const seen = new Set<string>();
  const results: SearchResult[] = [];

  for (const query of getSearchQueries()) {
    try {
      const items = await fetchQuery(query);
      const uniqueItems: NewsSearchItem[] = [];

      for (const item of items) {
        const key = normalizeUrl(item.link);
        if (seen.has(key)) continue;
        seen.add(key);
        uniqueItems.push(item);
      }

      results.push({ query, items: uniqueItems });
    } catch (error) {
      console.error(`Google News search failed for "${query}":`, error);
      results.push({ query, items: [] });
    }
  }

  return results;
}
