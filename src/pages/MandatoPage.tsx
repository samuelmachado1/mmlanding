import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout.tsx';
import { mandatoHub } from '../data/content.ts';

export default function MandatoPage() {
  return (
    <PageLayout>
      <h1 className="mb-4 font-body text-3xl font-extrabold text-brand-black">{mandatoHub.title}</h1>
      <p className="mb-8 text-brand-black/80">{mandatoHub.intro}</p>
      <ul className="space-y-4">
        {mandatoHub.links.map((link) => (
          <li key={link.href}>
            <Link to={link.href} className="font-nav text-lg font-semibold text-navy-500 underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
