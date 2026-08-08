import type { ReactNode } from 'react';
import frameQuemEhMax from '../../assets/backgrounds/frame-quem-eh-max.png';
import quemEhMax from '../../assets/pictures/quem-eh-max.png';
import {
  SplitSection,
  SplitSectionContent,
  SplitSectionMedia,
} from '../layout/SplitSection.tsx';

function BiographyLink({ children }: { children: ReactNode }) {
  return <span className="text-brand-blue underline decoration-1 underline-offset-[3px]">{children}</span>;
}

export function Biography() {
  return (
    <SplitSection
      id="quem-e-max"
      className="bg-cream px-0 py-12 sm:py-16 lg:py-20"
    >
      <SplitSectionContent
        eyebrow="CONHEÇA"
        title="Quem é Max Maciel"
        cta={{ href: '/quem-e-max', label: 'Conheça a história >' }}
      >
        <p>
          O DF que aparece nos cartões-postais não pode ser privilégio de poucos. Brasília também é{' '}
          <BiographyLink>Ceilândia</BiographyLink>, <BiographyLink>Sol Nascente</BiographyLink>,{' '}
          <BiographyLink>Samambaia</BiographyLink>, <BiographyLink>Planaltina</BiographyLink>,{' '}
          <BiographyLink>São Sebastião</BiographyLink> e cada território onde a população trabalha, cria,
          cuida e faz a cidade acontecer.
        </p>

        <p>
          Maximizar o DF é aproximar oportunidades de quem sempre esteve longe delas. É garantir{' '}
          <BiographyLink>transporte público digno</BiographyLink>, <BiographyLink>cultura viva</BiographyLink>,{' '}
          <BiographyLink>educação</BiographyLink>, <BiographyLink>saúde</BiographyLink>,{' '}
          <BiographyLink>trabalho</BiographyLink> e <BiographyLink>participação popular</BiographyLink>. É
          reconhecer que as melhores respostas para os nossos problemas também nascem nas quebradas.
        </p>

        <p>
          Viemos das periferias e sabemos que ninguém transforma nada sozinho. Por isso, este é um chamado para
          quem acredita em uma{' '}
          <BiographyLink>
            política construída com os territórios, de baixo para cima e com coragem para enfrentar
            desigualdades
          </BiographyLink>
          .
        </p>

        <p>
          <BiographyLink>
            Quando a periferia ocupa o centro das decisões, todo o Distrito Federal avança.
          </BiographyLink>
        </p>
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
