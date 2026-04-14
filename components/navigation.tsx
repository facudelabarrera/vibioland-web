"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"

const DARK_ZONE = 600

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [onDark, setOnDark] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastScrollY.current

        if (y < 80) {
          setVisible(true)
        } else if (delta > 4) {
          setVisible(false)
          setMobileMenuOpen(false)
        } else if (delta < -4) {
          setVisible(true)
        }

        setOnDark(y < DARK_ZONE)

        lastScrollY.current = y
        ticking.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { href: "/#modelo", label: "El modelo" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/decalogo", label: "Decálogo" },
    { href: "/#comunidad", label: "Comunidad" },
    { href: "/#contacto", label: "Contacto" },
  ]

  const textClass = onDark ? 'text-white' : 'text-vibio-text'
  const textMuted = onDark ? 'text-white/70' : 'text-vibio-text/70'
  const hoverBg = onDark ? 'hover:bg-white/10' : 'hover:bg-vibio-text/5'
  const hoverText = onDark ? 'hover:text-white' : 'hover:text-vibio-text'
  const shadow = onDark
    ? 'drop-shadow-[0_0_6px_rgba(0,0,0,0.4)]'
    : 'drop-shadow-[0_0_8px_rgba(250,250,250,0.9)]'
  const shadowStrong = onDark
    ? 'drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]'
    : 'drop-shadow-[0_0_8px_rgba(250,250,250,0.9)]'

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-out"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
      suppressHydrationWarning
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className={`font-heading text-lg font-semibold transition-colors duration-300 ${textClass} ${shadowStrong}`}
        >
          <span className="font-bold">vibio</span>.land
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 text-sm backdrop-blur-md transition-all duration-300 ${textMuted} ${hoverBg} ${hoverText} ${shadow}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className={`lg:hidden transition-colors duration-300 ${shadowStrong}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className={`h-6 w-6 transition-colors duration-300 ${textClass}`}
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="mx-4 border border-vibio-border/40 bg-vibio-white/80 px-4 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-sm text-vibio-text/80 transition-colors hover:bg-vibio-surface hover:text-vibio-text"
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
