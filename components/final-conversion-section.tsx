import Link from 'next/link'
import Image from 'next/image'

import { ScrollReveal } from '@/components/scroll-reveal'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { DEFAULT_IMAGE_BLUR_DATA_URL } from '@/lib/image-placeholder'

export function FinalConversionSection() {
  return (
    <section
      id="unete"
      data-nav-surface="dark"
      className="relative min-h-screen overflow-hidden bg-vibio-brand-green"
    >
      <Image
        src="/Copia de VIBIOLAND_20250216_017.JPG"
        alt="Vista aérea de Vibioland para cierre de conversión"
        fill
        sizes="100vw"
        placeholder="blur"
        blurDataURL={DEFAULT_IMAGE_BLUR_DATA_URL}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-vibio-casi-negro/48" aria-hidden />

      <div className="vibio-layout-shell relative z-10 flex min-h-screen items-center justify-center py-20 text-center lg:py-28">
        <ScrollReveal delay={0.1}>
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <h2 className="t-home-display-final text-white">
              ¿Estás pensando<br />en cambiar de vida?
            </h2>

            <div className="mt-10 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Link href="/contacto" className="inline-block">
                <ShimmerButton
                  background="#FFFFFF"
                  shimmerColor="rgba(63,57,38,0.12)"
                  className="t-home-button vibio-button-motion border-transparent px-6 py-3 !text-vibio-dark"
                >
                  HABLEMOS
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
