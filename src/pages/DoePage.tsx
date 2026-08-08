import { PageLayout } from '../components/layout/PageLayout.tsx';
import { doePage, doeContent } from '../data/content.ts';

export default function DoePage() {
  return (
    <PageLayout>
      <h1 className="mb-6 font-body text-3xl font-extrabold text-brand-black">{doePage.title}</h1>
      {doePage.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="mb-4 leading-relaxed text-brand-black/90">
          {paragraph}
        </p>
      ))}
      <div className="mt-8 rounded-lg border border-brand-black/10 bg-cream p-6">
        <p className="font-semibold text-brand-black">{doeContent.title}</p>
        <p className="mt-2 text-brand-black/80">{doeContent.description}</p>
        <p className="mt-4 text-sm text-brand-black/70">
          <strong>PIX:</strong> {doeContent.pixKey}
        </p>
        <p className="mt-2 text-sm text-brand-black/60">{doeContent.note}</p>
      </div>
    </PageLayout>
  );
}
