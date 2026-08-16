import { useCallback, useEffect, useState } from 'react';
import type { MediaCard, PendingMediaItem } from '../types/index.ts';
import {
  adminFetch,
  captureAdminTokenFromUrl,
  clearAdminToken,
  getAdminToken,
  setAdminToken,
} from '../lib/admin-auth.ts';

type AdminTab = 'pending' | 'published' | 'manual';

const TAB_OPTIONS: MediaCard['tab'][] = [
  'reportagens',
  'entrevistas',
  'podcasts',
  'redes-sociais',
];

export default function AdminMidiaPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [tokenInput, setTokenInput] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<PendingMediaItem[]>([]);
  const [published, setPublished] = useState<MediaCard[]>([]);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);
  const [discovering, setDiscovering] = useState(false);
  const [discoverMessage, setDiscoverMessage] = useState<string | null>(null);

  const [manualForm, setManualForm] = useState({
    title: '',
    href: '',
    source: '',
    tab: 'reportagens',
    imageUrl: '',
    asHighlight: false,
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await adminFetch('/api/admin/clippings/pending');
      const body = await response.text();
      if (!response.ok) {
        if (response.status === 401) {
          clearAdminToken();
          setAuthenticated(false);
          throw new Error('Segredo de admin inválido');
        }
        if (response.status === 502 || response.status === 503) {
          throw new Error(
            'API indisponível. Inicie a API com npm run dev:full (ou npm run dev:api na porta 3000).',
          );
        }
        throw new Error(body.slice(0, 120) || `HTTP ${response.status}`);
      }

      const data = JSON.parse(body) as {
        pending: PendingMediaItem[];
        published: MediaCard[];
        highlightId: string | null;
      };

      setPending(data.pending);
      setPublished(data.published);
      setHighlightId(data.highlightId ?? null);
      setAuthenticated(true);
    } catch (err) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError(
          'API indisponível. Inicie a API com npm run dev:full (ou npm run dev:api na porta 3000).',
        );
      } else {
        setError(err instanceof Error ? err.message : 'Falha ao carregar dados');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    captureAdminTokenFromUrl();
    const token = getAdminToken();
    if (!token) return;

    setAuthenticated(true);
    void loadData();
  }, [loadData]);

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    if (!tokenInput.trim()) return;
    setAdminToken(tokenInput.trim());
    setAuthenticated(true);
    void loadData();
  }

  function handleLogout() {
    clearAdminToken();
    setAuthenticated(false);
    setPending([]);
    setPublished([]);
  }

  async function handleApprove(id: string, asHighlight = false) {
    setActionId(id);
    setError(null);
    try {
      const response = await adminFetch('/api/admin/clippings/approve', {
        method: 'POST',
        body: JSON.stringify({ id, asHighlight }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao aprovar');
    } finally {
      setActionId(null);
    }
  }

  async function handleSetHighlight(id: string) {
    setActionId(id);
    setError(null);
    try {
      const response = await adminFetch('/api/admin/clippings/highlight', {
        method: 'POST',
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao definir destaque');
    } finally {
      setActionId(null);
    }
  }

  async function handleReject(id: string) {
    setActionId(id);
    setError(null);
    try {
      const response = await adminFetch('/api/admin/clippings/reject', {
        method: 'POST',
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao rejeitar');
    } finally {
      setActionId(null);
    }
  }

  async function handleRemovePublished(id: string) {
    setActionId(id);
    setError(null);
    try {
      const response = await adminFetch(`/api/admin/clippings/published?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao remover');
    } finally {
      setActionId(null);
    }
  }

  async function handleManualSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await adminFetch('/api/admin/clippings/manual', {
        method: 'POST',
        body: JSON.stringify({
          title: manualForm.title,
          href: manualForm.href,
          source: manualForm.source,
          tab: manualForm.tab,
          imageUrl: manualForm.imageUrl || undefined,
          asHighlight: manualForm.asHighlight,
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setManualForm({
        title: '',
        href: '',
        source: '',
        tab: 'reportagens',
        imageUrl: '',
        asHighlight: false,
      });
      setActiveTab('published');
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao adicionar item');
      setLoading(false);
    }
  }

  async function handleDiscoverNow() {
    setDiscovering(true);
    setError(null);
    setDiscoverMessage(null);

    try {
      const response = await adminFetch('/api/admin/clippings/discover', {
        method: 'POST',
      });
      const body = await response.text();
      let data: {
        ok: boolean;
        addedToPending: number;
        pendingTotal: number;
        source?: string;
        error?: string;
        message?: string;
      };

      try {
        data = JSON.parse(body) as typeof data;
      } catch {
        throw new Error(body.slice(0, 120) || 'Resposta inválida da API');
      }

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? data.message ?? `HTTP ${response.status}`);
      }

      setDiscoverMessage(
        data.addedToPending > 0
          ? `${data.addedToPending} nova(s) matéria(s) encontrada(s). Revise na aba Pendentes.`
          : 'Nenhuma matéria nova encontrada desta vez. Você pode tentar de novo mais tarde.',
      );
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha na busca');
    } finally {
      setDiscovering(false);
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-cream px-4 py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-brand-black/10 bg-white p-8 text-center">
          <h1 className="font-nav text-2xl font-bold text-brand-black">Admin Sessão de notícias</h1>
          <p className="mt-2 text-sm text-brand-black/70">Protegido por Max Token</p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Insira o Max token"
              className="w-full rounded-xl border border-brand-black/15 px-4 py-3 text-sm"
              autoComplete="off"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-navy-500 px-4 py-3 font-nav text-sm font-bold text-white"
            >
              Entrar
            </button>
          </form>
          {error && <p className="mt-4 text-sm text-brand-red">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-nav text-3xl font-bold text-brand-black">Admin Sessão de notícias</h1>
            <p className="mt-1 text-sm text-brand-black/70">
              Revise descobertas automáticas antes de publicar no site.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void handleDiscoverNow()}
              disabled={discovering || loading}
              className="rounded-xl bg-navy-500 px-4 py-2 font-nav text-sm font-bold text-white disabled:opacity-50"
            >
              {discovering ? 'Buscando…' : 'Buscar agora'}
            </button>
            <button
              type="button"
              onClick={() => void loadData()}
              disabled={loading || discovering}
              className="rounded-xl border border-brand-black/15 px-4 py-2 font-nav text-sm font-semibold"
            >
              Atualizar
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-brand-black/15 px-4 py-2 font-nav text-sm font-semibold"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {(
            [
              { id: 'pending', label: `Pendentes (${pending.length})` },
              { id: 'published', label: `Publicados (${published.length})` },
              { id: 'manual', label: 'Adicionar manual' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 font-nav text-sm font-semibold ${
                activeTab === tab.id
                  ? 'bg-navy-500 text-white'
                  : 'bg-white text-brand-black border border-brand-black/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {discoverMessage && (
          <p className="mt-4 rounded-xl bg-navy-500/10 px-4 py-3 text-sm text-navy-500">{discoverMessage}</p>
        )}

        {error && (
          <p className="mt-4 rounded-xl bg-brand-red/10 px-4 py-3 text-sm text-brand-red">{error}</p>
        )}

        {loading && activeTab !== 'manual' && (
          <p className="mt-6 text-sm text-brand-black/60">Carregando…</p>
        )}

        {activeTab === 'pending' && !loading && (
          <>
            <details className="mt-6 rounded-2xl border border-brand-black/10 bg-white p-5 text-sm text-brand-black/80">
              <summary className="cursor-pointer font-nav font-semibold text-brand-black">
                Como usar este painel
              </summary>
              <ol className="mt-4 list-decimal space-y-3 pl-5">
                <li>
                  Clique em <strong>Buscar agora</strong> para procurar notícias recentes sobre o
                  Deputado Max Maciel na internet. Ao entrar no painel, essa busca já roda
                  automaticamente.
                </li>
                <li>
                  Na aba <strong>Pendentes</strong>, revise cada matéria encontrada. Abra o link
                  para ler o conteúdo completo antes de decidir.
                </li>
                <li>
                  Para cada matéria, escolha uma ação:
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    <li>
                      <strong>Aprovar</strong> — publica no site, na seção de mídia.
                    </li>
                    <li>
                      <strong>Tornar destaque</strong> — publica e coloca em evidência na página
                      inicial (substitui o destaque anterior).
                    </li>
                    <li>
                      <strong>Rejeitar</strong> — descarta a matéria; ela não aparece no site.
                    </li>
                  </ul>
                </li>
                <li>
                  Na aba <strong>Publicados</strong>, veja o que já está no ar. Você pode{' '}
                  <strong>definir destaque</strong> ou <strong>remover</strong> uma matéria a
                  qualquer momento.
                </li>
                <li>
                  Se uma notícia não apareceu na busca, use a aba{' '}
                  <strong>Adicionar manual</strong> para cadastrá-la com título, link e fonte.
                </li>
              </ol>
              <p className="mt-4 text-brand-black/60">
                Dica: volte e clique em <strong>Buscar agora</strong> sempre que quiser atualizar
                a lista de matérias pendentes.
              </p>
            </details>

            <ul className="mt-6 space-y-4">
            {pending.length === 0 && (
              <li className="rounded-2xl bg-white p-6 text-sm text-brand-black/70">
                Nenhum item pendente. Clique em <strong>Buscar agora</strong> para buscar novas matérias.
              </li>
            )}
            {pending.map((item) => (
              <li
                key={item.id}
                className="rounded-2xl border border-brand-black/10 bg-white p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-nav text-xs font-bold uppercase tracking-wide text-navy-500">
                      {item.source} · {item.date}
                    </p>
                    <h2 className="mt-1 font-nav text-lg font-bold text-brand-black">{item.title}</h2>
                    {item.snippet && (
                      <p className="mt-2 text-sm leading-relaxed text-brand-black/80">{item.snippet}</p>
                    )}
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm font-semibold text-navy-500 underline"
                    >
                      Abrir matéria
                    </a>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      disabled={actionId === item.id}
                      onClick={() => void handleApprove(item.id)}
                      className="rounded-xl bg-navy-500 px-4 py-2 font-nav text-sm font-bold text-white disabled:opacity-50"
                    >
                      Aprovar
                    </button>
                    <button
                      type="button"
                      disabled={actionId === item.id}
                      onClick={() => void handleApprove(item.id, true)}
                      className="rounded-xl bg-yellow-500 px-4 py-2 font-nav text-sm font-bold text-navy-500 disabled:opacity-50"
                    >
                      Tornar destaque
                    </button>
                    <button
                      type="button"
                      disabled={actionId === item.id}
                      onClick={() => void handleReject(item.id)}
                      className="rounded-xl border border-brand-red px-4 py-2 font-nav text-sm font-bold text-brand-red disabled:opacity-50"
                    >
                      Rejeitar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          </>
        )}

        {activeTab === 'published' && !loading && (
          <ul className="mt-6 space-y-3">
            {published.length === 0 && (
              <li className="rounded-2xl bg-white p-6 text-sm text-brand-black/70">
                Nenhum item publicado ainda.
              </li>
            )}
            {highlightId && published.some((item) => item.id === highlightId) && (
              <li className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 px-5 py-3 text-sm text-brand-black/80">
                Destaque atual:{' '}
                <strong>
                  {published.find((item) => item.id === highlightId)?.title}
                </strong>
                . Só uma matéria pode ficar em destaque — ao escolher outra, a anterior
                sai do destaque automaticamente.
              </li>
            )}
            {published.map((item) => {
              const isHighlight = item.id === highlightId;

              return (
                <li
                  key={item.id}
                  className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-white p-5 ${
                    isHighlight
                      ? 'border-yellow-500 ring-1 ring-yellow-500/30'
                      : 'border-brand-black/10'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-nav text-xs font-bold uppercase tracking-wide text-navy-500">
                        {item.category} · {item.source}
                      </p>
                      {isHighlight ? (
                        <span className="rounded-full bg-yellow-500 px-2 py-0.5 font-nav text-[10px] font-bold uppercase text-navy-500">
                          Destaque
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 font-nav font-bold text-brand-black">{item.title}</p>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm text-navy-500 underline"
                    >
                      {item.href}
                    </a>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    {!isHighlight ? (
                      <button
                        type="button"
                        disabled={actionId === item.id}
                        onClick={() => void handleSetHighlight(item.id)}
                        className="rounded-xl bg-yellow-500 px-4 py-2 font-nav text-sm font-bold text-navy-500 disabled:opacity-50"
                      >
                        Definir destaque
                      </button>
                    ) : null}
                    <button
                      type="button"
                      disabled={actionId === item.id}
                      onClick={() => void handleRemovePublished(item.id)}
                      className="rounded-xl border border-brand-black/15 px-4 py-2 font-nav text-sm font-semibold disabled:opacity-50"
                    >
                      Remover
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {activeTab === 'manual' && (
          <form
            onSubmit={(e) => void handleManualSubmit(e)}
            className="mt-6 space-y-4 rounded-2xl border border-brand-black/10 bg-white p-6"
          >
            <div>
              <label className="block font-nav text-sm font-semibold text-brand-black">Título</label>
              <input
                required
                value={manualForm.title}
                onChange={(e) => setManualForm((f) => ({ ...f, title: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-brand-black/15 px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block font-nav text-sm font-semibold text-brand-black">URL</label>
              <input
                required
                type="url"
                value={manualForm.href}
                onChange={(e) => setManualForm((f) => ({ ...f, href: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-brand-black/15 px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block font-nav text-sm font-semibold text-brand-black">Fonte</label>
              <input
                required
                value={manualForm.source}
                onChange={(e) => setManualForm((f) => ({ ...f, source: e.target.value }))}
                placeholder="ex: folha.uol.com.br"
                className="mt-1 w-full rounded-xl border border-brand-black/15 px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block font-nav text-sm font-semibold text-brand-black">Categoria</label>
              <select
                value={manualForm.tab}
                onChange={(e) => setManualForm((f) => ({ ...f, tab: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-brand-black/15 px-4 py-3 text-sm"
              >
                {TAB_OPTIONS.map((tab) => (
                  <option key={tab} value={tab}>{tab}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-nav text-sm font-semibold text-brand-black">
                URL da imagem (opcional)
              </label>
              <input
                type="url"
                value={manualForm.imageUrl}
                onChange={(e) => setManualForm((f) => ({ ...f, imageUrl: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-brand-black/15 px-4 py-3 text-sm"
              />
            </div>
            <label className="flex items-center gap-3 font-nav text-sm text-brand-black">
              <input
                type="checkbox"
                checked={manualForm.asHighlight}
                onChange={(e) =>
                  setManualForm((f) => ({ ...f, asHighlight: e.target.checked }))
                }
                className="size-4 rounded border-brand-black/20"
              />
              Colocar em destaque na landing (substitui o destaque atual)
            </label>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-navy-500 px-6 py-3 font-nav text-sm font-bold text-white disabled:opacity-50"
            >
              Publicar manualmente
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
