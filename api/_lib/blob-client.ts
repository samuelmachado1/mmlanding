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

export function isBlobConfigured(): boolean {
  return getBlobAuth() !== null;
}

function getBlobAuth(): BlobAuth | null {
  const readWriteToken = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (readWriteToken) {
    const storeId = parseStoreIdFromReadWriteToken(readWriteToken);
    if (storeId) {
      return { token: readWriteToken, storeId };
    }
  }

  const oidcToken = process.env.VERCEL_OIDC_TOKEN?.trim();
  const storeId = process.env.BLOB_STORE_ID?.trim();
  if (oidcToken && storeId) {
    return { token: oidcToken, storeId: normalizeStoreId(storeId) };
  }

  return null;
}

async function blobRequest<T>(pathname: string, init: RequestInit): Promise<T> {
  const auth = getBlobAuth();
  if (!auth) {
    throw new Error(
      'Armazenamento não configurado: conecte um Blob store ao projeto na Vercel (Storage → Blob).',
    );
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
