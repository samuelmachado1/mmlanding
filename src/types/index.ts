import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
}
export interface QuickLink {
  label: string;
  href: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface ContentBlock {
  id: string;
  title: string;
  description: string;
  href?: string;
  cta?: string;
}

export interface ClippingInterview {
  id: string;
  badge: string;
  title: string;
  href: string;
  imageUrl?: string;
}

export interface ClippingReport {
  id: string;
  title: string;
  source: string;
  href: string;
  imageUrl?: string;
}

export type ZeroFareCard =
  | {
      id: string;
      type: 'stat';
      value: string;
      label: string;
    }
  | {
      id: string;
      type: 'highlight';
      title: string;
      size?: 'tall' | 'compact';
    };

export interface CrewCard {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}

export interface CrewMaterialForm {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}

export interface AgendaTopic {
  id: string;
  title: string;
  items: string[];
}

export interface MediaItem {
  id: string;
  title: string;
  source?: string;
  date?: string;
  href: string;
  type: 'news' | 'video';
}

export interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
}



export type SocialPlatform= 'instagram' | 'whatsapp' | 'tiktok' | 'youtube' | 'facebook' | 'x';

export interface SocialBarLink {
  name: string;
  href: string;
  platform: SocialPlatform;
}

export interface HeroLeadForm {
  contact: string;
}

export interface VolunteerForm {
  name: string;
  phone: string;
  region: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export interface PageContent {
  title: string;
  subtitle?: string;
  paragraphs: string[];
}

export interface Article {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface DoeImpactCard {
  emoji: string;
  title: string;
  description: string;
}

export interface LawItem {
  number: string;
  title: string;
  description: string;
}

export interface InvestmentRow {
  area: string;
  amount: string;
  percent: string;
}

export interface PamphletItem {
  title: string;
  href: string;
}

export interface ChannelItem {
  name: string;
  href: string;
}

export interface MidiaSection {
  title: string;
  items: string[];
}

export interface PageLink {
  label: string;
  href: string;
}

export type PageHeroVariant = 'navy' | 'black' | 'red';

export interface PageHeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  variant?: PageHeroVariant;
}

export interface PageTimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface PrincipleCard {
  icon: string;
  title: string;
  description: string;
}

export interface PageCtaContent {
  title: string;
  primary: PageLink;
  secondary?: PageLink;
  variant?: 'navy' | 'yellow';
}

export type ProposalStatus = 'Em tramitação' | 'Aprovado' | 'Apresentado';

export interface ProposalCard {
  icon: string;
  category: string;
  status: ProposalStatus;
  title: string;
  description: string;
  href: string;
}

export interface StatCard {
  value: string;
  label: string;
}

export interface HighlightStatCard {
  value: string;
  label: string;
  srLabel?: string;
}

export interface ActionCard {
  icon: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}

export interface BondeAvatarStudioContent {
  eyebrow: string;
  title: string;
  description: string;
  embedUrl: string;
  embedTitle: string;
  embedUnavailableMessage: string;
}

export interface MissionCard {
  points: string;
  title: string;
  difficulty: 'Fácil' | 'Médio' | 'Avançado';
  description: string;
  cta?: string;
}

export interface MediaCard {
  id: string;
  category: string;
  title: string;
  source: string;
  date: string;
  href: string;
  imageUrl?: string;
  tab: string;
}

export interface ClippingsPayload {
  fetchedAt: string;
  items: MediaCard[];
  interview: ClippingInterview | null;
  reports: ClippingReport[];
}
