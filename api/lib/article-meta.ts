import type { MediaCard } from '../../src/types/index.ts';
import type { NewsSearchItem } from './google-news.ts';
import { decodeGoogleNewsUrl } from './google-news-url.ts';

const OG_IMAGE_PATTERNS = [
  /<meta[^>]+property=["']og:image:secure_url["'][^>]+content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image:secure_url["']/i,
  /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
  /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
];

export function extractOgImageFromHtml(html: string): string | undefined {
  for (const pattern of OG_IMAGE_PATTERNS) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtmlEntities(match[1].trim());
  }

  return undefined;
}

export function extractImageFromRssHtml(html?: string): string | undefined {
  if (!html) return undefined;

  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch?.[1]) return decodeHtmlEntities(imgMatch[1].trim());

  return undefined;
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

const GOOGLE_NEWS_PATTERN = /news\.google\.com/i;

const BAD_IMAGE_PATTERN =
  /googleusercontent\.com|gstatic\.com|news\.google\.com|google\.com\/favicon/i;

export function isBadImageUrl(url: string | undefined): boolean {
  if (!url) return true;
  return BAD_IMAGE_PATTERN.test(url);
}

function extractCanonicalUrl(html: string): string | undefined {
  const patterns = [
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
    /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i,
    /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:url["']/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1] && !GOOGLE_NEWS_PATTERN.test(match[1])) {
      return decodeHtmlEntities(match[1].trim());
    }
  }

  return undefined;
}

export async function resolveArticleUrl(url: string): Promise<string> {
  if (!GOOGLE_NEWS_PATTERN.test(url)) return url;

  const decoded = await decodeGoogleNewsUrl(url);
  if (decoded) return decoded;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
      },
    });

    const finalUrl = response.url;
    if (finalUrl && !GOOGLE_NEWS_PATTERN.test(finalUrl)) {
      return finalUrl;
    }

    if (!response.ok) return url;

    const html = await response.text();
    const canonical = extractCanonicalUrl(html);
    return canonical ?? url;
  } catch {
    return url;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchOgImage(url: string): Promise<string | undefined> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'max-maciel-landing/1.0',
        Accept: 'text/html,application/xhtml+xml',
      },
    });

    if (!response.ok) return undefined;

    const html = await response.text();
    return extractOgImageFromHtml(html);
  } catch {
    return undefined;
  } finally {
    clearTimeout(timeout);
  }
}

export async function resolveArticleImage(
  url: string,
  rssHtml?: string,
): Promise<string | undefined> {
  const fromRss = extractImageFromRssHtml(rssHtml);
  if (fromRss && !isBadImageUrl(fromRss)) return fromRss;

  const resolvedUrl = await resolveArticleUrl(url);
  const ogImage = await fetchOgImage(resolvedUrl);
  if (ogImage && !isBadImageUrl(ogImage)) return ogImage;

  return undefined;
}

export async function hydrateMediaCard(card: MediaCard): Promise<MediaCard> {
  let href = card.href;
  if (GOOGLE_NEWS_PATTERN.test(href)) {
    href = await resolveArticleUrl(href);
  }

  let imageUrl = card.imageUrl;
  if (isBadImageUrl(imageUrl)) {
    const resolvedImage = await fetchOgImage(href);
    if (resolvedImage && !isBadImageUrl(resolvedImage)) {
      imageUrl = resolvedImage;
    }
  }

  if (href === card.href && imageUrl === card.imageUrl) return card;
  return { ...card, href, imageUrl };
}

async function mapWithConcurrency<T, R>(
  items: T[],
  mapper: (item: T, index: number) => Promise<R>,
  concurrency: number,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );

  return results;
}

const MAX_ENRICH_PER_DISCOVER = 24;

export async function enrichNewsSearchItems(
  items: NewsSearchItem[],
): Promise<NewsSearchItem[]> {
  if (items.length === 0) return items;

  const head = items.slice(0, MAX_ENRICH_PER_DISCOVER);
  const tail = items.slice(MAX_ENRICH_PER_DISCOVER);

  const enrichedHead = await mapWithConcurrency(
    head,
    async (item) => {
      const link = await resolveArticleUrl(item.link);
      const imageUrl =
        item.imageUrl ??
        extractImageFromRssHtml(item.rssHtml) ??
        (await fetchOgImage(link));

      return {
        ...item,
        link,
        imageUrl: imageUrl ?? undefined,
      };
    },
    4,
  );

  return [...enrichedHead, ...tail];
}

export async function enrichItemsWithImages<
  T extends { link: string; imageUrl?: string; rssHtml?: string },
>(items: T[]): Promise<T[]> {
  const targets = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !item.imageUrl)
    .slice(0, MAX_ENRICH_PER_DISCOVER);

  if (targets.length === 0) return items;

  const enriched = [...items];

  await mapWithConcurrency(
    targets,
    async ({ item, index }) => {
      const imageUrl = await resolveArticleImage(item.link, item.rssHtml);
      if (imageUrl) {
        enriched[index] = { ...enriched[index], imageUrl };
      }
    },
    4,
  );

  return enriched;
}
