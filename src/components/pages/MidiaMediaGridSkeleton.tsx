export function MidiaMediaGridSkeleton() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <li key={index}>
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-black/[0.06] bg-white">
            <div className="aspect-[396/192] animate-pulse bg-navy-100" />
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="h-5 w-full animate-pulse rounded bg-brand-black/10" />
              <div className="h-5 w-4/5 animate-pulse rounded bg-brand-black/10" />
              <div className="mt-auto flex justify-between pt-3">
                <div className="h-4 w-24 animate-pulse rounded bg-brand-black/10" />
                <div className="h-4 w-16 animate-pulse rounded bg-brand-black/10" />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
