import { Header } from '../components/layout/Header.tsx';
import { SocialBar } from '../components/layout/SocialBar.tsx';
import { Footer } from '../components/layout/Footer.tsx';
import { Hero } from '../components/sections/Hero.tsx';
import { Manifest } from '../components/sections/Manifest.tsx';
import { Biography } from '../components/sections/Biography.tsx';
import { Crew } from '../components/sections/Crew.tsx';
import { Clipping } from '../components/sections/Clipping.tsx';
import { ZeroFare } from '../components/sections/ZeroFare.tsx';

export default function LandingPage() {
  return (
    <>
      <div className="sticky top-0 z-40 w-full">
        <Header />
        <SocialBar />
      </div>
      <main className="flex-1 w-full overflow-x-hidden">
        <Hero />
        <Manifest />
        <Biography />
        <Crew />
        <Clipping />
        <ZeroFare />
      </main>
      <Footer />
    </>
  );
}
