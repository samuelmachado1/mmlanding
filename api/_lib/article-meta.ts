import type { MediaCard } from './types.js';
import type { NewsSearchItem } from './google-news.js';
import { decodeGoogleNewsUrl } from './google-news-url.js';

const OG_IMAGE_PATTERNS = [
  /<meta[^>]+property=["']og:image:secure_url["'][^>]+content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image:secure_url["']/i,
  /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
  /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
];

const OG_DESCRIPTION_PATTERNS = [
  /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:description["']/i,
  /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i,
  /<meta[^>]+name=["']twitter:description["'][^>]+content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:description["']/i,
];

export function extractOgDescriptionFromHtml(html: string): string | undefined {
  for (const pattern of OG_DESCRIPTION_PATTERNS) {
    const match = html.match(pattern);
    if (match?.[1]) {
      const text = decodeHtmlEntities(match[1].trim());
      if (text.length > 0) return text;
    }
  }

  return undefined;
}

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
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function escapeHtmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
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

export async function fetchArticleHtml(url: string): Promise<string | undefined> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
      },
    });

    if (!response.ok) return undefined;
    return await response.text();
  } catch {
    return undefined;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchArticleExcerpt(url: string): Promise<string | undefined> {
  const content = await fetchArticleContent(url);
  return content.excerpt;
}

const BODY_SKIP_PATTERN =
  /whatsapp|siga o canal|saiba mais|estagi[aá]rio do correio|receba as principais not[ií]cias|assine o correio|notifica[cç][aã]o|ficar por dentro das not[ií]cias/i;

interface JsonLdArticleFields {
  description?: string;
  bodyHtml?: string;
  imageUrl?: string;
}

function articleBodyTextToHtml(text: string): string | undefined {
  const decoded = decodeHtmlEntities(text.trim());
  if (decoded.length < 60) return undefined;

  const paragraphs = decoded
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter((part) => part.length > 40);

  if (paragraphs.length === 0) {
    return `<p>${escapeHtmlText(decoded)}</p>`;
  }

  return paragraphs.map((part) => `<p>${escapeHtmlText(part)}</p>`).join('');
}

function extractJsonLdArticle(html: string): JsonLdArticleFields | null {
  const scriptRegex =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(scriptRegex)) {
    try {
      const data = JSON.parse(match[1].trim()) as Record<string, unknown>;
      const nodes = Array.isArray(data['@graph'])
        ? (data['@graph'] as Record<string, unknown>[])
        : [data];

      for (const node of nodes) {
        const type = String(node['@type'] ?? '');
        if (!/Article|NewsArticle|OpinionNewsArticle|ReportageNewsArticle/i.test(type)) {
          continue;
        }

        const fields: JsonLdArticleFields = {};

        if (typeof node.description === 'string' && node.description.trim()) {
          fields.description = decodeHtmlEntities(node.description.trim());
        }

        if (typeof node.articleBody === 'string' && node.articleBody.trim()) {
          fields.bodyHtml = articleBodyTextToHtml(node.articleBody);
        }

        const image = node.image as unknown;
        if (typeof image === 'string') {
          fields.imageUrl = image;
        } else if (Array.isArray(image)) {
          const first = image[0];
          if (typeof first === 'string') fields.imageUrl = first;
          else if (first && typeof first === 'object' && 'url' in first) {
            fields.imageUrl = String((first as { url: string }).url);
          }
        } else if (image && typeof image === 'object' && 'url' in image) {
          fields.imageUrl = String((image as { url: string }).url);
        }

        if (fields.bodyHtml || fields.imageUrl || fields.description) {
          return fields;
        }
      }
    } catch {
      // ignore invalid JSON-LD blocks
    }
  }

  return null;
}

