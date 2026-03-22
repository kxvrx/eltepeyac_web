export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { restaurant } from "@/lib/restaurant";
import { fetchAlbumPhotosWithMeta } from "@/lib/cloudinary-server";
import { galleryAlbums } from "@/lib/gallery";
import { SubAlbumClient } from "../ui/SubAlbumClient";

export const metadata = {
  title: "Catering — El Tepeyac",
  description: "Montajes, bandejas y platos para grupos de 10 a 500 personas.",
};

export default async function CateringGalleryPage() {
  const album  = galleryAlbums.find((a) => a.slug === "catering")!;
  const photos = await fetchAlbumPhotosWithMeta(album.prefix);

  return (
    <div className="bg-[#fafaf8]">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16">
        <Container>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="font-mono text-[11px] tracking-[0.45em] uppercase text-cilantro">
                {album.eyebrow}
              </div>
              <h1 className="mt-4 text-5xl leading-[0.92] text-charcoal sm:text-6xl">
                {album.title}
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-charcoal">
                {album.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${restaurant.phoneE164}`}
                  className="inline-flex items-center bg-cilantro px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:brightness-95"
                >
                  Consultar disponibilidad
                </a>
                <Link
                  href="/contact"
                  className="border-b border-charcoal/40 pb-0.5 text-sm font-semibold text-charcoal/70 transition-colors hover:border-charcoal hover:text-charcoal"
                >
                  Enviar mensaje →
                </Link>
              </div>
            </div>
            <Link
              href="/gallery"
              className="w-fit border-b border-charcoal/40 pb-0.5 text-sm font-semibold text-charcoal/70 transition-colors hover:border-charcoal hover:text-charcoal"
            >
              ← Galería principal
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Fotos ──────────────────────────────────────────────────────── */}
      {photos.length === 0 ? (
        <>
          <section className="pb-10">
            <Container>
              <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-charcoal/12 py-28 text-center">
                <p className="font-mono text-sm tracking-widest text-charcoal/35 uppercase">
                  Álbum vacío
                </p>
                <p className="font-mono text-xs text-charcoal/25">
                  Sube imágenes con el prefijo{" "}
                  <code className="rounded bg-charcoal/5 px-1.5 py-0.5">catering_</code>{" "}
                  en Cloudinary
                </p>
              </div>
            </Container>
          </section>
          <SubAlbumClient photos={[]} albums={galleryAlbums} currentSlug={album.slug} />
        </>
      ) : (
        <>
          {/* Hero foto — full width */}
          <div className="relative w-full" style={{ height: "clamp(380px, 58vw, 740px)" }}>
            <Image
              src={photos[0].src}
              alt={album.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Masonry + Lightbox + Nav entre álbumes */}
          <div className="pt-0.5">
            <SubAlbumClient
              photos={photos}
              albums={galleryAlbums}
              currentSlug={album.slug}
            />
          </div>
        </>
      )}
    </div>
  );
}
