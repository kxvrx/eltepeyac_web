"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { restaurant } from "@/lib/restaurant";
import { Container } from "@/components/ui/Container";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/gallery", label: "Galería" },
  { href: "/contact", label: "Contacto" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [footerFull, setFooterFull] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 64);

      // "Footer completamente visible" = el usuario llegó al fondo de la página
      const atBottom =
        sy + window.innerHeight >= document.documentElement.scrollHeight - 60;
      setFooterFull(atBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroPages =
    pathname === "/" || pathname === "/contact" || pathname === "/gallery";
  const onTopOfHero = heroPages && !scrolled;
  const visibleNav = nav.filter((item) => item.href !== pathname);

  const headerClass = useMemo(() => {
    const base = "sticky top-0 z-50 transition-all duration-300";
    if (onTopOfHero) return `${base} bg-transparent`;
    return `${base} bg-cilantro shadow-[0_2px_24px_rgba(0,0,0,0.18)]`;
  }, [onTopOfHero]);

  /* ── Botón de orden (reutilizado en dos posiciones) ────────────── */
  const OrderBtn = () => (
    <a
      href={restaurant.orderUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center overflow-hidden bg-white px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-cilantro transition-all duration-300 hover:bg-maiz hover:text-charcoal hover:shadow-[0_4px_20px_rgba(0,0,0,0.22)] active:scale-[0.98]"
    >
      {/* Barrido en hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-maiz transition-transform duration-300 ease-out group-hover:translate-x-0"
      />
      <span className="relative">Ordenar en línea</span>
    </a>
  );

  return (
    <header className={headerClass}>
      <div
        className={`${
          onTopOfHero ? "border-transparent" : "border-white/15"
        } border-b`}
      >
        <Container className="py-4">
          {/* ─── Fila principal ──────────────────────────────────── */}
          <div className="relative flex items-center justify-between gap-3">

            {/* ── Logo ─────────────────────────────────────────── */}
            {onTopOfHero ? (
              <div className="h-9 w-36 sm:h-10 sm:w-40" aria-hidden="true" />
            ) : (
              <Link
                href="/"
                style={{
                  opacity: footerFull ? 0 : 1,
                  transform: footerFull ? "translateY(-6px)" : "translateY(0)",
                  transition: footerFull
                    ? "opacity 300ms ease, transform 300ms ease"
                    : "opacity 150ms ease, transform 150ms ease",
                  pointerEvents: footerFull ? "none" : "auto",
                }}
                className="group inline-flex items-center gap-3 rounded-md px-1 py-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                <span className="relative h-9 w-36 sm:h-10 sm:w-40">
                  <Image
                    src="/old-site/images/logos/logo_blanco.png"
                    alt="Taqueria El Tepeyac"
                    fill
                    sizes="160px"
                    className="object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                    priority
                  />
                </span>
              </Link>
            )}

            {/* ── Nav ──────────────────────────────────────────── */}
            <nav
              className="hidden items-center gap-6 md:flex"
              style={{
                opacity: footerFull ? 0 : 1,
                transform: footerFull ? "translateY(-6px)" : "translateY(0)",
                transition: footerFull
                  ? "opacity 300ms ease 50ms, transform 300ms ease 50ms"
                  : "opacity 150ms ease, transform 150ms ease",
                pointerEvents: footerFull ? "none" : "auto",
              }}
            >
              {visibleNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative text-sm font-semibold tracking-[0.08em] uppercase transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 ${
                    onTopOfHero
                      ? "text-bone/90 hover:text-bone"
                      : "text-bone/90 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-300 group-hover:scale-x-100"
                  />
                </Link>
              ))}
            </nav>

            {/* ── Botón derecha → se desvanece al llegar al footer ─ */}
            <div
              className="hidden items-center gap-2 md:flex"
              style={{
                opacity: footerFull ? 0 : 1,
                transform: footerFull ? "translateY(-6px)" : "translateY(0)",
                transition: footerFull
                  ? "opacity 300ms ease 100ms, transform 300ms ease 100ms"
                  : "opacity 150ms ease, transform 150ms ease",
                pointerEvents: footerFull ? "none" : "auto",
              }}
            >
              {onTopOfHero ? (
                <div className="h-10 w-40" aria-hidden="true" />
              ) : (
                <OrderBtn />
              )}
            </div>

            {/* ── Botón centrado → aparece al llegar al footer ───── */}
            {!onTopOfHero && (
              <div
                className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 md:block"
                style={{
                  opacity: footerFull ? 1 : 0,
                  transform: footerFull
                    ? "translateX(-50%) translateY(0) scale(1)"
                    : "translateX(-50%) translateY(8px) scale(0.96)",
                  transition: footerFull
                    ? "opacity 350ms ease 200ms, transform 350ms cubic-bezier(0.34,1.56,0.64,1) 200ms"
                    : "opacity 150ms ease, transform 150ms ease",
                  pointerEvents: footerFull ? "auto" : "none",
                }}
              >
                <OrderBtn />
              </div>
            )}

            {/* ── Mobile hamburger ─────────────────────────────── */}
            <button
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`md:hidden inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold tracking-[0.12em] uppercase focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 ${
                onTopOfHero
                  ? "border border-white/25 bg-white/10 text-bone"
                  : "border border-white/30 bg-white/15 text-bone"
              }`}
            >
              <span className="mr-2 font-mono text-[11px] text-bone/80">
                Menú
              </span>
              <span className="relative h-3.5 w-4">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-4 rounded-full bg-bone transition-transform duration-300 ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[6px] h-[2px] w-4 rounded-full bg-bone transition-opacity duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[12px] h-[2px] w-4 rounded-full bg-bone transition-transform duration-300 ${
                    open ? "translate-y-[-6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>

          {/* ── Mobile dropdown ──────────────────────────────────── */}
          {open ? (
            <div className="md:hidden mt-4 pb-3">
              <div className="overflow-hidden rounded-2xl bg-white p-3 shadow-[0_20px_55px_rgba(0,0,0,0.18)]">
                <div className="px-2 pb-2 pt-1">
                  <div className="text-[11px] font-mono tracking-[0.24em] text-charcoal/60">
                    EL TEPEYAC · EAST HARLEM
                  </div>
                  <div className="mt-3 ornament" />
                </div>

                <div className="grid gap-1 px-1 pt-2">
                  {visibleNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-charcoal/90 hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cilantro/20"
                    >
                      {item.label}
                      <span className="text-xs font-mono text-charcoal/55">
                        →
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="mt-3 px-1">
                  <a
                    href={restaurant.orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl bg-salsa px-5 py-3.5 text-sm font-semibold uppercase tracking-wider text-bone transition hover:brightness-95"
                  >
                    Ordenar en línea
                  </a>
                </div>

                <div className="mt-4 px-4 pb-3 text-xs text-charcoal/70">
                  <div className="text-[11px] font-mono tracking-[0.22em] text-charcoal/55">
                    HORARIO
                  </div>
                  <div className="mt-1">{restaurant.hours}</div>
                  <div className="mt-3 text-[11px] font-mono tracking-[0.22em] text-charcoal/55">
                    TELÉFONO
                  </div>
                  <a
                    className="mt-1 inline-block underline underline-offset-4 decoration-black/20"
                    href={`tel:${restaurant.phoneE164}`}
                  >
                    {restaurant.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </Container>
      </div>
    </header>
  );
}
