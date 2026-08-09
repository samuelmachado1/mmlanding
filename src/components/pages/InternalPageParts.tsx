import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../layout/Header.tsx';
import { SocialBar } from '../layout/SocialBar.tsx';
import { Footer } from '../layout/Footer.tsx';

interface InternalPageLayoutProps {
  children: ReactNode;
}

export function InternalPageLayout({ children }: InternalPageLayoutProps) {
  return (
    <>
      <div className="sticky top-0 z-40 w-full">
        <Header />
        <SocialBar />
      </div>
      <main className="w-full overflow-x-hidden">{children}</main>
      <Footer />
    </>
  );
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  variant?: 'navy' | 'black' | 'red';
}

const heroVariants = {
  navy: 'bg-navy-500',
  black: 'bg-brand-black',
  red: 'bg-brand-red',
} as const;

export function PageHero({ eyebrow, title, subtitle, variant = 'navy' }: PageHeroProps) {
  return (
    <section className={`${heroVariants[variant]} px-6 py-20 sm:px-8`}>
      <div className="mx-auto max-w-6xl">
        <p className="font-nav text-[15px] font-semibold uppercase tracking-[0.1em] text-cream/80">{eyebrow}</p>
        <h1 className="pt-3 font-nav text-[clamp(2.5rem,6vw,3.75rem)] font-black leading-[1.25] text-yellow-500">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl font-nav text-lg leading-[1.625] text-cream/80">{subtitle}</p>
      </div>
    </section>
  );
}

interface PageSectionProps {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function PageSection({ eyebrow, title, children, className = 'bg-cream' }: PageSectionProps) {
  return (
    <section className={`${className} px-6 py-20 sm:px-8`}>
      <div className="mx-auto max-w-6xl">
        {eyebrow ? (
          <p className="font-nav text-[17px] font-semibold uppercase tracking-[0.05em] text-navy-500">{eyebrow}</p>
        ) : null}
        <h2 className="pt-3 font-nav text-[clamp(1.75rem,4vw,2.25rem)] font-black leading-tight text-brand-black">
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function PageProse({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-3xl space-y-4">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="font-nav text-lg leading-relaxed text-brand-black/90">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

interface PageCtaProps {
  title: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  variant?: 'navy' | 'yellow';
}

export function PageCta({ title, primary, secondary, variant = 'navy' }: PageCtaProps) {
  const isNavy = variant === 'navy';

  return (
    <section
      className={`px-6 py-16 sm:px-8 ${isNavy ? 'bg-navy-500' : 'bg-yellow-500'}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <h2
          className={`font-nav text-[clamp(1.5rem,3vw,1.875rem)] font-black leading-tight ${isNavy ? 'text-white' : 'text-brand-black'}`}
        >
          {title}
        </h2>
        <div className="flex flex-wrap gap-3">
          <NavCtaButton href={primary.href} variant={isNavy ? 'yellow' : 'navy'}>
            {primary.label}
          </NavCtaButton>
          {secondary ? (
            <NavCtaButton href={secondary.href} variant={isNavy ? 'outline-yellow' : 'outline-navy'}>
              {secondary.label}
            </NavCtaButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function NavCtaButton({
  href,
  variant,
  children,
}: {
  href: string;
  variant: 'yellow' | 'navy' | 'outline-yellow' | 'outline-navy';
  children: ReactNode;
}) {
  const classes = {
    yellow: 'bg-yellow-500 text-navy-500',
    navy: 'bg-navy-500 text-white',
    'outline-yellow': 'border border-yellow-500 text-yellow-500',
    'outline-navy': 'border border-navy-500 text-navy-500',
  }[variant];

  const className = `inline-flex items-center justify-center rounded-[10px] px-6 py-3 font-nav text-base font-bold ${classes}`;

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
