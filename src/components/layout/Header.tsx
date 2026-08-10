import { useState } from 'react';
import { AppLink } from '../ui/AppLink.tsx';
import { Heart, Menu, X } from 'lucide-react';
import { internalNavItems, navItems } from '../../data/content.ts';
import type { NavItem } from '../../types/index.ts';
import { NavLink } from '../ui/NavLink.tsx';
import logoHeader from '../../assets/logos/logo-header.png';
import { PAGE_GRID_INNER, PAGE_GRID_OUTER } from './pageGrid.ts';

const logoClassName = 'block h-auto w-[255px] max-w-none';

const landingNavLinkClass =
  'font-nav text-base font-medium leading-6 tracking-[0.15px] text-brand-black transition-colors hover:text-navy-500';

const internalNavLinkClass =
  'font-nav text-[13.5px] font-medium leading-5 tracking-[0.05px] text-brand-black transition-colors hover:text-navy-500';

function getInternalNavLinkClass(_item: NavItem): string {
  return internalNavLinkClass;
}

function DoeCtaButton({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <AppLink
      to="/doe"
      onClick={onClick}
      className={
        className ??
        'inline-flex h-[37px] items-center gap-1 rounded-[10px] bg-navy-500 px-3 py-2 font-nav text-[13.5px] font-bold leading-5 text-white transition hover:bg-navy-600'
      }
    >
      <Heart className="size-4 shrink-0" aria-hidden />
      Doe
    </AppLink>
  );
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
  const barClass = `flex h-[101px] ${PAGE_GRID_INNER} items-center justify-between gap-4 overflow-visible`;

  return (
    <header className={`overflow-visible bg-yellow-500 ${isInternal ? 'shadow-sm' : ''}`}>
      <div className={barOuterClass}>
        <div className={barClass}>
        <AppLink to="/" aria-label="Ir para início" className="relative z-10 mt-[10px] flex shrink-0 items-center overflow-visible">
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
          {isInternal ? <DoeCtaButton /> : null}
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
            {isInternal ? (
              <li className="pt-2">
                <DoeCtaButton
                  className="inline-flex h-11 w-full items-center justify-center gap-1 rounded-[10px] bg-navy-500 px-3 py-2 font-nav text-base font-bold text-white"
                  onClick={() => setOpen(false)}
                />
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
