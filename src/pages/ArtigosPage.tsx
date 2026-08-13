import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { artigos, artigosPage } from '../data/content.ts';
import {
  InternalPageLayout,
  PageHero,
  PageProse,
} from '../components/pages/InternalPageParts.tsx';
import { MandatoTabBar } from '../components/pages/PageBlocks.tsx';

export default function ArtigosPage() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(artigos[0].id);

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    if (artigos.some((article) => article.id === id)) {
      setActiveId(id);
    }
  }, [hash]);

  const tabs = useMemo(
    () => artigos.map((article) => ({ id: article.id, label: article.title })),
    [],
  );

  const activeArticle = artigos.find((article) => article.id === activeId) ?? artigos[0];

  function handleTabChange(id: string) {
    setActiveId(id);
    navigate(`/artigos#${id}`, { replace: true });
  }

  return (
    <InternalPageLayout>
      <PageHero
        eyebrow="Leitura"
        title={artigosPage.title}
        subtitle={artigosPage.intro}
        variant="navy"
      />

      <MandatoTabBar tabs={tabs} activeId={activeId} onChange={handleTabChange} />

      <section className="bg-cream px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <article id={activeArticle.id} className="scroll-mt-28">
            <h2 className="max-w-3xl font-nav text-[clamp(1.5rem,3.5vw,2rem)] font-black leading-tight text-brand-black">
              {activeArticle.title}
            </h2>
            <div className="mt-8">
              <PageProse paragraphs={activeArticle.paragraphs} />
            </div>
          </article>
        </div>
      </section>
    </InternalPageLayout>
  );
}
