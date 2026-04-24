"use client"

import Link from "next/link"
import Image from "next/image"
import { Inter } from "next/font/google"
import { useState, useEffect, useRef, useCallback } from "react"

/** Scroll casi arriba del todo: el header siempre visible */
const TOP_EPS = 8
/** Delta mínimo de scroll para reaccionar (px) */
const DELTA = 6
/** Altura de la franja bajo el borde superior donde medimos qué sección "gana" el tema */
const NAV_BAND = 56

type NavSurface = "light" | "dark"
type NavigationVariant = "overlay" | "solid"
type NavLinkItem = {
  href: string
  label: string
  isEmphasized?: boolean
}

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600"],
})

const regularNavItems: NavLinkItem[] = [
  { href: "/modelo", label: "COMO FUNCIONA" },
]

const secondaryNavItems: NavLinkItem[] = [
  { href: "/vivir-en-vibio", label: "VIVIR EN VIBIO" },
  { href: "/contacto", label: "CONTACTO", isEmphasized: true },
]

const mobilePrimaryItems: NavLinkItem[] = [
  { href: "/modelo", label: "COMO FUNCIONA" },
  { href: "/vivir-en-vibio", label: "VIVIR EN VIBIO" },
  { href: "/contacto", label: "CONTACTO", isEmphasized: true },
]

const comunidadesItems = [
  {
    href: "/proyectos#vibio-higuera",
    label: "vibio.higuera",
    logoSrc: "/vibio.higuera_logo.svg",
    logoAlt: "Logo de vibio.higuera",
    /** viewBox 460x97 → at 18px height: ≈85px wide */
    logoWidth: 85,
  },
  {
    href: "/proyectos#vibio-berlanga",
    label: "vibio.berlanga",
    logoSrc: "/vibio.berlanga_logo.svg",
    logoAlt: "Logo de vibio.berlanga",
    /** viewBox 498x97 → at 18px height: ≈92px wide */
    logoWidth: 92,
  },
]

function readNavSurface(): NavSurface {
  const markers = document.querySelectorAll("[data-nav-surface]")
  let best: { overlap: number; theme: NavSurface } | null = null

  for (const el of markers) {
    const raw = el.getAttribute("data-nav-surface")
    if (raw !== "light" && raw !== "dark") continue
    const r = el.getBoundingClientRect()
    const overlap = Math.min(r.bottom, NAV_BAND) - Math.max(r.top, 0)
    if (overlap > 0 && (!best || overlap > best.overlap)) {
      best = { overlap, theme: raw }
    }
  }

  return best?.theme ?? "light"
}

type NavigationProps = {
  variant?: NavigationVariant
}

