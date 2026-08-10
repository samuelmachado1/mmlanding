import { AppLink } from '../../components/ui/AppLink.tsx';
import { projetosDeLei, projetosDeLeiIntro } from '../../data/content.ts';
import {
  InternalPageLayout,
  PageHero,
  PageProse,
  PageSection,
} from '../../components/pages/InternalPageParts.tsx';

export default function ProjetosDeLeiPage() {
  return (
    <InternalPageLayout>
      <PageHero
        eyebrow="Mandato"
        title="Projetos de Lei"
        subtitle="A cabeça pensa onde os pés pisam — legislação feita para quem vive nas periferias."
        variant="black"
      />

      <PageSection eyebrow="Contexto" title="Representatividade no DF">
        <PageProse paragraphs={projetosDeLeiIntro} />
      </PageSection>

      <PageSection eyebrow="Projetos" title="Destaques legislativos" className="bg-white">
        <ul className="space-y-6">
          {projetosDeLei.map((law) => (
            <li key={law.number + law.title} className="rounded-2xl border border-brand-black/10 bg-cream p-6">
              <p className="font-nav text-xs font-bold uppercase tracking-wide text-navy-500">{law.number}</p>
              <h3 className="pt-2 font-nav text-xl font-bold text-brand-black">{law.title}</h3>
              <p className="pt-2 text-base leading-relaxed text-brand-black/90">{law.description}</p>
            </li>
          ))}
        </ul>
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
