import { list, put } from '@vercel/blob';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { ClippingsPayload } from '../../src/types/index.ts';

const BLOB_PATHNAME = 'clippings.json';
const LOCAL_CACHE_DIR = join(process.cwd(), '.data');
const LOCAL_CACHE_FILE = join(LOCAL_CACHE_DIR, 'clippings.json');

async function readLocalCache(): Promise<ClippingsPayload | null> {
  try {
    const raw = await readFile(LOCAL_CACHE_FILE, 'utf-8');
    return JSON.parse(raw) as ClippingsPayload;
  } catch {
    return null;
  }
}

async function writeLocalCache(payload: ClippingsPayload): Promise<void> {
  await mkdir(LOCAL_CACHE_DIR, { recursive: true });
  await writeFile(LOCAL_CACHE_FILE, JSON.stringify(payload, null, 2), 'utf-8');
}

async function readBlobCache(): Promise<ClippingsPayload | null> {
  const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
  const blob = blobs.find((entry) => entry.pathname === BLOB_PATHNAME);

  if (!blob) return null;

  const response = await fetch(blob.url);
  if (!response.ok) {
    throw new Error(`Blob fetch failed: ${response.status}`);
  }

  return (await response.json()) as ClippingsPayload;
}

export async function getClippings(): Promise<ClippingsPayload | null> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      return await readBlobCache();
    } catch {
      return readLocalCache();
    }
  }

  return readLocalCache();
}

export async function saveClippings(payload: ClippingsPayload): Promise<void> {
  const body = JSON.stringify(payload);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(BLOB_PATHNAME, body, {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    });
  }

  await writeLocalCache(payload);
}
