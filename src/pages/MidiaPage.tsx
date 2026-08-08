import { useMemo, useState } from 'react';
import { midiaPageContent } from '../data/content.ts';
import {
  InternalPageLayout,
  PageCta,
  PageHero,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';
import { MediaGrid, PageTabBar } from '../components/pages/PageBlocks.tsx';

export default function MidiaPage() {
  const { hero, tabs, items, cta } = midiaPageContent;
  const [activeTab, setActiveTab] = useState('todos');

  const filteredItems = useMemo(() => {
    if (activeTab === 'todos') return items;
    return items.filter((item) => item.tab === activeTab);
  }, [activeTab, items]);

  return (
    <InternalPageLayout>
      <PageHero {...hero} />

      <PageSection eyebrow="Cobertura" title="Acompanhe na imprensa" className="bg-cream">
        <div className="space-y-8">
          <PageTabBar tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
          <MediaGrid cards={filteredItems} />
        </div>
      </PageSection>

      <PageCta {...cta} />
    </InternalPageLayout>
  );
}
