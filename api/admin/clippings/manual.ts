import type { VercelRequest, VercelResponse } from '@vercel/node';
import { classifyMedia } from '../../lib/classify.ts';
import { isAdminAuthorized } from '../../lib/auth.ts';
import { addManualItem } from '../../lib/store.ts';

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

  const { category } = classifyMedia(title, href);

  try {
    const item = await addManualItem({
      title,
      href,
      source,
      date,
      tab,
      category,
      imageUrl: imageUrl || undefined,
    }, asHighlight);

    return res.status(200).json({ ok: true, item });
  } catch (error) {
    console.error('POST /api/admin/clippings/manual failed:', error);
    return res.status(500).json({ error: 'Failed to add manual clipping' });
  }
}
