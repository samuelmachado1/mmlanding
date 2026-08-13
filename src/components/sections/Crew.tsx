import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import bondeAvatarAnne from '../../assets/pictures/bonde-avatar-anne.png';
import bondeAvatarJoao from '../../assets/pictures/bonde-avatar-joao.png';
import bondeAvatarMari from '../../assets/pictures/bonde-avatar-mari.png';
import bondeAvatarThay from '../../assets/pictures/bonde-avatar-thay.png';
import bondeProMaxAbaReto from '../../assets/pictures/bonde-pro-max-aba-reto.png';
import bondeProMaxAbaReta from '../../assets/pictures/bonde-pro-max-aba-reta.png';
import { crewCards, crewContent } from '../../data/content.ts';
import type { CrewCard } from '../../types/index.ts';
import { AppLink } from '../ui/AppLink.tsx';
import { AnimatedSection } from '../ui/AnimatedSection.tsx';
import { NavLink } from '../ui/NavLink.tsx';
import { PAGE_GRID_INNER, PAGE_GRID_OUTER } from '../layout/pageGrid.ts';

const slash = String.fromCharCode(47);

const bondeAvatarPhotos = [
  bondeProMaxAbaReto,
  bondeProMaxAbaReta,
  bondeAvatarMari,
  bondeAvatarAnne,
  bondeAvatarJoao,
  bondeAvatarThay,
] as const;

const AVATAR_DISPLAY_MS = 600;

function BondeAvatarLink() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % bondeAvatarPhotos.length);
    }, AVATAR_DISPLAY_MS);

    return () => window.clearInterval(intervalId);
  }, [reduceMotion]);

  return (
    <AppLink
      to="/bonde-pro-max#criar-avatar"
      aria-label="Crie seu avatar"
      className="group flex w-[11rem] shrink-0 flex-col items-center gap-3 transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 sm:w-[12.5rem] lg:w-[14rem]"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
        {bondeAvatarPhotos.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-contain object-bottom transition-opacity duration-300 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <span className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-yellow-500 px-3 font-nav text-sm font-bold text-navy-500 transition-colors group-hover:bg-yellow-400">
        Crie seu avatar
      </span>
    </AppLink>
  );
}

const ctaClassName =
  'mt-4 inline-flex h-12 items-center justify-center rounded-lg bg-yellow-500 px-4 font-nav text-base font-bold text-navy-500 transition-colors hover:bg-yellow-400';

function CrewCardItem({ card }: { card: CrewCard }) {
  const isExternal = card.href.startsWith('http');

  return (
    <article
      id={card.id}
      className={`flex h-full w-full flex-col rounded-2xl border border-cream${slash}20 bg-white${slash}10 p-6`}
    >
      <h3 className="font-nav text-lg font-semibold leading-5 tracking-[0.05em] text-yellow-500 uppercase">
        {card.title}
      </h3>
      <p className={`flex-1 pt-2 font-nav text-lg leading-7 text-white${slash}80`}>{card.description}</p>
      {isExternal ? (
        <a href={card.href} target="_blank" rel="noreferrer" className={ctaClassName}>
          {card.cta}
        </a>
      ) : (
        <NavLink href={card.href} className={ctaClassName}>
          {card.cta}
        </NavLink>
      )}
    </article>
  );
}

export function Crew() {
  return (
    <AnimatedSection id="bonde-pro-max" className="bg-navy-500">
      <div className={`py-12 sm:py-16 lg:py-20 ${PAGE_GRID_OUTER}`}>
        <div className={`min-h-[clamp(32rem,61vw,54.9375rem)] ${PAGE_GRID_INNER}`}>
          <p className="font-nav text-lg font-semibold leading-5 tracking-[0.05em] text-cream uppercase">
            {crewContent.eyebrow}
          </p>
          <h2 className="pt-4 font-nav text-[clamp(2rem,8vw,3.75rem)] font-black leading-[1.05] text-yellow-500">
            {crewContent.title}
          </h2>

          <div className="grid gap-10 pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-stretch lg:gap-12">
            <div className="flex flex-col gap-6">
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch">
                {crewCards.map((card) => (
                  <li key={card.id} className="flex min-h-0">
                    <CrewCardItem card={card} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center lg:items-center lg:justify-start lg:pt-8">
              <BondeAvatarLink />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
