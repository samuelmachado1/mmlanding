import type {
  ClippingInterview,
  ClippingReport,
  ClippingsPayload,
  MediaCard,
} from '../../src/types/index.ts';
import { classifyMedia } from './classify.ts';
import type { GoogleCseItem } from './google-cse.ts';
import { normalizeUrl } from './google-cse.ts';

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

function extractDate(item: GoogleCseItem): string {
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

function formatSource(displayLink: string): string {
  return displayLink.replace(/^www\./, '');
}

function toMediaCard(item: GoogleCseItem, index: number): MediaCard {
  const { tab, category } = classifyMedia(item.title, item.link);

  return {
    id: `clipping-${index + 1}`,
    category,
    title: item.title,
    source: formatSource(item.displayLink),
    date: extractDate(item),
    href: item.link,
    imageUrl: extractImageUrl(item),
    tab,
  };
}

function toInterview(item: MediaCard): ClippingInterview {
  return {
    id: item.id,
    badge: 'Entrevista completa',
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

export function mapClippings(items: GoogleCseItem[]): ClippingsPayload {
  const mediaCards = items.map(toMediaCard);

  const interviewItem =
    mediaCards.find((card) => card.tab === 'entrevistas') ?? mediaCards[0];

  const interview = interviewItem ? toInterview(interviewItem) : null;

  const interviewUrl = interview ? normalizeUrl(interview.href) : null;

  const reports = mediaCards
    .filter(
      (card) =>
        card.tab === 'reportagens' &&
        normalizeUrl(card.href) !== interviewUrl,
    )
    .slice(0, 3)
    .map(toReport);

  return {
    fetchedAt: new Date().toISOString(),
    items: mediaCards,
    interview,
    reports,
  };
}
