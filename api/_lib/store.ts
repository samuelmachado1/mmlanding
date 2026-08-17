import {
  BLOB_NOT_CONFIGURED_MESSAGE,
  isBlobConfigured,
  putJsonBlob,
} from './blob-client.js';
import type { ClippingsPayload, ClippingsStore, MediaCard, PendingMediaItem } from './types.js';
import { buildPublishedPayload } from './map-published.js';
import { normalizeUrl } from './normalize-url.js';
import { sortMediaCardsByRecency, sortPendingByRecency } from './sort-clippings.js';
import { setStoreSnapshot } from './request-context.js';
import { emptyStore, getStore } from './store-read.js';

export { emptyStore, getStore };

const STORE_BLOB_PATHNAME = 'clippings-store.json';

function emptyPublished(): ClippingsPayload {
  return {
    fetchedAt: new Date(0).toISOString(),
    items: [],
    interview: null,
    reports: [],
  };
}

async function writeLocalStore(store: ClippingsStore): Promise<void> {
  const { mkdir, writeFile } = await import('node:fs/promises');
  const { join } = await import('node:path');
  const cacheDir = join(process.cwd(), '.data');
  await mkdir(cacheDir, { recursive: true });
  await writeFile(
    join(cacheDir, 'clippings-store.json'),
    JSON.stringify(store, null, 2),
    'utf-8',
  );
}

async function writeBlobStore(store: ClippingsStore): Promise<void> {
  await putJsonBlob(STORE_BLOB_PATHNAME, JSON.stringify(store));
}

export async function saveStore(store: ClippingsStore): Promise<void> {
  if (isBlobConfigured()) {
    await writeBlobStore(store);

    if (process.env.VERCEL !== '1') {
      await writeLocalStore(store);
    }

    setStoreSnapshot(store);
    return;
  }

  if (process.env.VERCEL === '1') {
    throw new Error(BLOB_NOT_CONFIGURED_MESSAGE);
  }

  await writeLocalStore(store);
  setStoreSnapshot(store);
}

export { getClippings, getPublishedItemById } from './store-read.js';

function collectKnownUrls(store: ClippingsStore): Set<string> {
  const urls = new Set<string>();

  for (const item of store.published.items) {
    urls.add(normalizeUrl(item.href));
  }

  for (const item of store.pending) {
    urls.add(normalizeUrl(item.href));
  }

  for (const url of store.rejectedUrls) {
    urls.add(url);
  }

  return urls;
}

export async function addPendingItems(items: PendingMediaItem[]): Promise<number> {
  const store = await getStore();
  const knownUrls = collectKnownUrls(store);
  let added = 0;

  for (const item of items) {
    const url = normalizeUrl(item.href);
    if (knownUrls.has(url)) continue;

    knownUrls.add(url);
    store.pending.push(item);
    added += 1;
  }

  if (added > 0) {
    store.pending = sortPendingByRecency(store.pending);
    await saveStore(store);
  }

  return added;
}

function rebuildPublishedPayload(store: ClippingsStore): ClippingsPayload {
  const sortedItems = sortMediaCardsByRecency(store.published.items);
  if (sortedItems.length === 0) {
    return emptyPublished();
  }

  const payload = buildPublishedPayload(sortedItems, store.highlightId);
  store.published.items = sortedItems;
  return payload;
}

async function enrichWithArticleContent(card: MediaCard): Promise<MediaCard> {
  const { hydratePublishedArticle } = await import('./article-meta.js');
  return hydratePublishedArticle(card);
}

function publishedItemChanged(before: MediaCard, after: MediaCard): boolean {
  return (
    after.bodyHtml !== before.bodyHtml ||
    after.imageUrl !== before.imageUrl ||
    after.excerpt !== before.excerpt ||
    after.href !== before.href
  );
}

export async function ensurePublishedMetadata(
  store: ClippingsStore,
): Promise<ClippingsStore> {
  const { hydratePublishedArticle, isBadImageUrl } = await import('./article-meta.js');

  const targets = store.published.items.filter(
    (item) => !item.bodyHtml || isBadImageUrl(item.imageUrl),
  );

  if (targets.length === 0) return store;

  let changed = false;

  for (const target of targets.slice(0, 6)) {
    const index = store.published.items.findIndex((item) => item.id === target.id);
    if (index === -1) continue;

    const hydrated = await hydratePublishedArticle(store.published.items[index]);
    if (publishedItemChanged(store.published.items[index], hydrated)) {
      store.published.items[index] = hydrated;
      changed = true;
    }
  }

  if (changed) {
    store.published = rebuildPublishedPayload(store);
    await saveStore(store);
  }

  return store;
}

