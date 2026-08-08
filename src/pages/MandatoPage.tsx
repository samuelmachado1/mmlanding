import { useMemo, useState } from 'react';
import { mandatoPageContent } from '../data/content.ts';
import {
  InternalPageLayout,
  PageCta,
  PageHero,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';
import { ActionGrid, PageTabBar, ProposalGrid } from '../components/pages/PageBlocks.tsx';

export default function MandatoPage() {
  const { hero, frentes, proposals, cta } = mandatoPageContent;
  const [activeTab, setActiveTab] = useState('todos');

  const filteredProposals = useMemo(() => {
    if (activeTab === 'todos') return proposals.items;
    return proposals.items.filter((item) => item.tab === activeTab);
  }, [activeTab, proposals.items]);

  return (
    <InternalPageLayout>
      <PageHero {...hero} />

      <PageSection eyebrow={frentes.eyebrow} title={frentes.title}>
        <ActionGrid cards={frentes.links} />
      </PageSection>

      <PageSection eyebrow={proposals.eyebrow} title={proposals.title} className="bg-white">
        <div className="space-y-8">
          <PageTabBar tabs={proposals.tabs} activeId={activeTab} onChange={setActiveTab} />
          <ProposalGrid cards={filteredProposals} />
        </div>
      </PageSection>

      <PageCta {...cta} />
    </InternalPageLayout>
  );
}
