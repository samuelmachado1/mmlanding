import { footerLinks, siteConfig, socialLinks } from '../../data/content.ts';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-100 bg-navy-500 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg font-bold">{siteConfig.name}</p>
            <p className="mt-2 max-w-sm text-sm text-navy-100">{siteConfig.tagline}</p>
            <p className="mt-4 text-sm text-navy-100">{siteConfig.email}</p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-yellow-500">Redes</p>
            <ul className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-11 min-w-11 inline-flex items-center gap-2 rounded-lg bg-navy-600 px-3 py-2 text-sm hover:bg-navy-700"
                    aria-label={link.name}
                  >
                    <link.icon className="h-4 w-4" aria-hidden />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-navy-400 pt-6 text-sm text-navy-100 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}. Todos os direitos reservados.</p>
          <ul className="flex flex-wrap gap-4">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
