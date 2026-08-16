import type { VercelRequest } from '@vercel/node';

export function getAdminSecret(): string | undefined {
  const secret = process.env.ADMIN_SECRET?.trim();
  return secret || undefined;
}

export function isAdminAuthorized(req: VercelRequest): boolean {
  const secret = getAdminSecret();
  if (!secret) return false;

  return req.headers.authorization === `Bearer ${secret}`;
}
