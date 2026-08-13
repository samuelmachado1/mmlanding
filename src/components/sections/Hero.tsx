import { AppLink } from '../ui/AppLink.tsx';
import { ChevronRight } from 'lucide-react';
import heroBgTexture from '../../assets/backgrounds/hero-bg-texture.png';
import heroBordao from '../../assets/backgrounds/maximiz.png';

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex h-[calc(100dvh-4rem-2.75rem)] w-full items-center justify-center overflow-hidden sm:h-[calc(100dvh-5rem-3.5rem)] lg:h-[calc(100dvh-101px-3.5rem)]"
    >
      <img
        src={heroBgTexture}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-[4%] py-[6%]">
        <img
          src={heroBordao}
          alt="Maximizar as maravilhas de quem é do corre"
          className="h-auto max-h-full w-auto max-w-full origin-center object-contain lg:scale-150"
        />
      </div>

      <div className="absolute inset-x-0 bottom-[4%] z-20 flex flex-wrap items-center justify-center gap-2 px-[2%] sm:bottom-[calc(4%+12px)]">
        <AppLink
          to="/quem-e-max"
          className="inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-lg bg-brand-black px-4 font-nav text-sm font-bold leading-none text-yellow-500 sm:h-11 sm:gap-1.5 sm:px-5 sm:text-base lg:h-12 lg:px-6 lg:text-lg"
        >
          Quem é Max
          <ChevronRight
            className="size-4 shrink-0 text-yellow-500 sm:size-5 lg:size-6"
            aria-hidden
          />
        </AppLink>
      </div>
    </section>
  );
}
