import { materiaisPage } from '../data/content.ts';
import {
  InternalPageLayout,
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
    </InternalPageLayout>
  );
}
