import { PageLayout } from '../components/layout/PageLayout.tsx';
import { apoiePage } from '../data/content.ts';

export default function ApoiePage() {
  return (
    <PageLayout>
      <h1 className="mb-4 font-body text-3xl font-extrabold text-brand-black">{apoiePage.title}</h1>
      <p className="mb-8 text-brand-black/80">{apoiePage.intro}</p>
      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-brand-black">Nome</label>
          <input type="text" className="mt-1 w-full border border-brand-black/20 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-black">RA</label>
          <input type="text" className="mt-1 w-full border border-brand-black/20 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-black">WhatsApp</label>
          <input type="tel" className="mt-1 w-full border border-brand-black/20 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-black">E-mail</label>
          <input type="email" className="mt-1 w-full border border-brand-black/20 px-3 py-2" />
        </div>
        <button type="submit" className="rounded-lg bg-yellow-500 px-6 py-2 font-nav font-semibold text-brand-black">
          Quero apoiar
        </button>
      </form>
      <p className="mt-4 text-sm text-brand-black/60">{apoiePage.note}</p>
    </PageLayout>
  );
}
