import { useEffect, useState } from 'react';
import type { FlickrPhoto, FlickrPhotosPayload } from '../types/index.ts';

interface UseFlickrPhotosResult {
  loading: boolean;
  error: string | null;
  items: FlickrPhoto[];
}

export function useFlickrPhotos(limit = 12): UseFlickrPhotosResult {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<FlickrPhoto[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch('/api/flickr-photos', { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = (await response.json()) as FlickrPhotosPayload;

        if (!cancelled) {
          setItems(payload.items.slice(0, limit));
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Falha ao carregar fotos');
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
  }, [limit]);

  return { loading, error, items };
}
