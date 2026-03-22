"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import type { PhotoMeta } from "@/lib/cloudinary-server";
import type { Album } from "@/lib/gallery";

// ── Icons ──────────────────────────────────────────────────────────────────────
function ChevronLeft({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
}
function ChevronRight({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}
function XMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function Expand() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
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
  photos: PhotoMeta[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onJump: (i: number) => void;
}) {
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    const strip = thumbsRef.current;
    if (!strip) return;
    (strip.children[index] as HTMLElement)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  return (
    <div
      role="dialog"
      aria-modal
      className="fixed inset-0 z-50 flex flex-col bg-black"
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(dx) > 48) dx < 0 ? onNext() : onPrev();
        touchStart.current = null;
      }}
    >
      {/* Backdrop — clic fuera de la imagen cierra */}
      <button
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={onClose}
        aria-label="Cerrar"
        style={{ zIndex: 0 }}
      />

      {/* Top bar */}
      <div className="relative flex flex-shrink-0 items-center justify-between px-5 py-4 sm:px-8" style={{ zIndex: 1 }}>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] text-white/35">
            {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
          <div className="hidden h-px w-24 bg-white/10 sm:block">
            <div className="h-full bg-white/50 transition-all duration-300" style={{ width: `${((index + 1) / photos.length) * 100}%` }} />
          </div>
        </div>
        <button onClick={onClose} aria-label="Cerrar" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/8 text-white/40 backdrop-blur-sm transition hover:bg-white/18 hover:text-white focus-visible:outline-none">
          <XMark className="h-6 w-6" />
        </button>
      </div>

      {/* Imagen principal */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-16 sm:px-24 min-h-0" style={{ zIndex: 1 }}>
        <div key={photos[index].src} className="relative h-full w-full" style={{ animation: "lbFade 220ms ease" }}>
          <Image src={photos[index].src} alt="" fill priority sizes="(min-width: 1024px) 80vw, 95vw" className="object-contain" />
        </div>
        {index > 0 && (
          <button onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Anterior"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/8 text-white/60 backdrop-blur-sm transition hover:bg-white/18 hover:text-white focus-visible:outline-none">
            <ChevronLeft className="h-7 w-7" />
          </button>
        )}
        {index < photos.length - 1 && (
          <button onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Siguiente"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/8 text-white/60 backdrop-blur-sm transition hover:bg-white/18 hover:text-white focus-visible:outline-none">
            <ChevronRight className="h-7 w-7" />
          </button>
        )}
      </div>

      {/* Tira de miniaturas */}
      <div ref={thumbsRef} className="relative flex flex-shrink-0 gap-1.5 overflow-x-auto px-5 py-3 sm:px-8 sm:py-4" style={{ scrollbarWidth: "none", zIndex: 1 }}>
        {photos.map((p, i) => (
          <button key={p.src} onClick={() => onJump(i)} aria-label={`Foto ${i + 1}`}
            className={`relative h-14 w-20 flex-shrink-0 overflow-hidden transition-all sm:h-16 sm:w-24 focus-visible:outline-none ${i === index ? "ring-2 ring-white ring-offset-1 ring-offset-black opacity-100" : "opacity-35 hover:opacity-65"
              }`}>
            <Image src={p.src} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>

      <style>{`@keyframes lbFade { from { opacity:0; transform:scale(0.97); } to { opacity:1; transform:scale(1); } }`}</style>
    </div>
  );
}

// ── Masonry grid ───────────────────────────────────────────────────────────────
function MasonryGrid({ photos, onOpen }: { photos: PhotoMeta[]; onOpen: (i: number) => void }) {
  return (
    /*
      CSS columns masonry: respeta la proporción natural de cada imagen.
      `columns-2 sm:columns-3` crea columnas; `break-inside-avoid` evita
      que una foto se parta entre columnas; `w-full h-auto` preserva el aspect-ratio.
    */
    <div className="columns-2 gap-0.5 sm:columns-3" style={{ columnGap: "2px" }}>
      {photos.map((photo, i) => (
        <button
          key={photo.src}
          onClick={() => onOpen(i)}
          aria-label={`Ver foto ${i + 1}`}
          className="group relative mb-0.5 block w-full break-inside-avoid overflow-hidden focus-visible:outline-none"
          style={{ marginBottom: "2px" }}
        >
          <Image
            src={photo.src}
            alt=""
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="w-full h-auto transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/30 backdrop-blur-sm">
              <Expand />
            </div>
          </div>
          {/* Número */}
          <div className="absolute bottom-3 right-3 font-mono text-[10px] tracking-widest text-white/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {String(i + 1).padStart(2, "0")}
          </div>
        </button>
      ))}
    </div>
  );
}

// ── Navegación entre álbumes ───────────────────────────────────────────────────
function AlbumNav({ albums, currentSlug }: { albums: Album[]; currentSlug: string }) {
  const others = albums.filter((a) => a.slug !== currentSlug);
  if (others.length === 0) return null;

  return (
    <section className="border-t border-charcoal/8 bg-[#fafaf8] py-16 sm:py-20">
      {/* Título centrado */}
      <div className="mb-10 text-center">
        <div className="font-mono text-[17px] tracking-[0.45em] uppercase text-charcoal/80">
          Explorar otros álbumes
        </div>
        <div className="mx-auto mt-3 h-px w-10 bg-charcoal/75" />
      </div>

      {/* Cards centradas */}
      <div className="flex flex-wrap justify-center gap-4 px-5 sm:gap-5 sm:px-8">
        {others.map((album) => (
          <Link
            key={album.slug}
            href={album.href}
            className="group relative flex h-52 w-64 flex-shrink-0 overflow-hidden sm:h-60 sm:w-72"
          >
            <Image
              src={album.cover}
              alt={album.title}
              fill
              sizes="300px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/85 to-black/5 transition-all duration-300 group-hover:from-black/90" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="font-mono text-[18px] tracking-[0.38em] uppercase text-charcoal/80">
                {album.eyebrow}
              </div>
              <div className="mt-2 text-lg font-semibold leading-tight text-white">
                {album.title}
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 text-lg font-semibold uppercase tracking-wider text-white/85 transition-colors group-hover:text-white">
                Ver álbum
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3 transition-transform group-hover:translate-x-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ── Export principal ───────────────────────────────────────────────────────────
export function SubAlbumClient({
  photos,
  albums,
  currentSlug,
}: {
  photos: PhotoMeta[];
  albums: Album[];
  currentSlug: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const open = useCallback((i: number) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i)), [photos.length]);
  const jump = useCallback((i: number) => setLightboxIndex(i), []);

  return (
    <>
      {/* Contador — centrado, tipografía más visible */}
      {photos.length > 0 && (
        <div className="flex flex-col items-center gap-1 py-10 text-center sm:py-12">
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-light leading-none text-charcoal sm:text-7xl">
              {String(photos.length).padStart(2, "0")}
            </span>
            <span className="text-xl text-charcoal/90">fotos</span>
          </div>
          <p className="mt-3 font-mono text-[15px] tracking-[0.38em] uppercase text-charcoal/80">
            Haz clic en cualquier foto para verla en detalle
          </p>
        </div>
      )}

      {/* Masonry */}
      <div className="px-0">
        <MasonryGrid photos={photos} onOpen={open} />
      </div>

      {/* Navegación entre álbumes */}
      <AlbumNav albums={albums} currentSlug={currentSlug} />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
          onJump={jump}
        />
      )}
    </>
  );
}
