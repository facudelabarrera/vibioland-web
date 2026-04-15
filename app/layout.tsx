import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { VibioCursor } from '@/components/vibio-cursor'
import { SmoothScroll } from '@/components/smooth-scroll'
import './globals.css'

export const metadata: Metadata = {
  title: 'vibio.land — Regeneración rural en España',
  description: 'vibio crea comunidades en entornos rurales donde arraigarse tiene sentido: viviendas ecológicas, economía real y vecinos con quienes construir algo duradero.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/qag0rye.css" />
      </head>
      <body className="font-sans antialiased bg-vibio-white text-vibio-dark">
        <SmoothScroll />
        <VibioCursor />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
