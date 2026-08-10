import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import QuemEPage from './pages/QuemEPage.tsx';
import MandatoPage from './pages/MandatoPage.tsx';
import TarifaZeroPage from './pages/mandato/TarifaZeroPage.tsx';
import ProjetosDeLeiPage from './pages/mandato/ProjetosDeLeiPage.tsx';
import CtmUPage from './pages/mandato/CtmUPage.tsx';
import MaximizandoDfPage from './pages/MaximizandoDfPage.tsx';
import BondeProMaxPage from './pages/BondeProMaxPage.tsx';
import MateriaisPage from './pages/MateriaisPage.tsx';
import ApoiePage from './pages/ApoiePage.tsx';
import DoePage from './pages/DoePage.tsx';
import MidiaPage from './pages/MidiaPage.tsx';
import ContatoPage from './pages/ContatoPage.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/quem-e-max" element={<QuemEPage />} />
      <Route path="/mandato" element={<MandatoPage />} />
      <Route path="/mandato/tarifa-zero" element={<TarifaZeroPage />} />
      <Route path="/mandato/projetos-de-lei" element={<ProjetosDeLeiPage />} />
      <Route path="/mandato/ctmu" element={<CtmUPage />} />
      <Route path="/maximizando-df" element={<MaximizandoDfPage />} />
      <Route path="/bonde-pro-max" element={<BondeProMaxPage />} />
      <Route path="/materiais" element={<MateriaisPage />} />
      <Route path="/apoie" element={<ApoiePage />} />
      <Route path="/doe" element={<DoePage />} />
      <Route path="/midia" element={<MidiaPage />} />
      <Route path="/contato" element={<ContatoPage />} />
    </Routes>
  );
}
