import { list, put } from '@vercel/blob';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import type {
  ClippingsPayload,
  ClippingsStore,
  MediaCard,
  PendingMediaItem,
} from '../../src/types/index';
import { buildPublishedPayload } from './map-clippings';
import { normalizeUrl } from './normalize-url';
import { isBadImageUrl, fetchArticleContent, resolveArticleImage, resolveArticleUrl } from './article-meta';
import { isGoogleNewsUrl } from './google-news-url';
import { sortMediaCardsByRecency, sortPendingByRecency } from './sort-clippings';

const STORE_BLOB_PATHNAME = 'clippings-store.json';
const LEGACY_BLOB_PATHNAME = 'clippings.json';
const LOCAL_CACHE_DIR = join(process.cwd(), '.data');
const LOCAL_STORE_FILE = join(LOCAL_CACHE_DIR, 'clippings-store.json');
const LEGACY_LOCAL_FILE = join(LOCAL_CACHE_DIR, 'clippings.json');

function emptyPublished(): ClippingsPayload {
  return {
    fetchedAt: new Date(0).toISOString(),
    items: [],
    interview: null,
    reports: [],
  };
}

export function emptyStore(): ClippingsStore {
  return {
    published: emptyPublished(),
    pending: [],
    rejectedUrls: [],
    highlightId: null,
  };
}

function normalizeStore(store: ClippingsStore): ClippingsStore {
  if (store.highlightId === undefined) {
    store.highlightId = null;
  }

  if (
    store.highlightId &&
    !store.published.items.some((item) => item.id === store.highlightId)
  ) {
    store.highlightId = null;
  }

  return store;
}

function isLegacyPayload(data: unknown): data is ClippingsPayload {
  return (
    typeof data === 'object' &&
    data !== null &&
    'items' in data &&
    'fetchedAt' in data &&
    !('published' in data)
  );
}

function migrateToStore(data: unknown): ClippingsStore {
  if (
    typeof data === 'object' &&
    data !== null &&
    'published' in data &&
    'pending' in data &&
    'rejectedUrls' in data
  ) {
    return normalizeStore(data as ClippingsStore);
  }

  if (isLegacyPayload(data)) {
    return normalizeStore({
      published: data,
      pending: [],
      rejectedUrls: [],
      highlightId: null,
    });
  }

  return emptyStore();
}

async function readLocalFile(path: string): Promise<unknown | null> {
  try {
    const raw = await readFile(path, 'utf-8');
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

async function readLocalStore(): Promise<ClippingsStore | null> {
  const storeData = await readLocalFile(LOCAL_STORE_FILE);
  if (storeData) return migrateToStore(storeData);

  const legacyData = await readLocalFile(LEGACY_LOCAL_FILE);
  if (legacyData) return migrateToStore(legacyData);

  return null;
}

async function writeLocalStore(store: ClippingsStore): Promise<void> {
  await mkdir(LOCAL_CACHE_DIR, { recursive: true });
  await writeFile(LOCAL_STORE_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

async function readBlobByPath(pathname: string): Promise<unknown | null> {
  const { blobs } = await list({ prefix: pathname, limit: 1 });
  const blob = blobs.find((entry) => entry.pathname === pathname);

  if (!blob) return null;

  const response = await fetch(blob.url);
  if (!response.ok) {
    throw new Error(`Blob fetch failed: ${response.status}`);
  }

  return (await response.json()) as unknown;
}

async function readBlobStore(): Promise<ClippingsStore | null> {
  const storeData = await readBlobByPath(STORE_BLOB_PATHNAME);
  if (storeData) return migrateToStore(storeData);

  const legacyData = await readBlobByPath(LEGACY_BLOB_PATHNAME);
  if (legacyData) return migrateToStore(legacyData);

  return null;
}

async function writeBlobStore(store: ClippingsStore): Promise<void> {
  const body = JSON.stringify(store);

  await put(STORE_BLOB_PATHNAME, body, {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
    allowOverwrite: true,
  } as Parameters<typeof put>[2]);
}

export async function getStore(): Promise<ClippingsStore> {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blobStore = await readBlobStore();
        if (blobStore) return normalizeStore(blobStore);
      } catch (error) {
        console.error('Blob store read failed, falling back to local:', error);
        const localStore = await readLocalStore();
        if (localStore) return normalizeStore(localStore);
      }
    }

    const localStore = await readLocalStore();
    return normalizeStore(localStore ?? emptyStore());
  } catch (error) {
    console.error('getStore failed, using empty store:', error);
    return emptyStore();
  }
}

export async function saveStore(store: ClippingsStore): Promise<void> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await writeBlobStore(store);
  }

  await writeLocalStore(store);
}

export async function getClippings(): Promise<ClippingsPayload | null> {
  const store = await getStore();
  if (
    store.published.items.length === 0 &&
    store.published.fetchedAt === emptyPublished().fetchedAt
  ) {
    return null;
  }

  return rebuildPublishedPayload(store);
}

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
  if (card.bodyHtml || isGoogleNewsUrl(card.href)) return card;

  const content = await fetchArticleContent(card.href);
  if (!content.bodyHtml && !content.excerpt) return card;

  return {
    ...card,
    excerpt: content.excerpt ?? card.excerpt,
    bodyHtml: content.bodyHtml ?? card.bodyHtml,
  };
}

export async function approveItem(
  id: string,
  asHighlight = false,
): Promise<boolean> {
  const store = await getStore();
  const index = store.pending.findIndex((item) => item.id === id);
  if (index === -1) return false;

  const [pendingItem] = store.pending.splice(index, 1);
  const { discoveredAt: _d, searchQuery: _q, snippet, ...mediaCard } = pendingItem;

  mediaCard.id = `clipping-${Date.now()}`;
  mediaCard.href = await resolveArticleUrl(mediaCard.href);

  if (snippet) {
    mediaCard.excerpt = snippet;
  }

  if (isBadImageUrl(mediaCard.imageUrl)) {
    mediaCard.imageUrl = undefined;
  }

  if (!mediaCard.imageUrl) {
    const imageUrl = await resolveArticleImage(mediaCard.href);
    if (imageUrl) mediaCard.imageUrl = imageUrl;
  }

  const enrichedCard = await enrichWithArticleContent(mediaCard);

  const url = normalizeUrl(enrichedCard.href);
  const existingIndex = store.published.items.findIndex(
    (item) => normalizeUrl(item.href) === url,
  );

  if (existingIndex === -1) {
    store.published.items.unshift(enrichedCard);
  } else {
    store.published.items[existingIndex] = await enrichWithArticleContent({
      ...store.published.items[existingIndex],
      excerpt: enrichedCard.excerpt ?? store.published.items[existingIndex].excerpt,
    });
  }

  if (asHighlight) {
    store.highlightId =
      existingIndex === -1
        ? enrichedCard.id
        : store.published.items[existingIndex].id;
  }

  store.published = rebuildPublishedPayload(store);

  await saveStore(store);
  return true;
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

export async function getPublishedItemById(id: string): Promise<MediaCard | null> {
  const store = await getStore();
  const item = store.published.items.find((entry) => entry.id === id);
  return item ?? null;
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
