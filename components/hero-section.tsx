import Link from "next/link"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { TextAnimate } from "@/components/ui/text-animate"
import { Highlighter } from "@/components/ui/highlighter"
import { HeroImageExpand } from "@/components/hero-image-expand"

export function HeroSection() {
  return (
    <>
      <section
        data-nav-surface="light"
        className="pb-12 pt-24 lg:pb-16 lg:pt-28"
        style={{
          backgroundColor: "#fafafa",
          backgroundImage: 'url("/images/topography-hero.svg")',
          backgroundRepeat: "repeat",
          backgroundSize: "clamp(220px, 28vw, 480px)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:gap-y-0">
            <TextAnimate
              as="h1"
              animation="slideUp"
              by="word"
              once
              className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.08] text-vibio-text text-balance"
            >
              Vivir mejor no es una utopía. Es un diseño.
            </TextAnimate>

            <div className="flex flex-col gap-8 lg:pt-1">
              <p className="max-w-xl text-lg font-light leading-[1.7] text-vibio-text/70 lg:max-w-none lg:text-xl">
                <span className="font-semibold text-vibio-text">vibio</span> crea
                comunidades en entornos rurales donde arraigarse tiene sentido:
                viviendas ecológicas, economía real y vecinos con quienes{" "}
                <Highlighter action="underline" color="var(--color-vibio-brand-yellow)" strokeWidth={2} isView>
                  construir algo duradero
                </Highlighter>
                .
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="#modelo" className="inline-block">
                  <ShimmerButton
                    background="var(--color-vibio-brand-green)"
                    shimmerColor="#ffffff"
                    borderRadius="0"
                    className="border-transparent px-6 py-3 text-sm font-medium !text-vibio-white"
                  >
                    Descubrir el modelo
                  </ShimmerButton>
                </Link>
                <Link
                  href="#proyectos"
                  className="inline-flex items-center justify-center border border-vibio-text/20 bg-transparent px-6 py-3 text-sm font-medium text-vibio-text transition-all hover:border-vibio-text/35 hover:bg-vibio-text/[0.04]"
                >
                  Ver proyectos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HeroImageExpand />
    </>
  )
}