export async function hydratePublishedItemById(id: string): Promise<MediaCard | null> {
  const store = await getStore();
  const index = store.published.items.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const hydrated = await enrichWithArticleContent(store.published.items[index]);

  if (publishedItemChanged(store.published.items[index], hydrated)) {
    store.published.items[index] = hydrated;
    store.published = rebuildPublishedPayload(store);
    await saveStore(store);
  }

  return hydrated;
}

export async function approveItem(
  id: string,
  asHighlight = false,
): Promise<ClippingsStore | null> {
  const store = await getStore();
  const index = store.pending.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const [pendingItem] = store.pending.splice(index, 1);
  const { discoveredAt: _d, searchQuery: _q, snippet, ...mediaCard } = pendingItem;

  const { resolveArticleUrl, isBadImageUrl } = await import('./article-meta.js');

  mediaCard.id = `clipping-${Date.now()}`;
  mediaCard.href = await resolveArticleUrl(mediaCard.href);

  if (snippet) {
    mediaCard.excerpt = snippet;
  }

  if (isBadImageUrl(mediaCard.imageUrl)) {
    mediaCard.imageUrl = undefined;
  }

  const enrichedCard: MediaCard = mediaCard;

  const url = normalizeUrl(enrichedCard.href);
  const existingIndex = store.published.items.findIndex(
    (item) => normalizeUrl(item.href) === url,
  );

  if (existingIndex === -1) {
    store.published.items.unshift(enrichedCard);
  } else {
    store.published.items[existingIndex] = {
      ...store.published.items[existingIndex],
      excerpt: enrichedCard.excerpt ?? store.published.items[existingIndex].excerpt,
    };
  }

  if (asHighlight) {
    store.highlightId =
      existingIndex === -1
        ? enrichedCard.id
        : store.published.items[existingIndex].id;
  }

  store.published = rebuildPublishedPayload(store);

  await saveStore(store);
  return store;
}

export async function rejectItem(id: string): Promise<boolean> {
  const store = await getStore();
  const index = store.pending.findIndex((item) => item.id === id);
  if (index === -1) return false;

  const [pendingItem] = store.pending.splice(index, 1);
  const url = normalizeUrl(pendingItem.href);

  if (!store.rejectedUrls.includes(url)) {
    store.rejectedUrls.push(url);
  }

  await saveStore(store);
  return true;
}

export async function addManualItem(
  item: Omit<MediaCard, 'id'> & { id?: string },
  asHighlight = false,
): Promise<MediaCard> {
  const store = await getStore();
  let mediaCard: MediaCard = {
    ...item,
    id: item.id ?? `manual-${Date.now()}`,
  };

  mediaCard = await enrichWithArticleContent(mediaCard);

  const url = normalizeUrl(mediaCard.href);
  const existingIndex = store.published.items.findIndex(
    (entry) => normalizeUrl(entry.href) === url,
  );

  if (existingIndex === -1) {
    store.published.items.unshift(mediaCard);
  } else {
    store.published.items[existingIndex] = await enrichWithArticleContent({
      ...store.published.items[existingIndex],
      excerpt: mediaCard.excerpt ?? store.published.items[existingIndex].excerpt,
    });
  }

  if (asHighlight) {
    store.highlightId =
      existingIndex === -1
        ? mediaCard.id
        : store.published.items[existingIndex].id;
  }

  if (existingIndex === -1 || asHighlight || mediaCard.bodyHtml) {
    store.published = rebuildPublishedPayload(store);
    await saveStore(store);
  }

  return existingIndex === -1
    ? mediaCard
    : store.published.items[existingIndex];
}

export async function setHighlightItem(id: string): Promise<boolean> {
  const store = await getStore();
  if (!store.published.items.some((item) => item.id === id)) return false;

  store.highlightId = id;
  store.published = rebuildPublishedPayload(store);
  await saveStore(store);
  return true;
}

export async function removePublishedItem(id: string): Promise<boolean> {
  const store = await getStore();
  const index = store.published.items.findIndex((item) => item.id === id);
  if (index === -1) return false;

  store.published.items.splice(index, 1);

  if (store.highlightId === id) {
    store.highlightId = null;
  }

  store.published = rebuildPublishedPayload(store);
  await saveStore(store);
  return true;
}
