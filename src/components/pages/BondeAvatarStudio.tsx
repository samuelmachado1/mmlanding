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
  embedUrl,
  embedTitle,
  embedUnavailableMessage,
}: BondeAvatarStudioProps) {
  const resolvedEmbedUrl = import.meta.env.VITE_BONDE_AVATAR_EMBED_URL || embedUrl;

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

        <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <div className="flex min-w-0 justify-center gap-4 lg:flex-col lg:gap-6">
            {previewAvatars.map((avatar) => (
              <AvatarPreview key={avatar.label} src={avatar.src} label={avatar.label} />
            ))}
          </div>

          <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_24px_64px_rgba(0,0,0,0.28)]">
            {resolvedEmbedUrl ? (
              <div className="relative aspect-[980/580] w-full max-h-[min(80dvh,45rem)] bg-[#333333]">
                <iframe
                  src={resolvedEmbedUrl}
                  title={embedTitle}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="clipboard-write; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            ) : (
              <div className="flex aspect-[980/580] max-h-[min(80dvh,45rem)] w-full items-center justify-center bg-cream px-6 text-center">
                <p className="max-w-md font-nav text-base leading-relaxed text-brand-black/80">
                  {embedUnavailableMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
