import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
// import { QueEsVibio } from "@/components/que-es-vibio"
import { ElModelo } from "@/components/el-modelo"
import { Proyectos } from "@/components/proyectos"
import { Audiencia } from "@/components/audiencia"
// import { FinalChapter } from "@/components/final-chapter"
// import { Unete } from "@/components/unete"
import { PreguntasFrecuentes } from "@/components/preguntas-frecuentes"
import { FinalConversionSection } from "@/components/final-conversion-section"
import { Footer } from "@/components/footer"

export const revalidate = 60

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      {/* <QueEsVibio /> */}
      <ElModelo />
      <Proyectos />
      <Audiencia />
      {/* <FinalChapter>
        <Unete />
      </FinalChapter> */}
      <PreguntasFrecuentes />
      <FinalConversionSection />
      <Footer />
    </main>
  )
}
