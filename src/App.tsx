const REELEITO_IMAGE = '/reeleito-max-maciel.jpg';

export default function App() {
  return (
    <main className="fixed inset-0 h-[100dvh] w-full overflow-hidden bg-black">
      {/* Preenche a tela inteira; não corta o conteúdo da arte */}
      <img
        src={REELEITO_IMAGE}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full scale-200 object-cover object-center blur-1xl brightness-[0.75] saturate-125"
        decoding="async"
      />
      {/* Arte completa (textos inclusos), sem crop */}
      <img
        src={REELEITO_IMAGE}
        alt="Max Maciel é reeleito deputado distrital com 92.234 votos"
        className="relative z-10 mx-auto h-full w-full max-h-[100dvh] max-w-[100vw] origin-center -translate-x-8 -translate-y-15 scale-[1.4] object-contain object-center"
        decoding="async"
        fetchPriority="high"
      />
    </main>
  );
}
