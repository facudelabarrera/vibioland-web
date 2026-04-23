"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"

/** Scroll casi arriba del todo: el header siempre visible */
const TOP_EPS = 8
/** Delta mínimo de scroll para reaccionar (px) */
const DELTA = 6
/** Altura de la franja bajo el borde superior donde medimos qué sección “gana” el tema */
const NAV_BAND = 56

type NavSurface = "light" | "dark"

const navItems = [
  { href: "/modelo", label: "COMO FUNCIONA" },
  { href: "/proyectos", label: "COMUNIDADES" },
  { href: "/vivir-en-vibio", label: "VIVIR EN VIBIO" },
  { href: "/contacto", label: "CONTACTA" },
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

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [surface, setSurface] = useState<NavSurface>("light")
  const lastScrollY = useRef(0)

  const syncSurface = useCallback(() => {
    setSurface(readNavSurface())
  }, [])

  useEffect(() => {
    const tick = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current

      if (y <= TOP_EPS) {
        setHeaderVisible(true)
      } else if (delta > DELTA) {
        setHeaderVisible(false)
        setMobileMenuOpen(false)
      } else if (delta < -DELTA) {
        setHeaderVisible(true)
      }

      lastScrollY.current = y
      syncSurface()
    }

    const onScroll = () => {
      requestAnimationFrame(tick)
    }

    tick()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", syncSurface, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", syncSurface)
    }
  }, [syncSurface])

  const isDark = surface === "dark"
  const textClass = isDark ? "text-white" : "text-vibio-text"
  const textMuted = isDark ? "text-white/75" : "text-vibio-text/75"
  const hoverBg = isDark ? "hover:bg-white/10" : "hover:bg-vibio-text/[0.06]"
  const hoverText = isDark ? "hover:text-white" : "hover:text-vibio-text"

  const mobilePanelClass = isDark
    ? "vibio-surface-radius-lg border-white/20 bg-vibio-brand-green/92 text-white/90"
    : "vibio-surface-radius-lg border-vibio-border bg-vibio-white/92 text-vibio-text/90"

  const mobileLinkClass = isDark
    ? "vibio-action-radius px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
    : "vibio-action-radius px-4 py-3 text-sm text-vibio-text/80 transition-colors hover:bg-vibio-text/[0.05] hover:text-vibio-text"

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 bg-transparent transition-[transform,color] duration-200 ease-out motion-reduce:transition-none"
      style={{ transform: headerVisible ? "translateY(0)" : "translateY(-100%)" }}
      suppressHydrationWarning
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="inline-block shrink-0">
          <Image
            src="/vibioland-logo.svg"
            alt="Vibio"
            width={97}
            height={32}
            className="h-8 w-auto"
            style={{
              filter: isDark ? 'brightness(0) invert(1)' : 'none',
              transition: 'filter 200ms ease',
            }}
          />
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`vibio-action-radius px-4 py-2 text-sm transition-colors duration-200 ${textMuted} ${hoverBg} ${hoverText}`}
            >
              {item.label}
            </Link>
          ))}

        </div>

        <button
          type="button"
          className="vibio-action-radius p-2 transition-colors duration-200 lg:hidden"
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={mobileLinkClass}
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
