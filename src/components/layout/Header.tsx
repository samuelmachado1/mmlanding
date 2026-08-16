import { useState } from 'react';
import { AppLink } from '../ui/AppLink.tsx';
import { Menu, X } from 'lucide-react';
import { internalNavItems, navItems } from '../../data/content.ts';
import type { NavItem } from '../../types/index.ts';
import { NavLink } from '../ui/NavLink.tsx';
import logoHeader from '../../assets/logos/logo-header.png';
import { PAGE_GRID_INNER, PAGE_GRID_OUTER } from './pageGrid.ts';

const logoClassName =
  'block w-[180px] max-w-[min(180px,calc(100vw-5rem))] h-auto lg:w-[255px] lg:max-w-none';

const landingNavLinkClass =
  'font-nav text-base font-medium leading-6 tracking-[0.15px] text-brand-black transition-colors hover:text-navy-500';

const internalNavLinkClass =
  'font-nav text-[13.5px] font-medium leading-5 tracking-[0.05px] text-brand-black transition-colors hover:text-navy-500';

function getInternalNavLinkClass(_item: NavItem): string {
  return internalNavLinkClass;
}

interface HeaderProps {
  variant?: 'landing' | 'internal';
}

export function Header({ variant = 'landing' }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const isInternal = variant === 'internal';
  const items = isInternal ? internalNavItems : navItems;
  const linkClass = isInternal ? getInternalNavLinkClass : () => landingNavLinkClass;

  const barOuterClass = PAGE_GRID_OUTER;
  const barClass = `flex h-[101px] ${PAGE_GRID_INNER} items-center justify-between gap-4 overflow-hidden`;

  return (
    <header className={`overflow-hidden bg-yellow-500 ${isInternal ? 'shadow-sm' : ''}`}>
      <div className={barOuterClass}>
        <div className={barClass}>
        <AppLink to="/" aria-label="Ir para início" className="relative z-10 mt-[6px] flex shrink-0 self-start">
          <img
            src={logoHeader}
            alt="Max Maciel"
            className={logoClassName}
          />
        </AppLink>

        <nav className="hidden items-center gap-4 lg:flex" aria-label="Principal">
          {items.map((item) => (
            <NavLink key={item.href} href={item.href} className={linkClass(item)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="mr-0 inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg text-brand-black hover:text-navy-500 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          className={`bg-yellow-500 py-4 lg:hidden ${PAGE_GRID_OUTER}`}
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  className={`${linkClass(item)} flex min-h-11 min-w-11 items-center px-3 py-2`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
