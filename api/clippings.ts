import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getClippings } from './lib/store.ts';

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse,
) {
  try {
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
