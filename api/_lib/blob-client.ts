const BLOB_API_URL = 'https://vercel.com/api/blob';
const BLOB_API_VERSION = '12';

interface BlobAuth {
  token: string;
  storeId: string;
}

interface BlobListItem {
  url: string;
  pathname: string;
}

interface BlobListResponse {
  blobs: BlobListItem[];
}

function normalizeStoreId(storeId: string): string {
  return storeId.startsWith('store_') ? storeId.slice('store_'.length) : storeId;
}

function parseStoreIdFromReadWriteToken(token: string): string | null {
  const storeId = token.split('_')[3];
  return storeId ? normalizeStoreId(storeId) : null;
}

export const BLOB_NOT_CONFIGURED_MESSAGE =
  'Armazenamento não configurado: conecte um Blob store ao projeto na Vercel (Storage → Blob).';

function hasReadWriteToken(): boolean {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) return false;
  return Boolean(parseStoreIdFromReadWriteToken(token) ?? process.env.BLOB_STORE_ID?.trim());
}

/** Detects linked Blob store — BLOB_STORE_ID is set when store is connected to the project. */
export function isBlobConfigured(): boolean {
  if (hasReadWriteToken()) return true;
  if (process.env.BLOB_STORE_ID?.trim()) return true;
  return Boolean(process.env.VERCEL_OIDC_TOKEN?.trim());
}

/** On Vercel, writes require Blob; locally `.data/` is used as fallback. */
export function isStorageWritable(): boolean {
  if (process.env.VERCEL !== '1') return true;
  return isBlobConfigured();
}

export function isBlobStorageError(message: string): boolean {
  return (
    message.includes('Armazenamento não configurado') ||
    message.includes('BLOB_READ_WRITE_TOKEN') ||
    message.includes('Blob store') ||
    message.includes('Blob API')
  );
}

import { getRequestOidcToken } from './request-context.js';

async function resolveOidcToken(): Promise<string | null> {
  const fromContext = getRequestOidcToken();
  if (fromContext) return fromContext;

  const fromEnv = process.env.VERCEL_OIDC_TOKEN?.trim();
  if (fromEnv) return fromEnv;

  try {
    const { getVercelOidcToken } = await import('@vercel/oidc');
    return await getVercelOidcToken();
  } catch {
    return null;
  }
}

async function resolveBlobAuth(): Promise<BlobAuth | null> {
  const readWriteToken = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (readWriteToken) {
    const parsedStoreId = parseStoreIdFromReadWriteToken(readWriteToken);
    const storeId = parsedStoreId ?? process.env.BLOB_STORE_ID?.trim();
    if (storeId) {
      return { token: readWriteToken, storeId: normalizeStoreId(storeId) };
    }
  }

  const storeId = process.env.BLOB_STORE_ID?.trim();
  if (!storeId) return null;

  const oidcToken = await resolveOidcToken();
  if (!oidcToken) return null;

  return { token: oidcToken, storeId: normalizeStoreId(storeId) };
}

async function blobRequest<T>(pathname: string, init: RequestInit): Promise<T> {
  const auth = await resolveBlobAuth();
  if (!auth) {
    throw new Error(BLOB_NOT_CONFIGURED_MESSAGE);
  }

  const response = await fetch(`${BLOB_API_URL}${pathname}`, {
    ...init,
    headers: {
      authorization: `Bearer ${auth.token}`,
      'x-vercel-blob-store-id': auth.storeId,
      'x-api-version': BLOB_API_VERSION,
      'x-api-blob-request-id': `${auth.storeId}:${Date.now()}`,
      'x-api-blob-request-attempt': '0',
      ...init.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Blob API ${response.status}: ${body.slice(0, 200)}`);
  }

  return (await response.json()) as T;
}

export async function listBlobByPrefix(prefix: string): Promise<BlobListItem[]> {
  const params = new URLSearchParams({
    prefix,
    limit: '1',
  });

  const data = await blobRequest<BlobListResponse>(`?${params.toString()}`, {
    method: 'GET',
  });

  return data.blobs ?? [];
}

export async function putJsonBlob(pathname: string, body: string): Promise<void> {
  const params = new URLSearchParams({ pathname });
  const bodyBytes = new TextEncoder().encode(body).byteLength;

  await blobRequest(`?${params.toString()}`, {
    method: 'PUT',
    body,
    headers: {
      'content-type': 'application/json',
      'x-content-length': String(bodyBytes),
      'x-vercel-blob-access': 'public',
      'x-add-random-suffix': '0',
      'x-allow-overwrite': '1',
      'x-content-type': 'application/json',
    },
  });
}
