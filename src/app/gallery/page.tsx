export const dynamic = "force-dynamic";

import { GalleryClient } from "./ui/GalleryClient";
import { restaurant } from "@/lib/restaurant";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { fetchAlbumPhotos } from "@/lib/cloudinary-server";
import { galleryAlbums } from "@/lib/gallery";

export const metadata = {
  title: "Galería",
  description: "Una colección en crecimiento de momentos de El Tepeyac.",
};

export default async function GalleryPage() {
  const mainAlbum = galleryAlbums.find((a) => a.slug === "lugar")!;
  const photos = await fetchAlbumPhotos(mainAlbum.prefix);

  return (
    <div>
      {/* ── Grid con lightbox ──────────────────────────────────────────── */}
      <GalleryClient photos={photos} />

      {/* ── CTA final — fondo claro bone ─────────── */}
      <section className="bg-[#fafaf8] py-10 sm:py-18">
        <Container>
          {/* Línea divisoria sutil */}
          <div className="mb-16 h-px w-16 bg-charcoal/80" />

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-end">
            {/* Izquierda — horario como display grande */}
            <div>
              <div className="font-mono text-[15px] tracking-[0.4em] uppercase text-charcoal/85 mb-6">
                ¿Vienes a comer?
              </div>
              <h2 className="text-4xl leading-[1.05] text-charcoal sm:text-5xl lg:text-[3.5rem]">
                Lun–Dom
                <br />
                <span className="text-charcoal/90">8:00 AM – 11:30 PM</span>
              </h2>
              <p className="mt-6 text-sm font-mono tracking-wider text-charcoal/85 uppercase">
                {restaurant.addressLine1} · {restaurant.addressLine2}
              </p>
            </div>

            {/* Derecha — CTAs */}
            <div className="flex flex-col gap-4 lg:items-end">
              <Link
                href="/contact"
                className="group flex items-center justify-between gap-8 border border-charcoal/12 bg-charcoal/4 px-7 py-5 text-sm font-semibold uppercase tracking-wider text-charcoal transition hover:border-charcoal/25 hover:bg-charcoal/8 sm:justify-start sm:gap-12"
              >
                <span>Cómo llegar</span>
                <span className="font-mono text-charcoal/30 transition group-hover:text-charcoal/60">→</span>
              </Link>

              <a
                href={`tel:${restaurant.phoneE164}`}
                className="group flex items-center justify-between gap-8 border border-charcoal/8 px-7 py-5 text-sm font-semibold uppercase tracking-wider text-charcoal/85 transition hover:border-charcoal/18 hover:text-charcoal/85 sm:justify-start sm:gap-12"
              >
                <span>Llamar ahora</span>
                <span className="font-mono text-charcoal/85 transition group-hover:text-charcoal/85">
                  {restaurant.phoneDisplay}
                </span>
              </a>

              <a
                href="https://maps.app.goo.gl/QfCEj54E1Ze2CGMh6"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-8 border border-charcoal/8 px-7 py-5 text-sm font-semibold uppercase tracking-wider text-charcoal/85 transition hover:border-charcoal/18 hover:text-charcoal/85 sm:justify-start sm:gap-12"
              >
                <span>Ver en Maps</span>
                <span className="font-mono text-charcoal/25 transition group-hover:text-charcoal/85">↗</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
