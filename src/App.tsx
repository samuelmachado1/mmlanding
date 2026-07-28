import { Header } from './components/layout/Header.tsx';
import { SocialBar } from './components/layout/SocialBar.tsx';
import { Footer } from './components/layout/Footer.tsx';
import { Hero } from './components/sections/Hero.tsx';
import { Manifest } from './components/sections/Manifest.tsx';
import { Biography } from './components/sections/Biography.tsx';
import { MandatoAbaReta } from './components/sections/MandatoAbaReta.tsx';
import { BondeProMax } from './components/sections/BondeProMax.tsx';
import { Doe } from './components/sections/Doe.tsx';
import { MaxNaMidia } from './components/sections/MaxNaMidia.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';

export default function App() {
  return (
    <>
      <div className="sticky top-0 z-40">
        <Header />
        <SocialBar />
      </div>
      <main className="flex-1">
        <Hero />
        <Manifest />
        <Biography />
        <MandatoAbaReta />
        <BondeProMax />
        <Doe />
        <MaxNaMidia />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
