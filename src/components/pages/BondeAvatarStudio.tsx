import { useState } from 'react';
import frameQuemEhMax from '../../assets/backgrounds/frame-quem-eh-max.png';
import bondeAvatarMari from '../../assets/pictures/bonde-avatar-mari.png';
import bondeProMaxAbaReto from '../../assets/pictures/bonde-pro-max-aba-reto.png';
import bondeProMaxAbaReta from '../../assets/pictures/bonde-pro-max-aba-reta.png';
import type { BondeAvatarStudioContent } from '../../types/index.ts';

const previewAvatars = [
  { src: bondeProMaxAbaReto, label: 'Exemplo de avatar Aba Reto' },
  { src: bondeProMaxAbaReta, label: 'Exemplo de avatar Aba Reta' },
  { src: bondeAvatarMari, label: 'Exemplo de avatar Mari' },
] as const;

function AvatarPreview({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-cream sm:rounded-2xl lg:max-w-[12.5rem]">
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

function AvatarStudioCredit({ children }: { children: string }) {
  return (
    <p className="shrink-0 border-t border-white/10 bg-navy-500 px-4 py-3 text-center font-nav text-sm font-semibold italic tracking-wide text-yellow-500">
      {children}
    </p>
  );
}

interface BondeAvatarStudioProps extends BondeAvatarStudioContent {}

export function BondeAvatarStudio({
  eyebrow,
  title,
  description,
  iosNotice,
  humanCredit,
  embedUrl,
  embedTitle,
  embedUnavailableMessage,
  externalPlayUrl,
  externalPlayCta,
}: BondeAvatarStudioProps) {
  const [embedFailed, setEmbedFailed] = useState(false);
  const resolvedEmbedUrl = import.meta.env.VITE_BONDE_AVATAR_EMBED_URL || embedUrl;
  const showEmbed = Boolean(resolvedEmbedUrl) && !embedFailed;

  return (
    <section id="criar-avatar" className="scroll-mt-24 overflow-x-clip bg-navy-500 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto w-full min-w-0 max-w-6xl">
        <p className="font-nav text-[17px] font-semibold uppercase tracking-[0.05em] text-cream/80">
          {eyebrow}
        </p>
        <h2 className="pt-3 font-nav text-[clamp(1.75rem,4vw,2.25rem)] font-black leading-tight text-yellow-500">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl font-nav text-lg leading-relaxed text-cream/80">{description}</p>
        <p className="mt-3 max-w-2xl font-nav text-base leading-relaxed text-yellow-500/90">{iosNotice}</p>

        <div className="mt-8 grid min-w-0 gap-8 lg:mt-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:items-stretch lg:gap-10">
          <div className="order-1 flex min-w-0 flex-col lg:order-2 lg:h-full">
            <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_24px_64px_rgba(0,0,0,0.28)] lg:h-full">
              <div className="relative aspect-[980/580] w-full min-w-0 lg:min-h-[min(45rem,70vh)] lg:flex-1 lg:aspect-auto">
                {showEmbed ? (
                  <iframe
                    src={resolvedEmbedUrl}
                    title={embedTitle}
                    className="absolute inset-0 h-full w-full max-w-full border-0"
                    allow="autoplay; clipboard-write; fullscreen; gamepad; gyroscope; accelerometer"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-downloads allow-popups allow-forms allow-modals"
                    onError={() => setEmbedFailed(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-cream px-6 text-center">
                    <p className="max-w-md font-nav text-base leading-relaxed text-brand-black/80">
                      {embedUnavailableMessage}
                    </p>
                    <a
                      href={externalPlayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-6 py-3 font-nav text-base font-bold text-brand-black transition hover:bg-yellow-400"
                    >
                      {externalPlayCta}
                    </a>
                  </div>
                )}
              </div>
              <AvatarStudioCredit>{humanCredit}</AvatarStudioCredit>
            </div>

            {resolvedEmbedUrl ? (
              <p className="relative z-10 mt-4 shrink-0 text-center font-nav text-sm leading-relaxed text-cream/70">
                Problemas para carregar?{' '}
                <a
                  href={externalPlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-yellow-500 underline-offset-2 hover:underline"
                >
                  Abrir no itch.io
                </a>
              </p>
            ) : null}
          </div>

          <div className="relative z-0 order-2 grid min-w-0 grid-cols-3 gap-2 sm:gap-3 lg:order-1 lg:flex lg:h-full lg:flex-col lg:justify-between lg:gap-6">
            {previewAvatars.map((avatar) => (
              <AvatarPreview key={avatar.label} src={avatar.src} label={avatar.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
