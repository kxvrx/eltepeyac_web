import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ParallaxSection } from "@/components/ui/ParallaxSection";
import { homeInterior } from "@/lib/images";
import { getUpcomingEvents } from "@/lib/calendar";
import CalendarioClient from "./ui/CalendarioClient";

export const metadata: Metadata = {
  title: "Calendario Cultural",
  description:
    "Fechas culturales, gastronómicas y patrias que celebramos todo el año en El Tepeyac Taqueria — tradiciones mexicanas, americanas y días especiales de comida.",
};

export default function CalendarioPage() {
  const today = new Date();
  const year = today.getFullYear();
  const upcoming = getUpcomingEvents(today, 45);

  return (
    <>
      {/* Hero with Parallax */}
      <div className="-mt-[68px] sm:-mt-[72px]">
        <ParallaxSection
          image={{
            src: homeInterior,
            alt: "El Tepeyac — interior cálido",
            priority: true,
            sizes: "100vw",
          }}
          className="h-[80vh] min-h-[500px] sm:min-h-[600px]"
          strength={300}
          overlay={
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
          }
        >
          <Container className="relative flex h-full flex-col justify-end pb-12 sm:pb-16">
            <div className="w-full">
              <p className="mb-3 text-sm font-light uppercase tracking-[0.25em] text-white/60 sm:mb-4">
                {year} · Celebraciones del año
              </p>
              <h1 className="mb-4 text-4xl font-light leading-[1.05] text-white sm:mb-5 sm:text-5xl lg:text-6xl">
                Cada mes tiene<br />
                <span className="italic">su propia celebración</span>
              </h1>
              <p className="max-w-4xl text-base leading-relaxed text-white/80 sm:text-lg">
                Un calendario de tradiciones mexicanas, celebraciones compartidas con nuestros vecinos en Estados Unidos, y los días especiales que honran los ingredientes que definen nuestra cocina.
              </p>
            </div>
          </Container>
        </ParallaxSection>
      </div>

      {/* Interactive Calendar Section */}
      <CalendarioClient upcoming={upcoming} year={year} />
    </>
  );
}
