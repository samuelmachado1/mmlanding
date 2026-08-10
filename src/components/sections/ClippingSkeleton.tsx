export function ClippingSkeleton() {
  return (
    <div className="flex flex-col gap-6 pt-8 lg:flex-row lg:gap-6" aria-busy="true">
      <div className="flex flex-1 flex-col gap-3">
        <div className="h-[15px] w-40 animate-pulse bg-white/20" />
        <div className="aspect-[424/283] w-full animate-pulse rounded bg-white/10" />
        <div className="h-7 w-full animate-pulse bg-white/10" />
        <div className="h-7 w-3/4 animate-pulse bg-white/10" />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="h-[15px] w-40 animate-pulse bg-white/20" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-row gap-3">
              <div className="aspect-[120/80] w-[120px] shrink-0 animate-pulse rounded-md bg-white/10" />
              <div className="flex flex-1 flex-col justify-center gap-2">
                <div className="h-5 w-full animate-pulse bg-white/10" />
                <div className="h-4 w-24 animate-pulse bg-white/10" />
              </div>
            </div>
          ))}
        </div>
        <div className="h-12 w-40 animate-pulse rounded-lg bg-white/10" />
      </div>
    </div>
  );
}
