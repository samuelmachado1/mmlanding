import type { ReactNode } from 'react';
import { AnimatedSection } from '../ui/AnimatedSection.tsx';
import { NavLink } from '../ui/NavLink.tsx';
import { PAGE_GRID_INNER, PAGE_GRID_OUTER } from './pageGrid.ts';

interface SplitSectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export function SplitSection({ id, className, children }: SplitSectionProps) {
  return (
    <AnimatedSection id={id} className={className}>
      <div className={PAGE_GRID_OUTER}>
        <div className={`flex min-w-0 min-h-[clamp(32rem,61vw,54.9375rem)] flex-col overflow-hidden lg:flex-row lg:items-stretch ${PAGE_GRID_INNER}`}>
          {children}
        </div>
      </div>
    </AnimatedSection>
  );
}

interface SplitSectionContentProps {
  eyebrow: string;
  title: ReactNode;
  cta?: {
    href: string;
    label: string;
  };
  ctaIcon?: ReactNode;
  children: ReactNode;
}

export function SplitSectionContent({
  eyebrow,
  title,
  cta,
  ctaIcon,
  children,
}: SplitSectionContentProps) {
  return (
    <section className="flex flex-[1_1_50%] flex-col items-start py-20">
      <p className="font-nav text-lg font-semibold leading-5 tracking-[0.05em] text-navy-500 uppercase">
        {eyebrow}
      </p>
      <h2 className="pt-4 font-nav text-[clamp(2rem,5vw,3.75rem)] font-black leading-none text-brand-black">
        {title}
      </h2>
      <div className="max-w-[635px] space-y-7 pt-8 font-nav text-lg leading-7 text-brand-black">
        {children}
      </div>
      {cta ? (
        <NavLink
          href={cta.href}
          className="mt-8 inline-flex h-12 items-center gap-1 rounded-lg bg-navy-500 px-4 font-nav text-base font-bold text-white transition-colors hover:bg-navy-600"
        >
          {cta.label}
          {ctaIcon}
        </NavLink>
      ) : null}
    </section>
  );
}

interface SplitSectionMediaProps {
  children?: ReactNode;
  'aria-label'?: string;
  empty?: boolean;
}

export function SplitSectionMedia({ children, 'aria-label': ariaLabel, empty }: SplitSectionMediaProps) {
  return (
    <section
      className={empty ? "relative hidden flex-[1_1_50%] min-h-[clamp(18rem,50vw,54.9375rem)] overflow-hidden p-0 lg:block lg:min-h-0 lg:bg-transparent" : "relative flex-[1_1_50%] min-h-[clamp(18rem,50vw,54.9375rem)] overflow-hidden p-0 lg:min-h-0"}
      aria-label={ariaLabel}
      aria-hidden={empty ? true : undefined}
    >
      {children}
    </section>
  );
}
