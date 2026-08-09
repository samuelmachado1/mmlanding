import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import type {
  ActionCard,
  InvestmentRow,
  MediaCard,
  MissionCard,
  PageTimelineItem,
  PamphletItem,
  PrincipleCard,
  ProposalCard,
  StatCard,
} from '../../types/index.ts';

export function PageTimeline({ items }: { items: PageTimelineItem[] }) {
  return (
    <div className="relative mx-auto max-w-xl pt-2">
      <div className="absolute top-3 bottom-3 left-[11px] w-px bg-navy-200" aria-hidden />
      <ul className="space-y-2.5">
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
          <span className="text-[30px] leading-9" aria-hidden>
            {card.icon}
          </span>
          <h3 className="pt-3 font-nav text-lg font-bold text-brand-black">{card.title}</h3>
          <p className="pt-2 text-sm leading-[1.625] text-brand-black/80">{card.description}</p>
        </li>
      ))}
    </ul>
  );
}

const statusStyles = {
  'Em tramitação': 'bg-[#fef9c2] text-[#894b00]',
  Aprovado: 'bg-[#dcfce7] text-[#016630]',
  Apresentado: 'bg-[#dbeafe] text-[#193cb8]',
} as const;

export function ProposalGrid({ cards }: { cards: ProposalCard[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {cards.map((card) => (
        <li key={card.title} className="rounded-2xl border border-brand-black/[0.06] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl leading-8" aria-hidden>
                {card.icon}
              </span>
              <p className="font-nav text-sm font-semibold uppercase tracking-[0.05em] text-navy-500">
                {card.category}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-1 font-nav text-xs font-semibold ${statusStyles[card.status]}`}
            >
              {card.status}
            </span>
          </div>
          <h3 className="pt-3 font-nav text-lg font-bold text-brand-black">{card.title}</h3>
          <p className="pt-2 text-sm leading-[1.625] text-brand-black">{card.description}</p>
        </li>
      ))}
    </ul>
  );
}

export function MandatoTabBar({
  tabs,
  activeId,
  onChange,
  variant = 'navy',
}: {
  tabs: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'navy' | 'red';
}) {
  const activeClasses =
    variant === 'red' ? 'border-brand-red text-brand-red' : 'border-navy-500 text-navy-500';

  return (
    <div className="border-b border-brand-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`shrink-0 border-b-2 px-5 py-4 font-nav text-sm font-semibold transition ${
                isActive ? activeClasses : 'border-transparent text-brand-black hover:text-navy-500'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BondeStatGrid({ stats }: { stats: StatCard[] }) {
  return (
    <ul className="grid gap-8 sm:grid-cols-3">
      {stats.map((stat) => (
        <li key={stat.label} className="rounded-2xl bg-navy-500 p-8 text-center">
          <p className="font-nav text-[clamp(2rem,4vw,3rem)] font-black leading-none text-yellow-500">
            {stat.value}
          </p>
          <p className="pt-2 font-nav text-base text-white">{stat.label}</p>
        </li>
      ))}
    </ul>
  );
}

function ActionLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const className =
    'inline-flex items-center justify-center rounded-[10px] bg-navy-500 px-5 py-2.5 font-nav text-base font-bold text-white transition hover:bg-navy-600';

  if (href.startsWith('#')) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

export function BondeActionGrid({ cards }: { cards: ActionCard[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {cards.map((card) => (
        <li
          key={card.title}
          className="flex flex-col rounded-2xl border-2 border-navy-500/[0.12] p-8"
        >
          <span className="text-4xl leading-10" aria-hidden>
            {card.icon}
          </span>
          <h3 className="pt-4 font-nav text-xl font-bold text-brand-black">{card.title}</h3>
          <p className="flex-1 pt-2 text-base leading-relaxed text-brand-black">{card.description}</p>
          <div className="pt-6">
            <ActionLink href={card.href}>{card.cta}</ActionLink>
          </div>
        </li>
      ))}
    </ul>
  );
}

const bondeDifficultyStyles = {
  Fácil: 'bg-[#dcfce7] text-[#008236]',
  Médio: 'bg-[#fef9c2] text-[#a65f00]',
  Avançado: 'bg-[#ffe2e2] text-[#c10007]',
} as const;

export function BondeMissionList({ cards }: { cards: MissionCard[] }) {
  return (
    <ul className="space-y-4">
      {cards.map((card) => (
        <li
          key={card.title}
          className="flex flex-col gap-4 rounded-2xl bg-white p-6 sm:flex-row sm:items-center"
        >
          <div className="shrink-0 rounded-[14px] bg-navy-500 px-4 py-4 text-center">
            <p className="font-nav text-xl font-black text-yellow-500">{card.points}</p>
            <p className="font-nav text-xs text-white">pts</p>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-nav text-base font-bold text-brand-black">{card.title}</h3>
              <span
                className={`rounded-full px-2 py-0.5 font-nav text-xs ${bondeDifficultyStyles[card.difficulty]}`}
              >
                {card.difficulty}
              </span>
            </div>
            <p className="pt-1 text-sm leading-relaxed text-brand-black">{card.description}</p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-[10px] bg-navy-500 px-4 py-2 font-nav text-sm font-bold text-white transition hover:bg-navy-600"
          >
            {card.cta ?? 'Aceitar'}
          </button>
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

export function MidiaMediaGrid({ cards }: { cards: MediaCard[] }) {
  if (cards.length === 0) {
    return (
      <p className="font-nav text-base text-brand-black/70">Nenhuma publicação nesta categoria ainda.</p>
    );
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <li key={card.id}>
          <a
            href={card.href}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-black/[0.06] bg-white transition hover:border-brand-red/30"
          >
            <div className="relative aspect-[396/192] overflow-hidden bg-navy-100">
              {card.imageUrl ? (
                <img src={card.imageUrl} alt="" className="size-full object-cover" />
              ) : null}
              <span className="absolute top-3 left-3 bg-yellow-500 px-2 py-0.5 font-nav text-[9px] font-bold tracking-[0.1em] text-brand-black uppercase">
                {card.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-nav text-base font-bold leading-snug text-brand-black group-hover:text-brand-red">
                {card.title}
              </h3>
              <div className="mt-auto flex items-center justify-between pt-3">
                <span className="font-nav text-sm font-semibold text-brand-red">{card.source}</span>
                <span className="font-nav text-xs text-brand-black/50">{card.date}</span>
              </div>
            </div>
          </a>
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

export function PageTabBar({
  tabs,
  activeId,
  onChange,
}: {
  tabs: { id: string; label: string }[];
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

export function InvestmentTable({
  rows,
  total,
}: {
  rows: InvestmentRow[];
  total: InvestmentRow;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-brand-black/10 bg-white">
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-brand-black/10 bg-navy-500 text-cream">
            <th className="px-5 py-4 font-nav text-sm font-bold uppercase tracking-wide">Área de Investimento</th>
            <th className="px-5 py-4 font-nav text-sm font-bold uppercase tracking-wide">Valor alocado na LOA</th>
            <th className="px-5 py-4 font-nav text-sm font-bold uppercase tracking-wide">% do Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.area} className="border-b border-brand-black/5">
              <td className="px-5 py-4 font-nav text-sm font-semibold text-brand-black">{row.area}</td>
              <td className="px-5 py-4 font-nav text-sm text-brand-black/90">{row.amount}</td>
              <td className="px-5 py-4 font-nav text-sm text-brand-black/90">{row.percent}</td>
            </tr>
          ))}
          <tr className="bg-yellow-500">
            <td className="px-5 py-4 font-nav text-sm font-black text-brand-black">{total.area}</td>
            <td className="px-5 py-4 font-nav text-sm font-black text-brand-black">{total.amount}</td>
            <td className="px-5 py-4 font-nav text-sm font-black text-brand-black">{total.percent}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function PamphletGrid({ items }: { items: PamphletItem[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.title}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col rounded-2xl border border-brand-black/10 bg-white p-6 transition hover:border-navy-500"
          >
            <span className="text-3xl" aria-hidden>
              📄
            </span>
            <h3 className="pt-3 font-nav text-lg font-bold text-brand-black group-hover:text-navy-500">
              {item.title}
            </h3>
            <p className="pt-2 text-sm text-brand-black/60">Prévia em breve</p>
            <span className="mt-auto pt-4 font-nav text-sm font-bold text-navy-500">Baixar →</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ChannelGrid({
  channels,
}: {
  channels: { name: string; href: string }[];
}) {
  const icons: Record<string, string> = {
    Instagram: '📸',
    WhatsApp: '💬',
    Telegram: '✈️',
  };

  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {channels.map((channel) => (
        <li key={channel.name}>
          <a
            href={channel.href}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center rounded-2xl bg-white p-6 text-center transition hover:bg-navy-100"
          >
            <span className="text-3xl" aria-hidden>
              {icons[channel.name] ?? '🔗'}
            </span>
            <span className="pt-3 font-nav text-base font-bold text-brand-black">{channel.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
