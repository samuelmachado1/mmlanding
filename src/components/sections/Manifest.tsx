import { ChevronRight } from 'lucide-react';
import {
  SplitSection,
  SplitSectionContent,
  SplitSectionMedia,
} from '../layout/SplitSection.tsx';

export function Manifest() {
  return (
    <SplitSection
      id="manifesto"
      className="bg-yellow-500 px-0 py-12 sm:py-16 lg:py-20"
    >
      <SplitSectionContent
        eyebrow="MANIFESTO"
        title="Vamos maximizar o Distrito Federal"
        cta={{ href: '#apoie-manifesto', label: 'Apoie este manifesto' }}
        ctaIcon={<ChevronRight className="h-6 w-6 shrink-0" aria-hidden />}
      >
        <p>
          O DF que aparece nos cartões-postais não pode ser privilégio de poucos. Brasília também é Ceilândia,
          Sol Nascente, Samambaia, Planaltina, São Sebastião e cada território onde a população trabalha, cria,
          cuida e faz a cidade acontecer.
        </p>

        <p>
          Maximizar o DF é aproximar oportunidades de quem sempre esteve longe delas. É garantir transporte público
          digno, cultura viva, educação, saúde, trabalho e participação popular. É reconhecer que as melhores
          respostas para os nossos problemas também nascem nas quebradas.
        </p>

        <p>
          Viemos das periferias e sabemos que ninguém transforma nada sozinho. Por isso, este é um chamado para
          quem acredita em uma política construída com os territórios, de baixo para cima e com coragem para
          enfrentar desigualdades.
        </p>

        <p>Quando a periferia ocupa o centro das decisões, todo o Distrito Federal avança.</p>
      </SplitSectionContent>

      <SplitSectionMedia empty />
    </SplitSection>
  );
}
