import { socialBarLinks } from '../../data/content.ts';
import { SocialIcon } from '../ui/SocialIcon.tsx';

export function SocialBar() {
  return (
    <div className="shrink-0 bg-navy-500">
      <div className="mx-auto flex max-h-[96px] w-full max-w-[1366px] flex-col items-center justify-center gap-[clamp(0.375rem,0.25rem+0.25vw,0.5rem)] px-[clamp(0.75rem,0.25rem+1.5vw,1.5rem)] py-[clamp(0.375rem,0.25rem+0.25vw,0.75rem)] sm:max-h-none sm:h-[56px] sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:py-3">
        <p className="w-full text-center font-nav text-[clamp(0.6875rem,0.5rem+2vw,1.5rem)] font-bold leading-[1.1] text-cream sm:min-w-0 sm:flex-1 sm:text-left">
          Acompanhe o mandato nas redes sociais também
        </p>
        <div className="flex shrink-0 items-center justify-center gap-[clamp(0.25rem,0.125rem+0.5vw,0.5rem)] sm:gap-2">
          {socialBarLinks.map((link) => (
            <a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.name}
              className="inline-flex h-[clamp(1.5rem,0.875rem+2vw,2.25rem)] w-[clamp(1.5rem,0.875rem+2vw,2.25rem)] shrink-0 items-center justify-center rounded-full bg-yellow-500 shadow-sm transition-opacity hover:opacity-90"
            >
              <SocialIcon
                platform={link.platform}
                monochrome
                className="h-[clamp(0.75rem,0.4375rem+1.125vw,1.125rem)] w-[clamp(0.75rem,0.4375rem+1.125vw,1.125rem)]"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
