import { useFlickrPhotos } from '../../hooks/useFlickrPhotos.ts';
import type { FlickrGalleryContent } from '../../types/index.ts';

interface FlickrGalleryProps extends FlickrGalleryContent {
  limit?: number;
}

function FlickrGallerySkeleton() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <li key={index} className="overflow-hidden rounded-2xl bg-white/10">
          <div className="aspect-[4/3] animate-pulse bg-cream/10" />
        </li>
      ))}
    </ul>
  );
}

export function FlickrGallery({
  eyebrow,
  title,
  description,
  profileUrl,
  profileCta,
  limit = 12,
}: FlickrGalleryProps) {
  const { loading, error, items } = useFlickrPhotos(limit);

  return (
    <section id="fotos-flickr" className="scroll-mt-24 bg-navy-500 px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-nav text-[17px] font-semibold uppercase tracking-[0.05em] text-cream/80">
          {eyebrow}
        </p>
        <h2 className="pt-3 font-nav text-[clamp(1.75rem,4vw,2.25rem)] font-black leading-tight text-yellow-500">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl font-nav text-lg leading-relaxed text-cream/80">{description}</p>

        <div className="mt-10">
          {error ? (
            <p className="font-nav text-sm text-cream/70">
              Não foi possível carregar as fotos agora. Acesse o acervo completo no Flickr.
            </p>
          ) : null}

          {loading ? (
            <FlickrGallerySkeleton />
          ) : items.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((photo) => (
                <li key={photo.id}>
                  <a
                    href={photo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition hover:border-yellow-500/40"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-navy-400/40">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        loading="lazy"
                        className="size-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    {photo.title ? (
                      <p className="px-4 py-3 font-nav text-sm font-semibold leading-snug text-cream group-hover:text-yellow-500">
                        {photo.title}
                      </p>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-nav text-sm text-cream/70">Nenhuma foto pública disponível no momento.</p>
          )}
        </div>

        <div className="mt-10">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-cream/30 px-6 py-3 font-nav text-base font-bold text-cream transition hover:border-yellow-500 hover:text-yellow-500"
          >
            {profileCta}
          </a>
        </div>
      </div>
    </section>
  );
}
