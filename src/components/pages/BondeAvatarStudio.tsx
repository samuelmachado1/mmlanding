import frameQuemEhMax from '../../assets/backgrounds/frame-quem-eh-max.png';
import bondeAvatarMari from '../../assets/pictures/bonde-avatar-mari.png';
import bondeProMaxAbaReto from '../../assets/pictures/bonde-pro-max-aba-reto.png';
import bondeProMaxAbaReta from '../../assets/pictures/bonde-pro-max-aba-reta.png';
import type { BondeAvatarStudioContent } from '../../types/index.ts';

const LOCAL_AVATAR_URL = '/avatar/index.html';

const previewAvatars = [
  { src: bondeProMaxAbaReto, label: 'Exemplo de avatar Aba Reto' },
  { src: bondeProMaxAbaReta, label: 'Exemplo de avatar Aba Reta' },
  { src: bondeAvatarMari, label: 'Exemplo de avatar Mari' },
] as const;

function AvatarPreview({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative aspect-square w-full max-w-[11rem] overflow-hidden rounded-2xl bg-cream sm:max-w-[12.5rem]">
      <img
        src={frameQuemEhMax}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-contain object-bottom"
      />
      <img
        src={src}
        alt={label}
        className="absolute inset-0 h-full w-full object-contain object-bottom"
      />
    </div>
  );
}

interface BondeAvatarStudioProps extends BondeAvatarStudioContent {}

export function BondeAvatarStudio({
  eyebrow,
  title,
  description,
  embedTitle,
}: BondeAvatarStudioProps) {
  const embedUrl = import.meta.env.VITE_BONDE_AVATAR_EMBED_URL || LOCAL_AVATAR_URL;

  return (
    <section id="criar-avatar" className="scroll-mt-24 bg-navy-500 px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-nav text-[17px] font-semibold uppercase tracking-[0.05em] text-cream/80">
          {eyebrow}
        </p>
        <h2 className="pt-3 font-nav text-[clamp(1.75rem,4vw,2.25rem)] font-black leading-tight text-yellow-500">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl font-nav text-lg leading-relaxed text-cream/80">{description}</p>

        <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:items-stretch lg:gap-10">
          <div className="flex min-w-0 justify-center gap-4 lg:h-full lg:flex-col lg:justify-between lg:gap-6">
            {previewAvatars.map((avatar) => (
              <AvatarPreview key={avatar.label} src={avatar.src} label={avatar.label} />
            ))}
          </div>

          <div className="-mx-6 flex w-[calc(100%+3rem)] min-w-0 flex-col overflow-hidden border-y border-white/10 bg-[#f2efe7] shadow-[0_24px_64px_rgba(0,0,0,0.28)] sm:-mx-8 sm:w-[calc(100%+4rem)] lg:mx-0 lg:h-full lg:w-full lg:rounded-2xl lg:border">
            <div className="relative aspect-[9/19.5] w-full lg:aspect-auto lg:min-h-[clamp(28rem,70vh,45rem)] lg:flex-1">
              <iframe
                src={embedUrl}
                title={embedTitle}
                className="absolute inset-0 h-full w-full border-0 bg-[#f2efe7]"
                allow="clipboard-write; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <p className="border-t border-white/15 bg-navy-500 px-6 py-4 text-center font-display text-[clamp(1.05rem,3.5vw,1.35rem)] italic leading-snug text-yellow-500">
              Pensado e criado por mentes e mãos humanas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
