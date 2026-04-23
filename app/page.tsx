import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { VibioIntroSection } from "@/components/vibio-intro-section"
import { ElModelo } from "@/components/el-modelo"
import { Proyectos } from "@/components/proyectos"
import { Datos } from "@/components/datos"
import { Testimonios } from "@/components/testimonios"
import { FinalConversionSection } from "@/components/final-conversion-section"
import { Footer } from "@/components/footer"

export const revalidate = 60

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <VibioIntroSection />
      <ElModelo />
      <Datos />
      <Proyectos />
      <Testimonios />
      <FinalConversionSection />
      <Footer />
    </main>
  )
}
