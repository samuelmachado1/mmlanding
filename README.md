# Deputado Max Maciel — Landing Page

## Desenvolvimento

```bash
npm install
npm run dev          # frontend (usa fallback estático se /api não estiver disponível)
npm run dev:api      # frontend + API serverless local (requer Vercel CLI)
```

Com `npm run dev:api`, o Vercel CLI sobe as rotas em `/api` na porta 3000 e o Vite faz proxy automaticamente.

## Build

```bash
npm run build
npm run preview
```

## Clipping automático (Google Custom Search)

A seção **Max na Mídia** (landing + `/midia`) busca notícias via Google Custom Search JSON API e atualiza o cache a cada 2 horas.

### 1. Configurar Google

1. Crie um projeto no [Google Cloud Console](https://console.cloud.google.com/)
2. Habilite a **Custom Search API** e gere uma **API Key**
3. Crie um motor no [Programmable Search Engine](https://programmablesearchengine.google.com/) e copie o **Search Engine ID** (`cx`)

### 2. Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

| Variável | Descrição |
|---|---|
| `GOOGLE_CSE_API_KEY` | API Key do Google Cloud |
| `GOOGLE_CSE_ID` | Search Engine ID (`cx`) |
| `CRON_SECRET` | Segredo para proteger o endpoint de cron |
| `BLOB_READ_WRITE_TOKEN` | Token do Vercel Blob (produção) |
| `LAUNCH_DATE` | Data de abertura pública (`YYYY-MM-DD`, fuso `America/Sao_Paulo`) |
| `SITE_LAUNCHED` | `true` para abrir antes da data; `false` para manter bloqueado |
| `PREVIEW_SECRET` | Segredo para testar o site em produção antes do lançamento |

### 3. Deploy na Vercel

1. Conecte o repositório na [Vercel](https://vercel.com/)
2. Crie um **Blob store** no projeto e vincule `BLOB_READ_WRITE_TOKEN`
3. Configure as demais variáveis de ambiente

> **Cron automático desativado** no plano Hobby (máx. 1 execução/dia). O endpoint `/api/cron/refresh-clippings` permanece disponível para refresh manual. Para agendar depois, adicione `crons` em `vercel.json` com schedule diário (`0 12 * * *`) ou migre para Pro.

### Lançamento faseado (prévia em produção)

O `middleware.ts` bloqueia o site até a data de lançamento. Visitantes veem uma página "Em breve"; a equipe testa em produção com URL secreta.

**Configuração na Vercel (Production):**

```
LAUNCH_DATE=2026-08-15
SITE_LAUNCHED=false
PREVIEW_SECRET=um-segredo-longo-e-aleatorio
```

**Testar em produção (antes do dia 15):**

```
https://seu-dominio.com/?preview=um-segredo-longo-e-aleatorio
```

O middleware define um cookie de 7 dias — depois da primeira visita, não precisa do `?preview=` em cada página.

**Abrir para o público no dia 15:**

- Opção 1: aguardar a meia-noite (horário de Brasília) — o middleware libera automaticamente
- Opção 2: definir `SITE_LAUNCHED=true` no dashboard da Vercel (liberação imediata)

> O middleware roda na Vercel e com `vercel dev`. O `npm run dev` (só Vite) não aplica o bloqueio — ideal para desenvolvimento local.
>
> **Importante:** `LAUNCH_DATE`, `SITE_LAUNCHED` e `PREVIEW_SECRET` precisam estar em **Environment Variables → Production** antes do build. Após alterar, faça **Redeploy**. O app também aplica um bloqueio no client (build-time) como fallback.

### 4. Refresh manual (local ou produção)

```bash
curl -X POST "http://localhost:3000/api/cron/refresh-clippings" \
  -H "Authorization: Bearer $CRON_SECRET"
```

### Endpoints

| Rota | Descrição |
|---|---|
| `GET /api/clippings` | Retorna o cache de notícias (público) |
| `GET/POST /api/cron/refresh-clippings` | Atualiza o cache (requer `Authorization: Bearer <CRON_SECRET>`) |

## Stack

Vite, React, TypeScript, Tailwind v4, framer-motion, react-hook-form, lucide-react, Vercel Serverless Functions, Vercel Blob
