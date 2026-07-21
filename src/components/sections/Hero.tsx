import { heroContent, heroQuickLinks, heroFixedActions, siteConfig } from '../../data/content.ts';
import { AnimatedSection } from '../ui/AnimatedSection.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';

export function Hero() {
  return (
    <AnimatedSection id="inicio" className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={siteConfig.phase}
          title={heroContent.headline}
          description={heroContent.subheadline}
        />

        <nav aria-label="Links rápidos" className="mb-10 flex flex-wrap justify-center gap-2">
          {heroQuickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-navy-200 px-4 py-2 text-sm font-medium text-navy-600 hover:border-accent-500 hover:text-accent-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-wrap justify-center gap-3">
          {heroFixedActions.map((action) => (
            <a
              key={action.href + action.label}
              href={action.href}
              className="touch-target inline-flex items-center justify-center rounded-full bg-accent-500 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-600"
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
