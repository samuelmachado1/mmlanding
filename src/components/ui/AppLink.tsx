import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { isSiteAccessGated } from '../../lib/launch-gate.ts';

interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  children: ReactNode;
}

export function AppLink({ to, children, ...rest }: AppLinkProps) {
  if (isSiteAccessGated()) {
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
}
