import {
  Share2,
  Globe,
  MessageCircle,
} from 'lucide-react';
import type {
  NavItem,
  QuickLink,
  ContentBlock,
  CrewCard,
  ClippingInterview,
  ClippingReport,
  ZeroFareCard,
  AgendaTopic,
  MediaItem,
  StatItem,
  SocialLink,
  SocialBarLink,
  PageContent,
  LawItem,
  InvestmentRow,
  PamphletItem,
  ChannelItem,
  MidiaSection,
  PageLink,
  HighlightStatCard,
  Article,
} from '../types/index.ts';

import midiaRedetv from '../assets/pictures/midia/redetv.png';
import midiaCamaraPec from '../assets/pictures/midia/camara-pec.png';
import midiaFolha from '../assets/pictures/midia/folha.png';
import midiaGlobo from '../assets/pictures/midia/globo.png';
import midiaPodcast from '../assets/pictures/midia/podcast.png';

export const siteConfig = {
  name: 'Deputado Max Maciel',
  tagline: 'Coragem para defender o Distrito Federal',
  phase: 'Campanha de Reeleição',
  electoralNumber: '50100',
  colors: {
    purple: '#70148c',
    yellow: '#fcd207',
    orange: '#f18e04',
    red: '#d5272d',
    green: '#39a21c',
    blue: '#0066ff',
    black: '#25211e',
    cream: '#f5f1e8',
  },
  whatsapp: {
    chatUrl: 'https://wa.me/5561982521212',
    bondeGroupUrl:
      'https://chat.whatsapp.com/Erw07ITrsnl2qIYO6mNKOP?s=cl&p=a&mlu=0&ilr=0',
  },
  email: 'contato@maxmaciel.com.br',
} as const;

export const navItems: NavItem[] = [
  { label: 'Quem é Max', href: '/quem-e-max' },
  { label: 'Mandato Aba Reta', href: '/mandato' },
  { label: 'Maximizando o DF', href: '/maximizando-df' },
  { label: 'Bonde Pro Max', href: '/bonde-pro-max' },
  { label: 'Max na Mídia', href: '/midia' },
  { label: 'Artigos', href: '/artigos' },
  { label: 'Contato', href: '/contato' },
];

export const internalNavItems: NavItem[] = [
  { label: 'Quem é Max', href: '/quem-e-max' },
  { label: 'Mandato Aba Reta', href: '/mandato' },
  { label: 'Maximizando o DF', href: '/maximizando-df' },
  { label: 'Bonde Pro Max', href: '/bonde-pro-max' },
  { label: 'Max na Mídia', href: '/midia' },
  { label: 'Artigos', href: '/artigos' },
  { label: 'Contato', href: '/contato' },
];

export const heroContent = {
  headline: 'Coragem para defender o Distrito Federal',
  subheadline:
    'Candidato à reeleição como Deputado Distrital. Trabalho, entregas e a luta por um DF mais justo para quem faz a cidade funcionar todos os dias.',
};

export const heroQuickLinks: QuickLink[] = [
  { label: 'Quem é Max', href: '#quem-e-max' },
  { label: 'Bonde Pro Max', href: '#bonde-pro-max' },
  { label: 'Notícias', href: '#noticias' },
  { label: 'Maximizando o DF', href: '#maximizando-df' },
  { label: 'Tarifa Zero é possível', href: '#tarifa-zero' },
  { label: 'Siga nas Redes', href: '#siga-redes' },
];

export const heroFixedActions: QuickLink[] = [
  { label: 'Apoie o manifesto', href: '#apoie-manifesto' },
  { label: 'Compartilhe', href: '#espalhe-material' },
  { label: 'Exercite o direito de manifestar', href: '#bonde-pro-max' },
];

export const timeline = [
  { year: '2010', title: 'Início na vida pública', description: 'Primeiros passos na militância comunitária e defesa dos direitos dos moradores do DF.' },
  { year: '2016', title: 'Vereador', description: 'Eleito vereador com pauta de urbanismo, saúde e educação nas regiões administrativas.' },
  { year: '2022', title: 'Deputado Distrital', description: 'Mandato focado em fiscalização, emendas para saúde e segurança, e diálogo com a sociedade civil.' },
  { year: '2026', title: 'Prestação de contas', description: 'Apresentação transparente de entregas, projetos aprovados e próximos passos para o DF.' },
];

export const tarifaZeroContent = {
  title: 'Tarifa Zero',
  description:
    'O que parecia impossível se tornou inevitável. A Tarifa Zero já faz parte da realidade do DF aos domingos e feriados.',
  highlights: [
    'Mais de 37,8 milhões de acessos ao STPC/DF em 82 dias de gratuidade',
    'Aumento de 70% na demanda de ônibus aos domingos e até 111% nos feriados',
    'Nós vamos seguir lutando para o DF ter Tarifa Zero todos os dias',
  ],
};

export const stats: StatItem[] = [
  { value: 14, suffix: '', label: 'Leis sancionadas' },
  { value: 37, suffix: ',8 mi', label: 'Acessos com Tarifa Zero' },
  { value: 26, suffix: ',4 mi', label: 'Emendas para saúde (R$)' },
  { value: 116, suffix: ' mi', label: 'Emendas no mandato (R$)' },
];

export const agendaTopics: AgendaTopic[] = [
  {
    id: 'transporte',
    title: 'Transporte',
    items: [
      'Tarifa Zero no transporte público do DF',
      'Integração entre modais e horários ampliados',
      'Fiscalização de contratos com operadoras',
    ],
  },
  {
    id: 'educacao',
    title: 'Educação',
    items: [
      'Emendas para reforma de unidades escolares',
      'Merenda de qualidade e laboratórios de informática',
      'Programas de reforço escolar nas regiões administrativas',
    ],
  },
  {
    id: 'outras-pautas',
    title: 'Outras pautas',
    items: [
      'Saúde em todas as RAs com UPAs e telemedicina',
      'Segurança com inteligência e prevenção com juventude',
      'Transparência ativa com portal de mandato e audiências públicas',
    ],
  },
];

export const bondeProMaxBlocks: ContentBlock[] = [
  {
    id: 'espalhe-material',
    title: 'Espalhe nosso material!',
    description: 'Baixe artes, vídeos e textos prontos para compartilhar nas suas redes e grupos de bairro.',
    cta: 'Ver materiais',
    href: '#espalhe-material',
  },
  {
    id: 'grupo-apoiadores',
    title: 'Grupo de apoiadores',
    description: 'Receba atualizações do mandato, votações e convites para audiências no WhatsApp e Telegram.',
    cta: 'Entrar no grupo',
    href: siteConfig.whatsapp.bondeGroupUrl,
  },
  {
    id: 'apoie-manifesto',
    title: 'Apoie o manifesto',
    description: 'Assine e divulgue nossas propostas por um DF mais justo, acessível e transparente.',
    cta: 'Assinar manifesto',
    href: '#apoie-manifesto',
  },
];




export const clippingContent = {
  eyebrow: 'Max na mídia',
  title: 'Max na Mídia',
  interviewsLabel: 'Destaque',
  reportsLabel: 'Notícias',
  cta: 'Ver mais notícias',
  ctaHref: '/midia',
};

