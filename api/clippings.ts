import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const id = typeof req.query.id === 'string' ? req.query.id : null;

  try {
    const { getClippings, hydratePublishedItemById } = await import('./_lib/store.js');

    if (id) {
      const item = await hydratePublishedItemById(id);
      if (!item) {
        return res.status(404).json({ error: 'Article not found' });
      }

      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
      return res.status(200).json(item);
    }

    const cached = await getClippings();

    if (cached) {
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
      return res.status(200).json(cached);
    }

    return res.status(404).json({ error: 'No clippings cached yet' });
  } catch (error) {
    console.error('GET /api/clippings failed:', error);
    const message = error instanceof Error ? error.message : 'Failed to load clippings';
    return res.status(500).json({ error: message });
  }
}
