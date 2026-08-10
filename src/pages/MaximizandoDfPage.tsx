import { maximizandoDfPage } from '../data/content.ts';
import {
  InternalPageLayout,
  PageCta,
  PageHero,
  PageProse,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';
import { InvestmentTable } from '../components/pages/PageBlocks.tsx';

export default function MaximizandoDfPage() {
  return (
    <InternalPageLayout>
      <PageHero
        eyebrow="Emendas"
        title="Maximizando o DF"
        subtitle="R$ 116.132.000,00 em emendas parlamentares devolvidos para quem faz a cidade funcionar."
        variant="navy"
      />

      <PageSection eyebrow="Compromisso" title="Entregar é maximizar">
        <PageProse paragraphs={maximizandoDfPage.paragraphs} />
      </PageSection>

      <PageSection eyebrow="Investimentos" title="Distribuição por área" className="bg-white">
        <InvestmentTable rows={maximizandoDfPage.rows} total={maximizandoDfPage.total} />
      </PageSection>

      <PageCta
        title="Faça parte da continuidade"
        primary={{ label: 'Apoie a campanha', href: '/apoie' }}
        secondary={{ label: 'Entrar no Bonde', href: '/bonde-pro-max' }}
        variant="yellow"
      />
    </InternalPageLayout>
  );
}
