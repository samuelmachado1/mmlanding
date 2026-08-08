import { Link } from 'react-router-dom';
import type {
  ActionCard,
  MediaCard,
  MissionCard,
  PageTimelineItem,
  PrincipleCard,
  ProposalCard,
  StatCard,
} from '../../types/index.ts';

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

const statusStyles = {
  'Em tramitação': 'bg-yellow-100 text-brand-black',
  Aprovado: 'bg-green-100 text-green-800',
  Apresentado: 'bg-navy-100 text-navy-500',
} as const;

export function ProposalGrid({ cards }: { cards: ProposalCard[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {cards.map((card) => (
        <li key={card.title} className="rounded-2xl border border-brand-black/10 bg-white p-6">
          <div className="flex items-start justify-between gap-3">
            <span className="text-2xl" aria-hidden>
              {card.icon}
            </span>
            <span
              className={`rounded-full px-3 py-1 font-nav text-xs font-semibold ${statusStyles[card.status]}`}
            >
              {card.status}
            </span>
          </div>
          <p className="pt-3 font-nav text-xs font-bold uppercase tracking-[0.08em] text-navy-500">
            {card.category}
          </p>
          <h3 className="pt-1 font-nav text-lg font-bold text-brand-black">{card.title}</h3>
          <p className="pt-2 text-sm leading-relaxed text-brand-black/80">{card.description}</p>
        </li>
      ))}
    </ul>
  );
}

export function StatGrid({ stats }: { stats: StatCard[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <li key={stat.label} className="rounded-2xl bg-white p-6 text-center">
          <p className="font-nav text-[clamp(2rem,4vw,2.75rem)] font-black text-navy-500">{stat.value}</p>
          <p className="pt-2 font-nav text-sm font-semibold text-brand-black/80">{stat.label}</p>
        </li>
      ))}
    </ul>
  );
}

export function ActionGrid({ cards }: { cards: ActionCard[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <li key={card.title} className="flex flex-col rounded-2xl bg-white p-6">
          <span className="text-3xl" aria-hidden>
            {card.icon}
          </span>
          <h3 className="pt-3 font-nav text-lg font-bold text-brand-black">{card.title}</h3>
          <p className="flex-1 pt-2 text-sm leading-relaxed text-brand-black/80">{card.description}</p>
          <Link
            to={card.href}
            className="mt-6 inline-flex font-nav text-sm font-bold text-navy-500 underline underline-offset-4"
          >
            {card.cta} →
          </Link>
        </li>
      ))}
    </ul>
  );
}

const difficultyStyles = {
  Fácil: 'bg-green-100 text-green-800',
  Médio: 'bg-yellow-100 text-brand-black',
  Avançado: 'bg-brand-red/10 text-brand-red',
} as const;

export function MissionGrid({ cards }: { cards: MissionCard[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <li key={card.title} className="rounded-2xl border border-brand-black/10 bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="font-nav text-2xl font-black text-navy-500">{card.points}</p>
            <span
              className={`rounded-full px-3 py-1 font-nav text-xs font-semibold ${difficultyStyles[card.difficulty]}`}
            >
              {card.difficulty}
            </span>
          </div>
          <h3 className="pt-3 font-nav text-lg font-bold text-brand-black">{card.title}</h3>
          <p className="pt-2 text-sm leading-relaxed text-brand-black/80">{card.description}</p>
        </li>
      ))}
    </ul>
  );
}

export function MediaGrid({ cards }: { cards: MediaCard[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <li key={card.id}>
          <a
            href={card.href}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-black/10 bg-white transition hover:border-navy-500"
          >
            <div className="aspect-video bg-navy-100">
              {card.imageUrl ? (
                <img src={card.imageUrl} alt="" className="size-full object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center font-nav text-sm font-semibold text-navy-500">
                  {card.category}
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="font-nav text-xs font-bold uppercase tracking-[0.08em] text-navy-500">{card.category}</p>
              <h3 className="pt-2 font-nav text-base font-bold text-brand-black group-hover:text-navy-500">
                {card.title}
              </h3>
              <p className="mt-auto pt-4 text-xs text-brand-black/60">
                {card.source} · {card.date}
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

interface PageTab {
  id: string;
  label: string;
}

export function PageTabBar({
  tabs,
  activeId,
  onChange,
}: {
  tabs: PageTab[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`rounded-full px-5 py-2 font-nav text-sm font-bold transition ${
              isActive ? 'bg-navy-500 text-white' : 'bg-white text-brand-black hover:bg-navy-100'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
