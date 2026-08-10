import { ChevronRight } from 'lucide-react';
import frameQuemEhMax from '../../assets/backgrounds/frame-quem-eh-max.png';
import quemEhMax from '../../assets/pictures/quem-eh-max.png';
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
        cta={{ href: '/quem-e-max', label: 'Conheça a história' }}
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
