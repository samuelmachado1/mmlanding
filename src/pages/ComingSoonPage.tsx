export default function ComingSoonPage() {
  return (
    <div className="grid min-h-dvh place-items-center bg-[linear-gradient(160deg,#440c54,#70148c)] px-5 py-8 text-cream">
      <main className="w-full max-w-xl text-center">
        <h1 className="font-display text-5xl leading-none text-yellow-500 sm:text-6xl">
          Em breve
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-cream/90">
          Novo site em preparação. Volte em breve para conhecer as novidades.
        </p>
        <span className="mt-8 inline-block rounded-full border border-yellow-500/35 bg-brand-black/35 px-4 py-2 text-sm uppercase tracking-widest text-yellow-500">
          Max Maciel
        </span>
      </main>
    </div>
  );
}
