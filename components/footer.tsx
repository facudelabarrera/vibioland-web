import type { ReactNode } from "react"
import Link from "next/link"

import { VibioLogoLink } from "@/components/vibio-logo"

const projectLinks = [
  { href: "/proyectos#vibio-berlanga", label: "vibio.berlanga" },
  { href: "/proyectos#vibio-higuera", label: "vibio.higuera" },
  { href: "/proyectos#proximos-territorios", label: "Próximos territorios" },
]

const companyLinks = [
  { href: "/modelo", label: "El modelo" },
  { href: "/invertir-en-vibio", label: "Inversores" },
  { href: "mailto:hola@vibio.land?subject=Prensa%20Vibio", label: "Prensa" },
]

const contactLinks = [
  { href: "mailto:hola@vibio.land", label: "hola@vibio.land" },
  { href: "/contacto", label: "Hablar con el equipo" },
]

export function Footer({ showInvestorCta = true }: { showInvestorCta?: boolean }) {
  return (
    <footer
      id="contacto"
      data-nav-surface="dark"
      className="overflow-hidden"
      style={{ backgroundColor: 'var(--color-vibio-brand-green)' }}
    >
      {showInvestorCta ? (
        <section className="border-b border-white/10">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[minmax(0,1.2fr)_auto] lg:items-center lg:gap-16 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <h2 className="font-heading text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.06] text-vibio-marfil text-balance">
                Vibio es también una oportunidad de inversión.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-light leading-[1.8] text-white/70 lg:text-lg">
                Modelo probado, demanda real, rentabilidad clara. Sin greenwashing ni promesas vacías. Un proyecto sólido con impacto territorial medible.
              </p>
            </div>

            <Link
              href="/invertir-en-vibio"
              className="group inline-flex w-full items-center justify-center gap-3 border border-transparent bg-vibio-brand-yellow px-6 py-3.5 text-sm font-medium text-vibio-dark transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#d7c56f] lg:w-auto"
            >
              <span>Área de inversores</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      ) : null}

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-14 lg:px-8 lg:pb-10 lg:pt-16">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div className="max-w-md">
            <VibioLogoLink
              className="h-8 w-auto max-w-[220px] brightness-0 invert lg:h-9 lg:max-w-[250px]"
              linkClassName="inline-block leading-none"
            />

            <p className="mt-7 text-sm font-light tracking-[0.18em] text-white/48">
              Reencuentra · Rediseña · Regenera
            </p>

            <p className="mt-8 max-w-sm text-[15px] font-light leading-[1.82] text-white/68 lg:text-base">
              Sistema de vida en común diseñada para personas que quieren vivir mejor juntas en entornos rurales.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:pt-2">
            <FooterColumn title="Proyectos" links={projectLinks} />
            <FooterColumn title="Empresa" links={companyLinks} />
            <FooterColumn title="Contacto" links={contactLinks} />
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-5 lg:mt-20 lg:pt-6">
          <div className="flex flex-col gap-3 text-[11px] font-light leading-[1.7] text-white/42 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p>© 2026 Vibio. Todos los derechos reservados.</p>
            <p>Desarrollado por Felicidad Collective · Madrid / Lisboa / Mendoza / São Paulo</p>
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
  if (href.startsWith('mailto:')) {
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

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" fill="none" className={className} aria-hidden>
      <path d="M2 7h9M7.5 2.5 12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
