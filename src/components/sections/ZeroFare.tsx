import { AppLink } from '../ui/AppLink.tsx';
import { zeroFareCards, zeroFareContent } from "../../data/content.ts";
import type { ZeroFareCard } from "../../types/index.ts";
import { AnimatedSection } from "../ui/AnimatedSection.tsx";
import { PAGE_GRID_INNER, PAGE_GRID_OUTER, LANDING_SECTION_PY } from "../layout/pageGrid.ts";

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <article className="flex h-auto min-h-[118.73px] w-full max-w-full flex-col items-start rounded-2xl bg-navy-500 p-6 lg:max-w-[433.21px]">
      <p className="font-nav text-[36px] font-black leading-10 text-white">{value}</p>
      <p className="pt-2 font-nav text-sm font-normal leading-[23px] text-white/80">{label}</p>
    </article>
  );
}

function HighlightCard({ title, size = "compact" }: { title: string; size?: "tall" | "compact" }) {
  const minHeightClass = size === "tall" ? "min-h-[118.73px]" : "min-h-[72.73px]";

  return (
    <article
      className={"flex h-auto " + minHeightClass + " w-full max-w-full flex-col items-start justify-center rounded-2xl bg-black p-6 lg:max-w-[433.21px]"}
    >
      <p className="font-nav text-lg font-bold leading-[25px] text-yellow-500">{title}</p>
    </article>
  );
}

function ZeroFareCardItem({ card }: { card: ZeroFareCard }) {
  if (card.type === "stat") {
    return <StatCard value={card.value} label={card.label} />;
  }

  return <HighlightCard title={card.title} size={card.size} />;
}

export function ZeroFare() {
  return (
    <AnimatedSection id="tarifa-zero" className="bg-cream">
      <div className={`${LANDING_SECTION_PY} ${PAGE_GRID_OUTER}`}>
        <div className={PAGE_GRID_INNER}>
          <h2 className="font-nav text-[clamp(2rem,8vw,3.75rem)] font-black leading-[1.05] text-black">
            {zeroFareContent.title}
          </h2>
          <p className="max-w-[672px] pt-3 font-nav text-lg leading-7 text-brand-black">
            {zeroFareContent.description}
          </p>
          <AppLink
            to="/mandato/tarifa-zero"
            className="mt-3 inline-flex font-nav text-sm font-bold text-navy-500 underline underline-offset-4"
          >
            Saiba mais
          </AppLink>

          <div className="w-full max-w-[890.41px] pt-6">
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {zeroFareCards.map((card) => (
                <li key={card.id} className="flex">
                  <ZeroFareCardItem card={card} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
