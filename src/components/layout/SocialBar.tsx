import { socialBarLinks } from '../../data/content.ts';
import { SocialIcon } from '../ui/SocialIcon.tsx';
import { PAGE_GRID_INNER, PAGE_GRID_OUTER } from './pageGrid.ts';

export function SocialBar() {
  return (
    <div className="shrink-0 bg-navy-500">
      <div className={PAGE_GRID_OUTER}>
        <div
          className={`flex flex-col items-center gap-0.5 py-1.5 sm:h-14 sm:flex-row sm:items-center sm:gap-4 sm:py-0 ${PAGE_GRID_INNER}`}
        >
        <p
          className="whitespace-nowrap text-center font-nav text-[10px] font-bold leading-tight text-cream sm:min-w-0 sm:flex-1 sm:text-left sm:text-2xl sm:leading-none"
        >
          Acompanhe o mandato nas redes sociais também
        </p>
        <div className="flex shrink-0 items-center justify-center gap-1 sm:gap-2">
          {socialBarLinks.map((link) => (
            <a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.name}
              className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-yellow-500 shadow-sm transition-opacity hover:opacity-90 sm:size-9"
            >
              <SocialIcon platform={link.platform} monochrome className="size-[55%]" />
            </a>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
