import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { VercelRequest, VercelResponse } from '@vercel/node';

function loadEnvFile(): void {
  try {
    const envPath = join(process.cwd(), '.env');
    const content = readFileSync(envPath, 'utf-8');

    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;

      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env optional
  }
}

loadEnvFile();

type Handler = (req: VercelRequest, res: VercelResponse) => Promise<unknown> | unknown;

function createMockResponse(serverRes: ServerResponse): VercelResponse {
  const mockRes = {
    statusCode: 200,
    status(code: number) {
      serverRes.statusCode = code;
      return mockRes as VercelResponse;
    },
    json(body: unknown) {
      if (!serverRes.headersSent) {
        serverRes.setHeader('Content-Type', 'application/json');
      }
      serverRes.end(JSON.stringify(body));
      return mockRes as VercelResponse;
    },
    setHeader(name: string, value: string | number) {
      serverRes.setHeader(name, value);
      return mockRes as VercelResponse;
    },
  };

  return mockRes as VercelResponse;
}

async function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString('utf-8');
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function toVercelRequest(
  req: IncomingMessage,
  body: Record<string, unknown>,
  pathname: string,
  searchParams: URLSearchParams,
): VercelRequest {
  const query: Record<string, string | string[]> = {};
  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }

  return {
    method: req.method ?? 'GET',
    headers: req.headers as VercelRequest['headers'],
    body,
    query,
    url: pathname,
  } as VercelRequest;
}

const routes: Record<string, () => Promise<{ default: Handler }>> = {
  '/api/clippings': () => import('../api/clippings.ts'),
};

async function loadAdminHandler() {
  return import('../api/admin/clippings/[action].ts');
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const pathname = url.pathname;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const adminMatch = pathname.match(/^\/api\/admin\/clippings\/([^/]+)$/);
  const routeLoader = routes[pathname];

  if (!routeLoader && !adminMatch) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  try {
    const body = await readBody(req);
    const vercelReq = toVercelRequest(req, body, pathname, url.searchParams);

    if (adminMatch) {
      vercelReq.query.action = adminMatch[1];
      const vercelRes = createMockResponse(res);
      const { default: handler } = await loadAdminHandler();
      await handler(vercelReq, vercelRes);
      return;
    }

    const vercelRes = createMockResponse(res);
    const { default: handler } = await routeLoader!();
    await handler(vercelReq, vercelRes);
  } catch (error) {
    console.error(`[local-api] ${pathname} failed:`, error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: error instanceof Error ? error.message : 'Internal error',
        }),
      );
    }
  }
});

const port = Number(process.env.LOCAL_API_PORT ?? 3000);

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(
      `[local-api] Porta ${port} em uso. Rode: node scripts/free-port.mjs ${port}`,
    );
    process.exit(1);
  }

  console.error('[local-api] Server error:', error);
  process.exit(1);
});

server.listen(port, () => {
  console.log(`[local-api] http://localhost:${port} (env loaded from .env)`);
});
