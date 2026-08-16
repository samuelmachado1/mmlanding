# Deputado Max Maciel — Landing Page

## Desenvolvimento

```bash
npm install
npm run dev          # só frontend (API indisponível → fallback estático)
npm run dev:full     # frontend + API serverless (recomendado para admin/mídia)
npm run dev:api      # só API na porta 3000 (use com npm run dev em outro terminal)
```

Com `npm run dev:full`, a API local sobe na porta 3000 e o Vite faz proxy automaticamente. Não exige `vercel login`. Use `npm run dev:api:vercel` se preferir o Vercel CLI.

## Build

```bash
npm run build
npm run preview
```

## Clipping automático (Google News RSS) + aprovação humana

A seção **Max na Mídia** (landing + `/midia`) descobre matérias via **Google News RSS** — o mesmo método do projeto **get-news**: sem API key, sem billing. Novas descobertas entram em uma **fila de aprovação** — nada é publicado automaticamente no site.

### Fluxo

1. Cron diário (`/api/cron/refresh-clippings`) ou **Buscar agora** no admin
2. Busca no Google News RSS (`news.google.com/rss/search`)
3. URLs novas vão para `pending` no Vercel Blob
4. Equipe revisa em `/admin/midia` e aprova ou rejeita
5. Só itens aprovados aparecem em `GET /api/clippings` (site público)

### Busca (padrão: Google News RSS)

Igual ao **get-news**: não precisa de `GOOGLE_CSE_API_KEY` nem envs do Google Cloud.

Opcional: personalize termos via `GOOGLE_NEWS_QUERIES` (JSON array) no `.env`.

**Opcional — Custom Search API:** só se quiser usar CSE em vez do RSS, defina `GOOGLE_CSE_ENABLED=true` + `GOOGLE_CSE_API_KEY` + `GOOGLE_CSE_ID` (requer billing no Google Cloud).

### Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

| Variável | Descrição |
|---|---|
| `GOOGLE_NEWS_QUERIES` | (Opcional) JSON array de termos de busca |
| `GOOGLE_CSE_ENABLED` | `true` para usar Custom Search em vez do RSS |
| `GOOGLE_CSE_API_KEY` | (Opcional) API Key do Google Cloud |
| `GOOGLE_CSE_ID` | (Opcional) Search Engine ID (`cx`) |
| `CRON_SECRET` | Segredo para proteger o endpoint de cron |
| `BLOB_READ_WRITE_TOKEN` | Token do Vercel Blob (produção) |
| `ADMIN_SECRET` | Segredo para `/admin/midia` e rotas `/api/admin/*` |

### 3. Deploy na Vercel

1. Conecte o repositório na [Vercel](https://vercel.com/)
2. Crie um **Blob store** no projeto e vincule `BLOB_READ_WRITE_TOKEN`
3. Configure as demais variáveis de ambiente
4. O cron diário está em `vercel.json` (`0 12 * * *`, compatível com Hobby)

Configure o header `Authorization: Bearer <CRON_SECRET>` para o cron na Vercel (Settings → Cron Jobs).

### Painel admin

Configure `ADMIN_SECRET` na Vercel (Production). Primeiro acesso com link secreto (cookie de 7 dias):

```
https://seu-dominio.com/admin/midia?admin=SEU_ADMIN_SECRET
```

Depois, use o mesmo segredo no formulário de login se o navegador limpar a sessão. A API exige `Authorization: Bearer <ADMIN_SECRET>`.

Funcionalidades: revisar pendentes, aprovar/rejeitar, definir destaque, remover publicados, adicionar matéria manual.

### Refresh manual (local ou produção)

```bash
curl -X POST "http://localhost:3000/api/cron/refresh-clippings" \
  -H "Authorization: Bearer $CRON_SECRET"
```

### Endpoints

| Rota | Descrição |
|---|---|
| `GET /api/clippings` | Retorna matérias **aprovadas** (público) |
| `GET/POST /api/cron/refresh-clippings` | Descobre novas matérias → fila pending (requer `Authorization: Bearer <CRON_SECRET>`) |
| `GET /api/admin/clippings/pending` | Lista pendentes + publicados (admin) |
| `POST /api/admin/clippings/discover` | Busca no Google e adiciona à fila pending |
| `POST /api/admin/clippings/approve` | Aprova item `{ id }` |
| `POST /api/admin/clippings/reject` | Rejeita item `{ id }` |
| `POST /api/admin/clippings/manual` | Adiciona matéria manual em published |
| `POST /api/admin/clippings/highlight` | Define matéria em destaque `{ id }` |
| `DELETE /api/admin/clippings/published?id=` | Remove item publicado |

## Stack

Vite, React, TypeScript, Tailwind v4, framer-motion, react-hook-form, lucide-react, Vercel Serverless Functions, Vercel Blob
