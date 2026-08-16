import type {
  ClippingInterview,
  ClippingReport,
  ClippingsPayload,
  MediaCard,
  PendingMediaItem,
} from './types';
import { classifyMedia } from './classify';
import type { GoogleCseItem } from './google-cse';
import type { NewsSearchItem } from './google-news';
import { normalizeUrl } from './normalize-url';

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

function toHighlight(item: MediaCard): ClippingInterview {
  const badge =
    item.tab === 'entrevistas'
      ? 'Entrevista completa'
      : item.tab === 'podcasts'
        ? 'Podcast'
        : item.tab === 'redes-sociais'
          ? 'Redes sociais'
          : 'Destaque';

  return {
    id: item.id,
    badge,
    title: item.title,
    href: item.href,
    imageUrl: item.imageUrl,
  };
}

function toReport(item: MediaCard): ClippingReport {
  return {
    id: item.id,
    title: item.title,
    source: item.source,
    href: item.href,
    imageUrl: item.imageUrl,
  };
}

export function buildPublishedPayload(
  items: MediaCard[],
  highlightId: string | null = null,
): ClippingsPayload {
  const highlightItem = highlightId
    ? items.find((card) => card.id === highlightId)
    : null;
  const interview = highlightItem ? toHighlight(highlightItem) : null;

  const highlightUrl = highlightItem ? normalizeUrl(highlightItem.href) : null;

  const reports = items
    .filter((card) => normalizeUrl(card.href) !== highlightUrl)
    .filter((card) => card.tab === 'reportagens')
    .slice(0, 3)
    .map(toReport);

  return {
    fetchedAt: new Date().toISOString(),
    items,
    interview,
    reports,
  };
}

export function mapClippings(items: GoogleCseItem[]): ClippingsPayload {
  const mediaCards = items.map((item, index) =>
    googleItemToMediaCard(item, `clipping-${index + 1}`),
  );

  return buildPublishedPayload(mediaCards);
}
