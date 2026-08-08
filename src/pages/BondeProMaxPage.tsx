import { bondePageContent } from '../data/content.ts';
import {
  InternalPageLayout,
  PageCta,
  PageHero,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';
import { ActionGrid, MissionGrid, StatGrid } from '../components/pages/PageBlocks.tsx';

export default function BondeProMaxPage() {
  const { hero, stats, actions, missions, cta } = bondePageContent;

  return (
    <InternalPageLayout>
      <PageHero {...hero} />

      <PageSection eyebrow={stats.eyebrow} title={stats.title} className="bg-yellow-500">
        <StatGrid stats={stats.items} />
      </PageSection>

      <PageSection eyebrow={actions.eyebrow} title={actions.title}>
        <ActionGrid cards={actions.cards} />
      </PageSection>

      <PageSection eyebrow={missions.eyebrow} title={missions.title} className="bg-white">
        <MissionGrid cards={missions.items} />
      </PageSection>

      <PageCta {...cta} />
    </InternalPageLayout>
  );
}
