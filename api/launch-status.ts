import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  hasValidPreviewAccess,
  hashPreviewSecret,
  isSiteLaunchedFromEnv,
} from './lib/launch-gate.ts';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const launched = isSiteLaunchedFromEnv(process.env);

  if (launched) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ allowed: true, launched: true });
  }

  const previewSecret = process.env.PREVIEW_SECRET?.trim();
  const previewHash = previewSecret ? hashPreviewSecret(previewSecret) : null;
  const host = req.headers.host ?? 'localhost';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const url = new URL(req.url ?? '/api/launch-status', `${protocol}://${host}`);

  const previewQuery = req.query.preview;
  if (typeof previewQuery === 'string' && previewQuery) {
    url.searchParams.set('preview', previewQuery);
  }

  const allowed = hasValidPreviewAccess(
    url,
    req.headers.cookie ?? null,
    previewSecret,
    previewHash,
  );

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ allowed, launched: false });
}
