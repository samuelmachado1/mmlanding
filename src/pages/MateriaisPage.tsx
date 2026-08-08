import { materiaisPage } from '../data/content.ts';
import {
  InternalPageLayout,
  PageCta,
  PageHero,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';
import { PamphletGrid } from '../components/pages/PageBlocks.tsx';

export default function MateriaisPage() {
  return (
    <InternalPageLayout>
      <PageHero
        eyebrow="Campanha"
        title={materiaisPage.title}
        subtitle={materiaisPage.intro}
        variant="black"
      />

      <PageSection eyebrow="Downloads" title="Panfletos e materiais">
        <PamphletGrid items={materiaisPage.pamphlets} />
      </PageSection>

      <PageCta
        title="Espalhe a palavra aba reta"
        primary={{ label: 'Entrar no Bonde', href: '/bonde-pro-max' }}
        secondary={{ label: 'Apoie a campanha', href: '/apoie' }}
      />
    </InternalPageLayout>
  );
}
