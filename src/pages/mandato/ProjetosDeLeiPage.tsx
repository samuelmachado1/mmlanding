import { PageLayout } from '../../components/layout/PageLayout.tsx';
import { projetosDeLei, projetosDeLeiIntro } from '../../data/content.ts';

export default function ProjetosDeLeiPage() {
  return (
    <PageLayout>
      <h1 className="mb-6 font-body text-3xl font-extrabold text-brand-black">Projetos de Lei</h1>
      {projetosDeLeiIntro.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="mb-4 leading-relaxed text-brand-black/90">
          {paragraph}
        </p>
      ))}
      <ul className="mt-8 space-y-6">
        {projetosDeLei.map((law) => (
          <li key={law.number + law.title}>
            <h2 className="text-lg font-bold text-brand-black">{law.title}</h2>
            <p className="text-sm text-brand-black/60">{law.number}</p>
            <p className="mt-1 text-brand-black/90">{law.description}</p>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
