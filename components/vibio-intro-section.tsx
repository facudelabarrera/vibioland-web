import { ScrollReveal } from '@/components/scroll-reveal'

export function VibioIntroSection() {
  return (
    <section data-nav-surface="light" className="bg-vibio-white py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <span className="mb-10 inline-flex w-fit rounded-full bg-[#5F5134] px-4 py-1.5 text-[11px] font-medium tracking-[0.06em] text-white uppercase">
            Qué es Vibio
          </span>
          <p className="font-serif italic text-vibio-text text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.35]">
            Diseñamos comunidades en<br />
            entornos rurales para quienes<br />
            buscan echar raíces.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
