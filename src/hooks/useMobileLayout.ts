import { useEffect, useState } from 'react';

const MOBILE_LAYOUT_QUERY = '(max-width: 1023px)';

export function useMobileLayout(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(MOBILE_LAYOUT_QUERY).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_LAYOUT_QUERY);
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return isMobile;
}
