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
      <div className="absolute inset-x-0 bottom-[10%] z-1 flex items-center justify-center gap-3 px-4">
        <a href="#doe" className="inline-flex h-12 w-[91px] shrink-0 items-center justify-center gap-1 rounded-lg bg-navy-500 text-sm font-semibold text-white">
          <Heart className="h-4 w-4 shrink-0 text-white" aria-hidden />
          Doe
        </a>
        <a href="#quem-e-max" className="inline-flex h-12 w-[154px] shrink-0 items-center justify-center gap-1 rounded-lg bg-brand-black text-sm font-semibold text-yellow-500">
          Quem é Max
          <ChevronRight className="h-4 w-4 shrink-0 text-yellow-500" aria-hidden />
        </a>
      </div>
    </section>
  );
}
