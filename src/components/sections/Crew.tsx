import { crewCards, crewContent } from '../../data/content.ts';
import type { CrewCard } from '../../types/index.ts';
import { AnimatedSection } from '../ui/AnimatedSection.tsx';
import { NavLink } from '../ui/NavLink.tsx';

const slash = String.fromCharCode(47);

function CrewCardItem({ card }: { card: CrewCard }) {
  return (
    <article
      id={card.id}
      className={`flex w-full max-w-full lg:max-w-[437px] flex-col rounded-2xl border border-cream${slash}20 bg-white${slash}10 p-6`}
    >
      <h3 className="font-nav text-lg font-semibold leading-5 tracking-[0.05em] text-yellow-500 uppercase">
        {card.title}
      </h3>
      <p className={`pt-2 font-nav text-lg leading-7 text-white${slash}80`}>{card.description}</p>
      <NavLink
        href={card.href}
        className="mt-2 inline-flex h-12 items-center justify-center rounded-lg bg-yellow-500 px-4 font-nav text-base font-bold text-navy-500"
      >
        {card.cta}
      </NavLink>
    </article>
  );
}

export function Crew() {
  return (
    <AnimatedSection id="bonde-pro-max" className="bg-navy-500">
      <div className="mx-auto flex w-full max-w-[1440px] min-h-[clamp(32rem,61vw,54.9375rem)] flex-col px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto flex min-h-0 lg:min-h-[580px] w-full max-w-[1318px] flex-1 flex-col">
          <p className="font-nav text-lg font-semibold leading-5 tracking-[0.05em] text-cream uppercase">
            {crewContent.eyebrow}
          </p>
          <h2 className="pt-4 font-nav text-[clamp(2rem,8vw,3.75rem)] font-black leading-[1.05] text-yellow-500">
            {crewContent.title}
          </h2>
          <ul className="grid flex-1 grid-cols-1 gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {crewCards.map((card) => (
              <li key={card.id}>
                <CrewCardItem card={card} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AnimatedSection>
  );
}
