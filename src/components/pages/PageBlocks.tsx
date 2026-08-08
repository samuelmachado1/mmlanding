import type { PageTimelineItem, PrincipleCard } from '../../types/index.ts';

export function PageTimeline({ items }: { items: PageTimelineItem[] }) {
  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="absolute top-2 bottom-2 left-[9px] w-px bg-navy-200" aria-hidden />
      <ul className="space-y-10">
        {items.map((item) => (
          <li key={item.year + item.title} className="relative pl-12">
            <span
              className="absolute top-1 left-0 size-5 rounded-full border-[3px] border-white bg-navy-500 shadow-sm"
              aria-hidden
            />
            <p className="font-nav text-sm font-bold uppercase tracking-[0.1em] text-navy-500">{item.year}</p>
            <h3 className="pt-1 font-nav text-xl font-bold text-brand-black">{item.title}</h3>
            <p className="pt-1 text-base leading-relaxed text-brand-black/90">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PrincipleGrid({ cards }: { cards: PrincipleCard[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <li key={card.title} className="rounded-2xl bg-white p-6">
          <span className="text-3xl" aria-hidden>
            {card.icon}
          </span>
          <h3 className="pt-3 font-nav text-lg font-bold text-brand-black">{card.title}</h3>
          <p className="pt-2 text-sm leading-relaxed text-brand-black/80">{card.description}</p>
        </li>
      ))}
    </ul>
  );
}
