import { doeContent, doePage } from '../data/content.ts';
import {
  InternalPageLayout,
  PageHero,
  PageProse,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';

export default function DoePage() {
  return (
    <InternalPageLayout>
      <PageHero
        eyebrow="Campanha"
        title={doePage.title}
        subtitle="Sua contribuição financia mobilização, materiais e a continuidade do mandato popular."
        variant="red"
      />

      <PageSection eyebrow="Por que doar" title="Apoie financeiramente">
        <PageProse paragraphs={doePage.paragraphs} />
      </PageSection>

      <PageSection eyebrow="PIX" title={doeContent.title} className="bg-yellow-500">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8">
          <p className="font-nav text-lg leading-relaxed text-brand-black/90">{doeContent.description}</p>
          <div className="mt-6 rounded-xl bg-cream px-5 py-4">
            <p className="font-nav text-sm font-semibold uppercase tracking-wide text-navy-500">Chave PIX</p>
            <p className="pt-2 font-nav text-2xl font-black text-brand-black">{doeContent.pixKey}</p>
          </div>
          <p className="pt-4 text-sm text-brand-black/70">{doeContent.note}</p>
        </div>
      </PageSection>
    </InternalPageLayout>
  );
}