export function Navigation({ variant = "overlay" }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [comunidadesOpen, setComunidadesOpen] = useState(false)
  const [mobileComunidadesOpen, setMobileComunidadesOpen] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [surface, setSurface] = useState<NavSurface>("light")
  const lastScrollY = useRef(0)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isSolid = variant === "solid"

  const syncSurface = useCallback(() => {
    if (isSolid) {
      setSurface("light")
      return
    }
    setSurface(readNavSurface())
  }, [isSolid])

  useEffect(() => {
    const tick = () => {
      if (isSolid) {
        setHeaderVisible(true)
        setSurface("light")
        return
      }

      const y = window.scrollY
      const delta = y - lastScrollY.current

      if (y <= TOP_EPS) {
        setHeaderVisible(true)
      } else if (delta > DELTA) {
        setHeaderVisible(false)
        setMobileMenuOpen(false)
        setComunidadesOpen(false)
      } else if (delta < -DELTA) {
        setHeaderVisible(true)
      }

      lastScrollY.current = y
      syncSurface()
    }

    const onScroll = () => {
      requestAnimationFrame(tick)
    }

    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setComunidadesOpen(false)
      }
    }

    tick()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", syncSurface, { passive: true })
    document.addEventListener("mousedown", onClickOutside)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", syncSurface)
      document.removeEventListener("mousedown", onClickOutside)
    }
  }, [isSolid, syncSurface])

  const isDark = surface === "dark"
  const textClass = isDark ? "text-white" : "text-vibio-text"
  const textMuted = isSolid
    ? "text-vibio-text/72"
    : isDark
      ? "text-white/75"
      : "text-vibio-text/75"
  const hoverBg = isSolid ? "hover:bg-vibio-text/[0.05]" : isDark ? "hover:bg-white/10" : "hover:bg-vibio-text/[0.06]"
  const hoverText = isDark ? "hover:text-white" : "hover:text-vibio-text"

  const mobilePanelClass = isDark
    ? "vibio-surface-radius-lg border-white/20 bg-vibio-brand-green/92 text-white/90"
    : "vibio-surface-radius-lg border-vibio-border bg-vibio-white/92 text-vibio-text/90"

  const mobileLinkClass = isDark
    ? "t-home-nav-link-mobile vibio-action-radius px-4 py-3 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
    : "t-home-nav-link-mobile vibio-action-radius px-4 py-3 text-vibio-text/80 transition-colors hover:bg-vibio-text/[0.05] hover:text-vibio-text"

  const logoColor = isDark ? "rgba(255,255,255,0.85)" : "#3F3926"
  const headerClass = isSolid
    ? "sticky top-0 right-0 left-0 z-50 bg-vibio-white/96 backdrop-blur-md"
    : "fixed top-0 right-0 left-0 z-50 bg-transparent transition-[transform,color] duration-200 ease-out motion-reduce:transition-none"
  const navClass = isSolid
    ? "vibio-layout-shell flex items-center justify-between py-2 lg:py-2.5"
    : "vibio-layout-shell flex items-center justify-between py-1.5"
  const desktopLinkClass = isSolid
    ? `${inter.className} t-home-nav-link-solid vibio-action-radius vibio-hover-link px-4 py-1.5 transition-colors duration-200 ${textMuted} ${hoverBg} ${hoverText}`
    : `${inter.className} t-home-nav-link-overlay vibio-action-radius vibio-hover-link px-4 py-1.5 transition-colors duration-200 ${textMuted} ${hoverBg} ${hoverText}`
  const dropdownClass = isSolid
    ? "vibio-surface-radius-lg absolute top-full left-0 z-50 mt-2 min-w-[156px] border border-vibio-border/20 bg-vibio-white/98 py-2 shadow-[0_18px_50px_rgba(63,57,38,0.10)] backdrop-blur-sm"
    : `vibio-surface-radius-lg absolute top-full left-0 z-50 mt-1.5 min-w-[136px] border py-2 backdrop-blur-sm ${
        isDark
          ? "border-white/20 bg-vibio-brand-green/95"
          : "border-vibio-border bg-vibio-white/96"
      }`

  return (
    <header
      className={headerClass}
      style={isSolid ? undefined : { transform: headerVisible ? "translateY(0)" : "translateY(-100%)" }}
      suppressHydrationWarning
    >
      <nav className={navClass}>
        <Link href="/" className="inline-block shrink-0">
          <Image
            src="/vibioland-logo.svg"
            alt="Vibio"
            width={97}
            height={32}
            className={isSolid ? "h-[2.7rem] w-auto sm:h-[3rem]" : "h-[2.7rem] w-auto sm:h-[3rem]"}
            style={{
              filter: isDark ? "brightness(0) invert(1)" : "none",
              transition: "filter 200ms ease",
            }}
          />
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {regularNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${desktopLinkClass} ${item.isEmphasized ? "t-home-nav-link-emphasis text-vibio-text" : ""}`}
            >
              {item.label}
            </Link>
          ))}

          {/* Dropdown COMUNIDADES */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setComunidadesOpen((v) => !v)}
              className={`${desktopLinkClass} inline-flex items-center gap-1.5`}
            >
              COMUNIDADES
              <svg
                className={`h-3 w-3 transition-transform duration-200 ${comunidadesOpen ? "rotate-180" : ""}`}
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 4l4 4 4-4" />
              </svg>
            </button>

            {comunidadesOpen && (
              <div className={dropdownClass}>
                {comunidadesItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setComunidadesOpen(false)}
                    className={`flex items-center px-4 py-2.5 transition-colors duration-150 ${
                      isSolid
                        ? "hover:bg-vibio-text/[0.04]"
                        : isDark
                        ? "hover:bg-white/10"
                        : "hover:bg-vibio-text/[0.05]"
                    }`}
                  >
                    <div
                      role="img"
                      aria-label={item.logoAlt}
                      style={{
                        height: "18px",
                        width: `${item.logoWidth}px`,
                        backgroundColor: logoColor,
                        WebkitMaskImage: `url(${item.logoSrc})`,
                        maskImage: `url(${item.logoSrc})`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "left center",
                        maskPosition: "left center",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                        transition: "background-color 200ms ease",
                      }}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {secondaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${desktopLinkClass} ${item.isEmphasized ? "t-home-nav-link-emphasis text-vibio-text" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className={`vibio-action-radius p-2 transition-colors duration-200 lg:hidden ${isSolid ? "text-vibio-text" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir o cerrar menú"
        >
          <svg
            className={`h-6 w-6 transition-colors duration-200 ${textClass}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className={`mx-4 border px-4 py-4 backdrop-blur-sm lg:hidden ${mobilePanelClass}`}>
          <div className="flex flex-col gap-1">
            {mobilePrimaryItems.slice(0, 1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${inter.className} ${mobileLinkClass} ${item.isEmphasized ? "t-home-nav-link-emphasis text-vibio-text" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* COMUNIDADES expandible en mobile */}
            <button
              type="button"
              onClick={() => setMobileComunidadesOpen((v) => !v)}
              className={`${mobileLinkClass} flex w-full items-center justify-between`}
            >
              COMUNIDADES
              <svg
                className={`h-3 w-3 transition-transform duration-200 ${mobileComunidadesOpen ? "rotate-180" : ""}`}
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 4l4 4 4-4" />
              </svg>
            </button>

            {mobileComunidadesOpen && (
              <div className="ml-4 flex flex-col gap-1 border-l border-current/20 pl-3 pt-1">
                {comunidadesItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${mobileLinkClass} flex items-center`}
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setMobileComunidadesOpen(false)
                    }}
                  >
                    <div
                      role="img"
                      aria-label={item.logoAlt}
                      style={{
                        height: "16px",
                        width: `${item.logoWidth}px`,
                        backgroundColor: logoColor,
                        WebkitMaskImage: `url(${item.logoSrc})`,
                        maskImage: `url(${item.logoSrc})`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "left center",
                        maskPosition: "left center",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                      }}
                    />
                  </Link>
                ))}
              </div>
            )}

            {mobilePrimaryItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${inter.className} ${mobileLinkClass} ${item.isEmphasized ? "t-home-nav-link-emphasis text-vibio-text" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
