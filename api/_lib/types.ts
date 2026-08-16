/** Server-safe types for API routes (no React / frontend imports). */

export interface MediaCard {
  id: string;
  category: string;
  title: string;
  source: string;
  date: string;
  href: string;
  imageUrl?: string;
  tab: string;
  excerpt?: string;
  bodyHtml?: string;
}

export interface ClippingInterview {
  id: string;
  badge: string;
  title: string;
  href: string;
  imageUrl?: string;
}

export interface ClippingReport {
  id: string;
  title: string;
  source: string;
  href: string;
  imageUrl?: string;
}

export interface ClippingsPayload {
  fetchedAt: string;
  items: MediaCard[];
  interview: ClippingInterview | null;
  reports: ClippingReport[];
}

export interface PendingMediaItem extends MediaCard {
  discoveredAt: string;
  searchQuery: string;
  snippet?: string;
}

export interface ClippingsStore {
  published: ClippingsPayload;
  pending: PendingMediaItem[];
  rejectedUrls: string[];
  /** ID da matéria em destaque na landing (apenas uma por vez). */
  highlightId: string | null;
}
