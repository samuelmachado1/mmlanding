import { PageLayout } from '../components/layout/PageLayout.tsx';
import { canaisPage, contatoPage } from '../data/content.ts';

export default function ContatoPage() {
  return (
    <PageLayout>
      <h1 className="mb-4 font-body text-3xl font-extrabold text-brand-black">{contatoPage.title}</h1>
      <p className="mb-8 text-brand-black/80">{contatoPage.intro}</p>
      <ul className="mb-8 space-y-2">
        {canaisPage.channels.map((channel) => (
          <li key={channel.name}>
            <a href={channel.href} className="font-nav font-semibold text-navy-500 underline" target="_blank" rel="noreferrer">
              {channel.name}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-brand-black/90">
        <strong>E-mail:</strong>{' '}
        <a href={`mailto:${contatoPage.email}`} className="text-navy-500 underline">
          {contatoPage.email}
        </a>
      </p>
      <p className="mt-2 text-brand-black/90">
        <strong>Telefone:</strong> {contatoPage.phone}
      </p>
    </PageLayout>
  );
}
