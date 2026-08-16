import { socialBarLinks } from '../../data/content.ts';
import { SocialIcon } from '../ui/SocialIcon.tsx';
import { PAGE_GRID_INNER, PAGE_GRID_OUTER } from './pageGrid.ts';

export function SocialBar() {
  return (
    <div className="shrink-0 bg-navy-500">
      <div className={PAGE_GRID_OUTER}>
        <div
          className={`flex items-center justify-center gap-3 py-2.5 sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0 ${PAGE_GRID_INNER}`}
        >
          <p
            className="hidden whitespace-nowrap font-nav text-2xl font-bold leading-none text-cream sm:block sm:flex-1 sm:text-left"
          >
            Acompanhe o mandato nas redes sociais também
          </p>
          <div className="flex shrink-0 items-center justify-center gap-2.5 sm:gap-2">
            {socialBarLinks.map((link) => (
              <a
                key={link.platform}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.name}
                className="inline-flex size-11 shrink-0 touch-manipulation items-center justify-center rounded-full bg-yellow-500 shadow-sm transition-opacity hover:opacity-90 active:opacity-80 sm:size-9"
              >
                <SocialIcon
                  platform={link.platform}
                  monochrome
                  className="size-6 shrink-0 sm:size-5"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
