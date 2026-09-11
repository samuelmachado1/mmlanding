import fs from 'node:fs'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, type Connect, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function unityCompressedHeaders(urlPath: string): Record<string, string> | null {
  if (!urlPath.endsWith('.br')) return null

  const headers: Record<string, string> = {
    'Content-Encoding': 'br',
    'Cache-Control': 'public, max-age=31536000, immutable',
  }

  if (urlPath.endsWith('.wasm.br')) {
    headers['Content-Type'] = 'application/wasm'
  } else if (urlPath.endsWith('.js.br')) {
    headers['Content-Type'] = 'application/javascript'
  } else if (urlPath.endsWith('.data.br')) {
    headers['Content-Type'] = 'application/octet-stream'
  } else {
    return null
  }

  return headers
}

function serveUnityBuild(rootDir: string): Connect.NextHandleFunction {
  return (req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
    const urlPath = decodeURIComponent((req.url ?? '').split('?')[0] ?? '')
    if (!urlPath.startsWith('/avatar/Build/')) {
      next()
      return
    }

    const headers = unityCompressedHeaders(urlPath)
    if (!headers) {
      next()
      return
    }

    const filePath = path.join(rootDir, urlPath.slice(1))
    if (!fs.existsSync(filePath)) {
      next()
      return
    }

    const stat = fs.statSync(filePath)
    res.writeHead(200, {
      ...headers,
      'Content-Length': String(stat.size),
    })
    fs.createReadStream(filePath).pipe(res)
  }
}

function unityWebglAssets(): Plugin {
  return {
    name: 'unity-webgl-assets',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(serveUnityBuild(path.join(server.config.root, 'public')))
    },
    configurePreviewServer(server) {
      server.middlewares.use(serveUnityBuild(path.join(server.config.root, 'dist')))
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), unityWebglAssets()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
