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
} from '../types/index.ts';

export const siteConfig = {
  name: 'Deputado Max Maciel',
  tagline: 'Coragem para defender o Distrito Federal',
  phase: 'Prestação de Contas de Mandato',
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
    number: '5561999999999',
    message: 'Olá! Quero acompanhar o mandato do Deputado Max Maciel.',
  },
  email: 'contato@maxmaciel.df.br',
} as const;

export const navItems: NavItem[] = [
  { label: 'Quem é Max', href: '/quem-e-max' },
  { label: 'Mandato Aba Reta', href: '/mandato' },
  { label: 'Bonde Pro Max', href: '/bonde-pro-max' },
  { label: 'Doe', href: '/doe' },
  { label: 'Max na Mídia', href: '/midia' },
  { label: 'Materiais', href: '/materiais' },
  { label: 'Contato', href: '/contato' },
];

export const heroContent = {
  headline: 'Coragem para defender o Distrito Federal',
  subheadline:
    'Transparência, trabalho e resultados concretos para quem vive e trabalha no DF. Acompanhe a prestação de contas do mandato.',
};

export const heroQuickLinks: QuickLink[] = [
  { label: 'Quem é Max', href: '#quem-e-max' },
  { label: 'Bonde Pro Max', href: '#bonde-pro-max' },
  { label: 'Doe', href: '#doe' },
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
  title: 'Tarifa Zero é possível',
  description:
    'Mobilidade como direito, não privilégio. O projeto de Tarifa Zero no transporte público do DF garante acesso digno a quem mais depende do ônibus para trabalhar, estudar e viver.',
  highlights: [
    'Redução do custo de vida para famílias trabalhadoras',
    'Mais pessoas usando transporte coletivo e menos carros nas vias',
    'Financiamento transparente com fiscalização do mandato',
  ],
};

export const stats: StatItem[] = [
  { value: 47, suffix: '+', label: 'Projetos apresentados' },
  { value: 12, suffix: '', label: 'Leis sancionadas' },
  { value: 28, suffix: ' mi', label: 'Emendas para saúde (R$)' },
  { value: 156, suffix: '', label: 'Audiências e reuniões' },
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
    href: 'https://chat.whatsapp.com/exemplo',
  },
  {
    id: 'apoie-manifesto',
    title: 'Apoie o manifesto',
    description: 'Assine e divulgue nossas propostas por um DF mais justo, acessível e transparente.',
    cta: 'Assinar manifesto',
    href: '#apoie-manifesto',
  },
  {
    id: 'missoes',
    title: 'Missões',
    description: 'Participe de ações pontuais: panfletagem, mutirões de escuta e mobilizações nas RAs.',
    cta: 'Ver missões',
    href: '#missoes',
  },
];




export const clippingContent = {
  eyebrow: 'Max na mídia',
  title: 'Maximizando o DF',
  interviewsLabel: 'Destaque em entrevistas',
  reportsLabel: 'Destaque em reportagens',
  cta: 'Ver reportagens',
  ctaHref: '/midia',
};

export const clippingInterview: ClippingInterview = {
  id: 'featured-interview',
  badge: 'Entrevista completa',
  title: 'Kim Kataguiri – entrevista completa RedeTV Notícias (03/06/2026)',
  href: 'https://youtube.com/@maxmaciel',
};

export const clippingReports: ClippingReport[] = [
  {
    id: 'report-1',
    title: 'Câmara dos Deputados avança com PEC que limita IPVA do carro',
    source: 'Câmara Notícias',
    href: '#',
  },
  {
    id: 'report-2',
    title: 'Câmara aprova fim da prescrição para condenados foragidos',
    source: 'Folha de S.Paulo',
    href: '#',
  },
  {
    id: 'report-3',
    title: 'Deputado Max Maciel apresenta projeto de Tarifa Zero no DF',
    source: 'Portal Legislativo',
    href: '#',
  },
];

export const zeroFareContent = {
  title: 'Tarifa Zero é possível',
  description:
    '6 destaques do nosso mandato que provam que uma cidade melhor é possível.',
};

export const zeroFareCards: ZeroFareCard[] = [
  {
    id: 'economia-anual',
    type: 'stat',
    value: 'R$ 500M',
    label: 'Economia anual com tarifa zero no DF',
  },
  {
    id: 'pessoas-beneficiadas',
    type: 'stat',
    value: '2.3M',
    label: 'Pessoas beneficiadas pelo transporte gratuito',
  },
  {
    id: 'reducao-carros',
    type: 'stat',
    value: '40%',
    label: 'Redução de carros nas vias com tarifa zero',
  },
  {
    id: 'emendas-escolas',
    type: 'highlight',
    title: 'Emendas para todas as escolas públicas do DF',
    size: 'tall',
  },
  {
    id: 'passe-livre',
    type: 'highlight',
    title: 'Passe livre estudantil ampliado para toda rede',
    size: 'compact',
  },
  {
    id: 'integracao-modais',
    type: 'highlight',
    title: 'Integração total entre metrô, BRT e ônibus',
    size: 'compact',
  },
];

