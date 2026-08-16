import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAdminAuthorized } from '../../_lib/auth.js';
import { isBlobStorageError, isStorageWritable } from '../../_lib/blob-client.js';
import {
  sortMediaCardsByRecency,
  sortPendingByRecency,
} from '../../_lib/sort-clippings.js';

function setAdminNoCache(res: VercelResponse): void {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  setAdminNoCache(res);

  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const action = typeof req.query.action === 'string' ? req.query.action : null;
  if (!action) {
    return res.status(404).json({ error: 'Not found' });
  }

  try {
    switch (action) {
      case 'pending':
        return await handlePending(req, res);
      case 'approve':
        return await handleApprove(req, res);
      case 'reject':
        return await handleReject(req, res);
      case 'highlight':
        return await handleHighlight(req, res);
      case 'manual':
        return await handleManual(req, res);
      case 'published':
        return await handlePublished(req, res);
      case 'discover':
        return await handleDiscover(req, res);
      default:
        return res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    console.error(`Admin clippings action "${action}" failed:`, error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handlePending(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { getStore } = await import('../../_lib/store-read.js');
  const store = await getStore();
  return res.status(200).json({
    pending: sortPendingByRecency(store.pending),
    published: sortMediaCardsByRecency(store.published.items),
    highlightId: store.highlightId,
    storageConfigured: isStorageWritable(),
  });
}

async function handleApprove(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const id = typeof req.body?.id === 'string' ? req.body.id : null;
  const asHighlight = req.body?.asHighlight === true;

  if (!id) {
    return res.status(400).json({ error: 'Missing id' });
  }

  const { approveItem } = await import('../../_lib/store.js');
  const ok = await approveItem(id, asHighlight);
  if (!ok) {
    return res.status(404).json({ error: 'Pending item not found' });
  }

  return res.status(200).json({ ok: true });
}

async function handleReject(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const id = typeof req.body?.id === 'string' ? req.body.id : null;
  if (!id) {
    return res.status(400).json({ error: 'Missing id' });
  }

  const { rejectItem } = await import('../../_lib/store.js');
  const ok = await rejectItem(id);
  if (!ok) {
    return res.status(404).json({ error: 'Pending item not found' });
  }

  return res.status(200).json({ ok: true });
}

async function handleHighlight(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const id = typeof req.body?.id === 'string' ? req.body.id : null;
  if (!id) {
    return res.status(400).json({ error: 'Missing id' });
  }

  const { setHighlightItem } = await import('../../_lib/store.js');
  const ok = await setHighlightItem(id);
  if (!ok) {
    return res.status(404).json({ error: 'Published item not found' });
  }

  return res.status(200).json({ ok: true });
}

async function handleManual(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const title = typeof req.body?.title === 'string' ? req.body.title.trim() : '';
  const href = typeof req.body?.href === 'string' ? req.body.href.trim() : '';
  const source =
    typeof req.body?.source === 'string' ? req.body.source.trim() : '';
  const tab = typeof req.body?.tab === 'string' ? req.body.tab : 'reportagens';
  const imageUrl =
    typeof req.body?.imageUrl === 'string' ? req.body.imageUrl.trim() : undefined;
  const asHighlight = req.body?.asHighlight === true;
  const date =
    typeof req.body?.date === 'string' && req.body.date.trim()
      ? req.body.date.trim()
      : new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

  if (!title || !href || !source) {
    return res.status(400).json({ error: 'Missing title, href or source' });
  }

  const { classifyMedia } = await import('../../_lib/classify.js');
  const { addManualItem } = await import('../../_lib/store.js');
  const { category } = classifyMedia(title, href);
  const item = await addManualItem(
    {
      title,
      href,
      source,
      date,
      tab,
      category,
      imageUrl: imageUrl || undefined,
    },
    asHighlight,
  );

  return res.status(200).json({ ok: true, item });
}

async function handlePublished(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const id =
    typeof req.query.id === 'string'
      ? req.query.id
      : typeof req.body?.id === 'string'
        ? req.body.id
        : null;

  if (!id) {
    return res.status(400).json({ error: 'Missing id' });
  }

  const { removePublishedItem } = await import('../../_lib/store.js');
  const ok = await removePublishedItem(id);
  if (!ok) {
    return res.status(404).json({ error: 'Published item not found' });
  }

  return res.status(200).json({ ok: true });
}

async function handleDiscover(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { discoverClippings } = await import('../../_lib/discover-clippings.js');
  const result = await discoverClippings();

  if (!result.ok) {
    const status = result.error && isBlobStorageError(result.error) ? 503 : 502;
    return res.status(status).json(result);
  }

  return res.status(200).json(result);
}
