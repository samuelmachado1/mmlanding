import { doeContent } from '../../data/content.ts';
import { AnimatedSection } from '../ui/AnimatedSection.tsx';

export function Doe() {
  return (
    <AnimatedSection id="doe" className="bg-navy-500 px-4 py-16 text-white sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl text-center mx-auto">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent-400">Doe</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{doeContent.title}</h2>
          <p className="mt-3 text-lg text-navy-100">{doeContent.description}</p>
        </div>
        <div className="mx-auto max-w-xl rounded-2xl bg-navy-600 p-6 text-center sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-400">Chave Pix</p>
          <p className="mt-2 text-2xl font-bold break-all">{doeContent.pixKey}</p>
          <p className="mt-4 text-sm text-navy-100">{doeContent.note}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}
