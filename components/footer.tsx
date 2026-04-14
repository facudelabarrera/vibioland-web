import Link from "next/link"

export function Footer() {
  return (
    <footer id="contacto" className="py-16 lg:py-20" style={{ backgroundColor: '#1c2e24' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left column - tagline + social */}
          <div>
            <Link href="/" className="font-heading text-lg text-white">
              <span className="font-bold">vibio</span>.land
            </Link>
            <p className="mt-6 max-w-sm text-base font-light leading-[1.7] text-white/60">
              Creamos comunidades en entornos rurales donde arraigarse tiene sentido.
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="#"
                className="border border-white/25 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-white/45 hover:text-white"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="#"
                className="border border-white/25 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-white/45 hover:text-white"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="border border-white/25 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-white/45 hover:text-white"
                aria-label="Newsletter"
              >
                Newsletter
              </a>
            </div>
          </div>

          {/* Right column - links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="text-xs font-medium tracking-[0.02em] text-white/40">
                Navegación
              </span>
              <nav className="mt-5 flex flex-col gap-3">
                <Link href="#modelo" className="text-sm font-light text-white/65 transition-colors hover:text-white">
                  El modelo
                </Link>
                <Link href="#proyectos" className="text-sm font-light text-white/65 transition-colors hover:text-white">
                  Proyectos
                </Link>
                <Link href="#comunidad" className="text-sm font-light text-white/65 transition-colors hover:text-white">
                  Comunidad
                </Link>
                <Link href="#unete" className="text-sm font-light text-white/65 transition-colors hover:text-white">
                  Únete
                </Link>
              </nav>
            </div>
            <div>
              <span className="text-xs font-medium tracking-[0.02em] text-white/40">
                Legal
              </span>
              <nav className="mt-5 flex flex-col gap-3">
                <Link href="#" className="text-sm font-light text-white/65 transition-colors hover:text-white">
                  Aviso legal
                </Link>
                <Link href="#" className="text-sm font-light text-white/65 transition-colors hover:text-white">
                  Privacidad
                </Link>
                <Link href="#" className="text-sm font-light text-white/65 transition-colors hover:text-white">
                  Cookies
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-16 border-t border-white/15 pt-8">
          <p className="text-xs font-light tracking-[0.02em] text-white/50">
            <span className="font-semibold">vibio</span>.land — Recuperando los pueblos y su biodiversidad
          </p>
        </div>
      </div>
    </footer>
  )
}
