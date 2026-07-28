import { useState } from 'react';
import { X } from 'lucide-react';
import { socialBarLinks } from '../../data/content.ts';
import { SocialIcon } from '../ui/SocialIcon.tsx';
export function SocialBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="shrink-0 grow-0 bg-navy-500">
      <div className="mx-auto flex h-[72px] max-w-[1366px] shrink-0 grow-0 items-center gap-4 px-6 py-4">
        <p className="font-nav text-sm font-medium leading-6 text-white md:text-base">
          Acompanhe o mandato nas redes sociais também
        </p>

        <div className="ml-auto flex items-center gap-2">
          {socialBarLinks.map((link) => (
            <a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.name}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white transition-opacity hover:opacity-90"
            >
              <SocialIcon
                platform={link.platform}
                className="h-5 w-5"
              />
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Fechar barra de redes sociais"
          className="min-h-11 min-w-11 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-brand-black transition-opacity hover:opacity-90"
        >
          <X aria-hidden className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
