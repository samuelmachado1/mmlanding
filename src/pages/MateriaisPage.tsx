import { PageLayout } from '../components/layout/PageLayout.tsx';
import { materiaisPage } from '../data/content.ts';

export default function MateriaisPage() {
  return (
    <PageLayout>
      <h1 className="mb-4 font-body text-3xl font-extrabold text-brand-black">{materiaisPage.title}</h1>
      <p className="mb-8 text-brand-black/80">{materiaisPage.intro}</p>
      <ul className="space-y-6">
        {materiaisPage.pamphlets.map((item) => (
          <li key={item.title}>
            <a href={item.href} className="font-nav text-lg font-semibold text-navy-500 underline" target="_blank" rel="noreferrer">
              {item.title}
            </a>
            <p className="mt-1 text-sm text-brand-black/60">Prévia em breve</p>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
