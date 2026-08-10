import type { ReactNode } from 'react';
import { AnimatedSection } from '../ui/AnimatedSection.tsx';
import { NavLink } from '../ui/NavLink.tsx';

interface SplitSectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export function SplitSection({ id, className, children }: SplitSectionProps) {
  return (
    <AnimatedSection id={id} className={className}>
      <div className="mx-auto flex w-full min-w-0 max-w-[1440px] min-h-[clamp(32rem,61vw,54.9375rem)] flex-col overflow-hidden lg:flex-row lg:items-stretch">{children}</div>
    </AnimatedSection>
  );
}

interface SplitSectionContentProps {
  eyebrow: string;
  title: string;
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
    <section className="flex flex-[1_1_50%] flex-col items-start gap-[clamp(1.5rem,3vw,3rem)] px-[clamp(1.5rem,3.3vw,3rem)] py-[clamp(2.5rem,5.5vw,5rem)]">
      <p className="text-[clamp(0.75rem,1.2vw,0.875rem)] font-medium tracking-[0.12em] text-brand-black/55 uppercase">{eyebrow}</p>
      <h2 className="font-body text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[1.05] font-extrabold text-brand-black">{title}</h2>
      <div className="max-w-[38rem] space-y-5 text-[clamp(0.9375rem,1.4vw,1.125rem)] leading-[1.65] text-brand-black">{children}</div>
      {cta ? (
        <NavLink href={cta.href} className="mt-auto inline-flex min-h-11 min-w-11 items-center gap-1 rounded-md bg-navy-500 px-[clamp(1.25rem,2vw,1.5rem)] py-[clamp(0.75rem,1.5vw,0.875rem)] font-nav text-[clamp(0.875rem,1.2vw,1rem)] font-semibold text-white transition-colors hover:bg-navy-600">
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
