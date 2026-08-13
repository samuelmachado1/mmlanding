import { canaisPage, contatoPage } from '../data/content.ts';
import {
  InternalPageLayout,
  PageHero,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';
import { ChannelGrid } from '../components/pages/PageBlocks.tsx';

export default function ContatoPage() {
  return (
    <InternalPageLayout>
      <PageHero
        eyebrow="Fale conosco"
        title={contatoPage.title}
        subtitle={contatoPage.intro}
        variant="navy"
      />

      <PageSection eyebrow="Redes" title="Nossos canais">
        <ChannelGrid channels={canaisPage.channels} />
      </PageSection>

      <PageSection eyebrow="Direto" title="E-mail e telefone" className="bg-white">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-brand-black/10 bg-cream p-6">
            <p className="font-nav text-sm font-bold uppercase tracking-wide text-navy-500">E-mail</p>
            <a
              href={`mailto:${contatoPage.email}`}
              className="mt-2 block font-nav text-xl font-bold text-brand-black underline underline-offset-4"
            >
              {contatoPage.email}
            </a>
          </div>
          <div className="rounded-2xl border border-brand-black/10 bg-cream p-6">
            <p className="font-nav text-sm font-bold uppercase tracking-wide text-navy-500">Telefone</p>
            <p className="mt-2 font-nav text-xl font-bold text-brand-black">{contatoPage.phone}</p>
          </div>
        </div>
      </PageSection>
    </InternalPageLayout>
  );
}
