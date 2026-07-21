import { bondeProMaxBlocks, whatsappUrl } from '../../data/content.ts';
import { AnimatedSection } from '../ui/AnimatedSection.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';

export function BondeProMax() {
  return (
    <AnimatedSection id="bonde-pro-max" className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Bonde Pro Max"
          title="Mobilização cidadã"
          description="Entre nos canais, espalhe o material e participe das missões do mandato."
        />
        <ul className="grid gap-6 sm:grid-cols-2">
          {bondeProMaxBlocks.map((block) => (
            <li key={block.id} id={block.id} className="scroll-mt-24 rounded-2xl border bg-white p-6">
              <h3 className="text-xl font-bold text-navy-500">{block.title}</h3>
              <p className="mt-2 text-gray-600">{block.description}</p>
              {block.cta && block.href ? (
                <a
                  href={block.id === 'grupo-apoiadores' ? whatsappUrl('Quero entrar no grupo de apoiadores!') : block.href}
                  target={block.href.startsWith('http') ? '_blank' : undefined}
                  rel={block.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="mt-4 inline-flex rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
                >
                  {block.cta}
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  );
}
