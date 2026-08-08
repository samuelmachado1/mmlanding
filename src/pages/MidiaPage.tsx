import { PageLayout } from '../components/layout/PageLayout.tsx';
import { midiaPage } from '../data/content.ts';

export default function MidiaPage() {
  return (
    <PageLayout>
      <h1 className="mb-8 font-body text-3xl font-extrabold text-brand-black">{midiaPage.title}</h1>
      {midiaPage.sections.map((section) => (
        <section key={section.title} className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-brand-black">{section.title}</h2>
          <ul className="list-disc space-y-2 pl-5 text-brand-black/90">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </PageLayout>
  );
}