export const crewContent = {
  eyebrow: 'Ninguém maximiza o DF sozinho',
  title: 'Bonde Pro Max',
};

export const crewCards: CrewCard[] = [
  {
    id: 'emendas-escolas',
    title: 'Emendas nas Escolas',
    description: 'Investimento direto em todas as escolas públicas do Distrito Federal.',
    cta: 'Saiba mais',
    href: '/maximizando-df',
  },
  {
    id: 'tarifa-zero',
    title: 'Tarifa Zero',
    description: 'Mobilidade como direito para quem depende do transporte público no DF.',
    cta: 'Saiba mais',
    href: '/mandato/tarifa-zero',
  },
  {
    id: 'grupo-apoiadores',
    title: 'Grupo de apoiadores',
    description: 'Receba atualizações do mandato, votações e convites para audiências.',
    cta: 'Participar',
    href: '/bonde-pro-max',
  },
  {
    id: 'espalhe-material',
    title: 'Espalhe o material',
    description: 'Baixe artes, vídeos e textos prontos para compartilhar nas suas redes.',
    cta: 'Ver materiais',
    href: '/materiais',
  },
  {
    id: 'missoes',
    title: 'Missões',
    description: 'Participe de panfletagem, mutirões de escuta e mobilizações nas RAs.',
    cta: 'Ver missões',
    href: '/apoie',
  },
  {
    id: 'apoie-manifesto',
    title: 'Apoie o manifesto',
    description: 'Assine e divulgue nossas propostas por um DF mais justo e transparente.',
    cta: 'Assinar',
    href: '/apoie',
  },
];

export const doeContent = {
  title: 'Apoie a luta por um DF melhor',
  description:
    'Sua contribuição financia material de campanha, mobilização nas regiões administrativas e a continuidade do mandato popular.',
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
    href: 'https://youtube.com/@maxmaciel',
  },
  {
    id: '2',
    type: 'video',
    title: 'Tarifa Zero: por que é possível no DF',
    source: 'YouTube',
    date: 'Nov 2025',
    href: 'https://youtube.com/@maxmaciel',
  },
];

export const socialLinks: SocialLink[] = [
  { name: 'Instagram', href: 'https://instagram.com/maxmaciel', icon: Share2 },
  { name: 'Facebook', href: 'https://facebook.com/maxmaciel', icon: Globe },
  { name: 'YouTube', href: 'https://youtube.com/@maxmaciel', icon: MessageCircle },
];

export function whatsappUrl(customMessage?: string): string {
  const msg = encodeURIComponent(customMessage ?? siteConfig.whatsapp.message);
  return 'https://wa.me/' + siteConfig.whatsapp.number + '?text=' + msg;
}

export const socialBarLinks: SocialBarLink[] = [
  { name: 'Instagram', href: 'https://instagram.com/maxmaciel', platform: 'instagram' },
  { name: 'WhatsApp', href: 'https://wa.me/5561999999999', platform: 'whatsapp' },
  { name: 'YouTube', href: 'https://youtube.com/@maxmaciel', platform: 'youtube' },
  { name: 'TikTok', href: 'https://tiktok.com/@maxmaciel', platform: 'tiktok' },
  { name: 'Facebook', href: 'https://facebook.com/maxmaciel', platform: 'facebook' },
  { name: 'X', href: 'https://x.com/maxmaciel', platform: 'x' },
];


export const volunteerRegions = ['Plano Piloto', 'Ceilândia', 'Taguatinga', 'Samambaia', 'Gama', 'São Sebastião', 'Planaltina', 'Outra RA'];

export const footerLinks = [
  { label: 'Política de privacidade', href: '#privacidade' },
  { label: 'Termos de uso', href: '#termos' },
  { label: 'Contato', href: '/contato' },
];

export const quemEPage: PageContent = {
  title: 'Quem é o Max Maciel?',
  paragraphs: [
    'Max Maciel é candidato à Deputado Distrital e com seu apoio ele vai para o seu segundo mandato.',
    'Nascido em 1982 em Ceilândia, Max Maciel é o filho caçula do Seu Agamenon e da Dona Goreth, casal nordestino que veio para Brasília, assim como tantos outros, para lutar por mais oportunidades.',
    'Em 2022, Max Maciel se tornou o terceiro Deputado Distrital mais votado do DF, eleito com 35.758 votos.',
  ],
};

