import { AppLink } from '../ui/AppLink.tsx';
import { ChevronRight, Heart } from 'lucide-react';
import frameHero from '../../assets/backgrounds/frame-hero-low.png';

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex w-full items-center justify-center overflow-hidden bg-yellow-500"
    >
      <div className="relative mx-auto w-full max-w-full [container-type:inline-size]">
        <img
          src={frameHero}
          alt=""
          aria-hidden
          className="block h-auto w-full max-h-[calc(100dvh-4rem-2.75rem-20px)] object-contain sm:max-h-[calc(100dvh-5rem-3.5rem-20px)] lg:max-h-[calc(100dvh-101px-3.5rem-20px)]"
        />
        <div
          className="absolute inset-x-0 bottom-[4%] z-1 flex flex-wrap items-center justify-center gap-[clamp(0.375rem,1.5cqi,0.75rem)] px-[2%] sm:bottom-[calc(4%+20px)]"
        >
          <AppLink
            to="/doe"
            className="inline-flex h-[clamp(1.375rem,3.5cqi,3rem)] shrink-0 items-center justify-center gap-[clamp(0.125rem,0.4cqi,0.25rem)] rounded-[clamp(0.25rem,0.6cqi,0.5rem)] bg-navy-500 px-[clamp(0.5rem,2cqi,1rem)] font-nav text-[clamp(0.625rem,1.2cqi,1rem)] font-bold leading-none text-white"
          >
            <Heart
              className="size-[clamp(0.75rem,1.75cqi,1.5rem)] shrink-0 text-white"
              aria-hidden
            />
            Doe
          </AppLink>
          <AppLink
            to="/quem-e-max"
            className="inline-flex h-[clamp(1.375rem,3.5cqi,3rem)] shrink-0 items-center justify-center gap-[clamp(0.125rem,0.4cqi,0.25rem)] rounded-[clamp(0.25rem,0.6cqi,0.5rem)] bg-brand-black px-[clamp(0.5rem,2cqi,1rem)] font-nav text-[clamp(0.625rem,1.2cqi,1rem)] font-bold leading-none text-yellow-500"
          >
            Quem é Max
            <ChevronRight
              className="size-[clamp(0.75rem,1.75cqi,1.5rem)] shrink-0 text-yellow-500"
              aria-hidden
            />
          </AppLink>
        </div>
      </div>
    </section>
  );
}
