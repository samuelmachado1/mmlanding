import { useEffect, useState, type ReactNode } from 'react';
import {
  checkLaunchAccess,
  hasStoredPreviewAccess,
  isSiteAccessGated,
} from '../lib/launch-gate.ts';
import ComingSoonPage from '../pages/ComingSoonPage.tsx';

interface LaunchGateProps {
  children: ReactNode;
}

function initialStatus(gated: boolean): 'loading' | 'allowed' | 'denied' {
  if (!gated) return 'allowed';
  if (hasStoredPreviewAccess()) return 'allowed';
  return 'loading';
}

export function LaunchGate({ children }: LaunchGateProps) {
  const gated = isSiteAccessGated();
  const [status, setStatus] = useState<'loading' | 'allowed' | 'denied'>(() => initialStatus(gated));

  useEffect(() => {
    if (!gated) {
      setStatus('allowed');
      return;
    }

    if (hasStoredPreviewAccess()) {
      setStatus('allowed');
      return;
    }

    let cancelled = false;

    checkLaunchAccess(window.location.search).then((allowed) => {
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
  }, [gated]);

  if (!gated) {
    return children;
  }

  if (status === 'loading' || status === 'denied') {
    return status === 'denied' ? <ComingSoonPage /> : null;
  }

  return children;
}
