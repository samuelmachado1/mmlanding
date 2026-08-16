import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAdminAuthorized } from '../../lib/auth.ts';
import { getStore } from '../../lib/store.ts';
import {
  sortMediaCardsByRecency,
  sortPendingByRecency,
} from '../../lib/sort-clippings.ts';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const store = await getStore();
    return res.status(200).json({
      pending: sortPendingByRecency(store.pending),
      published: sortMediaCardsByRecency(store.published.items),
      highlightId: store.highlightId,
    });
  } catch (error) {
    console.error('GET /api/admin/clippings/pending failed:', error);
    return res.status(500).json({ error: 'Failed to load pending clippings' });
  }
}
