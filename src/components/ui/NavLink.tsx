import type { ReactNode } from 'react';
import { AppLink } from './AppLink.tsx';

interface NavLinkProps {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export function NavLink({ href, className, onClick, children }: NavLinkProps) {
  if (href.startsWith('/')) {
    return (
      <AppLink to={href} className={className} onClick={onClick}>
        {children}
      </AppLink>
    );
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
