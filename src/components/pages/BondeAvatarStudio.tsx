import { useState } from 'react';
import frameQuemEhMax from '../../assets/backgrounds/frame-quem-eh-max.png';
import bondeAvatarMari from '../../assets/pictures/bonde-avatar-mari.png';
import bondeProMaxAbaReto from '../../assets/pictures/bonde-pro-max-aba-reto.png';
import bondeProMaxAbaReta from '../../assets/pictures/bonde-pro-max-aba-reta.png';
import type { BondeAvatarStudioContent } from '../../types/index.ts';

const ITCH_AVATAR_EMBED_URL = 'https://itch.io/embed-upload/19160506?color=333333';
const ITCH_AVATAR_PAGE_URL = 'https://kombits.itch.io/maxavatar2026';

const previewAvatars = [
  { src: bondeProMaxAbaReto, label: 'Exemplo de avatar Aba Reto' },
  { src: bondeProMaxAbaReta, label: 'Exemplo de avatar Aba Reta' },
  { src: bondeAvatarMari, label: 'Exemplo de avatar Mari' },
] as const;

const panelClassName =
  'relative w-full min-h-[28rem] aspect-[980/580] max-h-[min(80dvh,45rem)] lg:min-h-0';

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
  const embedUrl = import.meta.env.VITE_BONDE_AVATAR_EMBED_URL || ITCH_AVATAR_EMBED_URL;
  const [isEmbedActive, setIsEmbedActive] = useState(false);

  return (
    <section id="criar-avatar" className="scroll-mt-24 overflow-x-hidden bg-navy-500 py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <p className="font-nav text-[17px] font-semibold uppercase tracking-[0.05em] text-cream/80">
          {eyebrow}
        </p>
        <h2 className="pt-3 font-nav text-[clamp(1.75rem,4vw,2.25rem)] font-black leading-tight text-yellow-500">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl font-nav text-lg leading-relaxed text-cream/80">{description}</p>
      </div>

      <div className="mt-10 lg:mx-auto lg:max-w-6xl lg:px-8">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:items-stretch lg:gap-10">
          <div className="flex min-w-0 justify-center gap-4 px-6 sm:px-8 lg:h-full lg:flex-col lg:justify-between lg:gap-6 lg:px-0">
            {previewAvatars.map((avatar) => (
              <AvatarPreview key={avatar.label} src={avatar.src} label={avatar.label} />
            ))}
          </div>

          <div className="flex w-full min-w-0 flex-col overflow-hidden border-y border-white/10 bg-[#333333] shadow-[0_24px_64px_rgba(0,0,0,0.28)] lg:rounded-2xl lg:border">
            {isEmbedActive ? (
              <div className={panelClassName}>
                <iframe
                  src={embedUrl}
                  title={embedTitle}
                  className="absolute inset-0 h-full w-full border-0 bg-[#333333]"
                  allow="clipboard-write; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            ) : (
              <div className={`${panelClassName} flex flex-col items-center justify-center gap-4 px-6 text-center`}>
                <button
                  type="button"
                  onClick={() => setIsEmbedActive(true)}
                  className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-yellow-500 px-8 py-3 font-nav text-base font-bold text-navy-500"
                >
                  Iniciar criador
                </button>
                <p className="max-w-sm font-nav text-sm leading-relaxed text-cream/80">
                  Toque para carregar o gerador de avatares.
                </p>
                <a
                  href={ITCH_AVATAR_PAGE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-nav text-sm font-semibold text-yellow-500 underline underline-offset-4"
                >
                  Abrir no itch.io
                </a>
              </div>
            )}
            <p className="border-t border-white/15 bg-navy-500 px-6 py-4 text-center font-display text-[clamp(1.05rem,3.5vw,1.35rem)] italic leading-snug text-yellow-500">
              Pensado e criado por mentes e mãos humanas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
