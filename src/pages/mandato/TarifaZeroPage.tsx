import { AppLink } from '../../components/ui/AppLink.tsx';
import frameQuemEhMax from '../../assets/backgrounds/frame-quem-eh-max.png';
import tarifaZeroMax from '../../assets/pictures/tarifa-zero-max.png';
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
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <PageProse paragraphs={tarifaZeroPage.paragraphs} />
            <AppLink
              to="/mandato"
              className="mt-8 inline-flex font-nav text-sm font-bold text-navy-500 underline underline-offset-4"
            >
              ← Voltar ao Mandato Aba Reta
            </AppLink>
          </div>
          <div className="mx-auto w-full max-w-[min(100%,22rem)] lg:mx-0 lg:max-w-[24rem]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream">
              <img
                src={frameQuemEhMax}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <img
                src={tarifaZeroMax}
                alt="Max Maciel no terminal de ônibus"
                className="absolute inset-0 h-full w-full object-cover object-[72%_center]"
              />
            </div>
          </div>
        </div>
      </PageSection>
    </InternalPageLayout>
  );
}
