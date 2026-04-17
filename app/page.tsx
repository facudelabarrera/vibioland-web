import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
// import { QueEsVibio } from "@/components/que-es-vibio"
import { ElModelo } from "@/components/el-modelo"
import { Proyectos } from "@/components/proyectos"
import { Datos } from "@/components/datos"
import { Testimonios } from "@/components/testimonios"
import { Inversores } from "@/components/inversores"
// import { FinalChapter } from "@/components/final-chapter"
// import { Unete } from "@/components/unete"
import { PreguntasFrecuentes } from "@/components/preguntas-frecuentes"
import { Footer } from "@/components/footer"

export const revalidate = 60

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      {/* <QueEsVibio /> */}
      <ElModelo />
      <Datos />
      <Proyectos />
      <Testimonios />
      <Inversores />
      {/* <FinalChapter>
        <Unete />
      </FinalChapter> */}
      <PreguntasFrecuentes />
      <Footer />
    </main>
  )
}
