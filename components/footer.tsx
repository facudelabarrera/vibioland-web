import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"

const footerColumns = [
  {
    title: "El proyecto",
    links: [
      { href: "/modelo", label: "Qué es vibio" },
      { href: "/modelo", label: "Cómo funciona" },
      { href: "/proyectos", label: "Dónde está" },
      { href: "/modelo", label: "Impacto" },
    ],
  },
  {
    title: "Las comunidades",
    links: [
      { href: "/proyectos#vibio-higuera", label: "vibio.higuera" },
      { href: "/proyectos#vibio-berlanga", label: "vibio.berlanga" },
      { href: "/proyectos#proximos-territorios", label: "Próximas comunidades" },
    ],
  },
  {
    title: "Conócenos",
    links: [
      { href: "/modelo", label: "Equipo & Red" },
      { href: "mailto:hola@vibio.land?subject=Prensa%20Vibio", label: "Prensa" },
      { href: "/contacto", label: "FAQs" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { href: "mailto:hola@vibio.land", label: "hola@vibio.land" },
      { href: "tel:+34655920839", label: "+34 655 920 839" },
    ],
  },
]

export function Footer({ showInvestorCta = true }: { showInvestorCta?: boolean }) {
  return (
    <footer
      id="contacto"
      data-nav-surface="dark"
      className="overflow-hidden"
      style={{ backgroundColor: 'var(--color-vibio-brand-green)' }}
    >
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 lg:px-8 lg:pb-16 lg:pt-20">
        {/* Main layout: left column (logo+tagline) | right column (nav + newsletter) */}
        <div className="grid gap-14 lg:grid-cols-[200px_1fr] lg:gap-20 xl:gap-28">

          {/* ── LEFT: logo + tagline ── */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/vibioland-logo.svg"
                alt="Vibio"
                width={130}
                height={43}
                className="h-10 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <p className="mt-6 text-sm font-light tracking-[0.18em] text-white/48">
              Reencuentra · Rediseña · Regenera
            </p>
          </div>

          {/* ── RIGHT: nav columns (top) + newsletter (bottom) ── */}
          <div className="flex flex-col gap-12">

            {/* Nav columns */}
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 sm:gap-8">
              {footerColumns.map((column) => (
                <FooterColumn key={column.title} title={column.title} links={column.links} />
              ))}
            </div>

            {/* Newsletter — inside the right column, below nav */}
            <div className="border-t border-white/10 pt-10">
              <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12 lg:items-start">

                {/* Description */}
                <div>
                  <p className="text-[11px] font-medium tracking-[0.18em] text-white/40">
                    Newsletter
                  </p>
                  <p className="mt-4 text-[14px] font-light leading-[1.7] text-white/68">
                    Actualizaciones de los proyectos, una vez al mes, escritas por el equipo.
                  </p>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      placeholder="tunombre@tucorreo.com"
                      className="min-w-0 flex-1 border border-white/15 bg-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-white/38 focus:border-white/35 focus:outline-none"
                    />
                    <button
                      type="button"
                      className="inline-flex shrink-0 items-center justify-center border border-transparent bg-vibio-brand-yellow px-5 py-3 text-sm font-medium text-vibio-dark transition-colors hover:bg-[#d7c56f]"
                    >
                      Suscribirme
                    </button>
                  </div>
                  <label className="flex cursor-pointer items-start gap-3 text-[10px] font-light tracking-[0.08em] text-white/42">
                    <input type="checkbox" className="mt-0.5 accent-vibio-brand-yellow" />
                    <span>Acepto las condiciones de la política de privacidad</span>
                  </label>
                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: Array<{ href: string; label: string }>
}) {
  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.18em] text-white/40">{title}</p>
      <nav className="mt-5 flex flex-col gap-3.5">
        {links.map((link) => (
          <LinkOrAnchor
            key={`${title}-${link.label}`}
            href={link.href}
            className="w-fit text-[15px] font-light leading-[1.5] text-white/68 transition-colors duration-200 hover:text-white"
          >
            {link.label}
          </LinkOrAnchor>
        ))}
      </nav>
    </div>
  )
}

function LinkOrAnchor({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  if (href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}
