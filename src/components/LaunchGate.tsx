import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { checkLaunchAccess, isSiteAccessGated } from '../lib/launch-gate.ts';
import ComingSoonPage from '../pages/ComingSoonPage.tsx';

interface LaunchGateProps {
  children: ReactNode;
}

export function LaunchGate({ children }: LaunchGateProps) {
  const { search } = useLocation();
  const gated = isSiteAccessGated();
  const [status, setStatus] = useState<'loading' | 'allowed' | 'denied'>(gated ? 'loading' : 'allowed');

  useEffect(() => {
    if (!gated) {
      setStatus('allowed');
      return;
    }

    let cancelled = false;

    checkLaunchAccess(search).then((allowed) => {
      if (cancelled) return;

      if (allowed) {
        setStatus('allowed');
        return;
      }

      setStatus('denied');
      window.location.replace('/coming-soon.html');
    });

    return () => {
      cancelled = true;
    };
  }, [gated, search]);

  if (!gated) {
    return children;
  }

  if (status === 'loading' || status === 'denied') {
    return status === 'denied' ? <ComingSoonPage /> : null;
  }

  return children;
}
