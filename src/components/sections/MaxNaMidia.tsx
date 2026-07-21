import { newsItems, videoItems, socialLinks } from '../../data/content.ts';
import { AnimatedSection } from '../ui/AnimatedSection.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';

export function MaxNaMidia() {
  return (
    <AnimatedSection id="max-na-midia" className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Max na Mídia"
          title="Notícias e vídeos do mandato"
          description="Acompanhe a cobertura jornalística e os registros em vídeo das principais ações."
        />

        <div id="noticias" className="scroll-mt-24">
          <h3 className="mb-6 text-2xl font-bold text-navy-500">Notícias</h3>
          <ul className="space-y-4">
            {newsItems.map((item) => (
              <li key={item.id} className="rounded-2xl border bg-white p-5">
                <a href={item.href} className="group block">
                  <h4 className="text-lg font-bold text-navy-500 group-hover:text-accent-600">{item.title}</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.source}{item.date ? ` · ${item.date}` : ''}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div id="videos" className="scroll-mt-24 mt-12">
          <h3 className="mb-6 text-2xl font-bold text-navy-500">Vídeos</h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {videoItems.map((item) => (
              <li key={item.id} className="rounded-2xl border bg-white p-5">
                <a href={item.href} target="_blank" rel="noreferrer" className="group block">
                  <h4 className="text-lg font-bold text-navy-500 group-hover:text-accent-600">{item.title}</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.source}{item.date ? ` · ${item.date}` : ''}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div id="siga-redes" className="scroll-mt-24 mt-12 text-center">
          <h3 className="mb-4 text-2xl font-bold text-navy-500">Siga nas Redes</h3>
          <ul className="flex flex-wrap justify-center gap-3">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="touch-target inline-flex items-center gap-2 rounded-full border border-navy-200 px-4 py-2 text-sm font-medium text-navy-600 hover:border-accent-500 hover:text-accent-600"
                >
                  <link.icon className="h-4 w-4" aria-hidden />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AnimatedSection>
  );
}
