import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  InternalPageLayout,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';
import { AppLink } from '../components/ui/AppLink.tsx';
import type { MediaCard } from '../types/index.ts';

interface MediaArticle extends MediaCard {
  excerpt?: string;
  bodyHtml?: string;
}

const articleBodyClassName =
  'article-body flex flex-col gap-5 font-body text-lg leading-relaxed text-brand-black/90 ' +
  '[&_h2]:mt-6 [&_h2]:font-nav [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-brand-black ' +
  '[&_h3]:mt-4 [&_h3]:font-nav [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-brand-black ' +
  '[&_blockquote]:border-l-4 [&_blockquote]:border-yellow-500 [&_blockquote]:pl-4 [&_blockquote]:text-brand-black/80 ' +
  '[&_a]:font-semibold [&_a]:text-navy-500 [&_a]:underline [&_li]:ml-4';

function ArticleBody({ article }: { article: MediaArticle }) {
  return (
    <div className="flex flex-col gap-8 p-6 sm:p-10">
      {article.imageUrl ? (
        <img
          src={article.imageUrl}
          alt=""
          referrerPolicy="no-referrer"
          className="w-full rounded-xl object-cover"
        />
      ) : null}

      {article.bodyHtml ? (
        <div
          className={articleBodyClassName}
          dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
        />
      ) : article.excerpt ? (
        <p className="text-lg leading-relaxed text-brand-black/85">{article.excerpt}</p>
      ) : (
        <p className="text-base text-brand-black/70">
          Não foi possível carregar o texto desta matéria aqui. Use o botão abaixo
          para ler no site de <strong>{article.source}</strong>.
        </p>
      )}

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
  const [article, setArticle] = useState<MediaArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    async function loadFromApi() {
      try {
        const response = await fetch(
          `/api/clippings?id=${encodeURIComponent(id!)}`,
        );
        if (!response.ok) return;
        const payload = (await response.json()) as MediaArticle;
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
        </div>
      </section>

      <section className="bg-cream px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-brand-black/10 bg-white shadow-sm">
            <ArticleBody article={article} />
          </div>
        </div>
      </section>
    </InternalPageLayout>
  );
}
