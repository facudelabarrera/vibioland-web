import Link from "next/link"
import Image from "next/image"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { DEFAULT_IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder"

export function HeroSection() {
  return (
    <section
      data-nav-surface="dark"
      className="bg-vibio-white"
    >
      <div className="relative isolate h-[100svh] overflow-hidden">
        <Image
          src="/Copia de VIBIOLAND_20250216_011.JPG"
          alt="Vista aérea de Vibioland entre entorno rural y urbanización"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={DEFAULT_IMAGE_BLUR_DATA_URL}
          className="object-cover object-center"
        />

        {/* Gradient overlay — improves text legibility without obscuring the photo */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.22) 55%, transparent 100%)' }}
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-6 pt-28 pb-14 lg:px-8 lg:pt-36 lg:pb-16">
          <div className="mt-[12svh] max-w-5xl lg:mt-[8svh]">
            <p className="mb-4 text-[14px] font-medium tracking-[0em] text-white uppercase lg:mb-5">
              Diseñamos comunidades y viviendas para la biodiversidad
            </p>
            <h1 className="font-heading text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.04] text-white text-balance">
              Una alternativa real
              <br />
              a la vida en la ciudad
            </h1>
          </div>

          <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-2 lg:items-end">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/modelo" className="inline-block">
                <ShimmerButton
                  background="var(--color-vibio-brand-yellow)"
                  shimmerColor="var(--color-vibio-brand-green)"
                  className="border-transparent px-6 py-3 text-sm font-medium !text-vibio-dark"
                >
                  ASÍ FUNCIONA VIBIO
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
