import { PageLayout } from '../../components/layout/PageLayout.tsx';
import { tarifaZeroPage } from '../../data/content.ts';

export default function TarifaZeroPage() {
  return (
    <PageLayout>
      <h1 className="mb-2 font-body text-3xl font-extrabold text-brand-black">{tarifaZeroPage.title}</h1>
      {tarifaZeroPage.subtitle ? (
        <p className="mb-6 text-xl font-semibold text-navy-500">{tarifaZeroPage.subtitle}</p>
      ) : null}
      {tarifaZeroPage.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="mb-4 leading-relaxed text-brand-black/90">
          {paragraph}
        </p>
      ))}
    </PageLayout>
  );
}
