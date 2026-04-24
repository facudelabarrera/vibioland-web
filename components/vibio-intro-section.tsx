import { ScrollReveal } from '@/components/scroll-reveal'

export function VibioIntroSection() {
  return (
    <section data-nav-surface="light" className="bg-vibio-white py-20 lg:py-28">
      <div className="vibio-layout-shell">
        <ScrollReveal>
          <span className="t-home-badge-soft mb-10 inline-flex w-fit rounded-full bg-[#5F5134] px-4 py-1.5 text-white">
            Qué es Vibio
          </span>
          <p className="t-home-serif-statement text-vibio-text">
            Diseñamos comunidades en<br />
            entornos rurales para quienes<br />
            buscan echar raíces.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
