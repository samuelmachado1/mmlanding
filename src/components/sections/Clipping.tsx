import {
  clippingContent,
} from '../../data/content.ts';
import type { ClippingInterview, ClippingReport } from '../../types/index.ts';
import { useClippings } from '../../hooks/useClippings.ts';
import { AnimatedSection } from '../ui/AnimatedSection.tsx';
import { NavLink } from '../ui/NavLink.tsx';
import { AppLink } from '../ui/AppLink.tsx';
import { mediaArticlePath } from '../../lib/media-paths.ts';
import { ClippingSkeleton } from './ClippingSkeleton.tsx';
import { PAGE_GRID_INNER, PAGE_GRID_OUTER, LANDING_SECTION_PY } from '../layout/pageGrid.ts';

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="flex w-full bg-yellow-500 px-3 py-1 font-nav text-[10px] font-bold leading-[15px] tracking-[1px] text-brand-black uppercase">
      {children}
    </span>
  );
}

function InterviewCard({ interview }: { interview: ClippingInterview }) {
  return (
    <AppLink
      to={mediaArticlePath(interview.id)}
      className="flex w-full max-w-full flex-col gap-2"
    >
      <div className="relative isolate w-full">
        {interview.imageUrl ? (
          <img
            src={interview.imageUrl}
            alt=""
            referrerPolicy="no-referrer"
            className="aspect-[424/283] w-full rounded object-cover bg-white/10"
          />
        ) : (
          <div className="aspect-[424/283] w-full rounded bg-white/10" aria-hidden />
        )}
        <span className="absolute bottom-0 left-0 bg-yellow-500 px-3 py-2 font-nav text-lg font-bold leading-[22px] text-brand-black uppercase">
          {interview.badge}
        </span>
      </div>
      <p className="font-nav text-lg leading-7 text-cream">{interview.title}</p>
    </AppLink>
  );
}

function ReportCard({ report }: { report: ClippingReport }) {
  return (
    <AppLink
      to={mediaArticlePath(report.id)}
      className="flex w-full max-w-full flex-row gap-3"
    >
      {report.imageUrl ? (
        <img
          src={report.imageUrl}
          alt=""
          referrerPolicy="no-referrer"
          className="aspect-[120/80] w-[120px] shrink-0 rounded-md bg-white/10 object-cover"
        />
      ) : (
        <div className="aspect-[120/80] w-[120px] shrink-0 rounded-md bg-white/10" aria-hidden />
      )}
      <div className="flex flex-col justify-center gap-0.5">
        <p className="font-nav text-lg leading-7 text-cream">{report.title}</p>
        <p className="font-nav text-[13px] leading-[15px] text-yellow-500">{report.source}</p>
      </div>
    </AppLink>
  );
}

export function Clipping() {
  const { loading, interview, reports } = useClippings();

  return (
    <AnimatedSection id="max-na-midia" className="bg-brand-red">
      <div className={`${LANDING_SECTION_PY} ${PAGE_GRID_OUTER}`}>
        <div className={`flex flex-col ${PAGE_GRID_INNER}`}>
          <p className="font-nav text-lg font-semibold leading-5 tracking-[0.05em] text-cream uppercase">
            {clippingContent.eyebrow}
          </p>
          <h2 className="pt-3 font-nav text-[clamp(2rem,5vw,3.75rem)] font-black leading-none text-yellow-500">
            {clippingContent.title}
          </h2>
          {loading ? (
            <ClippingSkeleton />
          ) : (
            <div className="flex flex-col gap-6 pt-6 lg:flex-row lg:gap-6">
              <div className="flex flex-1 flex-col gap-3">
                <SectionLabel>{clippingContent.interviewsLabel}</SectionLabel>
                {interview ? (
                  <InterviewCard interview={interview} />
                ) : (
                  <p className="font-nav text-sm leading-relaxed text-cream/70">
                    Nenhuma matéria em destaque no momento.
                  </p>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <SectionLabel>{clippingContent.reportsLabel}</SectionLabel>
                <ul className="flex flex-col gap-4">
                  {reports.map((report) => (
                    <li key={report.id}>
                      <ReportCard report={report} />
                    </li>
                  ))}
                </ul>
                <NavLink
                  href={clippingContent.ctaHref}
                  className="inline-flex h-12 w-fit items-center justify-center rounded-lg bg-yellow-500 px-4 font-nav text-base font-bold text-navy-500"
                >
                  {clippingContent.cta}
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
