import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  children: ReactNode;
}

export function AppLink({ to, children, ...rest }: AppLinkProps) {
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
}
