import { PageLayout } from '../components/layout/PageLayout.tsx';
import { bondeProMaxPage } from '../data/content.ts';

export default function BondeProMaxPage() {
  return (
    <PageLayout>
      <h1 className="mb-6 font-body text-3xl font-extrabold text-brand-black">{bondeProMaxPage.title}</h1>
      {bondeProMaxPage.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="mb-4 leading-relaxed text-brand-black/90">
          {paragraph}
        </p>
      ))}
    </PageLayout>
  );
}
