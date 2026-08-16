import { searchGoogleNews, type NewsSearchItem } from './google-news';
import { searchClippings as searchGoogleCse } from './google-cse';
import { searchItemToPending } from './map-clippings';
import { addPendingItems, getStore } from './store';

const DISCOVER_TIMEOUT_MS = 9_000;

async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`${label} excedeu o tempo limite de ${Math.round(ms / 1000)}s`)),
          ms,
        );
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export interface DiscoverResult {
  ok: boolean;
  addedToPending: number;
  pendingTotal: number;
  publishedTotal: number;
  source?: 'google-news' | 'google-cse';
  message?: string;
  error?: string;
}

async function runSearch(): Promise<{
  results: Array<{ query: string; items: NewsSearchItem[] }>;
  source: 'google-news' | 'google-cse';
}> {
  const apiKey = process.env.GOOGLE_CSE_API_KEY?.trim();
  const cx = process.env.GOOGLE_CSE_ID?.trim();
  const useCse =
    process.env.GOOGLE_CSE_ENABLED === 'true' && apiKey && cx;

  if (useCse) {
    const cseResults = await searchGoogleCse(apiKey, cx);
    return {
      source: 'google-cse',
      results: cseResults.map(({ query, items }) => ({
        query,
        items: items.map((item) => ({
          title: item.title,
          link: item.link,
          source: item.displayLink.replace(/^www\./, ''),
          date: 'Recente',
          snippet: item.snippet,
        })),
      })),
    };
  }

  return { source: 'google-news', results: await searchGoogleNews() };
}

export async function discoverClippings(): Promise<DiscoverResult> {
  try {
    const { results, source } = await withTimeout(runSearch(), DISCOVER_TIMEOUT_MS, 'Busca de notícias');
    const pendingItems = [];
    let counter = 0;

    for (const { query, items } of results) {
      for (const item of items) {
        counter += 1;
        pendingItems.push(
          searchItemToPending(item, `pending-${Date.now()}-${counter}`, query),
        );
      }
    }

    const addedToPending = await addPendingItems(pendingItems);
    const updatedStore = await getStore();

    return {
      ok: true,
      addedToPending,
      pendingTotal: updatedStore.pending.length,
      publishedTotal: updatedStore.published.items.length,
      source,
    };
  } catch (error) {
    console.error('Discover clippings failed:', error);

    try {
      const currentStore = await getStore();
      return {
        ok: false,
        addedToPending: 0,
        pendingTotal: currentStore.pending.length,
        publishedTotal: currentStore.published.items.length,
        message: 'Busca falhou; store inalterado',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    } catch {
      return {
        ok: false,
        addedToPending: 0,
        pendingTotal: 0,
        publishedTotal: 0,
        message: 'Busca falhou; store inalterado',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
