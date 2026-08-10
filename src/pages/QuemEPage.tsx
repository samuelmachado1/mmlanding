import quemEhMax from '../assets/pictures/quem-eh-max.png';
import { quemEPageContent } from '../data/content.ts';
import {
  InternalPageLayout,
  PageCta,
  PageHero,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';
import { PageTimeline, PrincipleGrid } from '../components/pages/PageBlocks.tsx';

export default function QuemEPage() {
  const { hero, origin, timeline, formation, principles, cta } = quemEPageContent;

  return (
    <InternalPageLayout>
      <PageHero {...hero} />

      <PageSection eyebrow={origin.eyebrow} title={origin.title}>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            {origin.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="font-nav text-lg leading-relaxed text-brand-black/90">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="overflow-hidden rounded-2xl bg-navy-100">
            <img src={quemEhMax} alt="Max Maciel" className="h-full min-h-[380px] w-full object-cover object-left-bottom" />
          </div>
        </div>
      </PageSection>

      <PageSection eyebrow={timeline.eyebrow} title={timeline.title} className="bg-white">
        <PageTimeline items={timeline.items} />
      </PageSection>

      <PageSection eyebrow={formation.eyebrow} title={formation.title}>
        <div className="max-w-3xl space-y-4">
          {formation.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="font-nav text-lg leading-relaxed text-brand-black/90">
              {paragraph}
            </p>
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow={principles.eyebrow} title={principles.title} className="bg-yellow-500">
        <PrincipleGrid cards={principles.cards} />
      </PageSection>

      <PageCta {...cta} />
    </InternalPageLayout>
  );
}
