import { bondePageContent } from '../data/content.ts';
import { BondeAvatarStudio } from '../components/pages/BondeAvatarStudio.tsx';
import {
  InternalPageLayout,
  PageHero,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';
import { BondeActionGrid, BondeStatGrid } from '../components/pages/PageBlocks.tsx';

export default function BondeProMaxPage() {
  const { hero, stats, avatarStudio, actions } = bondePageContent;

  return (
    <InternalPageLayout>
      <PageHero {...hero} />

      <PageSection eyebrow={actions.eyebrow} title={actions.title} className="bg-white">
        <BondeActionGrid cards={actions.cards} />
      </PageSection>

      <BondeAvatarStudio {...avatarStudio} />

      <section className="bg-cream px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <BondeStatGrid stats={stats} />
        </div>
      </section>
    </InternalPageLayout>
  );
}
