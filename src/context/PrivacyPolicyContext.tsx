import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { PrivacyPolicyModal } from '../components/legal/PrivacyPolicyModal.tsx';

interface PrivacyPolicyContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const PrivacyPolicyContext = createContext<PrivacyPolicyContextValue | null>(null);

export function PrivacyPolicyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <PrivacyPolicyContext.Provider value={value}>
      {children}
      <PrivacyPolicyModal isOpen={isOpen} onClose={close} />
    </PrivacyPolicyContext.Provider>
  );
}

export function usePrivacyPolicy(): PrivacyPolicyContextValue {
  const context = useContext(PrivacyPolicyContext);
  if (!context) {
    throw new Error('usePrivacyPolicy must be used within PrivacyPolicyProvider');
  }
  return context;
}
