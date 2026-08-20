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

  // Todas as publicadas exceto o destaque aparecem em "Notícias" na landing
  // (entrevistas/podcasts/redes também; o filtro por tab ficava só na /midia).
  const reports = items
    .filter((card) => normalizeUrl(card.href) !== highlightUrl)
    .slice(0, 10)
    .map(toReport);

  return {
    fetchedAt: new Date().toISOString(),
    items,
    interview,
    reports,
  };
}
