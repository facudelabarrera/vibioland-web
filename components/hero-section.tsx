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
          backgroundColor: 'var(--color-vibio-marfil)',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="mb-4 text-[12px] font-medium text-vibio-text/45 lg:mb-5">
            Sistema de vida en común diseñado.
          </p>
          <h1 className="font-heading text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.04] text-vibio-text">
            Vivir mejor en comunidad
            <br />
            también se diseña.
          </h1>

          <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-end lg:mt-8">
            <p className="max-w-xl text-lg font-light leading-[1.7] text-vibio-text/70 lg:max-w-lg lg:text-base">
              <span className="font-semibold text-vibio-text">Vibio</span> no es una utopía. Es arquitectura, gobernanza y proceso. Una forma de vivir fuera de la ciudad, con privacidad, en comunidad y en{" "}
              <Highlighter action="underline" color="var(--color-vibio-brand-yellow)" strokeWidth={2} isView>
                conexión real con el territorio
              </Highlighter>
              .
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
              <Link href="/modelo" className="inline-block">
                <ShimmerButton
                  background="var(--color-vibio-brand-yellow)"
                  shimmerColor="var(--color-vibio-brand-green)"
                  borderRadius="0"
                  className="border-transparent px-6 py-3 text-sm font-medium !text-vibio-dark"
                >
                  Cómo funciona
                </ShimmerButton>
              </Link>
              <Link
                href="/proyectos"
                className="inline-flex items-center justify-center border border-vibio-text/20 bg-transparent px-6 py-3 text-sm font-medium text-vibio-text transition-all hover:border-vibio-text/35 hover:bg-vibio-text/[0.04]"
              >
                Ver territorios
              </Link>
            </div>
          </div>
        </div>
      </section>
      <HeroImageExpand />
    </>
  )
}
