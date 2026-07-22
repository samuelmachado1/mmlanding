import { heroContent, heroQuickLinks, heroFixedActions, siteConfig } from '../../data/content.ts';
import { AnimatedSection } from '../ui/AnimatedSection.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';

export function Hero() {
  return (
    <AnimatedSection id="inicio" className="bg-yellow-500 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-center font-display text-6xl font-bold text-navy-500 sm:text-8xl">
          {siteConfig.electoralNumber}
        </p>

        <SectionHeading
          eyebrow={siteConfig.phase}
          title={heroContent.headline}
          description={heroContent.subheadline}
        />

        <nav aria-label="Links rápidos" className="mb-10 flex flex-wrap justify-center gap-2">
          {heroQuickLinks.map((link) => (
            <a key={link.href} href={link.href} className="link-chip">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-wrap justify-center gap-3">
          {heroFixedActions.map((action) => (
            <a
              key={action.href + action.label}
              href={action.href}
              className="btn-brand touch-target"
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
