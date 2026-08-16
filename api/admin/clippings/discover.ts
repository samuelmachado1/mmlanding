import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAdminAuthorized } from '../../lib/auth.ts';
import { discoverClippings } from '../../lib/discover-clippings.ts';

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

  const result = await discoverClippings();

  if (!result.ok && result.error?.includes('não configurado')) {
    return res.status(400).json(result);
  }

  return res.status(200).json(result);
}
