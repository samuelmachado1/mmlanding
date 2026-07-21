import type { RefObject } from 'react';
import { useInView, useAnimatedCounter } from '../../hooks/useScrollAnimation.ts';

interface CounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export function Counter({ value, suffix = '', label }: CounterProps) {
  const { ref, inView } = useInView();
  const count = useAnimatedCounter(value, 1800, inView);

  return (
    <div ref={ref as RefObject<HTMLDivElement>} className="text-center">
      <p className="text-4xl font-extrabold text-navy-500 sm:text-5xl" aria-live="polite">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-gray-600 sm:text-base">{label}</p>
    </div>
  );
}
