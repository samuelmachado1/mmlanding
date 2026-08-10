import { useEffect, useState } from 'react';
import {
  clippingInterview,
  clippingReports,
  midiaPageContent,
} from '../data/content.ts';
import type {
  ClippingInterview,
  ClippingReport,
  ClippingsPayload,
  MediaCard,
} from '../types/index.ts';

interface UseClippingsResult {
  loading: boolean;
  error: string | null;
  isLive: boolean;
  items: MediaCard[];
  interview: ClippingInterview;
  reports: ClippingReport[];
}

function staticFallback(): ClippingsPayload {
  return {
    fetchedAt: new Date(0).toISOString(),
    items: midiaPageContent.items,
    interview: clippingInterview,
    reports: clippingReports,
  };
}

export function useClippings(): UseClippingsResult {
  const fallback = staticFallback();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ClippingsPayload | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch('/api/clippings');

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = (await response.json()) as ClippingsPayload;

        if (!cancelled) {
          setData(payload);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Falha ao carregar notícias',
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const resolved = data ?? fallback;

  return {
    loading,
    error,
    isLive: data !== null && data.fetchedAt !== fallback.fetchedAt,
    items: resolved.items,
    interview: resolved.interview ?? fallback.interview!,
    reports:
      resolved.reports.length > 0 ? resolved.reports : fallback.reports,
  };
}
