import type {
  ClippingInterview,
  ClippingReport,
  ClippingsPayload,
  MediaCard,
} from './types.js';
import { normalizeUrl } from './normalize-url.js';

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
