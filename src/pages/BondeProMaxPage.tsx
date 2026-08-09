import { bondePageContent } from '../data/content.ts';
import {
  InternalPageLayout,
  PageHero,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';
import { BondeActionGrid, BondeMissionList, BondeStatGrid } from '../components/pages/PageBlocks.tsx';

export default function BondeProMaxPage() {
  const { hero, stats, actions, missions } = bondePageContent;

  return (
    <InternalPageLayout>
      <PageHero {...hero} />

      <section className="bg-cream px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <BondeStatGrid stats={stats} />
        </div>
      </section>

      <PageSection eyebrow={actions.eyebrow} title={actions.title} className="bg-white">
        <BondeActionGrid cards={actions.cards} />
      </PageSection>

      <section id="missoes" className="bg-yellow-500 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="font-nav text-[17px] font-semibold uppercase tracking-[0.05em] text-navy-500">
            {missions.eyebrow}
          </p>
          <h2 className="pt-3 font-nav text-[clamp(1.75rem,4vw,2.25rem)] font-black leading-tight text-brand-black">
            {missions.title}
          </h2>
          <div className="pt-10">
            <BondeMissionList cards={missions.items} />
          </div>
        </div>
      </section>
    </InternalPageLayout>
  );
}
