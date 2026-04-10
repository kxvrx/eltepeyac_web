import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ParallaxSection } from "@/components/ui/ParallaxSection";
import { homeInterior } from "@/lib/images";
import { CALENDAR_EVENTS, getUpcomingEvents } from "@/lib/calendar";
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
          <Container className="relative flex h-full flex-col justify-end pb-16 sm:pb-20">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.25em] text-white/60 mb-4 font-light">
                {year} · Celebraciones del año
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] text-white mb-6">
                Cada mes tiene<br />
                <span className="italic">su propia celebración</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
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
