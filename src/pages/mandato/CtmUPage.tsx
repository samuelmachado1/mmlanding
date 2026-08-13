import { AppLink } from '../../components/ui/AppLink.tsx';
import ctmUMax from '../../assets/pictures/ctmu-max.png';
import { ctmUPage } from '../../data/content.ts';
import {
  InternalPageLayout,
  PageSection,
} from '../../components/pages/InternalPageParts.tsx';

export default function CtmUPage() {
  return (
    <InternalPageLayout>
      <section className="bg-brand-black px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="font-nav text-[15px] font-semibold uppercase tracking-[0.1em] text-cream/80">Mandato</p>
          <div className="grid items-start gap-12 pt-3 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="font-nav text-[clamp(2.5rem,6vw,3.75rem)] font-black leading-[1.25] text-yellow-500">
                {ctmUPage.title}
              </h1>
              <p className="mt-4 font-nav text-lg leading-[1.625] text-cream/80">{ctmUPage.intro}</p>
            </div>
            <div className="mx-auto w-full max-w-[min(100%,22rem)] px-[3px] lg:mx-0 lg:max-w-[24rem]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src={ctmUMax}
                  alt="Max Maciel dentro de um ônibus"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
