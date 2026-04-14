import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { VibioCursor } from '@/components/vibio-cursor'
import { SmoothScroll } from '@/components/smooth-scroll'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
})

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
    <html lang="es" className={dmSans.variable}>
      <body className="font-sans antialiased bg-vibio-white text-vibio-dark">
        <SmoothScroll />
        <VibioCursor />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
