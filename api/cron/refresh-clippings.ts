import type { VercelRequest, VercelResponse } from '@vercel/node';
import { searchClippings } from '../lib/google-cse.ts';
import { mapClippings } from '../lib/map-clippings.ts';
import { getClippings, saveClippings } from '../lib/store.ts';

function isAuthorized(req: VercelRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return false;

  const auth = req.headers.authorization;
  return auth === `Bearer ${cronSecret}`;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const apiKey = process.env.GOOGLE_CSE_API_KEY;
  const cx = process.env.GOOGLE_CSE_ID;

  if (!apiKey || !cx) {
    return res.status(500).json({ error: 'Missing Google CSE credentials' });
  }

  try {
    const results = await searchClippings(apiKey, cx);
    const payload = mapClippings(results);
    await saveClippings(payload);

    return res.status(200).json({
      ok: true,
      count: payload.items.length,
      fetchedAt: payload.fetchedAt,
    });
  } catch (error) {
    console.error('Cron refresh failed:', error);

    const previous = await getClippings();
    if (previous) {
      return res.status(200).json({
        ok: false,
        message: 'Refresh failed; kept previous cache',
        fetchedAt: previous.fetchedAt,
      });
    }

    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
