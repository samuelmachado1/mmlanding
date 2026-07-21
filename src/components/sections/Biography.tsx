import { timeline } from '../../data/content.ts';
import { AnimatedSection } from '../ui/AnimatedSection.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';

export function Biography() {
  return (
    <AnimatedSection id="quem-e-max" className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Quem é Max"
          title="Uma história de coragem e compromisso"
          description="Do bairro à Câmara Legislativa, com foco em quem mais precisa no Distrito Federal."
        />
        <ol className="relative space-y-8 border-l-2 border-accent-500 pl-8">
          {timeline.map((item) => (
            <li key={item.year} className="relative">
              <span className="absolute -left-[2.45rem] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-navy-500 text-sm font-bold text-white">
                {item.year}
              </span>
              <h3 className="text-xl font-bold text-navy-500">{item.title}</h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </AnimatedSection>
  );
}
