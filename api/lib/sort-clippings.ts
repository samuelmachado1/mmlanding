import type { MediaCard, PendingMediaItem } from '../../src/types/index';

function parseMediaDate(date: string): number {
  if (!date.trim() || date === 'Recente') return 0;

  const brMatch = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (brMatch) {
    const [, day, month, year] = brMatch;
    const parsed = Date.parse(`${year}-${month}-${day}T12:00:00Z`);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  const parsed = Date.parse(date);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getRecencyTimestamp(item: {
  date: string;
  discoveredAt?: string;
}): number {
  const fromDate = parseMediaDate(item.date);
  if (fromDate > 0) return fromDate;

  if (item.discoveredAt) {
    const discovered = new Date(item.discoveredAt).getTime();
    if (!Number.isNaN(discovered)) return discovered;
  }

  return 0;
}

export function sortPendingByRecency(
  items: PendingMediaItem[],
): PendingMediaItem[] {
  return [...items].sort(
    (a, b) => getRecencyTimestamp(b) - getRecencyTimestamp(a),
  );
}

export function sortMediaCardsByRecency(items: MediaCard[]): MediaCard[] {
  return [...items].sort(
    (a, b) => getRecencyTimestamp(b) - getRecencyTimestamp(a),
  );
}
