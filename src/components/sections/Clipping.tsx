import {
  clippingContent,
  clippingInterview,
  clippingReports,
} from '../../data/content.ts';
import type { ClippingInterview, ClippingReport } from '../../types/index.ts';
import { AnimatedSection } from '../ui/AnimatedSection.tsx';

function isExternalHref(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex bg-yellow-500 px-3 py-1 font-nav text-[10px] font-bold leading-[15px] tracking-[1px] text-brand-black uppercase">
      {children}
    </span>
  );
}


function InterviewCard({ interview }: { interview: ClippingInterview }) {
  const external = isExternalHref(interview.href);

  return (
    <a
      href={interview.href}
      className="flex w-full max-w-full flex-col gap-2"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <div className="relative isolate w-full">
        {interview.imageUrl ? (
          <img
            src={interview.imageUrl}
            alt=""
            className="aspect-[424/283] w-full rounded object-cover bg-white/10"
          />
        ) : (
          <div className="aspect-[424/283] w-full rounded bg-white/10" aria-hidden />
        )}
        <span className="absolute bottom-0 left-0 bg-yellow-500 px-3 py-2 font-nav text-lg font-bold leading-[22px] text-brand-black">
          {interview.badge}
        </span>
      </div>
      <p className="font-nav text-lg leading-7 text-cream">{interview.title}</p>
    </a>
  );
}


function ReportCard({ report }: { report: ClippingReport }) {
  const external = isExternalHref(report.href);

  return (
    <a
      href={report.href}
      className="flex w-full max-w-full flex-row gap-3"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {report.imageUrl ? (
        <img
          src={report.imageUrl}
          alt=""
          className="aspect-[120/80] w-[120px] shrink-0 rounded-md bg-white/10 object-cover"
        />
      ) : (
        <div className="aspect-[120/80] w-[120px] shrink-0 rounded-md bg-white/10" aria-hidden />
      )}
      <div className="flex flex-col justify-center gap-0.5">
        <p className="font-nav text-lg leading-7 text-cream">{report.title}</p>
        <p className="font-nav text-[13px] leading-[15px] text-yellow-500">{report.source}</p>
      </div>
    </a>
  );
}

export function Clipping() {
  return (
    <AnimatedSection id="max-na-midia" className="bg-brand-red">
      <div className="mx-auto flex w-full max-w-[1440px] min-h-[clamp(32rem,61vw,54.9375rem)] flex-col px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto flex min-h-0 lg:min-h-[580px] w-full max-w-[1318px] flex-1 flex-col">
          <p className="font-nav text-lg font-semibold leading-5 tracking-[0.05em] text-cream uppercase">
            {clippingContent.eyebrow}
          </p>
          <h2 className="pt-4 font-nav text-[clamp(2rem,8vw,3.75rem)] font-black leading-[1.05] text-yellow-500">
            {clippingContent.title}
          </h2>
          <div className="flex flex-col gap-6 pt-8 lg:flex-row lg:gap-6">
            <div className="flex flex-1 flex-col gap-3">
              <SectionLabel>{clippingContent.interviewsLabel}</SectionLabel>
              <InterviewCard interview={clippingInterview} />
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <SectionLabel>{clippingContent.reportsLabel}</SectionLabel>
              <ul className="flex flex-col gap-4">
                {clippingReports.map((report) => (
                  <li key={report.id}>
                    <ReportCard report={report} />
                  </li>
                ))}
              </ul>
              <a
                href={clippingContent.ctaHref}
                className="inline-flex h-12 w-fit items-center justify-center rounded-lg bg-yellow-500 px-4 font-nav text-base font-bold text-navy-500"
              >
                {clippingContent.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
