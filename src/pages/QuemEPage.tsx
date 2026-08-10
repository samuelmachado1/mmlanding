import quemEMaxFigma from '../assets/pictures/quem-e-max-figma.png';
import { quemEPageContent } from '../data/content.ts';
import {
  InternalPageLayout,
  PageCta,
  PageHero,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';
import { PageTimeline, PrincipleGrid } from '../components/pages/PageBlocks.tsx';

export default function QuemEPage() {
  const { hero, origin, timeline, principles, cta } = quemEPageContent;

  return (
    <InternalPageLayout>
      <PageHero {...hero} />

      <section className="bg-cream px-6 py-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-2">
          <div>
            <p className="font-nav text-[17px] font-semibold uppercase tracking-[0.05em] text-navy-500">
              {origin.eyebrow}
            </p>
            <h2 className="pt-3 font-nav text-[clamp(1.75rem,4vw,2.25rem)] font-black leading-tight text-brand-black">
              {origin.title}
            </h2>
            <div className="space-y-4 pt-6">
              {origin.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="font-nav text-lg leading-[1.625] text-brand-black">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="min-h-[380px] overflow-hidden rounded-2xl">
            <img
              src={quemEMaxFigma}
              alt="Max Maciel"
              className="size-full min-h-[380px] object-cover"
            />
          </div>
        </div>
      </section>

      <PageSection eyebrow={timeline.eyebrow} title={timeline.title} className="bg-white">
        <PageTimeline items={timeline.items} />
      </PageSection>

      <PageSection eyebrow={principles.eyebrow} title={principles.title} className="bg-yellow-500">
        <PrincipleGrid cards={principles.cards} />
      </PageSection>

      <PageCta {...cta} />
    </InternalPageLayout>
  );
}
