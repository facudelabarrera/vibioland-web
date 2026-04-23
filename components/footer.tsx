import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"

const footerColumns = [
  {
    title: "LAS COMUNIDADES",
    links: [
      {
        href: "/proyectos#vibio-higuera",
        label: "vibio.higuera",
        imageSrc: "/vibio.higuera_logo.svg",
        imageAlt: "Logo de vibio.higuera",
      },
      {
        href: "/proyectos#vibio-berlanga",
        label: "vibio.berlanga",
        imageSrc: "/vibio.berlanga_logo.svg",
        imageAlt: "Logo de vibio.berlanga",
      },
    ],
  },
  {
    title: "CONÓCENOS",
    links: [
      { href: "/modelo", label: "Equipo & Red" },
      { href: "/contacto", label: "FAQs" },
    ],
  },
  {
    title: "CONTACTO",
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
      style={{ backgroundColor: '#DBC56C', color: '#242018' }}
    >
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 lg:px-8 lg:pb-16 lg:pt-20">
        {/* Main layout: left column (logo+tagline) | right column (nav + newsletter) */}
        <div className="grid gap-14 lg:grid-cols-[200px_1fr] lg:gap-20 xl:gap-28">

          {/* ── LEFT: logo + tagline ── */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/claim.svg"
                alt="Reencuentra · Rediseña · Regenera"
                width={220}
                height={67}
                className="h-12 w-auto lg:h-14"
              />
            </Link>
          </div>

          {/* ── RIGHT: nav columns (top) + newsletter (bottom) ── */}
          <div className="flex flex-col gap-12">

            {/* Nav columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
              {footerColumns.map((column) => (
                <FooterColumn key={column.title} title={column.title} links={column.links} />
              ))}
            </div>

            {/* Newsletter — inside the right column, below nav */}
            <div className="border-t border-[#242018]/12 pt-10">
              <div className="flex flex-col gap-8">

                {/* Description */}
                <div>
                  <p className="text-[11px] font-medium tracking-[0em] text-[#242018]/62 uppercase">
                    Newsletter
                  </p>
                  <p className="mt-4 text-[14px] font-light leading-[1.7] text-[#242018]/78">
                    Actualizaciones de los proyectos, una vez al mes, escritas por el equipo.
                  </p>
                </div>

                {/* Form */}
                <form className="flex max-w-[34rem] flex-col gap-3">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      placeholder="tunombre@tucorreo.com"
                      className="vibio-input-radius min-w-0 flex-1 border border-[#242018]/18 bg-[#0000000D] px-4 py-3 text-sm text-[#242018] caret-[#242018] placeholder:text-[#242018]/38 focus:border-[#242018]/35 focus:outline-none"
                    />
                    <button
                      type="button"
                      className="vibio-action-radius inline-flex shrink-0 items-center justify-center border border-transparent bg-[#0000002B] px-5 py-3 text-sm font-medium text-[#242018] transition-colors hover:bg-[#00000033]"
                    >
                      SUSCRIBIRME
                    </button>
                  </div>
                  <label className="flex cursor-pointer items-start gap-3 text-[10px] font-light tracking-[0.08em] text-[#242018]/58">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 appearance-none rounded-full border border-[#242018]/18 bg-[#0000000D] checked:border-[#242018] checked:bg-[#242018] focus:outline-none focus:ring-2 focus:ring-[#242018]/20"
                    />
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
  links: Array<{ href: string; label: string; imageSrc?: string; imageAlt?: string }>
}) {
  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0em] text-[#242018]/62 uppercase">{title}</p>
      <nav className="mt-5 flex flex-col gap-3.5">
        {links.map((link) => (
          <LinkOrAnchor
            key={`${title}-${link.label}`}
            href={link.href}
            className="w-fit text-[15px] font-light leading-[1.5] text-[#242018]/78 transition-opacity duration-200 hover:opacity-75"
          >
            {link.imageSrc ? (
              <div
                role="img"
                aria-label={link.imageAlt ?? link.label}
                className="h-[1.9rem] w-[9.1rem]"
                style={{
                  backgroundColor: '#242018',
                  WebkitMaskImage: `url(${link.imageSrc})`,
                  maskImage: `url(${link.imageSrc})`,
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'left center',
                  maskPosition: 'left center',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                }}
              />
            ) : (
              link.label
            )}
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
