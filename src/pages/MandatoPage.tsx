import { useState } from 'react';
import { mandatoPageContent } from '../data/content.ts';
import {
  InternalPageLayout,
  PageCta,
  PageHero,
} from '../components/pages/InternalPageParts.tsx';
import { MandatoTabBar, ProposalGrid } from '../components/pages/PageBlocks.tsx';

type MandatoTabId = keyof typeof mandatoPageContent.sections;

export default function MandatoPage() {
  const { hero, tabs, sections, cta } = mandatoPageContent;
  const [activeTab, setActiveTab] = useState<MandatoTabId>('propostas');
  const section = sections[activeTab];

  return (
    <InternalPageLayout>
      <PageHero {...hero} />

      <MandatoTabBar tabs={tabs} activeId={activeTab} onChange={(id) => setActiveTab(id as MandatoTabId)} />

      <section className="bg-cream px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-nav text-[clamp(1.75rem,4vw,2.25rem)] font-black leading-tight text-brand-black">
            {section.title}
          </h2>
          <div className="pt-10">
            <ProposalGrid cards={section.items} />
          </div>
        </div>
      </section>

      <PageCta {...cta} />
    </InternalPageLayout>
  );
}
