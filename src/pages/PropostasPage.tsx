import { propostasPage } from '../data/content.ts';
import {
  InternalPageLayout,
  PageHero,
  PageProse,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';
import { CampaignProposalList } from '../components/pages/PageBlocks.tsx';

export default function PropostasPage() {
  return (
    <InternalPageLayout>
      <PageHero
        eyebrow={propostasPage.eyebrow}
        title={propostasPage.title}
        subtitle={propostasPage.subtitle}
        variant="navy"
      />

      <PageSection eyebrow="Programa" title="A quebrada na linha de frente">
        <PageProse paragraphs={propostasPage.intro} />
      </PageSection>

      <PageSection eyebrow="Programa" title={propostasPage.listEyebrow} className="bg-white">
        <CampaignProposalList items={propostasPage.items} />
      </PageSection>
    </InternalPageLayout>
  );
}
