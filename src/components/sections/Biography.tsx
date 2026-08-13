import { ChevronRight } from 'lucide-react';
import frameQuemEhMax from '../../assets/backgrounds/frame-quem-eh-max.png';
import quemEhMax from '../../assets/pictures/quem-eh-max.png';
import { quemEPageSummary } from '../../data/content.ts';
import {
  SplitSection,
  SplitSectionContent,
  SplitSectionMedia,
} from '../layout/SplitSection.tsx';

export function Biography() {
  return (
    <SplitSection
      id="quem-e-max"
      className="bg-cream px-0 py-0"
    >
      <SplitSectionContent
        eyebrow="Conheça"
        title={
          <>
            Quem é
            <br />
            Max Maciel
          </>
        }
        cta={{ href: '/quem-e-max', label: 'Conheça a história completa' }}
        ctaIcon={<ChevronRight className="h-6 w-6 shrink-0" aria-hidden />}
      >
        {quemEPageSummary.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </SplitSectionContent>

      <SplitSectionMedia aria-label="Foto de Max Maciel">
        <img
          src={frameQuemEhMax}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={quemEhMax}
          alt="Max Maciel"
          className="absolute inset-0 h-full w-full object-contain object-left-bottom lg:object-left-center"
        />
      </SplitSectionMedia>
    </SplitSection>
  );
}
