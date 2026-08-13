import { mandatoHub, mandatoPageContent } from '../data/content.ts';
import {
  InternalPageLayout,
  PageHero,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';
import { HubLinkGrid, ProposalGrid } from '../components/pages/PageBlocks.tsx';

export default function MandatoPage() {
  const { hero, realizacoes } = mandatoPageContent;

  return (
    <InternalPageLayout>
      <PageHero {...hero} />

      <PageSection eyebrow={mandatoHub.title} title="Principais frentes de trabalho">
        <p className="mb-8 max-w-3xl font-nav text-lg leading-relaxed text-brand-black/90">{mandatoHub.intro}</p>
        <HubLinkGrid links={mandatoHub.links} />
      </PageSection>

      <PageSection eyebrow="Entregas" title={realizacoes.title} className="bg-white">
        <ProposalGrid cards={realizacoes.items} />
      </PageSection>
    </InternalPageLayout>
  );
}
