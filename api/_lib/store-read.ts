import type { ClippingsPayload, ClippingsStore, MediaCard } from './types';
import { buildPublishedPayload } from './map-published';
import { sortMediaCardsByRecency } from './sort-clippings';

const STORE_BLOB_PATHNAME = 'clippings-store.json';
const LEGACY_BLOB_PATHNAME = 'clippings.json';

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

function blobStoreHosts(): string[] {
  const raw = process.env.BLOB_STORE_ID?.trim();
  if (!raw) return [];

  const bare = raw.startsWith('store_') ? raw.slice('store_'.length) : raw;
  const prefixed = raw.startsWith('store_') ? raw : `store_${raw}`;

  return [...new Set([prefixed, bare])];
}

async function fetchPublicBlobJson(pathname: string): Promise<unknown | null> {
  for (const host of blobStoreHosts()) {
    const url = `https://${host}.public.blob.vercel-storage.com/${pathname}`;
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      return (await response.json()) as unknown;
    } catch {
      // Try the next host variant.
    }
  }

  return null;
}

async function readBlobByPath(pathname: string): Promise<unknown | null> {
  const fromPublic = await fetchPublicBlobJson(pathname);
  if (fromPublic) return fromPublic;

  try {
    const { listBlobByPrefix } = await import('./blob-client');
    const blobs = await listBlobByPrefix(pathname);
    const blob = blobs.find((entry) => entry.pathname === pathname);

    if (!blob) return null;

    const response = await fetch(blob.url);
    if (!response.ok) {
      throw new Error(`Blob fetch failed: ${response.status}`);
    }

    return (await response.json()) as unknown;
  } catch (error) {
    console.error(`Blob read failed for ${pathname}:`, error);
    return null;
  }
}

async function readBlobStore(): Promise<ClippingsStore | null> {
  const storeData = await readBlobByPath(STORE_BLOB_PATHNAME);
  if (storeData) return migrateToStore(storeData);

  const legacyData = await readBlobByPath(LEGACY_BLOB_PATHNAME);
  if (legacyData) return migrateToStore(legacyData);

  return null;
}

async function readLocalStore(): Promise<ClippingsStore | null> {
  const { readFile } = await import('node:fs/promises');
  const { join } = await import('node:path');
  const cacheDir = join(process.cwd(), '.data');

  async function readLocalFile(path: string): Promise<unknown | null> {
    try {
      const raw = await readFile(path, 'utf-8');
      return JSON.parse(raw) as unknown;
    } catch {
      return null;
    }
  }

  const storeData = await readLocalFile(join(cacheDir, 'clippings-store.json'));
  if (storeData) return migrateToStore(storeData);

  const legacyData = await readLocalFile(join(cacheDir, 'clippings.json'));
  if (legacyData) return migrateToStore(legacyData);

  return null;
}

function hasBlobEnv(): boolean {
  return Boolean(
    process.env.BLOB_STORE_ID?.trim() ||
      process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
      process.env.VERCEL_OIDC_TOKEN?.trim(),
  );
}

export async function getStore(): Promise<ClippingsStore> {
  try {
    if (process.env.VERCEL === '1') {
      if (!hasBlobEnv()) {
        console.error('Blob not configured on Vercel (BLOB_STORE_ID or BLOB_READ_WRITE_TOKEN)');
        return emptyStore();
      }

      const blobStore = await readBlobStore();
      return normalizeStore(blobStore ?? emptyStore());
    }

    if (hasBlobEnv()) {
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

function rebuildPublishedPayload(store: ClippingsStore): ClippingsPayload {
  const sortedItems = sortMediaCardsByRecency(store.published.items);
  if (sortedItems.length === 0) {
    return emptyPublished();
  }

  const payload = buildPublishedPayload(sortedItems, store.highlightId);
  store.published.items = sortedItems;
  return payload;
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

export async function getPublishedItemById(id: string): Promise<MediaCard | null> {
  const store = await getStore();
  const item = store.published.items.find((entry) => entry.id === id);
  return item ?? null;
}
