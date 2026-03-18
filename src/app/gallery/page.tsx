import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { galleryCollections, restaurant } from "@/lib/restaurant";
import Image from "next/image";
import { ParallaxSection } from "@/components/ui/ParallaxSection";

export const metadata = {
  title: "Galería",
  description: "Una colección en crecimiento de momentos de El Tepeyac.",
};

const gridPhotos = [
  { src: "/old-site/images/home/abril-4.jpg", col: "col-span-8", aspect: "aspect-[16/9]" },
  { src: "/old-site/images/contact/tepeyac-mayo-4.jpg", col: "col-span-4", aspect: "aspect-[3/4]" },
  { src: "/old-site/images/contact/tepeyac-mayo-1.jpg", col: "col-span-4", aspect: "aspect-[4/3]" },
  {
    src: "/old-site/images/home/DSC00068-v2-Enhanced-NR-min.png",
    col: "col-span-4",
    aspect: "aspect-[4/3]",
  },
  { src: "/old-site/images/home/DSC00751.png", col: "col-span-4", aspect: "aspect-[4/3]" },
  {
    src: "/old-site/images/contact/tepeyac-mayo-3.jpg",
    col: "col-span-6",
    aspect: "aspect-[16/9]",
  },
  { src: "/old-site/images/home/DSC00014.jpg", col: "col-span-6", aspect: "aspect-[16/9]" },
] as const;

export default function GalleryPage() {
  return (
    <div>
      {/* ── Hero — detrás del header ──────────────────────────────────── */}
      <div className="-mt-[68px] sm:-mt-[72px]">
      <ParallaxSection
        image={{
          src: "/old-site/images/home/abril-4.jpg",
          alt: "Galería El Tepeyac",
          priority: true,
          sizes: "100vw",
        }}
        className="h-[100vh] min-h-[580px]"
        strength={30}
        overlay={
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/80" />
        }
      >
        <Container className="relative flex h-full flex-col justify-end pb-18 pt-28">
          <div className="max-w-3xl text-white">
            <div className="text-[10px] font-mono tracking-[0.36em] uppercase text-white/55">
              Galería
            </div>
            <h1 className="mt-6 text-5xl leading-[0.92] text-white sm:text-6xl lg:text-7xl">
              Momentos distintos.
              <br />
              <span className="text-white/70">La misma calidez.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/75">
              El lugar, los platos y las historias de temporada — pensada para que la foto
              sea la protagonista.
            </p>
          </div>
        </Container>
      </ParallaxSection>
      </div>{/* end hero-pull */}

      {/* ── Colecciones ───────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-mono tracking-[0.36em] uppercase text-charcoal/45">
                Colecciones
              </div>
              <h2 className="mt-5 text-4xl leading-[1.0] sm:text-5xl">Selecciones</h2>
            </div>
            <p className="max-w-xs text-sm text-charcoal/55">
              Abre una colección para ver una historia más enfocada.
            </p>
          </div>

          {/* Collections grid — thin hairline dividers, no thick borders */}
          <div className="grid gap-px bg-black/10 md:grid-cols-3">
            {galleryCollections.map((c) => (
              <Link
                key={c.slug}
                href={c.href}
                className="group block overflow-hidden bg-bone px-8 py-10 transition hover:bg-paper focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cilantro/15"
              >
                <div className="text-[9px] font-mono tracking-[0.34em] uppercase text-charcoal/40">
                  Colección
                </div>
                <div className="mt-4 text-2xl font-semibold leading-tight text-charcoal group-hover:text-charcoal/80 transition">
                  {c.title}
                </div>
                <div className="mt-3 text-sm leading-6 text-charcoal/60">{c.subtitle}</div>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-charcoal/60 underline underline-offset-4 decoration-black/15 transition group-hover:text-charcoal group-hover:decoration-black/45">
                  Abrir <span className="font-mono">→</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Divider foto full-bleed ───────────────────────────────────── */}
      <div className="relative h-56 overflow-hidden sm:h-72">
        <Image
          src="/old-site/images/contact/tepeyac-mayo-3.jpg"
          alt="El Tepeyac"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/12" />
      </div>

      {/* ── Grid general ─────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="mb-14">
            <div className="text-[10px] font-mono tracking-[0.36em] uppercase text-charcoal/45">
              Todas las fotos
            </div>
            <h2 className="mt-5 text-4xl leading-[1.0] sm:text-5xl">Un vistazo</h2>
          </div>

          {/* No borders, no radius — fotos que respiran */}
          <div className="grid grid-cols-12 gap-2 sm:gap-3">
            {gridPhotos.map((photo) => (
              <div
                key={photo.src}
                className={`relative overflow-hidden ${photo.col} ${photo.aspect}`}
              >
                <Image
                  src={photo.src}
                  alt="El Tepeyac"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA parallax ─────────────────────────────────────────────── */}
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
            <div className="text-[10px] font-mono tracking-[0.36em] uppercase text-white/55">
              ¿Vienes a comer?
            </div>
            <h2 className="mt-6 text-3xl leading-[1.05] sm:text-4xl">
              {restaurant.hours}
            </h2>
            <p className="mt-4 text-base text-white/70">
              {restaurant.addressLine1}, {restaurant.addressLine2}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
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
