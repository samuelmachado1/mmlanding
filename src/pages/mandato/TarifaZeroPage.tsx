import { AppLink } from '../../components/ui/AppLink.tsx';
import { tarifaZeroPage } from '../../data/content.ts';
import {
  InternalPageLayout,
  PageHero,
  PageProse,
  PageSection,
} from '../../components/pages/InternalPageParts.tsx';

export default function TarifaZeroPage() {
  return (
    <InternalPageLayout>
      <PageHero
        eyebrow="Mandato"
        title={tarifaZeroPage.title}
        subtitle={tarifaZeroPage.subtitle ?? ''}
        variant="black"
      />

      <PageSection eyebrow="Bandeira" title="O que parecia impossível se tornou inevitável">
        <PageProse paragraphs={tarifaZeroPage.paragraphs} />
        <AppLink
          to="/mandato"
          className="mt-8 inline-flex font-nav text-sm font-bold text-navy-500 underline underline-offset-4"
        >
          ← Voltar ao Mandato Aba Reta
        </AppLink>
      </PageSection>
    </InternalPageLayout>
  );
}
