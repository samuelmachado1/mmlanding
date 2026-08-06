import { ChevronRight, Heart } from 'lucide-react';
import frameHero from '../../assets/backgrounds/frame-hero-low.png';

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative aspect-[2308/1478] w-full overflow-hidden bg-yellow-500 lg:aspect-auto lg:h-[calc(100dvh-120px)] lg:min-h-[calc(100dvh-120px)]"
>
      <img
        src={frameHero}
        alt=""
        aria-hidden
        className="absolute top-1/2 left-1/2 h-full w-full min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
/>
      <div className="absolute inset-x-0 bottom-[4%] z-1 flex flex-wrap items-center justify-center gap-[clamp(0.375rem,0.25rem+0.5vw,0.75rem)] px-4">
        <a
          href="#doe"
          className="inline-flex h-[clamp(1.5rem,1.25rem+1.5vw,3rem)] w-[clamp(2.84rem,1.875rem+5vw,5.6875rem)] shrink-0 items-center justify-center gap-1 rounded-[clamp(0.25rem,0.125rem+0.5vw,0.5rem)] bg-navy-500 text-[clamp(0.6875rem,0.5rem+0.5vw,0.875rem)] font-semibold text-white"
        >
          <Heart
            className="h-[clamp(0.75rem,0.5rem+0.5vw,1rem)] w-[clamp(0.75rem,0.5rem+0.5vw,1rem)] shrink-0 text-white"
            aria-hidden
          />
          Doe
        </a>
        <a
          href="#quem-e-max"
          className="inline-flex h-[clamp(1.5rem,1.25rem+1.5vw,3rem)] w-[clamp(4.81rem,3.125rem+8vw,9.625rem)] shrink-0 items-center justify-center gap-1 rounded-[clamp(0.25rem,0.125rem+0.5vw,0.5rem)] bg-brand-black text-[clamp(0.6875rem,0.5rem+0.5vw,0.875rem)] font-semibold text-yellow-500"
        >
          Quem é Max
          <ChevronRight
            className="h-[clamp(0.75rem,0.5rem+0.5vw,1rem)] w-[clamp(0.75rem,0.5rem+0.5vw,1rem)] shrink-0 text-yellow-500"
            aria-hidden
          />
        </a>
      </div>
    </section>
  );
}
