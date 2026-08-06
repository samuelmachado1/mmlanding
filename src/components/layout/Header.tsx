import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems } from '../../data/content.ts';
import logoHeader from '../../assets/logos/logo-header.png';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="overflow-visible bg-yellow-500">
      <div className="mx-auto flex h-16 w-full max-w-[1366px] items-center justify-between px-4 sm:h-20 sm:px-8 lg:h-[120px]">
        <a
          href="#inicio"
          aria-label="Ir para início"
          className="flex h-full shrink-0 items-center"
        >
          <img src={logoHeader} alt="Max Maciel" className="block h-full w-auto origin-left scale-[1.25]" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="font-nav text-base font-medium leading-6 tracking-[0.15px] text-brand-black transition-colors hover:text-navy-500">
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="mr-0 inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg text-brand-black hover:text-navy-500 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          className="bg-yellow-500 px-4 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-nav text-base font-medium leading-6 tracking-[0.15px] text-brand-black transition-colors hover:text-navy-500 min-h-11 min-w-11 flex items-center px-3 py-2"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
