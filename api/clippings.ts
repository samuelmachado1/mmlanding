import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getClippings, getPublishedItemById } from './_lib/store';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const id = typeof req.query.id === 'string' ? req.query.id : null;

  try {
    if (id) {
      const item = await getPublishedItemById(id);
      if (!item) {
        return res.status(404).json({ error: 'Article not found' });
      }

      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
      return res.status(200).json(item);
    }

    const cached = await getClippings();

    if (cached) {
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
      return res.status(200).json(cached);
    }

    return res.status(404).json({ error: 'No clippings cached yet' });
  } catch (error) {
    console.error('GET /api/clippings failed:', error);
    return res.status(500).json({ error: 'Failed to load clippings' });
  }
}
