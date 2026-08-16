import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  InternalPageLayout,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';
import { AppLink } from '../components/ui/AppLink.tsx';
import type { MediaCard } from '../types/index.ts';

function isGoogleNewsUrl(href: string): boolean {
  return /news\.google\.com/i.test(href);
}

function ArticleEmbedFallback({ article }: { article: MediaCard }) {
  return (
    <div className="flex flex-col gap-6 p-6 sm:p-10">
      {article.imageUrl ? (
        <img
          src={article.imageUrl}
          alt=""
          className="max-h-[min(50vh,420px)] w-full rounded-xl object-cover"
        />
      ) : null}
      <p className="text-base text-brand-black/70">
        Esta matéria está no site de <strong>{article.source}</strong>. Alguns
        portais não permitem exibir o conteúdo aqui — use o botão abaixo para
        ler na íntegra.
      </p>
      <a
        href={article.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex rounded-xl bg-yellow-500 px-5 py-3 font-nav text-sm font-bold text-navy-500"
      >
        Abrir no site original
      </a>
    </div>
  );
}

export default function MidiaArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<MediaCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [embedFailed, setEmbedFailed] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setEmbedFailed(false);

    async function loadFromApi() {
      try {
        const response = await fetch(
          `/api/clippings/item?id=${encodeURIComponent(id!)}`,
        );
        if (!response.ok) return;
        const payload = (await response.json()) as MediaCard;
        if (!cancelled) setArticle(payload);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadFromApi();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const canEmbed =
    article &&
    !isGoogleNewsUrl(article.href) &&
    !embedFailed;

  if (!id) {
    return (
      <InternalPageLayout>
        <PageSection title="Matéria não encontrada" className="bg-cream">
          <AppLink to="/midia" className="font-nav text-sm font-semibold text-navy-500 underline">
            Voltar para Max na Mídia
          </AppLink>
        </PageSection>
      </InternalPageLayout>
    );
  }

  if (loading && !article) {
    return (
      <InternalPageLayout>
        <PageSection title="Carregando matéria…" className="bg-cream">
          <p className="text-sm text-brand-black/60">Aguarde…</p>
        </PageSection>
      </InternalPageLayout>
    );
  }

  if (!article) {
    return (
      <InternalPageLayout>
        <PageSection title="Matéria não encontrada" className="bg-cream">
          <p className="text-sm text-brand-black/70">
            Este link pode ter sido removido ou ainda não está publicado.
          </p>
          <AppLink to="/midia" className="mt-4 inline-block font-nav text-sm font-semibold text-navy-500 underline">
            Voltar para Max na Mídia
          </AppLink>
        </PageSection>
      </InternalPageLayout>
    );
  }

  return (
    <InternalPageLayout>
      <section className="bg-navy-500 px-6 py-10 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <AppLink
            to="/midia"
            className="font-nav text-sm font-semibold text-cream/80 underline underline-offset-4"
          >
            ← Voltar para Max na Mídia
          </AppLink>
          <p className="mt-4 font-nav text-sm font-bold uppercase tracking-wide text-yellow-500">
            {article.category} · {article.source}
          </p>
          <h1 className="mt-2 font-nav text-[clamp(1.75rem,4vw,2.75rem)] font-black leading-tight text-cream">
            {article.title}
          </h1>
          <p className="mt-2 font-nav text-sm text-cream/70">{article.date}</p>
          <a
            href={article.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-xl bg-yellow-500 px-4 py-2 font-nav text-sm font-bold text-navy-500"
          >
            Abrir no site original
          </a>
        </div>
      </section>

      <section className="bg-cream px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-brand-black/10 bg-white shadow-sm">
            {canEmbed ? (
              <iframe
                title={article.title}
                src={article.href}
                className="h-[min(75vh,900px)] w-full bg-white"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                referrerPolicy="no-referrer-when-downgrade"
                onError={() => setEmbedFailed(true)}
              />
            ) : (
              <ArticleEmbedFallback article={article} />
            )}
          </div>
          {canEmbed ? (
            <p className="mt-4 text-sm text-brand-black/60">
              Se a matéria não carregar aqui, alguns sites bloqueiam exibição
              incorporada. Use &quot;Abrir no site original&quot; acima.
            </p>
          ) : null}
        </div>
      </section>
    </InternalPageLayout>
  );
}
