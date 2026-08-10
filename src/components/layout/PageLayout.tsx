import type { ReactNode } from 'react';
import { AppLink } from '../ui/AppLink.tsx';
import { Header } from './Header.tsx';
import { SocialBar } from './SocialBar.tsx';
import { Footer } from './Footer.tsx';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <div className="sticky top-0 z-40 w-full">
        <Header />
        <SocialBar />
      </div>
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        {children}
        <p className="mt-10">
          <AppLink to="/" className="font-nav text-sm font-medium text-navy-500 underline">
            ← Voltar ao início
          </AppLink>
        </p>
      </main>
      <Footer />
    </>
  );
}
