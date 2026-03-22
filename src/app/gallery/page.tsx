import { GalleryClient } from "./ui/GalleryClient";
import { restaurant } from "@/lib/restaurant";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ParallaxSection } from "@/components/ui/ParallaxSection";

export const metadata = {
  title: "Galería",
  description: "Una colección en crecimiento de momentos de El Tepeyac.",
};

export default function GalleryPage() {
  return (
    <div>
      {/* ── Carrusel + Grid con lightbox (client) ─────────────────────── */}
      <GalleryClient />

      {/* ── CTA parallax final ────────────────────────────────────────── */}
      <ParallaxSection
        image={{
          src: "/old-site/images/home/DSC00014.jpg",
          alt: "El Tepeyac",
          sizes: "100vw",
        }}
        className="h-[50vh] min-h-[380px]"
        strength={24}
        overlay={<div className="absolute inset-0 bg-black/55" />}
      >
        <Container className="relative flex h-full items-center">
          <div className="max-w-lg text-white">
            <div className="text-[10px] font-mono tracking-[0.36em] uppercase text-white/50 mb-6">
              ¿Vienes a comer?
            </div>
            <h2 className="text-3xl leading-[1.05] sm:text-4xl">{restaurant.hours}</h2>
            <p className="mt-4 text-base text-white/65">
              {restaurant.addressLine1}, {restaurant.addressLine2}
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Contacto y ubicación
              </Link>
            </div>
          </div>
        </Container>
      </ParallaxSection>
    </div>
  );
}
