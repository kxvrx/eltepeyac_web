"use client";

import Script from "next/script";
import { Container } from "@/components/ui/Container";

export function SocialSection() {
  return (
    <>
      {/* Scripts de embed — carga diferida */}
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
          }
        }}
      />
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />

      <section className="bg-[#fbf7ee] py-20 sm:py-24">
        <Container>
          {/* Encabezado */}
          <div className="mb-14 text-center">
            <div className="text-[10px] font-mono tracking-[0.38em] uppercase text-charcoal/45">
              Comunidad
            </div>
            <h2 className="mt-4 text-3xl text-charcoal sm:text-4xl">
              Síguenos en redes
            </h2>
            <p className="mt-4 text-sm text-charcoal/55">
              Actualizaciones, platos del día y momentos detrás del mostrador.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">

            {/* ── Instagram ─────────────────────────────────────────── */}
            <div className="overflow-hidden shadow-[0_16px_56px_rgba(0,0,0,0.10)]">
              {/* Cabecera con gradiente de marca */}
              <div
                className="flex items-center gap-3 px-5 py-3.5"
                style={{
                  background:
                    "linear-gradient(90deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5 flex-shrink-0">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                <span className="text-sm font-semibold tracking-wide text-white">
                  Instagram
                </span>
                <span className="ml-auto text-xs text-white/75 font-mono">
                  @taqueriaeltepeyac
                </span>
              </div>

              {/* Embed — el script de Instagram reemplaza este blockquote */}
              <div className="bg-white">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink="https://www.instagram.com/taqueriaeltepeyac/?utm_source=ig_embed&utm_campaign=loading"
                  data-instgrm-version="14"
                  style={{
                    background: "#FFF",
                    border: 0,
                    margin: "0 auto",
                    padding: 0,
                    width: "100%",
                    maxWidth: "100%",
                  }}
                />
              </div>
            </div>

            {/* ── TikTok ────────────────────────────────────────────── */}
            <div className="overflow-hidden shadow-[0_16px_56px_rgba(0,0,0,0.10)]">
              {/* Cabecera oscura de TikTok */}
              <div className="flex items-center gap-3 bg-[#010101] px-5 py-3.5">
                <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5 flex-shrink-0">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.79a4.85 4.85 0 01-1.07-.1z" />
                </svg>
                <span className="text-sm font-semibold tracking-wide text-white">
                  TikTok
                </span>
                {/* Acento bicolor TikTok */}
                <span
                  className="relative text-sm font-semibold"
                  style={{
                    background: "linear-gradient(90deg, #69C9D0, #EE1D52)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ✦
                </span>
                <span className="ml-auto text-xs text-white/55 font-mono">
                  @dalilas.food.mexi
                </span>
              </div>

              {/* Embed — el script de TikTok reemplaza este blockquote */}
              <div className="bg-white">
                <blockquote
                  className="tiktok-embed"
                  cite="https://www.tiktok.com/@dalilas.food.mexi"
                  data-unique-id="dalilas.food.mexi"
                  data-embed-type="creator"
                  style={{ maxWidth: "100%", minWidth: "288px" }}
                >
                  <section>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.tiktok.com/@dalilas.food.mexi?refer=creator_embed"
                    >
                      @dalilas.food.mexi
                    </a>
                  </section>
                </blockquote>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}
