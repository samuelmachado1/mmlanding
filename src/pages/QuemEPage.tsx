import frameQuemEhMax from '../assets/backgrounds/frame-quem-eh-max.png';
import quemEhMax from '../assets/pictures/quem-eh-max.png';
import { quemEPage } from '../data/content.ts';
import {
  InternalPageLayout,
  PageHero,
  PageProse,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';

export default function QuemEPage() {
  return (
    <InternalPageLayout>
      <PageHero
        eyebrow="Conheça"
        title={quemEPage.title}
        subtitle={quemEPage.subtitle ?? ''}
        variant="navy"
      />

      <PageSection eyebrow="Biografia" title="Da Ceilândia à Câmara Legislativa">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <PageProse paragraphs={quemEPage.paragraphs} />
          <div className="mx-auto w-full max-w-[min(100%,22rem)] lg:mx-0 lg:max-w-[24rem]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream">
              <img
                src={frameQuemEhMax}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <img
                src={quemEhMax}
                alt="Max Maciel"
                className="absolute inset-0 h-full w-full object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </PageSection>
    </InternalPageLayout>
  );
}
