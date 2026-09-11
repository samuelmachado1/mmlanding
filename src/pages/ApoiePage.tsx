import { apoiePage, apoiadorFormContent } from '../data/content.ts';
import { ApoiadorForm } from '../components/forms/ApoiadorForm.tsx';
import {
  InternalPageLayout,
  PageHero,
  PageSection,
} from '../components/pages/InternalPageParts.tsx';

export default function ApoiePage() {
  return (
    <InternalPageLayout>
      <PageHero
        eyebrow="Campanha"
        title={apoiePage.title}
        subtitle={apoiePage.intro}
        variant="navy"
      />

      <PageSection eyebrow="Cadastro" title={apoiadorFormContent.title} className="bg-cream">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] sm:p-10">
          <ApoiadorForm />
        </div>
      </PageSection>
    </InternalPageLayout>
  );
}
