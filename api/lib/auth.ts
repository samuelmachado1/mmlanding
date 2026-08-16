import type { VercelRequest } from '@vercel/node';

export function isAdminAuthorized(req: VercelRequest): boolean {
  const secret = process.env.PREVIEW_SECRET?.trim();
  if (!secret) return false;

  const auth = req.headers.authorization;
  return auth === `Bearer ${secret}`;
}
