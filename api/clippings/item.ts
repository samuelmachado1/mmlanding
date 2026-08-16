import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPublishedItemById } from '../lib/store.ts';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const id = typeof req.query.id === 'string' ? req.query.id : null;
  if (!id) {
    return res.status(400).json({ error: 'Missing id' });
  }

  try {
    const item = await getPublishedItemById(id);
    if (!item) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json(item);
  } catch (error) {
    console.error('GET /api/clippings/item failed:', error);
    return res.status(500).json({ error: 'Failed to load article' });
  }
}