export const clippingInterview: ClippingInterview = {
  id: 'featured-interview',
  badge: 'Entrevista completa',
  title: 'Max Maciel – ENTREVISTA COMPLETA REDETV NOTICIAS (03/06/2026)',
  href: '#',
  imageUrl: midiaRedetv,
};

export const clippingReports: ClippingReport[] = [
  {
    id: 'report-1',
    title: 'Câmara dos Deputados avança com PEC que limita IPVA do carro',
    source: 'Câmara Notícias',
    href: '#',
    imageUrl: midiaCamaraPec,
  },
  {
    id: 'report-2',
    title: 'Câmara aprova fim da prescrição para condenados foragidos',
    source: 'Folha de S.Paulo',
    href: '#',
    imageUrl: midiaFolha,
  },
  {
    id: 'report-3',
    title: 'Câmara aprova fim da prescrição para condenados foragidos',
    source: 'Folha de S.Paulo',
    href: '#',
    imageUrl: midiaFolha,
  },
];

export const zeroFareContent = {
  title: 'Tarifa Zero',
  description:
    'O que parecia impossível se tornou inevitável. Aos domingos e feriados o transporte público do DF já é gratuito — e os números mostram que funciona.',
};

export const zeroFareCards: ZeroFareCard[] = [
  {
    id: 'acessos-stpc',
    type: 'stat',
    value: '37,8 mi',
    label: 'Acessos ao STPC/DF em dias de gratuidade',
  },
  {
    id: 'dias-gratuidade',
    type: 'stat',
    value: '82',
    label: 'Dias de Tarifa Zero (52 domingos, 7 feriados e extensões)',
  },
  {
    id: 'demanda-domingos',
    type: 'stat',
    value: '+70%',
    label: 'Aumento da demanda de ônibus aos domingos',
  },
  {
    id: 'demanda-feriados',
    type: 'highlight',
    title: 'Até +111% de demanda por transporte nos feriados',
    size: 'tall',
  },
  {
    id: 'lojistas',
    type: 'highlight',
    title: '96% dos lojistas perceberam aumento no fluxo de clientes',
    size: 'compact',
  },
  {
    id: 'custo-stpc',
    type: 'highlight',
    title: 'Representa apenas 11% do custo total do STPC/DF',
    size: 'compact',
  },
];

export const crewContent = {
  eyebrow: 'Ninguém maximiza o DF sozinho',
  title: 'Bonde Pro Max',
};

export const crewCards: CrewCard[] = [
  {
    id: 'espalhe-material',
    title: 'Mostre seu apoio nas redes',
    description:
      'Leve nossas ideias para as ruas e para as redes. Baixe cards, vídeos e materiais para compartilhar com sua comunidade.',
    cta: 'Acessar materiais',
    href: '/materiais',
  },
  {
    id: 'grupo-apoiadores',
    title: 'Grupo de apoiadores',
    description:
      'Entre no grupo, acompanhe as novidades e participe das próximas mobilizações do Bonde.',
    cta: 'Entrar no bonde',
    href: siteConfig.whatsapp.bondeGroupUrl,
  },
  {
    id: 'apoie-manifesto',
    title: 'Apoie o manifesto',
    description:
      'Mostre que você também acredita em um DF no qual a periferia esteja no centro das decisões.',
    cta: 'Quero apoiar',
    href: '/apoie',
  },
  {
    id: 'fortalecer-o-corre',
    title: 'Espalhe nosso material nas ruas',
    description:
      'Cola com a gente! Preenche os dados abaixo que a gente separa seu material e leva até você.',
    cta: 'Cola com a gente',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSfN6eMANJTcC4tQULeIbmuQh4HYVOoww0qUsPMgkRiVqvGsNw/viewform',
  },
  {
    id: 'cafe-com-max',
    title: 'Café com Max',
    description:
      'Não sou a dona Florinda, mas quero te fazer um convite: aceitas tomar uma xícara de café comigo?',
    cta: 'Aceitar convite',
    href: 'https://docs.google.com/forms/d/1nJoS_loU2qvbv6lXujp4N8Mu_YH7VN9pzNJt-sTvGV0/viewform',
  },
];

export const doeContent = {
  title: 'Doe',
  description:
    'Doe e nos ajude a arrecadar recursos financeiros para espalhar ainda mais a campanha de reeleição do nosso Aba Reta favorito.',
  pixKey: 'contato@maxmaciel.df.br',
  note: 'Toda doação é registrada e presta contas conforme a legislação eleitoral.',
};

export const newsItems: MediaItem[] = [
  {
    id: '1',
    type: 'news',
    title: 'Deputado Max Maciel apresenta projeto de Tarifa Zero no DF',
    source: 'Portal Legislativo',
    date: 'Mar 2026',
    href: '#',
  },
  {
    id: '2',
    type: 'news',
    title: 'Emendas destinam R$ 28 mi para saúde nas regiões administrativas',
    source: 'Jornal do DF',
    date: 'Fev 2026',
    href: '#',
  },
  {
    id: '3',
    type: 'news',
    title: 'Audiência pública reúne moradores para debater mobilidade urbana',
    source: 'Agência Brasília',
    date: 'Jan 2026',
    href: '#',
  },
];

export const videoItems: MediaItem[] = [
  {
    id: '1',
    type: 'video',
    title: 'Prestação de contas do mandato — resumo 2025',
    source: 'YouTube',
    date: 'Dez 2025',
    href: 'https://www.youtube.com/@MaxMacielDF',
  },
  {
    id: '2',
    type: 'video',
    title: 'Tarifa Zero: por que é possível no DF',
    source: 'YouTube',
    date: 'Nov 2025',
    href: 'https://www.youtube.com/@MaxMacielDF',
  },
];

export const socialLinks: SocialLink[] = [
  { name: 'Instagram', href: 'https://www.instagram.com/maxmacieldf', icon: Share2 },
  { name: 'Facebook', href: 'https://www.facebook.com/maxmacieldf', icon: Globe },
  { name: 'YouTube', href: 'https://www.youtube.com/@MaxMacielDF', icon: MessageCircle },
];

export function whatsappUrl(): string {
  return siteConfig.whatsapp.chatUrl;
}