function isLowQualityBodyHtml(html: string): boolean {
  if (html.length < 200) return true;
  const preview = stripHtmlTags(html.slice(0, 500));
  return /notifica[cç][aã]o|ficar por dentro das not[ií]cias|colunistas|rádio brasil de fato/i.test(
    preview,
  );
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function sanitizeInlineHtml(html: string): string {
  let sanitized = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '');

  sanitized = sanitized.replace(
    /<a\s+[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>',
  );

  sanitized = sanitized.replace(/<(?!\/?(strong|em|b|i|br|a)\b)[^>]+>/gi, '');
  return sanitized.trim();
}

const ARTICLE_CONTAINER_REGEXES = [
  /<article[^>]*id=["']digital["'][^>]*>([\s\S]*?)<\/article>/i,
  /<div[^>]*class=["'][^"']*body-content-cb[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
  /<article[^>]*class=["'][^"']*article[^"']*["'][^>]*>([\s\S]*?)<\/article>/i,
  /<div[^>]*itemprop=["']articleBody["'][^>]*>([\s\S]*?)<\/div>/i,
];

export function extractArticleBodyHtml(html: string): string | undefined {
  let container = html;

  for (const regex of ARTICLE_CONTAINER_REGEXES) {
    const match = html.match(regex);
    if (match?.[1] && stripHtmlTags(match[1]).length > 300) {
      container = match[1];
      break;
    }
  }

  const cleaned = container
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<picture[\s\S]*?<\/picture>/gi, '')
    .replace(/<figure[\s\S]*?<\/figure>/gi, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(
      /<div[^>]*class=["'][^"']*(?:pub-ret|box-content-read-more|news__box|entry-headerBox)[^"']*["'][^>]*>[\s\S]*?<\/div>/gi,
      '',
    );

  const blockRegex = /<(p|h2|h3|h4|blockquote|li)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi;
  const blocks: string[] = [];

  for (const match of cleaned.matchAll(blockRegex)) {
    const tag = match[1].toLowerCase();
    const inner = sanitizeInlineHtml(match[3]);
    const text = stripHtmlTags(inner);

    if (!text) continue;
    if (BODY_SKIP_PATTERN.test(text)) continue;
    if (tag === 'p' && text.length < 60) continue;
    if (tag === 'li' && text.length < 20) continue;
    if (
      (tag === 'h3' || tag === 'h4') &&
      /^(assista|tags|compartilhe|relacionadas)/i.test(text)
    ) {
      continue;
    }

    blocks.push(`<${tag}>${inner}</${tag}>`);
  }

  if (blocks.length === 0) return undefined;
  return blocks.join('');
}

export interface ArticleContent {
  excerpt?: string;
  bodyHtml?: string;
}

export async function fetchArticleContent(url: string): Promise<ArticleContent> {
  const html = await fetchArticleHtml(url);
  if (!html) return {};

  const jsonLd = extractJsonLdArticle(html);
  const fromHtml = extractArticleBodyHtml(html);
  let bodyHtml = fromHtml;

  if (jsonLd?.bodyHtml) {
    if (!fromHtml || isLowQualityBodyHtml(fromHtml)) {
      bodyHtml = jsonLd.bodyHtml;
    }
  }

  const excerpt =
    extractOgDescriptionFromHtml(html) ?? jsonLd?.description;

  return {
    excerpt,
    bodyHtml,
  };
}

function isWeakExcerpt(excerpt: string | undefined, card: MediaCard): boolean {
  if (!excerpt?.trim()) return true;
  const normalized = excerpt.trim();
  if (normalized.length < 40) return true;
  if (normalized === `${card.title} ${card.source}`) return true;
  if (normalized === `${card.title} ${card.source}`.trim()) return true;
  if (normalized.endsWith(card.source) && normalized.length < card.title.length + 30) {
    return true;
  }
  return false;
}

/** Fetches missing body, excerpt and image for a published clipping. */
export async function hydratePublishedArticle(card: MediaCard): Promise<MediaCard> {
  const { isGoogleNewsUrl } = await import('./google-news-url.js');

  let href = card.href;
  if (isGoogleNewsUrl(href)) {
    href = await resolveArticleUrl(href);
  }
  if (isGoogleNewsUrl(href)) {
    return href !== card.href ? { ...card, href } : card;
  }

  const needsBody = !card.bodyHtml;
  const needsImage = isBadImageUrl(card.imageUrl);
  const needsExcerpt = isWeakExcerpt(card.excerpt, card);

  if (!needsBody && !needsImage && !needsExcerpt) {
    return href !== card.href ? { ...card, href } : card;
  }

  const html = await fetchArticleHtml(href);
  if (!html) {
    return href !== card.href ? { ...card, href } : card;
  }

  const jsonLd = extractJsonLdArticle(html);
  const fromHtml = needsBody ? extractArticleBodyHtml(html) : undefined;
  let bodyHtml = card.bodyHtml;

  if (needsBody) {
    if (jsonLd?.bodyHtml && (!fromHtml || isLowQualityBodyHtml(fromHtml))) {
      bodyHtml = jsonLd.bodyHtml;
    } else {
      bodyHtml = fromHtml ?? jsonLd?.bodyHtml;
    }
  }

  const excerpt = needsExcerpt
    ? extractOgDescriptionFromHtml(html) ?? jsonLd?.description ?? card.excerpt
    : card.excerpt;

  let imageUrl = card.imageUrl;
  if (needsImage) {
    const resolved =
      extractOgImageFromHtml(html) ?? jsonLd?.imageUrl;
    if (resolved && !isBadImageUrl(resolved)) {
      imageUrl = resolved;
    }
  }

  if (
    bodyHtml === card.bodyHtml &&
    excerpt === card.excerpt &&
    imageUrl === card.imageUrl &&
    href === card.href
  ) {
    return card;
  }

  return {
    ...card,
    href,
    excerpt,
    bodyHtml,
    imageUrl,
  };
}

export async function hydrateArticleBody(card: MediaCard): Promise<MediaCard> {
  return hydratePublishedArticle(card);
}

export async function fetchOgImage(url: string): Promise<string | undefined> {
  const html = await fetchArticleHtml(url);
  if (!html) return undefined;
  return extractOgImageFromHtml(html);
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
