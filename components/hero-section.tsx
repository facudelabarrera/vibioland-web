import Link from "next/link"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { TextAnimate } from "@/components/ui/text-animate"
import { Highlighter } from "@/components/ui/highlighter"
import { HeroImageExpand } from "@/components/hero-image-expand"

export function HeroSection() {
  return (
    <>
      <section className="pt-24 lg:pt-28 pb-16 lg:pb-20" style={{ backgroundColor: '#1c2e24' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <TextAnimate
            as="h1"
            animation="slideUp"
            by="word"
            once
            className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.08] text-white text-balance"
          >
            Vivir mejor no es una utopía. Es un diseño.
          </TextAnimate>

          <div className="mt-8 flex flex-col gap-6 lg:mt-10 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl text-lg font-light leading-[1.7] text-white/70 lg:text-xl">
              <span className="font-semibold text-white">vibio</span> crea comunidades en entornos rurales donde arraigarse tiene sentido:
              viviendas ecológicas, economía real y vecinos con quienes{" "}
              <Highlighter action="underline" color="#e8cd79" strokeWidth={2} isView>
                construir algo duradero
              </Highlighter>
              .
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="#modelo" className="inline-block">
                <ShimmerButton
                  background="rgba(255,255,255,0.95)"
                  shimmerColor="#1c2e24"
                  borderRadius="0"
                  className="border-white/20 px-6 py-3 text-sm font-medium !text-vibio-dark"
                >
                  Descubrir el modelo
                </ShimmerButton>
              </Link>
              <Link
                href="#proyectos"
                className="inline-flex items-center justify-center border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white/95 transition-all hover:bg-white/18"
              >
                Ver proyectos
              </Link>
            </div>
          </div>
        </div>
      </section>
      <HeroImageExpand />
    </>
  )
}