export const socialBarLinks: SocialBarLink[] = [
  { name: 'Instagram', href: 'https://www.instagram.com/maxmacieldf', platform: 'instagram' },
  { name: 'WhatsApp', href: siteConfig.whatsapp.chatUrl, platform: 'whatsapp' },
  { name: 'YouTube', href: 'https://www.youtube.com/@MaxMacielDF', platform: 'youtube' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@maxmacieldf', platform: 'tiktok' },
  { name: 'Facebook', href: 'https://www.facebook.com/maxmacieldf', platform: 'facebook' },
  { name: 'X', href: 'https://x.com/maxmacieldf', platform: 'x' },
];


export const volunteerRegions = ['Plano Piloto', 'Ceilândia', 'Taguatinga', 'Samambaia', 'Gama', 'São Sebastião', 'Planaltina', 'Outra RA'];

/** Todas as regiões administrativas do Distrito Federal (ordem alfabética). */
export const distritoFederalRegioesAdministrativas = [
  'Águas Claras',
  'Arniqueira',
  'Arapoanga',
  'Brazlândia',
  'Candangolândia',
  'Ceilândia',
  'Cidade Estrutural',
  'Cruzeiro',
  'Fercal',
  'Gama',
  'Guará',
  'Itapoã',
  'Jardim Botânico',
  'Lago Norte',
  'Lago Sul',
  'Núcleo Bandeirante',
  'Park Way',
  'Planaltina',
  'Plano Piloto',
  'Recanto das Emas',
  'Riacho Fundo',
  'Riacho Fundo II',
  'Samambaia',
  'Santa Maria',
  'São Sebastião',
  'SIA',
  'Sobradinho',
  'Sobradinho II',
  'Sol Nascente/Pôr do Sol',
  'Sudoeste/Octogonal',
  'Taguatinga',
  'Varjão',
  'Vicente Pires',
] as const;

export const footerLinks = [
  { label: 'Contato', href: '/contato' },
  { label: 'Política de Privacidade', action: 'privacy-policy' as const },
];

export const quemEPage: PageContent = {
  title: 'Quem é o Max Maciel?',
  subtitle:
    'Nascido em Ceilândia, deputado distrital e presidente da CTMU — quase 30 anos de luta nas quebradas do DF.',
  paragraphs: [
    'Max Maciel é candidato à Deputado Distrital e com seu apoio ele vai para o seu segundo mandato.',
    'Nascido em 1982 em Ceilândia, Max Maciel é o filho caçula do Seu Agamenon e da Dona Gorete, casal nordestino que veio para Brasília, assim como tantos outros, para lutar por mais oportunidades.',
    'Em 2022, Max Maciel se tornou o terceiro Deputado Distrital mais votado do DF, eleito com 35.758 votos.',
    'Mas antes disso, o nosso deputado aba reta começou sua trajetória no movimento estudantil, especificamente no grêmio da sua escola, e depois participou de vários projetos sociais, circulando as escolas, promovendo cultura e direito à cidade.',
    'Com o passar dos anos passou a integrar conselhos, fazer atividades junto com o movimento Hip Hop nas quebradas, contribuir com pesquisas, atuar dentro e fora da institucionalidade em defesa da juventude. Ele também participou ativamente de campanhas pelo desarmamento e pelo fim do extermínio da juventude negra no Brasil.',
    'Ele não começou há pouco tempo, por isso soma quase 30 anos de luta dentro dos movimentos estudantis, sociais e culturais de Ceilândia e de outras quebradas do DF.',
    'Além de ter nascido na RA mais populosa do Distrito Federal, o Max fez morada na cidade: cresceu, estudou, trabalhou, se casou há mais de 20 anos com Ildely Ana, teve duas filhas e ainda mora em Ceilândia.',
    'Ele é pedagogo de formação e especialista em Gestão de Políticas Públicas em Gênero e Raça pela UnB.',
    'Na Câmara Legislativa do Distrito Federal, atualmente ele é presidente da Comissão de Transporte e Mobilidade Urbana (CTMU), e tem como principal bandeira a luta por Tarifa Zero no DF e a garantia do direito à cidade através de um transporte público digno e de qualidade.',
  ],
};

/** Resumo para a seção da landing page */
export const quemEPageSummary = quemEPage.paragraphs.slice(0, 3);

export const mandatoHub = {
  title: 'Mandato Aba Reta',
  intro: 'Conheça as principais frentes de trabalho do primeiro mandato:',
  links: [
    { label: 'Tarifa Zero', href: '/mandato/tarifa-zero' },
    { label: 'Projetos de Lei', href: '/mandato/projetos-de-lei' },
    { label: 'CTMU', href: '/mandato/ctmu' },
  ] satisfies PageLink[],
};

export const mandateHighlights = [
  {
    value: '14',
    label: 'Leis sancionadas',
    srLabel: '14 leis sancionadas',
  },
  {
    value: '+40 mi',
    label: 'Para educação',
    srLabel: 'Mais de 40 milhões para educação',
  },
  {
    value: '+26 mi',
    label: 'Para saúde',
    srLabel: 'Mais de 26 milhões para saúde',
  },
  {
    value: '21 mi',
    label: 'Para mobilidade',
    srLabel: '21 milhões para mobilidade',
  },
] satisfies HighlightStatCard[];

export const sitePageCta = {
  title: 'Cola com a gente',
  primary: { label: 'Entrar no Bonde', href: siteConfig.whatsapp.bondeGroupUrl },
  variant: 'yellow' as const,
};

export const mandatoPageContent = {
  hero: {
    eyebrow: 'Mandato Aba Reta',
    title: 'Mandato Aba Reta',
    subtitle:
      'Conheça as principais frentes de trabalho do mandato: Tarifa Zero, projetos de lei sancionados e a atuação na CTMU.',
    variant: 'black' as const,
  },
  realizacoes: {
    title: 'Principais realizações',
    items: [
      {
        icon: '🚌',
        category: 'Mobilidade',
        status: 'Aprovado' as const,
        title: 'Tarifa Zero aos domingos e feriados',
        description:
          'Mais de 37,8 milhões de acessos ao STPC/DF em 82 dias de gratuidade no transporte público.',
        href: '/mandato/tarifa-zero',
      },
      {
        icon: '📜',
        category: 'Legislativo',
        status: 'Aprovado' as const,
        title: '14 leis sancionadas',
        description:
          'Em quase 4 anos de Gabinete Aba Reta, leis que mudam a realidade do DF com vontade do Poder Executivo.',
        href: '/mandato/projetos-de-lei',
      },
      {
        icon: '💰',
        category: 'Emendas',
        status: 'Aprovado' as const,
        title: 'R$ 116 milhões em emendas',
        description:
          'Recursos destinados para educação, saúde, cultura, mobilidade e assistência social nas periferias.',
        href: '/maximizando-df',
      },
      {
        icon: '🏛️',
        category: 'Institucional',
        status: 'Aprovado' as const,
        title: 'Presidência da CTMU',
        description:
          'Liderança da Comissão de Transporte e Mobilidade Urbana na Câmara Legislativa do DF.',
        href: '/mandato/ctmu',
      },
    ],
  },
};

export const tarifaZeroPage: PageContent = {
  title: 'Tarifa Zero',
  subtitle: 'O que parecia impossível se tornou inevitável',
  paragraphs: [
    'Mais de 137 cidades do Brasil já contam com gratuidade no transporte público e com tarifa zero promovemos justiça social, garantimos o direito de ir e vir a todos, enfrentamos às mudanças climáticas reduzindo a emissão de gases poluentes e movimentamos a economia.',
    'A Tarifa Zero já faz parte da realidade do Distrito Federal: aos domingos e feriados o transporte público é gratuito.',
    'E ela já pode ser considerada um sucesso com base no número de vezes que uma catraca rodou tanto nos ônibus, quanto no Metrô-DF: Foram mais de 37,8 milhões de acessos ao Sistema de Transporte Público Coletivo do DF (STPC/DF).',
    'Tudo isso aconteceu em apenas 82 dias de benefício para os usuários. Foram 52 domingos, 7 feriados e 23 dias de extensão de feriados, festividades e eventos.',
    'A Tarifa Zero aumentou em 70% a demanda de ônibus aos domingos, aos feriados chegou a aumentar a demanda por transporte em até 111%.',
    'Com a Tarifa Zero tem mais gente circulando a cidade, seja para o estudo, lazer ou trabalho!',
    'Tarifa Zero não é gasto, é investimento!',
    'Nos dias de gratuidade, milhões foram injetados na economia local. De acordo com uma pesquisa do Instituto Fecomércio-DF, 96% dos lojistas perceberam aumento no fluxo de clientes, as vendas nos comércios das cidades cresceram em até 27,2%. Além disso, 54,4% de quem circula nos dias de Tarifa Zero no DF reinvestem a economia da passagem de ônibus em alimentação.',
    'A Tarifa Zero garante a transferência de renda, movimenta a economia e fortalece toda a cidade!',
    'A Tarifa Zero representa apenas 11% do custo total do Sistema de Transporte Público Coletivo do DF (STPC/DF). Então ao contrário do que os desinformados tentam vender, a Tarifa Zero não aumenta o custo do GDF com transporte público e também não tira o emprego dos trabalhadores do sistema, na verdade, com o aumento da demanda, aumentam-se as vagas e com a modernização do sistema, ampliam-se as funções; por exemplo, os cobradores podem se tornar agentes de bordo, e mais motoristas serão contratados.',
    'Nós vamos seguir lutando incansavelmente para o DF ter Tarifa Zero todos os dias!',
  ],
};

export const projetosDeLeiIntro = [
  'A cabeça pensa onde os pés pisam',
  'O Distrito Federal é majoritariamente composto por mulheres, jovens, negros e trabalhadores e pessoas que moram nas periferias, mas, infelizmente, esses grupos estão sub-representados na Câmara Legislativa do DF (CLDF).',
  'Ou seja, o verdadeiro Povo do DF, em 30 anos de CLDF, esteve pouquíssimas vezes no centro das formulações de leis, sem realmente poder incidir nesse espaço tão importante.',
  'Quando iniciamos os trabalhos do Gabinete Aba Reta, fizemos uma escolha: melhorar a vida da população que faz essa cidade funcionar todos os dias. As leis são instrumentos muito importantes para isso e isso direciona nossa ação legislativa.',
  'Em quase 4 anos de Gabinete Aba Reta tivemos 14 leis sancionadas e que com aplicação e vontade do Poder Executivo estão mudando a realidade do DF. Se liga:',
];

export const projetosDeLei: LawItem[] = [
  {
    number: 'Lei Nº 7.287',
    title: 'Sigilo de dados para mulheres vítimas de violência',
    description:
      'Garante sigilo de dados nos cadastros de órgãos públicos do DF para mulheres vítimas de violência doméstica e intrafamiliar, incluindo seus filhos e outros membros familiares próximos nessa garantia de sigilo.',
  },
  {
    number: 'Lei Complementar Nº 1032',
    title: 'Lei da Licença Menstrual',
    description:
      'Garante uma licença de três dias consecutivos, a cada mês, às mulheres que comprovem sintomas graves associados ao fluxo menstrual.',
  },
  {
    number: 'Lei Nº 7.777',
    title: 'Direito da parturiente de natimorto',
    description:
      'Altera a Lei nº 6.798 e garante a possibilidade de ofertar às parturientes de natimorto acomodação, em leito ou ala, em área separada dos demais pacientes e gestantes.',
  },
  {
    number: 'Lei Nº 7.462',
    title: 'Lei Maria da Penha nos concursos do GDF',
    description:
      'Exige o tema da Lei Maria da Penha em concursos do GDF e impede a posse ou a progressão de carreira de condenados por violência doméstica.',
  },
  {
    number: 'Lei Nº 7.701',
    title: 'Lei da Casa da Doméstica',
    description:
      'Cria o programa distrital de acolhimento, valorização e garantia de direitos para as trabalhadoras domésticas do Distrito Federal.',
  },
  {
    number: 'Lei Nº 7.517',
    title: 'Lei Vinicius Jr.',
    description:
      'Serviu como base para a Campanha do GDF Cartão Vermelho para o Racismo, criando medidas, protocolos e ações de combate ao racismo nos estádios e arenas esportivas do Distrito Federal.',
  },
  {
    number: 'Lei Nº 7.274',
    title: 'Hip Hop Patrimônio Cultural do DF',
    description:
      'Reconhece a história e extrema importância do movimento Hip Hop, declarando-o patrimônio cultural e imaterial do DF.',
  },
  {
    number: 'Lei Nº 7.645',
    title: 'Fim da discriminação em elevadores',
    description:
      'Põe fim à distinção entre “elevador social” e “elevador de serviço”, acabando com a discriminação no uso de elevadores no Distrito Federal.',
  },
  {
    number: 'Lei Nº 7.793',
    title: 'Iluminação nas paradas de ônibus',
    description:
      'Faz o que ninguém sequer pensou em fazer nos 30 anos de CLDF e torna a iluminação pública em paradas de ônibus, passarelas e passagens subterrâneas no Distrito Federal obrigatória e um direito do pedestre.',
  },
  {
    number: 'Lei Nº 7.463',
    title: 'Política de Mobilidade a Pé',
    description:
      'Pioneira em criar uma política ampla para pedestres no DF ao lado de ativistas e pesquisadores, pensando na construção de calçadas, ciclovias e rotas de acessibilidade, pautada no acesso à cidade.',
  },
  {
    number: 'Lei Nº 7.836',
    title: 'Transparência no Sistema de Transporte Público do DF',
    description:
      'Torna obrigatória a divulgação de dados relativos ao Sistema de Transporte Público Coletivo do Distrito Federal.',
  },
  {
    number: 'Lei Nº 7.714',
    title: 'Segurança em zonas ferroviárias',
    description:
      'Obriga a criação de protocolos de segurança entre veículos motorizados e trens em zonas ferroviárias do Distrito Federal.',
  },
  {
    number: 'Lei Nº 7.875',
    title: 'Combate ao Racismo Ambiental',
    description:
      'Resultado da realização de Audiências Públicas e reuniões feitas com os movimentos sociais, institui a Política Distrital de Atenção às Emergências Climáticas e Combate ao Racismo Ambiental, protegendo as periferias contra desastres ambientais.',
  },
  {
    number: 'Lei Nº 7.871',
    title: 'Programa Cozinha Solidária Distrital',
    description:
      'Institui o Programa Cozinha Solidária Distrital, pensado em conjunto com os movimentos sociais e OSCs, garantindo incentivo público para iniciativas de distribuição de alimentação gratuita para a população em situação de vulnerabilidade, risco social e em situação de rua.',
  },
];

export const ctmUPage = {
  title: 'CTMU',
  intro:
    'Durante os três primeiros anos do nosso mandato, a luta por Tarifa Zero e por melhorias no transporte público e na mobilidade urbana do Distrito Federal estiveram no centro! Por meio da atuação vigorosa do Gabinete Aba Reta e da Comissão de Transporte e Mobilidade Urbana (CTMU) da Câmara Legislativa do Distrito Federal (CLDF), se tornou um canal de diálogo com as pessoas que moram no DF e usam transporte público, além de dar espaço para que a voz dos sindicatos, autoridades e pesquisadores acadêmicos ecoasse no Poder Legislativo.',
  achievements: [
    'Destinamos mais de 20 milhões de reais para garantir melhorias de verdade no transporte público e mobilidade urbana das nossas cidades',
    'Respondemos 770 demandas de usuários de transporte público no DF',
    'Encaminhamos 3.014 ofícios aos órgãos competentes para resolver as demandas recebidas',
    'Realizamos 120 solicitações oficiais de alteração e ajustes em linhas de ônibus que apresentavam falhas crônicas de atendimento',
    'Construímos 21 reuniões técnicas e 21 reuniões deliberativas, batendo o recorde histórico da CTMU, que antes de nós realizava pouquíssimas reuniões',
    'Organizamos 5 seminários e 6 audiências públicas, assegurando que as nossas decisões legislativas sobre transporte fossem respaldadas pelo povo',
    'Acompanhamos 82 reuniões do Plano Diretor de Transporte Urbano (PDTU), o que garantiu avanços importantes para o transporte público no DF',
    'Garantimos a modernização do Centro de Controle Operacional (CCO), entendendo a relevância do CCO para a transparência do Sistema de Transporte Público Coletivo (STPC/DF)',
    'Realizamos 35 fiscalizações em espaços ligados ao transporte público, como garagens das empresas de ônibus, terminais de ônibus, obras nas vias do DF e espaços de integração de ônibus',
    'Lutamos ao lado dos rodoviários e metroviários, cobrando a melhoria imediata nas suas condições de trabalho',
    'Defendemos o Metrô-DF do projeto de privatização da gestão Ibaneis e Celina Leão, que vem sucateando o equipamento que é essencial para o deslocamento diário da população',
    'Garantimos a extensão do horário de funcionamento do Metrô-DF aos domingos, fazendo o fechamento passar das 19h para as 21h30',
    'Garantimos com muito suor e luta a renovação de toda a frota de ônibus do DF, de todas as empresas, que estava atrasada desde 2020',
    'Apresentamos 11 Projetos de Lei (PLs) voltados a solucionar os problemas diários da população, mantendo firme a meta de viabilizar o transporte público gratuito e de qualidade',
  ],
};

export const maximizandoDfPage = {
  title: 'Maximizando o DF',
  paragraphs: [
    'Maximizar é entregar, é dar acesso, é levar ao máximo a força coletiva que nasce nas quebradas, movimentos, associações de bairros, redes sociais e sindicatos, mostrando que ela pode ocupar os espaços mais altos da política.',
    'Mas temos firmes em nossas mentes e corações que isso exige tempo, exige continuidade!',
    'O primeiro mandato mostrou que a periferia nunca foi problema, sempre foi solução.',
    'A destinação de emendas parlamentares é a forma mais direta de devolver o dinheiro dos impostos para o lugar de onde ele nunca deveria ter saído: a vida das pessoas. Se liga quanto destinamos para cada área em apenas um mandato:',
    'Cada centavo do montante de R$ 116.132.000,00 em emendas foi planejado para fortalecer quem faz o Distrito Federal funcionar todos os dias.',
    'Não são apenas números em uma planilha, são escolas reformadas, projetos potencializados, incentivo à cultura local, tranquilidade para caminhar nas ruas e mais dignidade para as periferias.',
    'O segundo mandato vem para mostrar que ninguém pensa melhor o funcionamento de toda a cidade que a própria periferia.',
    'E dessa vez queremos furar a bolha, sem fazer promessas vazias, sem se esquecer da onde veio, mas querendo chegar em mais pessoas.',
    'A palavra aba reta tem que ser disseminada.',
  ],
  rows: [
    { area: 'Educação', amount: 'R$ 40.144.539,00', percent: '34,6%' },
    { area: 'Saúde', amount: 'R$ 26.438.000,00', percent: '22,8%' },
    { area: 'Meio Ambiente', amount: 'R$ 4.806.000,00', percent: '4,1%' },
    { area: 'Cultura', amount: 'R$ 12.220.000,00', percent: '10,5%' },
    { area: 'Mobilidade Urbana e Infraestrutura', amount: 'R$ 21.196.163,00', percent: '18,3%' },
    { area: 'Assistência Social e Direitos Humanos', amount: 'R$ 9.291.000,00', percent: '8,0%' },
    { area: 'Esporte, Turismo, Segurança e Patrimônio', amount: 'R$ 2.036.298,00', percent: '1,8%' },
  ] satisfies InvestmentRow[],
  total: { area: 'TOTAL INVESTIDO', amount: 'R$ 116.132.000,00', percent: '100%' } satisfies InvestmentRow,
};

export const bondeProMaxPage: PageContent = {
  title: 'Bonde Pro Max',
  paragraphs: [
    'Se você bota fé na gente e quer caminhar ao nosso lado, vem na manha junto com o Bonde Pro Max.',
    'Você pode espalhar nossa palavra com os nossos materiais de campanha, nossas postagens e vídeos. Cola com a gente!',
  ],
};

export const bondePageContent = {
  hero: {
    eyebrow: 'Ninguém maximiza o DF sozinho',
    title: 'Bonde Pro Max',
    subtitle:
      'Se você bota fé na gente e quer caminhar ao nosso lado, vem na manha junto com o Bonde Pro Max. Espalhe nossa palavra com materiais de campanha, postagens e vídeos.',
    variant: 'navy' as const,
  },
  stats: [
    { value: '12.400+', label: 'apoiadores ativos' },
    { value: '48', label: 'regiões cobertas' },
    { value: '230+', label: 'eventos realizados' },
  ],
  avatarStudio: {
    eyebrow: 'Seu avatar no bonde',
    title: 'Crie seu personagem aba reta',
    description:
      'Monte seu avatar no estilo Bonde Pro Max, como nos exemplos ao lado, e compartilhe nas redes para mostrar que você faz parte dessa caminhada.',
    embedUrl: 'https://itch.io/embed-upload/18864275?color=333333',
    embedTitle: 'MaxAvatar2026 no itch.io',
    embedUnavailableMessage:
      'O criador de avatares estará disponível em breve. Enquanto isso, acompanhe o Bonde Pro Max pelos canais oficiais.',
  },
  actions: {
    eyebrow: 'Como participar',
    title: 'Escolha sua forma de agir',
    cards: [
      {
        icon: '📲',
        title: 'Grupo de apoiadores',
        description:
          'Entre no grupo do WhatsApp e receba em primeira mão notícias, convocações e materiais de campanha.',
        cta: 'Entrar no grupo',
        href: siteConfig.whatsapp.bondeGroupUrl,
      },
      {
        icon: '📦',
        title: 'Material de divulgação',
        description:
          'Baixe cards, vídeos e artes prontas para compartilhar nas redes sociais e fortalecer nossas ideias.',
        cta: 'Acessar materiais',
        href: '/materiais',
      },
      {
        icon: '🎨',
        title: 'Crie seu avatar',
        description:
          'Personalize seu personagem aba reto ou aba reta e use nas redes para mostrar que você está no Bonde.',
        cta: 'Criar avatar',
        href: '#criar-avatar',
      },
    ],
  },
  missions: {
    eyebrow: 'Missões ativas',
    title: 'O que você pode fazer agora',
    items: [
      {
        points: '50',
        title: 'Compartilhe o manifesto nas redes',
        difficulty: 'Fácil' as const,
        description: 'Poste o manifesto no Instagram, X ou Facebook com a hashtag #MaximizaDF.',
      },
      {
        points: '100',
        title: 'Convide 3 amigos para o Bonde',
        difficulty: 'Fácil' as const,
        description: 'Chame três pessoas para entrar no grupo de apoiadores e fortalecer nossa rede.',
      },
      {
        points: '150',
        title: 'Participe de uma audiência pública',
        difficulty: 'Médio' as const,
        description: 'Compareça a uma das audiências públicas do mandato e traga sua perspectiva.',
      },
      {
        points: '200',
        title: 'Organize um evento no seu território',
        difficulty: 'Médio' as const,
        description: 'Reúna sua comunidade para assistir e debater as propostas do mandato.',
      },
      {
        points: '300',
        title: 'Colete assinaturas para uma proposta',
        difficulty: 'Avançado' as const,
        description: 'Ajude a reunir apoios para um dos projetos de lei em tramitação.',
      },
    ],
  },
};

export const materiaisPage = {
  title: 'Nossos materiais',
  intro: 'Leia e dissemine a palavra aba reta para construir o DF que queremos:',
  pamphlets: [
    { title: 'Panfleto — Quem é Max Maciel', href: '#' },
    { title: 'Panfleto — Tarifa Zero', href: '#' },
    { title: 'Panfleto — Mandato Aba Reta', href: '#' },
    { title: 'Adesivo — Bonde Pro Max', href: '#' },
    { title: 'Banner para redes sociais', href: '#' },
  ] satisfies PamphletItem[],
};

export const canaisPage = {
  title: 'Acesse nossos canais',
  intro: 'Vem trocar uma ideia com a gente através dos nossos canais:',
  channels: [
    { name: 'Instagram', href: 'https://www.instagram.com/maxmacieldf' },
    { name: 'WhatsApp', href: siteConfig.whatsapp.chatUrl },
    { name: 'Telegram', href: 'https://t.me/+A1v342WcNVRjNGFh' },
  ] satisfies ChannelItem[],
};

export const apoiePage = {
  title: 'Apoie nossa campanha',
  intro:
    'Se você quer MAXimizar as maravilhas para quem acorda cedo e faz a cidade funcionar todos os dias e bota fé na nossa caminhada, se torne um apoiador, assinando aqui:',
};

export const apoiadorFormContent = {
  title: 'PREENCHA COM SEUS DADOS E ASSINE O MANIFESTO',
  placeholders: {
    nome: 'Nome Completo',
    email: 'E-mail',
    whatsapp: 'Whatsapp',
    uf: 'UF',
    municipio: 'Selecione um município',
    regiaoAdministrativa: 'Selecione uma RA',
  },
  checkboxes: {
    novidades: 'Marque aqui para receber novidades',
    campanhaDigital: 'Marque aqui para participar da campanha digital',
    campanhaRua: 'Marque aqui para participar da campanha de rua',
  },
  submitLabel: 'ASSINAR',
  successMessage: 'Manifesto assinado! Obrigado pelo apoio.',
  notConfiguredMessage: 'Cadastro temporariamente indisponível. Tente novamente em breve.',
  lgpdTermTitle: 'TERMO DE ACEITE DA LGPD:',
  lgpdTermText:
    'Ao enviar este formulário, você concorda que o Gabinete Aba Reta utilize os dados informados exclusivamente para responder ao seu contato/atender sua solicitação, em conformidade com a LGPD.',
  lgpdCheckboxLabel: 'Li e concordo com o tratamento dos meus dados pessoais',
  lgpdFormValue: 'Li e concordo com o tratamento dos meus dados pessoais',
  municipioLoading: 'Carregando municípios...',
  municipioSelectUf: 'Selecione a UF primeiro',
};

export const privacyPolicyContent = {
  title: 'Política de Privacidade',
  lastUpdated: 'Agosto de 2026',
  sections: [
    {
      heading: '1. Quem é o controlador dos dados',
      paragraphs: [
        `Esta Política de Privacidade descreve como ${siteConfig.name} e o comitê de campanha responsável pela reeleição tratam os dados pessoais coletados por este site.`,
        `Para questões sobre privacidade e proteção de dados, entre em contato pelo e-mail ${siteConfig.email}.`,
      ],
    },
    {
      heading: '2. Dados que coletamos',
      paragraphs: [
        'Ao assinar o manifesto e tornar-se apoiador, podemos coletar: nome completo, e-mail, número de WhatsApp, UF, município e suas preferências de participação (receber novidades, campanha digital ou campanha de rua).',
        'Não coletamos dados além do necessário para as finalidades descritas nesta política.',
      ],
    },
    {
      heading: '3. Finalidade do tratamento',
      paragraphs: [
        'Utilizamos seus dados para cadastrar apoiadores da campanha, comunicar novidades e convites relacionados ao mandato e à campanha de reeleição, organizar mobilização digital e de rua, e fortalecer a rede de apoiadores do Distrito Federal.',
      ],
    },
    {
      heading: '4. Base legal',
      paragraphs: [
        'O tratamento dos dados pessoais basea-se no consentimento (art. 7º, I, da Lei nº 13.709/2018 — LGPD), manifestado ao assinar o manifesto e marcar as opções de participação, e no legítimo interesse para comunicações relacionadas à finalidade declarada pelo titular.',
      ],
    },
    {
      heading: '5. Compartilhamento de dados',
      paragraphs: [
        'Os dados podem ser armazenados em ferramentas de formulário e planilhas (Google Forms e Google Sheets) utilizadas para organização da campanha. Não vendemos nem comercializamos dados pessoais.',
        'O compartilhamento com terceiros ocorre apenas quando necessário para operação dessas ferramentas ou quando exigido por lei ou ordem judicial.',
      ],
    },
    {
      heading: '6. Retenção dos dados',
      paragraphs: [
        'Os dados são mantidos durante o período da campanha e pelo prazo necessário para cumprimento de obrigações legais aplicáveis. Após esse período, buscamos eliminar ou anonimizar os dados quando não houver necessidade de manutenção.',
      ],
    },
    {
      heading: '7. Seus direitos como titular',
      paragraphs: [
        'Nos termos do art. 18 da LGPD, você pode solicitar: confirmação da existência de tratamento, acesso aos dados, correção de dados incompletos ou desatualizados, anonimização, bloqueio ou eliminação de dados desnecessários, informação sobre compartilhamento e revogação do consentimento.',
      ],
    },
    {
      heading: '8. Como exercer seus direitos',
      paragraphs: [
        `Para exercer qualquer um desses direitos, envie um e-mail a ${siteConfig.email} com o assunto "Privacidade — LGPD". Responderemos em prazo razoável, conforme a legislação aplicável.`,
      ],
    },
    {
      heading: '9. Segurança',
      paragraphs: [
        'Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados pessoais contra acessos não autorizados, perda ou uso indevido. Ferramentas de terceiros utilizadas para armazenamento operam como subprocessadores sob suas próprias políticas de segurança.',
      ],
    },
    {
      heading: '10. Alterações nesta política',
      paragraphs: [
        'Esta política pode ser atualizada para refletir mudanças nas práticas de tratamento de dados ou exigências legais. A data da última revisão consta no topo deste documento.',
      ],
    },
  ],
};

export const doePageContent = {
  hero: {
    eyebrow: 'Fortaleça a campanha',
    title: 'Doe',
    subtitle:
      'Doe e nos ajude a arrecadar recursos financeiros para espalhar ainda mais a campanha de reeleição do nosso Aba Reta favorito.',
    variant: 'red' as const,
  },
  amounts: [10, 30, 50, 100, 200],
  defaultAmount: 30,
  form: {
    title: 'Escolha o valor da sua doação',
    subtitle: 'Qualquer valor faz diferença. Obrigado por acreditar no Bonde.',
    selectedLabel: 'Valor selecionado',
    customLabel: 'Outro valor:',
    namePlaceholder: 'Seu nome completo',
    emailPlaceholder: 'E-mail',
    cpfPlaceholder: 'CPF',
    legalNote: 'Doação regulamentada pelo TSE. CNPJ Max Maciel: 68.267.093/0001-59.',
  },
  impactCards: [
    {
      emoji: '🗺️',
      title: 'Presença no território',
      description:
        'Financiar eventos, visitas e escutatórias nos cantos do DF onde a população precisa ser ouvida.',
    },
    {
      emoji: '📢',
      title: 'Produção de conteúdo',
      description:
        'Vídeos, podcasts e materiais que informam e mobilizam a comunidade em torno das nossas propostas.',
    },
    {
      emoji: '⚖️',
      title: 'Assessoria legislativa',
      description:
        'Técnicos para elaborar projetos de lei robustos e acompanhar votações no Congresso.',
    },
  ],
};

export const artigos: Article[] = [
  {
    id: 'algoritmo-da-privatizacao',
    title: 'O algoritmo da privatização',
    paragraphs: [
      'Em um mundo em que a inteligência artificial promete prever o futuro, não precisamos de um prompt sofisticado para saber o que pode acontecer com o Metrô do Distrito Federal. O roteiro já é um velho conhecido: primeiro diminuem os investimentos, a manutenção deixa de acompanhar as necessidades do sistema, os equipamentos envelhecem, a qualidade do serviço piora e a população perde a confiança no transporte público. É justamente nesse momento que surge o discurso de que a privatização seria a única solução.',
      'Esse processo não acontece por acaso. Afinal, sucatear também é uma escolha política. O descarrilamento registrado no Metrô-DF somente reforça a urgência dos alertas que a Comissão de Transporte e Mobilidade Urbana tem feito à Secretaria de Mobilidade do DF, ao Tribunal de Contas do Distrito Federal e ao Ministério Público.',
      'É grave que um descarrilamento tenha acontecido, ao que tudo indica, por uma peça que caiu de uma composição. Felizmente, não houve feridos, mas é o prenuncio de que se nada for feito para mudar, algo pior pode acontecer. Desde 2023, a CTMU vem apontando após inspeções: frota envelhecida, redução do número de trens disponíveis, equipes de manutenção sobrecarregadas e um sistema que, diante da dificuldade para obter peças de reposição, passou a depender da canibalização de composições para continuar funcionando.',
      'Dos 32 trens da frota, apenas 19 circulam regularmente. Em alguns momentos deste ano, o sistema chegou a operar com apenas 12 composições nos horários de maior demanda. Outros dez trens aguardam manutenção e quatro sequer têm condições de voltar à operação, servindo apenas para fornecer peças às demais composições. Agora, mais um trem ficará fora de operação por tempo indeterminado.',
      'A investigação dirá a relação entre esses fatos. O que já se pode afirmar é que o episódio evidencia um sistema que deixou de preocupar apenas pela perda de eficiência e passou a exigir atenção redobrada com sua segurança operacional.',
      'Nada disso aconteceu de um dia para o outro. Um sistema de transporte não chega a esse nível de deterioração por acidente. Entre 2019 e 2024, o Governo do Distrito Federal empenhou cerca de apenas 1% dos recursos previstos para investimentos no Metrô-DF. Na prática, R$ 1 bilhão deixou de ser investido no sistema metroviário enquanto o governo aportou bilhões em viadutos e rodovias.',
      'O problema não é apenas quanto se investe, mas também como o sistema é financiado. Enquanto as empresas de ônibus recebem por meio da tarifa técnica — um modelo que cobre custos operacionais, manutenção e renovação da frota independentemente da arrecadação das passagens —, o Metrô-DF continua dependendo, em grande medida, da receita obtida com os próprios passageiros para custear sua operação. Esse desequilíbrio compromete um sistema que deveria ser planejado de forma integrada.',
      'O metrô precisa voltar a ser a espinha dorsal da mobilidade do Distrito Federal, realizando os grandes deslocamentos entre as regiões administrativas e o Plano Piloto, enquanto os ônibus cumprem o papel de alimentar essa rede.',
      'É indispensável modernizar o sistema de energia para ampliar a capacidade operacional da rede, reduzir a dependência de equipamentos obsoletos e permitir a entrada de novas composições. Também é urgente recompor o quadro de servidores, fortalecer a manutenção preventiva e garantir investimentos permanentes para que a companhia deixe de atuar apenas apagando incêndios e volte a planejar o futuro.',
      'O futuro do Metrô-DF ainda pode ser reescrito. Mas isso exige coragem para abandonar a política do improviso e transformar o transporte público em uma verdadeira prioridade de Estado. Com um modelo de financiamento mais justo, investimentos permanentes e planejamento de longo prazo será possível adquirir novos trens, ampliar o quadro de servidores, recuperar a capacidade operacional da companhia e levar o metrô às regiões administrativas que há décadas aguardam essa expansão.',
      'Não precisamos escolher entre um metrô sucateado e um metrô privatizado. Precisamos escolher um metrô forte, moderno, seguro e capaz de atender às necessidades da população. Porque patrimônio público não se abandona. Patrimônio público se fortalece.',
    ],
  },
  {
    id: 'racismo-ambiental',
    title: 'Sem enfrentar o racismo ambiental, não existe projeto de cidade',
    paragraphs: [
      'Em breve, estaremos em mais um período eleitoral. As campanhas ocuparão as ruas e as redes sociais. Falaremos sobre saúde, segurança, transporte, educação, geração de emprego e desenvolvimento econômico. No entanto, existe uma pauta que continua praticamente ausente do debate público: o racismo ambiental.',
      'Enquanto esse tema permanecer invisível, continuaremos discutindo apenas os efeitos da desigualdade, sem enfrentar suas causas. Muita gente ainda acredita que racismo ambiental é apenas uma questão ligada ao meio ambiente, mas não é. Na verdade, é compreender quem convive diariamente com enchentes, calor extremo, falta de árvores, esgoto a céu aberto, rios contaminados e infraestrutura precária. E, principalmente, entender por que isso acontece sempre nos mesmos lugares.',
      'No Brasil, e em especial no Distrito Federal, a desigualdade tem endereço. Basta comparar o Plano Piloto com a maioria das regiões administrativas. Quando chegam as chuvas, as cidades param. Quando chega a seca, o calor se torna quase insuportável. As mudanças climáticas atingem todos nós, mas seus impactos são muito mais severos para quem vive onde o GDF historicamente investiu menos.',
      'Brasília foi construída sobre um projeto urbano profundamente desigual. Enquanto servidores públicos, militares, arquitetos e engenheiros recebiam moradias estruturadas no centro da nova capital, milhares de trabalhadores responsáveis por erguer a cidade foram empurrados para ocupações distantes, sem infraestrutura e, posteriormente, removidos para regiões cada vez mais afastadas. Essa lógica de segregação territorial permanece viva até hoje.',
      'As periferias foram planejadas para garantir um teto, mas não qualidade de vida. Como se o direito do pobre terminasse na porta de casa. Dignidade não é apenas ter um endereço. É viver em uma cidade que ofereça sombra, parques urbanos, áreas de convivência e espaços públicos onde crianças podem brincar, famílias podem se encontrar e a população pode exercer plenamente o direito à cidade.',
      'Todas as regiões administrativas possuem um plano urbanístico de desenvolvimento. No entanto, o Plano Piloto e os lagos Sul e Norte concentram grande parte da arborização e recebem, com mais frequência, novas mudas de árvores. Já as periferias convivem com menos áreas verdes, mais calor e maior vulnerabilidade às mudanças climáticas.',
      'Essa desigualdade também se revela na forma como cuidamos do Rio Melchior e do Lago Paranoá. Mesmo sendo importante para o abastecimento de água de grande parte da população, o Melchior, que passas pela Ceilândia e Samambaia, continua recebendo esgoto, resíduos e sofrendo sucessivos processos de degradação. Já o Lago Paranoá, cartão-postal cercado por grandes mansões, recebe investimentos para manter suas águas próprias para banhistas, turistas e donos de embarcações.',
      'Quando afirmo que existe racismo ambiental, não estou dizendo que a chuva escolhe onde cair. Estou dizendo que o poder público escolhe, há décadas, onde investir. Escolhe onde plantar árvores, construir parques, ampliar a drenagem, levar saneamento, recuperar córregos e regularizar bairros. Também escolhe quais territórios podem continuar esperando.',
      'As nossas casas alagam, as ruas se transformam em rios e as cidades se tornam verdadeiras ilhas de calor porque o planejamento urbano nunca preparou as periferias para enfrentar esses desafios. Garantiram moradia, mas não construíram cidades sustentáveis, humanas e resilientes. Retiraram áreas verdes para dar lugar ao concreto, impermeabilizaram o solo sem investir em drenagem e deixaram a periferia mais vulnerável aos efeitos da crise climática.',
      'No DF, o CEP ainda determina a velocidade com que o Estado chega. É justamente por isso que o racismo ambiental precisa ocupar o centro do debate eleitoral. Ainda dá tempo de mudar essa história, mas, para isso, precisamos pensar o desenvolvimento do Distrito Federal a partir das periferias, ouvindo quem mais sente os efeitos da desigualdade territorial e da crise climática, e não apenas a partir da realidade do centro.',
      'As eleições são o momento em que decidimos quais prioridades orientarão o orçamento público pelos próximos anos. Ignorar o racismo ambiental significa continuar destinando recursos de forma desigual e aceitar que algumas regiões sigam acumulando riscos, enquanto outras concentram qualidade de vida.',
      'Não existe justiça climática sem justiça territorial. E não existe democracia plena enquanto o lugar onde uma pessoa mora continuar determinando o tamanho da proteção que ela recebe do Estado.',
    ],
  },
];

export const artigosPage = {
  title: 'Artigos',
  intro:
    'Reflexões sobre mobilidade, cidade e justiça territorial — o que Max Maciel escreve para colocar a periferia no centro do debate público.',
};

export const midiaPage = {
  title: 'Max na Mídia',
  sections: [
    { title: 'Notícias', items: newsItems.map((item) => item.title) },
    { title: 'Entrevistas em vídeo', items: videoItems.map((item) => item.title) },
    { title: 'Artigos', items: artigos.map((article) => article.title) },
  ] satisfies MidiaSection[],
};

export const midiaPageContent = {
  hero: {
    eyebrow: 'Cobertura',
    title: 'Max na Mídia',
    subtitle: 'Entrevistas, reportagens e cobertura do mandato na imprensa nacional.',
    variant: 'red' as const,
  },
  tabs: [
    { id: 'todos', label: 'Todos' },
    { id: 'entrevistas', label: 'Entrevistas' },
    { id: 'reportagens', label: 'Reportagens' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'redes-sociais', label: 'Redes sociais' },
  ],
  items: [
    {
      id: 'midia-1',
      category: 'Entrevistas',
      title: 'ENTREVISTA COMPLETA – REDETV NOTICIAS',
      source: 'RedeTV Notícias',
      date: '03/06/2026',
      href: '#',
      imageUrl: midiaRedetv,
      tab: 'entrevistas',
    },
    {
      id: 'midia-2',
      category: 'Reportagens',
      title: 'Câmara dos Deputados avança com PEC que limita IPVA do carro',
      source: 'Câmara Notícias',
      date: '15/05/2026',
      href: '#',
      imageUrl: midiaCamaraPec,
      tab: 'reportagens',
    },
    {
      id: 'midia-3',
      category: 'Reportagens',
      title: 'Câmara aprova fim da prescrição para condenados foragidos',
      source: 'Folha de S.Paulo',
      date: '08/05/2026',
      href: '#',
      imageUrl: midiaFolha,
      tab: 'reportagens',
    },
    {
      id: 'midia-4',
      category: 'Entrevistas',
      title: 'Max Maciel fala sobre Tarifa Zero no Jornal Nacional',
      source: 'TV Globo',
      date: '20/04/2026',
      href: '#',
      imageUrl: midiaGlobo,
      tab: 'entrevistas',
    },
    {
      id: 'midia-5',
      category: 'Podcasts',
      title: 'Periféricos Podcast – Max Maciel e o futuro do DF',
      source: 'Spotify',
      date: '10/04/2026',
      href: '#',
      imageUrl: midiaPodcast,
      tab: 'podcasts',
    },
    {
      id: 'midia-6',
      category: 'Reportagens',
      title: 'Deputado Max Maciel destina emendas para escolas de Ceilândia',
      source: 'Metrópoles',
      date: '01/04/2026',
      href: '#',
      imageUrl: midiaRedetv,
      tab: 'reportagens',
    },
  ],
};

export const contatoPage = {
  title: 'Contato',
  intro:
    'Entre em contato com a gente através das nossas redes sociais ou, se preferir, pelo e-mail e telefone abaixo:',
  email: siteConfig.email,
  phone: '(61) 0000-0000',
};