export const quemEPageContent = {
  hero: {
    eyebrow: 'Conheça',
    title: 'Quem é Max Maciel',
    subtitle: 'Da periferia para o Congresso — uma história de luta, cultura e transformação.',
    variant: 'navy' as const,
  },
  origin: {
    eyebrow: 'Origem',
    title: 'Nascido na Ceilândia',
    paragraphs: [
      'Nascido em 1982 em Ceilândia, Max Maciel é o filho caçula do Seu Agamenon e da Dona Goreth, casal nordestino que veio para Brasília, assim como tantos outros, para lutar por mais oportunidades.',
      'Mas antes disso, o nosso deputado aba reta começou sua trajetória no movimento estudantil, especificamente no grêmio da sua escola, e depois formou o grupo Atitude com seus amigos, que circulava escolas públicas de ensino médio falando sobre prevenção e educação sexual.',
      'Além de ter nascido na RA mais populosa do Distrito Federal, o Max fez morada na cidade: cresceu, estudou, trabalhou, se casou há mais de 20 anos com Ildely Ana, teve duas filhas e ainda mora em Ceilândia.',
    ],
  },
  timeline: {
    eyebrow: 'Trajetória',
    title: 'Uma história de compromisso',
    items: [
      {
        year: 'Anos 90',
        title: 'Movimento estudantil e grupo Atitude',
        description:
          'Trajetória no movimento estudantil, integração de conselhos e atuação em prevenção e educação sexual nas escolas públicas de ensino médio.',
      },
      {
        year: '2000s',
        title: 'Hip Hop, juventude e quebradas do DF',
        description:
          'Atividades junto com o movimento Hip Hop nas quebradas, pesquisas e defesa da juventude, além de campanhas pelo desarmamento e pelo fim do extermínio da juventude negra.',
      },
      {
        year: '2018',
        title: 'Entrada na política institucional',
        description:
          'Quase 30 anos de luta nos movimentos estudantis, sociais e culturais de Ceilândia e de outras quebradas do DF levam Max à disputa pelo mandato legislativo.',
      },
      {
        year: '2022',
        title: 'Deputado Distrital',
        description:
          'Eleito o terceiro Deputado Distrital mais votado do DF, com 35.758 votos, levando as demandas dos territórios para a Câmara Legislativa.',
      },
      {
        year: '2023',
        title: 'Mandato Aba Reta',
        description:
          'Presidente da CTMU, com a Tarifa Zero como principal bandeira e dezenas de entregas para quem faz o DF funcionar todos os dias.',
      },
    ],
  },
  formation: {
    eyebrow: 'Formação',
    title: 'Pedagogo e gestor público',
    paragraphs: [
      'Ele é pedagogo de formação e especialista em Gestão de Políticas Públicas em Gênero e Raça pela UnB.',
      'Na Câmara Legislativa do Distrito Federal, atualmente ele é presidente da Comissão de Transporte e Mobilidade Urbana (CTMU), e tem como principal bandeira a luta por Tarifa Zero no DF e a garantia do direito à cidade através de um transporte público digno e de qualidade.',
    ],
  },
  principles: {
    eyebrow: 'Princípios',
    title: 'O que guia o mandato',
    cards: [
      {
        icon: '🗺️',
        title: 'Territorialidade',
        description:
          'Política feita nos territórios, com quem vive neles. As respostas para os problemas da periferia nascem na periferia.',
      },
      {
        icon: '🤝',
        title: 'Coletividade',
        description:
          'Ninguém transforma nada sozinho. O Bonde Pro Max é a prova de que a mudança é sempre coletiva.',
      },
      {
        icon: '📢',
        title: 'Transparência',
        description: 'Prestação de contas, mandato aberto e decisões compartilhadas com a base.',
      },
      {
        icon: '🎵',
        title: 'Cultura como direito',
        description: 'Cultura não é luxo — é ferramenta de resistência, identidade e desenvolvimento.',
      },
      {
        icon: '⚖️',
        title: 'Justiça social',
        description: 'Um DF mais justo é possível. Redistribuição de recursos, oportunidades e poder.',
      },
      {
        icon: '🚌',
        title: 'Mobilidade pública',
        description: 'Tarifa Zero, integração total e transporte digno para todos os cantos do DF.',
      },
    ],
  },
  cta: {
    title: 'Faça parte desta história',
    primary: { label: 'Entrar no Bonde', href: '/bonde-pro-max' },
    secondary: { label: 'Doe agora', href: '/doe' },
    variant: 'navy' as const,
  },
};

