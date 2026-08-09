import { useMemo, useState } from 'react';
import { midiaPageContent } from '../data/content.ts';
import {
  InternalPageLayout,
  PageHero,
} from '../components/pages/InternalPageParts.tsx';
import { MandatoTabBar, MidiaMediaGrid } from '../components/pages/PageBlocks.tsx';

export default function MidiaPage() {
  const { hero, tabs, items } = midiaPageContent;
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
          <MidiaMediaGrid cards={filteredItems} />
        </div>
      </section>
    </InternalPageLayout>
  );
}
