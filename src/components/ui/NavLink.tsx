import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export function NavLink({ href, className, onClick, children }: NavLinkProps) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
