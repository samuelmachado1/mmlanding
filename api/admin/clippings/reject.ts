import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAdminAuthorized } from '../../lib/auth.ts';
import { rejectItem } from '../../lib/store.ts';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = typeof req.body?.id === 'string' ? req.body.id : null;
  if (!id) {
    return res.status(400).json({ error: 'Missing id' });
  }

  try {
    const ok = await rejectItem(id);
    if (!ok) {
      return res.status(404).json({ error: 'Pending item not found' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('POST /api/admin/clippings/reject failed:', error);
    return res.status(500).json({ error: 'Failed to reject clipping' });
  }
}
