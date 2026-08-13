import { apoiePage } from '../data/content.ts';
import {
  InternalPageLayout,
  PageHero,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';

const inputClassName =
  'mt-2 w-full rounded-xl border border-brand-black/15 bg-white px-4 py-3 font-nav text-base text-brand-black outline-none focus:border-navy-500';

export default function ApoiePage() {
  return (
    <InternalPageLayout>
      <PageHero
        eyebrow="Campanha"
        title={apoiePage.title}
        subtitle={apoiePage.intro}
        variant="navy"
      />

      <PageSection eyebrow="Cadastro" title="Torne-se um apoiador" className="bg-white">
        <form className="mx-auto max-w-xl space-y-5" onSubmit={(event) => event.preventDefault()}>
          <div>
            <label className="font-nav text-sm font-semibold text-brand-black">Nome</label>
            <input type="text" className={inputClassName} placeholder="Seu nome completo" required />
          </div>
          <div>
            <label className="font-nav text-sm font-semibold text-brand-black">RA</label>
            <input type="text" className={inputClassName} placeholder="Sua região administrativa" required />
          </div>
          <div>
            <label className="font-nav text-sm font-semibold text-brand-black">WhatsApp</label>
            <input type="tel" className={inputClassName} placeholder="(61) 99999-9999" required />
          </div>
          <div>
            <label className="font-nav text-sm font-semibold text-brand-black">E-mail</label>
            <input type="email" className={inputClassName} placeholder="seu@email.com" required />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-yellow-500 px-6 py-3 font-nav text-base font-bold text-brand-black transition hover:bg-yellow-400"
          >
            Quero apoiar
          </button>
        </form>
      </PageSection>
    </InternalPageLayout>
  );
}
