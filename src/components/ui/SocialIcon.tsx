import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import type { SocialPlatform } from '../../types/index.ts';

export type { SocialPlatform };

interface SocialIconProps {
  platform: SocialPlatform;
  className?: string;
  monochrome?: boolean;
}

const platformColorClasses: Record<SocialPlatform, string> = {
  instagram: 'text-[#E4405F]',
  whatsapp: 'text-[#25D366]',
  tiktok: 'text-[#000000]',
  youtube: 'text-[#FF0000]',
  facebook: 'text-[#1877F2]',
  x: 'text-[#000000]',
};

const platformIcons = {
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  facebook: FaFacebookF,
  x: FaXTwitter,
} satisfies Record<SocialPlatform, typeof FaInstagram>;

export function SocialIcon({ platform, className = 'h-5 w-5', monochrome }: SocialIconProps) {
  const Icon = platformIcons[platform];
  const colorClass = monochrome ? 'text-brand-black' : platformColorClasses[platform];

  return <Icon className={[colorClass, className].filter(Boolean).join(' ')} aria-hidden />;
}
