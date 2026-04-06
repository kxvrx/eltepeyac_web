"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { galleryAlbums } from "@/lib/gallery";

const ALBUMS = galleryAlbums;

// ── Icons ─────────────────────────────────────────────────────────────────────
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
function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function Expand({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
  );
}

// ── AlbumCard ──────────────────────────────────────────────────────────────────
function AlbumCard({
  album,
  priority,
  featured,
  className = "",
}: {
  album: (typeof ALBUMS)[number];
  priority?: boolean;
  featured?: boolean;
  className?: string;
}) {
  return (
    <Link href={album.href} className={`group relative flex overflow-hidden ${className}`}>
      <Image
        src={album.cover}
        alt={album.title}
        fill
        priority={priority}
        sizes={featured ? "62vw" : "38vw"}
        unoptimized
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-all duration-500 group-hover:from-black/90" />
      <div className={`relative z-10 mt-auto w-full p-7 sm:p-9 ${featured ? "lg:p-12" : ""}`}>
        <div className="text-[9px] font-mono tracking-[0.4em] uppercase text-white/45 mb-3">
          {album.eyebrow}
        </div>
        <h2 className={`leading-[0.92] text-white ${featured ? "text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem]" : "text-2xl sm:text-3xl"}`}>
          {album.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/60 max-w-xs opacity-0 translate-y-1 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0">
          {album.subtitle}
        </p>
        <div className="mt-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/70 transition-colors group-hover:text-white">
          Ver álbum
          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

function AlbumGrid() {
  return (
    <div className="flex h-screen min-h-[600px] flex-col lg:flex-row">
      <AlbumCard album={ALBUMS[0]} priority featured className="h-[48vh] lg:h-full lg:w-[62%] flex-shrink-0" />
      <div className="flex flex-1 flex-col gap-px bg-black">
        <AlbumCard album={ALBUMS[1]} className="flex-1 h-[26vh] lg:h-full" />
        <AlbumCard album={ALBUMS[2]} className="flex-1 h-[26vh] lg:h-full" />
      </div>
    </div>
  );
}

// ── Lightbox ───────────────────────────────────────────────────────────────────
function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
  onJump,
}: {
  photos: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onJump: (i: number) => void;
}) {
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onPrev, onNext]);

  // Auto-scroll thumbnail strip to current photo
  useEffect(() => {
    const strip = thumbsRef.current;
    if (!strip) return;
    const thumb = strip.children[index] as HTMLElement;
    thumb?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  // Swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 48) {
      dx < 0 ? onNext() : onPrev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal
      className="fixed inset-0 z-50 flex flex-col bg-black"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Top bar ── */}
      <div
        className="flex flex-shrink-0 items-center justify-between px-5 py-3 sm:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] text-white/35">
            {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
          {/* Progress bar */}
          <div className="hidden h-px w-24 bg-white/10 sm:block">
            <div
              className="h-full bg-white/50 transition-all duration-300"
              style={{ width: `${((index + 1) / photos.length) * 100}%` }}
            />
          </div>
        </div>
        {/* X grande y visible */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/8 text-white/55 backdrop-blur-sm transition hover:bg-white/18 hover:text-white focus-visible:outline-none"
        >
          <XMark className="h-6 w-6" />
        </button>
      </div>

      {/* ── Main image — click dentro no cierra ── */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-16 sm:px-24 min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image — animates on index change */}
        <div
          key={photos[index]}
          className="relative h-full w-full"
          style={{ animation: "lbFadeIn 220ms ease" }}
        >
          <Image
            src={photos[index]}
            alt={`El Tepeyac — foto ${index + 1}`}
            fill
            priority
            sizes="(min-width: 1024px) 80vw, 95vw"
            className="object-contain"
          />
        </div>

        {/* Prev button — más grande */}
        {hasPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Foto anterior"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition hover:bg-white/22 hover:text-white focus-visible:outline-none"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
        )}

        {/* Next button — más grande */}
        {hasNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Foto siguiente"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition hover:bg-white/22 hover:text-white focus-visible:outline-none"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      <div
        ref={thumbsRef}
        className="flex flex-shrink-0 gap-1.5 overflow-x-auto px-5 py-3 sm:px-8 sm:py-4"
        style={{ scrollbarWidth: "none" }}
        onClick={(e) => e.stopPropagation()}
      >
        {photos.map((src, i) => (
          <button
            key={src}
            onClick={() => onJump(i)}
            aria-label={`Foto ${i + 1}`}
            className={`relative h-14 w-20 flex-shrink-0 overflow-hidden transition-all duration-200 focus-visible:outline-none sm:h-16 sm:w-24 ${i === index
              ? "ring-2 ring-white ring-offset-1 ring-offset-black opacity-100"
              : "opacity-35 hover:opacity-65"
              }`}
          >
            <Image src={src} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* keyframe for image fade */}
      <style>{`@keyframes lbFadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

// ── PhotoGrid ──────────────────────────────────────────────────────────────────
// Layout: foto hero (col-span-2 full width) + grid 2→3 columnas debajo
// Fondo oscuro para que las fotos sean el protagonista

function PhotoGrid({
  photos,
  onPhotoClick,
}: {
  photos: string[];
  onPhotoClick: (i: number) => void;
}) {
  if (photos.length === 0) {
    return (
      <section id="fotos" className="bg-[#fafaf8] py-20">
        <Container>
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-charcoal/12 py-28 text-center">
            <p className="text-charcoal/35 text-sm font-mono tracking-widest uppercase">Álbum vacío</p>
            <p className="text-charcoal/25 text-xs font-mono">
              Sube imágenes con el prefijo <code className="bg-charcoal/5 px-1.5 py-0.5 rounded">home_</code> en Cloudinary
            </p>
          </div>
        </Container>
      </section>
    );
  }

  const [hero, ...rest] = photos;

  return (
    <section id="fotos" className="bg-[#fafaf8]">
      {/* Header */}
      <div className="flex items-end justify-between px-5 pb-6 pt-14 sm:px-8 lg:px-12">
        <div>
          <div className="font-mono text-[18px] tracking-[0.4em] uppercase text-charcoal/85">
            Colección principal
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-5xl font-light leading-none text-charcoal lg:text-6xl">
              {String(photos.length).padStart(2, "0")}
            </span>
            <span className="text-md text-charcoal/85">fotos</span>
          </div>
        </div>
        <p className="hidden text-md font-mono tracking-widest text-charcoal/80 sm:block">
          Click para ampliar · ← → para navegar
        </p>
      </div>

      {/* Hero photo — full width, tall */}
      <button
        onClick={() => onPhotoClick(0)}
        aria-label="Ver foto 1"
        className="group relative block w-full overflow-hidden focus-visible:outline-none"
        style={{ height: "clamp(320px, 55vw, 680px)" }}
      >
        <Image
          src={hero}
          alt="El Tepeyac"
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        {/* Dark gradient overlay, fades on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-100 transition-opacity duration-400 group-hover:opacity-60" />
        {/* Expand icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/30 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-105">
            <Expand className="h-6 w-6 text-white" />
          </div>
        </div>
        {/* Photo label bottom left */}
        <div className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.35em] text-white/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          01 / {String(photos.length).padStart(2, "0")}
        </div>
      </button>

      {/* Rest of photos — 2 cols on mobile, 3 on tablet, 4 on desktop */}
      {rest.length > 0 && (
        <div className="mt-px grid grid-cols-2 gap-0.5 bg-[#e8e4de] sm:grid-cols-3 lg:grid-cols-4">
          {rest.map((src, i) => {
            const globalIndex = i + 1;
            // Every 6th photo (within rest): make it wide on sm+
            const isWide = i % 7 === 5;
            return (
              <button
                key={src}
                onClick={() => onPhotoClick(globalIndex)}
                aria-label={`Ver foto ${globalIndex + 1}`}
                className={`group relative aspect-[4/3] overflow-hidden bg-[#ede9e3] focus-visible:outline-none ${isWide ? "sm:col-span-2" : ""
                  }`}
              >
                <Image
                  src={src}
                  alt="El Tepeyac"
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/35" />
                {/* Number badge */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="font-mono text-2xl font-light text-white drop-shadow-lg">
                    {String(globalIndex + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* Corner expand icon */}
                <div className="absolute bottom-3 right-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <Expand className="h-4 w-4 text-white/60" />
                </div>
              </button>
            );
          })}
        </div>
      )}

    </section>
  );
}

// ── GalleryClient ──────────────────────────────────────────────────────────────
export function GalleryClient({ photos }: { photos: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(
    () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    []
  );
  const nextPhoto = useCallback(
    () => setLightboxIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i)),
    [photos.length]
  );
  const jumpToPhoto = useCallback((i: number) => setLightboxIndex(i), []);

  return (
    <>
      {/* Álbum grid — arranca desde detrás del header */}
      <div className="-mt-[68px] sm:-mt-[72px]">
        <AlbumGrid />
      </div>

      {/* Grid de fotos con fondo oscuro */}
      <PhotoGrid photos={photos} onPhotoClick={openLightbox} />

      {/* Lightbox inmersivo */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
          onJump={jumpToPhoto}
        />
      )}
    </>
  );
}
