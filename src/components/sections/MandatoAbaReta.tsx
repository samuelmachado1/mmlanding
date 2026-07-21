import { stats, tarifaZeroContent, agendaTopics } from '../../data/content.ts';
import { Counter } from '../ui/Counter.tsx';
import { AnimatedSection } from '../ui/AnimatedSection.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';

export function MandatoAbaReta() {
  return (
    <AnimatedSection id="mandato-aba-reta" className="bg-navy-50 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Mandato Aba Reta"
          title="Trabalho, fiscalização e entregas"
          description="Acompanhe as principais frentes de atuação do mandato no Distrito Federal."
        />

        <div id="tarifa-zero" className="scroll-mt-24 rounded-2xl border bg-white p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-navy-500">{tarifaZeroContent.title}</h3>
          <p className="mt-3 text-gray-600">{tarifaZeroContent.description}</p>
          <ul className="mt-4 space-y-2">
            {tarifaZeroContent.highlights.map((item) => (
              <li key={item} className="flex gap-2 text-gray-700">
                <span className="text-accent-500" aria-hidden>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div id="projetos-de-lei" className="scroll-mt-24 mt-12">
          <h3 className="mb-8 text-2xl font-bold text-navy-500">Projetos de Lei</h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Counter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>

        <div id="maximizando-df" className="scroll-mt-24 mt-12">
          <h3 className="mb-8 text-2xl font-bold text-navy-500">Maximizando o DF</h3>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {agendaTopics.map((topic) => (
              <li key={topic.id} className="rounded-2xl border bg-white p-6">
                <h4 className="text-lg font-bold text-navy-500">{topic.title}</h4>
                <ul className="mt-3 space-y-2">
                  {topic.items.map((item) => (
                    <li key={item} className="text-sm text-gray-600">{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AnimatedSection>
  );
}
