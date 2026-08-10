import { useMemo, useState } from 'react';
import { midiaPageContent } from '../data/content.ts';
import {
  InternalPageLayout,
  PageHero,
} from '../components/pages/InternalPageParts.tsx';
import { MandatoTabBar, MidiaMediaGrid } from '../components/pages/PageBlocks.tsx';
import { MidiaMediaGridSkeleton } from '../components/pages/MidiaMediaGridSkeleton.tsx';
import { useClippings } from '../hooks/useClippings.ts';

export default function MidiaPage() {
  const { hero, tabs } = midiaPageContent;
  const { loading, error, items } = useClippings();
  const [activeTab, setActiveTab] = useState('todos');

  const filteredItems = useMemo(() => {
    if (activeTab === 'todos') return items;
    return items.filter((item) => item.tab === activeTab);
  }, [activeTab, items]);

  return (
    <InternalPageLayout>
      <PageHero {...hero} />

      <MandatoTabBar
        tabs={tabs}
        activeId={activeTab}
        onChange={setActiveTab}
        variant="red"
      />

      <section className="bg-cream px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {error ? (
            <p className="mb-6 font-nav text-sm text-brand-black/60">
              Não foi possível atualizar as notícias agora. Exibindo conteúdo em cache.
            </p>
          ) : null}
          {loading ? (
            <MidiaMediaGridSkeleton />
          ) : (
            <MidiaMediaGrid cards={filteredItems} />
          )}
        </div>
      </section>
    </InternalPageLayout>
  );
}
