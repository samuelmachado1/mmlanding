import type { ReactNode } from 'react';
import { shouldShowSite } from '../lib/launch-gate.ts';
import ComingSoonPage from '../pages/ComingSoonPage.tsx';

interface LaunchGateProps {
  children: ReactNode;
}

export function LaunchGate({ children }: LaunchGateProps) {
  const canShowSite = shouldShowSite(
    __SITE_LAUNCHED__,
    __LAUNCH_DATE__,
    __PREVIEW_SECRET__,
    __IS_PROD_BUILD__,
  );

  if (!canShowSite) {
    return <ComingSoonPage />;
  }

  return children;
}
