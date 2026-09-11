import type {
  ClippingsPayload,
  MediaCard,
  PendingMediaItem,
} from './types.js';
import { classifyMedia } from './classify.js';
import type { GoogleCseItem } from './google-cse.js';
import type { NewsSearchItem } from './google-news.js';
import { buildPublishedPayload } from './map-published.js';

export { buildPublishedPayload } from './map-published.js';

function extractImageUrl(item: GoogleCseItem): string | undefined {
  const cseImage = item.pagemap?.cse_image?.[0]?.src;
  if (cseImage) return cseImage;

  const metatags = item.pagemap?.metatags?.[0];
  if (!metatags) return undefined;

  return (
    metatags['og:image'] ??
    metatags['twitter:image'] ??
    metatags['twitter:image:src']
  );
}

function extractDateFromCse(item: GoogleCseItem): string {
  const metatags = item.pagemap?.metatags?.[0];
  const raw =
    metatags?.['article:published_time'] ??
    metatags?.['og:updated_time'] ??
    metatags?.['datePublished'];

  if (!raw) return 'Recente';

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return 'Recente';

  return parsed.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function searchItemToMediaCard(
  item: NewsSearchItem,
  id: string,
): MediaCard {
  const { tab, category } = classifyMedia(item.title, item.link);

  return {
    id,
    category,
    title: item.title,
    source: item.source,
    date: item.date,
    href: item.link,
    imageUrl: item.imageUrl,
    tab,
  };
}

export function searchItemToPending(
  item: NewsSearchItem,
  id: string,
  searchQuery: string,
): PendingMediaItem {
  const card = searchItemToMediaCard(item, id);

  return {
    ...card,
    discoveredAt: new Date().toISOString(),
    searchQuery,
    snippet: item.snippet,
  };
}

export function googleItemToMediaCard(
  item: GoogleCseItem,
  id: string,
): MediaCard {
  const { tab, category } = classifyMedia(item.title, item.link);

  return {
    id,
    category,
    title: item.title,
    source: item.displayLink.replace(/^www\./, ''),
    date: extractDateFromCse(item),
    href: item.link,
    imageUrl: extractImageUrl(item),
    tab,
  };
}

export function googleItemToPending(
  item: GoogleCseItem,
  id: string,
  searchQuery: string,
): PendingMediaItem {
  const card = googleItemToMediaCard(item, id);

  return {
    ...card,
    discoveredAt: new Date().toISOString(),
    searchQuery,
    snippet: item.snippet,
  };
}

export function mapClippings(items: GoogleCseItem[]): ClippingsPayload {
  const mediaCards = items.map((item, index) =>
    googleItemToMediaCard(item, `clipping-${index + 1}`),
  );

  return buildPublishedPayload(mediaCards);
}
