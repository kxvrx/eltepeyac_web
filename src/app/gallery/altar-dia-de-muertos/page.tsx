import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { fetchAlbumPhotosWithMeta } from "@/lib/cloudinary-server";
import { galleryAlbums } from "@/lib/gallery";
import { SubAlbumClient } from "../ui/SubAlbumClient";

export const metadata = {
  title: "Altar Día de Muertos — El Tepeyac",
  description: "Una historia de temporada contada con color, flores y memoria.",
};

export default async function AltarDiaDeMuertosPage() {
  const album  = galleryAlbums.find((a) => a.slug === "altar")!;
  const photos = await fetchAlbumPhotosWithMeta(album.prefix);

  return (
    <div className="bg-[#fafaf8]">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16">
        <Container>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="font-mono text-sm tracking-[0.4em] uppercase text-cilantro">
                {album.eyebrow}
              </div>
              <h1 className="mt-4 text-5xl leading-[0.92] text-charcoal sm:text-6xl lg:text-7xl">
                {album.title}
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-charcoal">
                {album.subtitle}
              </p>
            </div>
            <Link
              href="/gallery"
              className="w-fit border-b border-charcoal/40 pb-0.5 text-base font-semibold text-charcoal/70 transition-colors hover:border-charcoal hover:text-charcoal"
            >
              ← Galería principal
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Fotos ──────────────────────────────────────────────────────── */}
      {photos.length === 0 ? (
        <section className="pb-20">
          <Container>
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-charcoal/12 py-28 text-center">
              <p className="font-mono text-sm tracking-widest text-charcoal/35 uppercase">
                Álbum vacío
              </p>
              <p className="font-mono text-xs text-charcoal/25">
                Sube imágenes con el prefijo{" "}
                <code className="rounded bg-charcoal/5 px-1.5 py-0.5">altar_</code>{" "}
                en Cloudinary
              </p>
            </div>
          </Container>
        </section>
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

      {/* Si vacío: mostrar nav entre álbumes igualmente */}
      {photos.length === 0 && (
        <SubAlbumClient
          photos={[]}
          albums={galleryAlbums}
          currentSlug={album.slug}
        />
      )}
    </div>
  );
}
