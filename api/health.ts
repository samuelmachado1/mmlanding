import type { VercelRequest, VercelResponse } from '@vercel/node';

/** Minimal health check — confirms serverless functions load in production. */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({ ok: true });
}
