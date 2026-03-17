"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { restaurant } from "@/lib/restaurant";
import { ExternalButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const nav = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroPages = pathname === "/" || pathname === "/contact";
  const onTopOfHero = heroPages && !scrolled;

  const headerClass = useMemo(() => {
    const base = "sticky top-0 z-50 transition duration-300";
    if (onTopOfHero) return `${base} bg-transparent`;
    return `${base} bg-bone/90 shadow-[0_10px_30px_rgba(0,0,0,0.10)] supports-[backdrop-filter]:backdrop-blur-xl`;
  }, [onTopOfHero]);

  return (
    <header className={headerClass}>
      <Container className="py-4">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-xl px-2 py-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cilantro/20"
          >
            <span className="relative h-9 w-36 sm:h-10 sm:w-40">
              <Image
                src={
                  onTopOfHero
                    ? "/old-site/images/logos/logo_blanco.png"
                    : "/old-site/images/logos/logo_color.png"
                }
                alt="Taqueria El Tepeyac"
                fill
                sizes="160px"
                className="object-contain"
                priority
              />
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cilantro/20 ${
                  onTopOfHero
                    ? "text-bone/90 hover:bg-white/10 hover:text-bone"
                    : "text-charcoal/85 hover:bg-black/[0.04] hover:text-charcoal"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ExternalButtonLink
              href={restaurant.orderUrl}
              tone="salsa"
              className={onTopOfHero ? "shadow-[0_18px_55px_rgba(0,0,0,0.22)]" : ""}
            >
              Order Now
            </ExternalButtonLink>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold shadow-[0_10px_20px_rgba(0,0,0,0.10)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cilantro/20 ${
              onTopOfHero
                ? "border border-white/20 bg-white/10 text-bone"
                : "border border-border bg-card text-charcoal"
            }`}
          >
            <span className={`mr-2 font-mono text-xs ${onTopOfHero ? "text-bone/75" : "text-charcoal/70"}`}>
              MENU
            </span>
            <span className="relative h-3.5 w-4">
              <span
                className={`absolute left-0 top-0 h-[2px] w-4 rounded-full transition-transform duration-300 ${
                  onTopOfHero ? "bg-bone" : "bg-charcoal"
                } ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-[2px] w-4 rounded-full transition-opacity duration-300 ${
                  onTopOfHero ? "bg-bone" : "bg-charcoal"
                } ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[12px] h-[2px] w-4 rounded-full transition-transform duration-300 ${
                  onTopOfHero ? "bg-bone" : "bg-charcoal"
                } ${
                  open ? "translate-y-[-6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {open ? (
          <div className="md:hidden mt-4 pb-3">
            <div className="rounded-3xl border border-border bg-card p-3 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <div className="grid gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-charcoal hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cilantro/20"
                  >
                    {item.label}
                    <span className="text-xs font-mono text-charcoal/55">→</span>
                  </Link>
                ))}
              </div>
              <div className="mt-3 px-1">
                <ExternalButtonLink href={restaurant.orderUrl} className="w-full justify-center">
                  Order Now
                </ExternalButtonLink>
              </div>
              <div className="mt-3 px-4 pb-2 text-xs text-muted">
                {restaurant.hours} ·{" "}
                <a className="underline underline-offset-4" href={`tel:${restaurant.phoneE164}`}>
                  {restaurant.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}

