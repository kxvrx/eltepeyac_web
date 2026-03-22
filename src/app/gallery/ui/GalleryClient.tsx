"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { galleryAlbums, type GalleryPhoto } from "@/lib/gallery";

// ── Datos importados de la librería centralizada ─────────────────────────────
const ALBUMS = galleryAlbums;
const GRID_PHOTOS = ALBUMS[0].photos;

// ── SVG Icons ────────────────────────────────────────────────────────────────
function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
}
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}
function SearchPlus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
    </svg>
  );
}
function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// ── AlbumCard ─────────────────────────────────────────────────────────────────
interface AlbumCardProps {
  album: (typeof ALBUMS)[number];
  priority?: boolean;
  featured?: boolean;     // card grande — tipografía mayor
  className?: string;
}

function AlbumCard({ album, priority, featured, className = "" }: AlbumCardProps) {
  return (
    <Link
      href={album.href}
      className={`group relative flex overflow-hidden ${className}`}
    >
      {/* Foto de fondo */}
      <Image
        src={album.cover}
        alt={album.title}
        fill
        priority={priority}
        sizes={featured ? "62vw" : "38vw"}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />

      {/* Overlay: degradado de abajo hacia arriba */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 transition-all duration-500 group-hover:from-black/88 group-hover:via-black/35" />

      {/* Contenido — anclado abajo-izquierda */}
      <div className={`relative z-10 mt-auto w-full p-7 sm:p-9 ${featured ? "lg:p-12" : ""}`}>
        <div className="text-[9px] font-mono tracking-[0.4em] uppercase text-white/45 mb-3">
          {album.eyebrow}
        </div>

        <h2
          className={`leading-[0.92] text-white transition-none ${
            featured
              ? "text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem]"
              : "text-2xl sm:text-3xl"
          }`}
        >
          {album.title}
        </h2>

        {/* Subtitle — aparece en hover */}
        <p
          className={`mt-3 leading-6 text-white/60 max-w-xs transition-all duration-400 ease-out
            opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
            ${featured ? "text-sm sm:text-base max-w-sm" : "text-sm"}`}
        >
          {album.subtitle}
        </p>

        {/* CTA */}
        <div className="mt-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/70 transition-colors duration-300 group-hover:text-white">
          Ver álbum
          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Borde de foco accesible */}
      <div className="pointer-events-none absolute inset-0 ring-0 transition-all group-focus-visible:ring-2 group-focus-visible:ring-white/70" />
    </Link>
  );
}

// ── AlbumGrid — layout editorial bento ────────────────────────────────────────
function AlbumGrid() {
  return (
    /*
      Desktop: columna grande (62%) + columna derecha (38%) dividida en dos filas
      Móvil:   tres cards apiladas verticalmente
    */
    <div className="flex h-screen min-h-[600px] flex-col lg:flex-row">

      {/* Card principal — El Lugar */}
      <AlbumCard
        album={ALBUMS[0]}
        priority
        featured
        className="h-[48vh] lg:h-full lg:w-[62%] flex-shrink-0"
      />

      {/* Columna derecha: dos cards stacked con gap de 1px */}
      <div className="flex flex-1 flex-col gap-px bg-black lg:flex-col">
        <AlbumCard
          album={ALBUMS[1]}
          className="flex-1 h-[26vh] lg:h-full"
        />
        <AlbumCard
          album={ALBUMS[2]}
          className="flex-1 h-[26vh] lg:h-full"
        />
      </div>
    </div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
interface LightboxProps {
  photos: typeof GRID_PHOTOS;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ photos, index, onClose, onPrev, onNext }: LightboxProps) {
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onPrev, onNext]);

  return (
    /* Backdrop */
    <div
      role="dialog"
      aria-modal
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Image wrapper — stops backdrop click from propagating */}
      <div
        className="relative flex items-center justify-center"
        style={{ maxWidth: "90vw", maxHeight: "88vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={photos[index].src}
          src={photos[index].src}
          alt="El Tepeyac"
          width={1400}
          height={1050}
          priority
          className="max-h-[88vh] max-w-[90vw] w-auto h-auto object-contain"
          style={{ animationName: "fadeIn", animationDuration: "200ms" }}
        />
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center text-white/50 transition hover:text-white focus-visible:outline-none"
      >
        <XMark className="h-6 w-6" />
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Foto anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-white/8 text-white/70 backdrop-blur-sm transition hover:bg-white/16 hover:text-white focus-visible:outline-none"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Foto siguiente"
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-white/8 text-white/70 backdrop-blur-sm transition hover:bg-white/16 hover:text-white focus-visible:outline-none"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-mono tracking-[0.3em] text-white/35">
        {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
      </div>

      {/* Dot strip */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {photos.map((_, i) => (
          <div
            key={i}
            className={`h-[2px] rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-white/70" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ── PhotoGrid ─────────────────────────────────────────────────────────────────
function PhotoGrid({ onPhotoClick }: { onPhotoClick: (i: number) => void }) {
  return (
    <section id="fotos" className="bg-bone py-20 sm:py-28">
      <Container>
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="text-[10px] font-mono tracking-[0.38em] uppercase text-charcoal/40">
              Colección principal
            </div>
            <h2 className="mt-4 text-4xl leading-[1.0] text-charcoal sm:text-5xl">
              Un vistazo
            </h2>
          </div>
          <p className="hidden sm:block max-w-[200px] text-right text-sm leading-6 text-charcoal/50">
            Haz clic en cualquier foto para verla en detalle.
          </p>
        </div>

        {/* Grid editorial */}
        <div className="grid grid-cols-12 gap-1 sm:gap-1.5">
          {GRID_PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              onClick={() => onPhotoClick(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cilantro ${photo.col || "col-span-4"} ${photo.aspect || "aspect-[4/3]"}`}
            >
              <Image
                src={photo.src}
                alt="El Tepeyac"
                fill
                sizes="(min-width: 1280px) 60vw, (min-width: 768px) 80vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30 flex items-center justify-center">
                <div className="opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                  <SearchPlus className="h-7 w-7 text-white drop-shadow-lg" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Photo count */}
        <p className="mt-5 text-right text-[11px] font-mono tracking-[0.25em] text-charcoal/35">
          {GRID_PHOTOS.length} fotos
        </p>
      </Container>
    </section>
  );
}

// ── Main client export ────────────────────────────────────────────────────────
export function GalleryClient() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox  = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto     = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextPhoto     = useCallback(
    () => setLightboxIndex((i) => (i !== null && i < GRID_PHOTOS.length - 1 ? i + 1 : i)),
    []
  );

  return (
    <>
      {/* Grid de álbumes — se extiende detrás del header */}
      <div className="-mt-[68px] sm:-mt-[72px]">
        <AlbumGrid />
      </div>

      {/* Grid clickeable */}
      <PhotoGrid onPhotoClick={openLightbox} />

      {/* Lightbox modal */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={GRID_PHOTOS}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </>
  );
}
