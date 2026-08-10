import { AppLink } from '../../components/ui/AppLink.tsx';
import { ctmUPage } from '../../data/content.ts';
import {
  InternalPageLayout,
  PageHero,
  PageSection,
} from '../../components/pages/InternalPageParts.tsx';

export default function CtmUPage() {
  return (
    <InternalPageLayout>
      <PageHero
        eyebrow="Mandato"
        title={ctmUPage.title}
        subtitle={ctmUPage.intro}
        variant="black"
      />

      <PageSection eyebrow="Entregas" title="Conquistas na comissão">
        <ul className="grid gap-4 sm:grid-cols-2">
          {ctmUPage.achievements.map((item) => (
            <li key={item.slice(0, 48)} className="rounded-2xl bg-white p-5 font-nav text-base leading-relaxed text-brand-black/90">
              {item}
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
