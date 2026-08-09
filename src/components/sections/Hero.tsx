import { Link } from 'react-router-dom';
import { ChevronRight, Heart } from 'lucide-react';
import frameHero from '../../assets/backgrounds/frame-hero-low.png';

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex w-full items-center justify-center overflow-hidden bg-yellow-500"
    >
      <img
        src={frameHero}
        alt=""
        aria-hidden
        className="mx-auto block h-auto w-auto max-h-[calc(100dvh-4rem)] max-w-full sm:max-h-[calc(100dvh-5rem)] lg:max-h-[calc(100dvh-120px)]"
      />
      <div className="absolute inset-x-0 bottom-[4%] z-1 flex flex-wrap items-center justify-center gap-3 px-4">
        <Link
          to="/doe"
          className="inline-flex h-12 items-center justify-center gap-1 rounded-lg bg-navy-500 px-4 font-nav text-base font-bold text-white"
        >
          <Heart className="size-6 shrink-0 text-white" aria-hidden />
          Doe
        </Link>
        <Link
          to="/quem-e-max"
          className="inline-flex h-12 items-center justify-center gap-1 rounded-lg bg-brand-black px-4 font-nav text-base font-bold text-yellow-500"
        >
          Quem é Max
          <ChevronRight className="size-6 shrink-0 text-yellow-500" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
