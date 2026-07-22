import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems, siteConfig, whatsappUrl } from '../../data/content.ts';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-cream backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#inicio" className="flex flex-col leading-tight" aria-label="Ir para início">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent-500">
            {siteConfig.phase}
          </span>
          <span className="font-display text-lg font-bold text-navy-500">{siteConfig.name}</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-navy-600 hover:text-accent-500"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="btn-brand touch-target hidden px-4 sm:inline-flex"
          >
            WhatsApp
          </a>
          <button
            type="button"
            className="touch-target inline-flex items-center justify-center rounded-lg text-navy-500 hover:bg-navy-50 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          className="border-t border-navy-100 bg-cream px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="touch-target flex items-center rounded-lg px-3 py-2 text-navy-600 hover:bg-navy-50"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn-brand touch-target flex justify-center px-3 py-2"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
