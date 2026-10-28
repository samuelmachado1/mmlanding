const REELEITO_IMAGE = '/reeleito-max-maciel.jpg';

export default function App() {
  return (
    <main className="fixed inset-0 h-[100dvh] w-full overflow-hidden bg-black">
      <img
        src={REELEITO_IMAGE}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center brightness-[0.75] saturate-125 scale-[2] blur-xl max-md:scale-[2] max-md:blur-xl md:scale-110 md:blur-2xl"
        decoding="async"
      />
      <img
        src={REELEITO_IMAGE}
        alt="Max Maciel é reeleito deputado distrital com 92.234 votos"
        className="relative z-10 mx-auto h-full w-full max-h-[100dvh] max-w-[100vw] origin-center object-contain object-center max-md:-translate-x-8 max-md:-translate-y-15 max-md:scale-[1.47] md:translate-x-0 md:translate-y-0 md:scale-100"
        decoding="async"
        fetchPriority="high"
      />
    </main>
  );
}
