import {
  Share2,
  Globe,
  MessageCircle,
} from 'lucide-react';
import type {
  NavItem,
  QuickLink,
  ContentBlock,
  AgendaTopic,
  MediaItem,
  StatItem,
  SocialLink,
  SocialBarLink,
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
  { label: 'Quem é Max', href: '#quem-e-max' },
  { label: 'Mandato Aba Reta', href: '#mandato-aba-reta' },
  { label: 'Bonde Pro Max', href: '#bonde-pro-max' },
  { label: 'Doe', href: '#doe' },
  { label: 'Max na Mídia', href: '#max-na-midia' },
  { label: 'Artigos', href: '#artigos' },
  { label: 'Contato', href: 'mailto:contato@maxmaciel.df.br' },
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
  { name: 'TikTok', href: 'https://tiktok.com/@maxmaciel', platform: 'tiktok' },
  { name: 'YouTube', href: 'https://youtube.com/@maxmaciel', platform: 'youtube' },
  { name: 'Facebook', href: 'https://facebook.com/maxmaciel', platform: 'facebook' },
  { name: 'X', href: 'https://x.com/maxmaciel', platform: 'x' },
];


export const volunteerRegions = ['Plano Piloto', 'Ceilândia', 'Taguatinga', 'Samambaia', 'Gama', 'São Sebastião', 'Planaltina', 'Outra RA'];

export const footerLinks = [
  { label: 'Política de privacidade', href: '#privacidade' },
  { label: 'Termos de uso', href: '#termos' },
  { label: 'Contato', href: 'mailto:contato@maxmaciel.df.br' },
];