export const mandatoHub = {
  title: 'Mandato Aba Reta',
  intro: 'Conheça as principais frentes de trabalho do primeiro mandato:',
  links: [
    { label: 'Tarifa Zero', href: '/mandato/tarifa-zero' },
    { label: 'Projetos de Lei', href: '/mandato/projetos-de-lei' },
    { label: 'CTMU', href: '/mandato/ctmu' },
  ] satisfies PageLink[],
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
  'Em quase 4 anos de Gabinete Aba Reta tivemos 10 leis sancionadas e que com aplicação e vontade do Poder Executivo estão mudando a realidade do DF. Se liga:',
];

export const projetosDeLei: LawItem[] = [
  {
    number: 'Lei Nº 7.287',
    title: 'Sigilo de dados para mulheres vítimas de violência',
    description:
      'Garante sigilo de dados nos cadastros de órgãos públicos do DF para mulheres vítimas de violência doméstica e intrafamiliar, incluindo seus filhos e outros membros familiares próximos nessa garantia de sigilo.',
  },
  {
    number: 'Lei Complementar N° 1032',
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
    number: 'Lei Nº 7.875',
    title: 'Programa Cozinha Solidária Distrital',
    description:
      'Institui o Programa Cozinha Solidária Distrital, pensado em conjunto com os movimentos sociais e OSCs, garantindo incentivo público para iniciativas de distribuição de alimentação gratuita para a população em situação de vulnerabilidade, risco social e em situação de rua.',
  },
  {
    number: 'Lei Nº 7.517',
    title: 'Lei Vinicius Jr',
    description:
      'Serviu como base para a Campanha do GDF Cartão Vermelho para o Racismo, criando medidas, protocolos e ações de combate ao racismo nos estádios e arenas esportivas do Distrito Federal.',
  },
  {
    number: 'Lei N° 7.274',
    title: 'Hip Hop Patrimônio Cultural do DF',
    description:
      'Reconhece a história e extrema importância do movimento Hip Hop, declarando-o patrimônio cultural imaterial do DF.',
  },
  {
    number: 'Lei Nº 7.836',
    title: 'Transparência no Sistema de Transporte Público do DF',
    description:
      'Torna obrigatória a divulgação de dados relativos ao Sistema de Transporte Público Coletivo do Distrito Federal.',
  },
  {
    number: 'Lei Nº 7.793',
    title: 'Iluminação nas paradas de ônibus',
    description:
      'Faz o que ninguém sequer pensou em fazer nos 30 anos de CLDF e torna a iluminação pública em paradas de ônibus, passarelas e passagens subterrâneas no Distrito Federal obrigatória e um direito do pedestre.',
  },
  {
    number: 'Lei N° 7.463',
    title: 'Política de Mobilidade a Pé',
    description:
      'Pioneira em criar uma política ampla para pedestres no DF ao lado de ativistas e pesquisadores, pensando na construção de calçadas, ciclovias e rotas de acessibilidade, pautada no acesso à cidade.',
  },
  {
    number: 'Lei Nº 7.875',
    title: 'Combate ao Racismo Ambiental',
    description:
      'Resultado da realização de Audiências Públicas e reuniões feitas com os movimentos sociais, institui a Política Distrital de atenção às Emergências Climáticas, Prevenção aos Desastres Ambientais e Combate ao Racismo Ambiental.',
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
    'A destinação de emendas parlamentares é a forma mais direta de devolver o dinheiro dos impostos para o lugar de onde ele nunca deveria ter saído: a vida das pessoas.',
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
    { name: 'Instagram', href: 'https://instagram.com/maxmaciel' },
    { name: 'WhatsApp', href: 'https://wa.me/5561999999999' },
    { name: 'Telegram', href: 'https://t.me/maxmaciel' },
  ] satisfies ChannelItem[],
};

export const apoiePage = {
  title: 'Apoie nossa campanha',
  intro:
    'Se você quer MAXzimizar as maravilhas para quem acorda cedo e faz a cidade funcionar todos os dias e bota fé na nossa caminhada, se torne um apoiador, assinando aqui:',
  note: 'TODO: verificar campos com Caio.',
};

export const doePage: PageContent = {
  title: 'Doe',
  paragraphs: [
    'Você também pode apoiar nossa campanha financeiramente!',
    'Doe e nos ajude a arrecadar recursos financeiros para espalhar ainda mais a campanha de reeleição do nosso Aba Reta favorito.',
  ],
};

export const midiaPage = {
  title: 'Max na Mídia',
  sections: [
    { title: 'Notícias', items: newsItems.map((item) => item.title) },
    { title: 'Entrevistas em vídeo', items: videoItems.map((item) => item.title) },
    { title: 'Artigos', items: ['Em breve'] },
  ] satisfies MidiaSection[],
};

export const contatoPage = {
  title: 'Contato',
  intro:
    'Entre em contato com a gente através das nossas redes sociais ou, se preferir, pelo e-mail e telefone abaixo:',
  email: siteConfig.email,
  phone: '(61) 0000-0000',
};
