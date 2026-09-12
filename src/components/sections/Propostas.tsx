import { AppLink } from '../ui/AppLink.tsx';
import { propostasPage } from '../../data/content.ts';
import { CampaignProposalList } from '../pages/PageBlocks.tsx';
import { AnimatedSection } from '../ui/AnimatedSection.tsx';
import { PAGE_GRID_INNER, PAGE_GRID_OUTER, LANDING_SECTION_PY } from '../layout/pageGrid.ts';

export function Propostas() {
  return (
    <AnimatedSection id="propostas" className="bg-navy-500">
      <div className={`${LANDING_SECTION_PY} ${PAGE_GRID_OUTER}`}>
        <div className={PAGE_GRID_INNER}>
          <p className="font-nav text-lg font-semibold uppercase tracking-[0.05em] text-cream">
            {propostasPage.eyebrow}
          </p>
          <h2 className="pt-3 font-nav text-[clamp(2rem,8vw,3.75rem)] font-black leading-[1.05] text-yellow-500">
            {propostasPage.title}
          </h2>
          <p className="pt-3 font-nav text-xl font-bold text-cream">{propostasPage.subtitle}</p>
          <p className="mt-4 max-w-3xl font-nav text-lg leading-7 text-cream/85">{propostasPage.intro[0]}</p>
          <p className="mt-3 max-w-3xl font-nav text-lg leading-7 text-cream/85">{propostasPage.intro[1]}</p>
          <AppLink
            to="/propostas"
            className="mt-5 inline-flex font-nav text-sm font-bold text-yellow-500 underline underline-offset-4"
          >
            Abrir página das propostas
          </AppLink>

          <p className="pt-8 font-nav text-lg font-semibold text-yellow-500">{propostasPage.listEyebrow}</p>
          <div className="pt-5">
            <CampaignProposalList items={propostasPage.items} />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
