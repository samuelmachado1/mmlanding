import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '../data/content.ts';

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="min-h-11 min-w-11 fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-brand-green text-white shadow-lg"
    >
      <MessageCircle aria-hidden className="h-7 w-7" />
    </a>
  );
}
