import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
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
