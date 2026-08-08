import { PageLayout } from '../../components/layout/PageLayout.tsx';
import { ctmUPage } from '../../data/content.ts';

export default function CtmUPage() {
  return (
    <PageLayout>
      <h1 className="mb-4 font-body text-3xl font-extrabold text-brand-black">{ctmUPage.title}</h1>
      <p className="mb-8 text-brand-black/80">{ctmUPage.intro}</p>
      <ul className="list-disc space-y-3 pl-5 text-brand-black/90">
        {ctmUPage.achievements.map((item) => (
          <li key={item.slice(0, 48)}>{item}</li>
        ))}
      </ul>
    </PageLayout>
  );
}
