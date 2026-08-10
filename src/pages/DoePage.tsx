import { useMemo, useState } from 'react';
import { Heart } from 'lucide-react';
import { doePageContent } from '../data/content.ts';
import type { DoeImpactCard } from '../types/index.ts';
import { InternalPageLayout, PageHero } from '../components/pages/InternalPageParts.tsx';

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

function AmountButton({
  amount,
  isActive,
  onClick,
}: {
  amount: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-[52px] min-w-[95px] flex-1 items-center justify-center rounded-[14px] border-[1.9px] px-6 font-nav text-base font-bold transition ${
        isActive
          ? 'border-navy-500 bg-navy-500 text-white'
          : 'border-navy-500/30 text-navy-500 hover:border-navy-500/50'
      }`}
    >
      {formatCurrency(amount)}
    </button>
  );
}

function ImpactCard({ card }: { card: DoeImpactCard }) {
  return (
    <article className="flex flex-col rounded-2xl bg-white p-6">
      <p className="text-center text-4xl leading-10" aria-hidden>
        {card.emoji}
      </p>
      <h3 className="pt-3 text-center font-nav text-base font-bold text-brand-black">{card.title}</h3>
      <p className="pt-2 text-center font-nav text-sm leading-[23px] text-brand-black">{card.description}</p>
    </article>
  );
}

const inputClassName =
  'w-full rounded-[14px] border-[1.9px] border-brand-black/10 bg-white px-4 py-3 font-nav text-base text-brand-black outline-none placeholder:text-brand-black/50 focus:border-navy-500';

export default function DoePage() {
  const { hero, amounts, defaultAmount, form, impactCards } = doePageContent;
  const [selectedAmount, setSelectedAmount] = useState(defaultAmount);
  const [customAmount, setCustomAmount] = useState('');

  const activeAmount = useMemo(() => {
    if (customAmount.trim()) {
      const parsed = Number(customAmount.replace(/\D/g, '')) / 100;
      return parsed > 0 ? parsed : selectedAmount;
    }
    return selectedAmount;
  }, [customAmount, selectedAmount]);

  function handlePresetClick(amount: number) {
    setSelectedAmount(amount);
    setCustomAmount('');
  }

  function handleCustomChange(value: string) {
    const digits = value.replace(/\D/g, '');
    if (!digits) {
      setCustomAmount('');
      return;
    }
    const cents = Number(digits);
    setCustomAmount((cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  }

  return (
    <InternalPageLayout>
      <PageHero {...hero} />

      <section className="bg-cream px-6 py-20 sm:px-8">
        <div className="mx-auto flex w-full max-w-[900px] flex-col">
          <div className="rounded-3xl bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] sm:p-12">
            <h2 className="font-nav text-[30px] font-black leading-9 text-brand-black">{form.title}</h2>
            <p className="pt-2 font-nav text-base leading-6 text-brand-black">{form.subtitle}</p>

            <div className="flex flex-wrap gap-3 pt-8">
              {amounts.map((amount) => (
                <AmountButton
                  key={amount}
                  amount={amount}
                  isActive={!customAmount && selectedAmount === amount}
                  onClick={() => handlePresetClick(amount)}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <span className="font-nav text-sm leading-5 text-brand-black">{form.customLabel}</span>
              <div className="relative w-36">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-nav text-base text-brand-black">
                  R$
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={customAmount}
                  onChange={(event) => handleCustomChange(event.target.value)}
                  placeholder="0,00"
                  className={`${inputClassName} pl-9`}
                />
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-cream p-6">
              <p className="font-nav text-sm font-semibold leading-5 text-brand-black">{form.selectedLabel}</p>
              <p className="pt-1 font-nav text-[36px] font-black leading-10 text-navy-500">
                {formatCurrency(activeAmount)}
              </p>
            </div>

            <form className="space-y-4 pt-8" onSubmit={(event) => event.preventDefault()}>
              <input type="text" className={inputClassName} placeholder={form.namePlaceholder} />
              <input type="email" className={inputClassName} placeholder={form.emailPlaceholder} />
              <input type="text" className={inputClassName} placeholder={form.cpfPlaceholder} />

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-[14px] bg-navy-500 px-6 py-4 font-nav text-lg font-bold text-white transition hover:bg-navy-600"
              >
                <Heart className="size-5 shrink-0" aria-hidden />
                Confirmar doação de {formatCurrency(activeAmount)}
              </button>
            </form>

            <p className="pt-4 text-center font-nav text-xs leading-4 text-brand-black/40">{form.legalNote}</p>
          </div>

          <ul className="grid gap-6 pt-16 sm:grid-cols-3">
            {impactCards.map((card) => (
              <li key={card.title}>
                <ImpactCard card={card} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </InternalPageLayout>
  );
}
