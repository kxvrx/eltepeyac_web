import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { restaurant } from "@/lib/restaurant";
import ContactForm from "./ui/ContactForm";
import Link from "next/link";
import { ParallaxSection } from "@/components/ui/ParallaxSection";

export const metadata = {
  title: "Contacto",
  description: "Horario, ubicación y una forma rápida de escribirnos.",
};

export default function ContactPage() {
  return (
    <div>
      {/* ── Hero — detrás del header ──────────────────────────────────── */}
      <div className="-mt-[68px] sm:-mt-[72px]">
      <ParallaxSection
        image={{
          src: "/old-site/images/contact/tepeyac-mayo-3.jpg",
          alt: "El Tepeyac",
          priority: true,
          sizes: "100vw",
        }}
        className="h-[100vh] min-h-[580px]"
        strength={32}
        overlay={
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75" />
        }
      >
        <Container className="relative flex h-full flex-col justify-end pb-18 pt-28">
          <div className="max-w-3xl text-white">
            <div className="text-[10px] font-mono tracking-[0.36em] uppercase text-white/55">
              Contacto · Horario · Ubicación
            </div>
            <h1 className="mt-6 text-5xl leading-[0.92] text-white sm:text-6xl lg:text-7xl">
              Escríbenos.
              <br />
              <span className="text-white/70">Aquí estamos.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/75">
              Catering, preguntas, pedidos especiales, o solo un hola — aquí es.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                className="inline-flex items-center border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white/20"
                href={`tel:${restaurant.phoneE164}`}
              >
                Llamar ahora
              </a>
              <a
                className="inline-flex items-center text-sm font-semibold text-white/75 underline underline-offset-4 decoration-white/30 hover:decoration-white/65 transition"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  restaurant.mapQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir en el mapa →
              </a>
            </div>
          </div>
        </Container>
      </ParallaxSection>
      </div>{/* end hero-pull */}

      {/* ── Contenido principal ───────────────────────────────────────── */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-28">
            {/* Formulario */}
            <div>
              <div className="text-[10px] font-mono tracking-[0.36em] uppercase text-charcoal/45">
                Mensaje
              </div>
              <h2 className="mt-6 text-4xl leading-[1.0] sm:text-5xl">
                Cuéntanos qué necesitas
              </h2>
              <p className="mt-6 text-base leading-7 text-charcoal/65">
                Respondemos lo más rápido posible. Para catering, incluye fecha, hora y número
                de personas.
              </p>
              <div className="my-10 h-px bg-gradient-to-r from-transparent via-black/15 to-transparent" />
              <ContactForm />
            </div>

            {/* Info */}
            <div className="lg:pt-14">
              <div className="grid gap-8">
                <div>
                  <div className="text-[10px] font-mono tracking-[0.32em] uppercase text-charcoal/45">
                    Horario
                  </div>
                  <div className="mt-4 text-2xl font-semibold text-charcoal">
                    {restaurant.hours}
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-black/12 to-transparent" />

                <div>
                  <div className="text-[10px] font-mono tracking-[0.32em] uppercase text-charcoal/45">
                    Ubicación
                  </div>
                  <a
                    className="mt-4 inline-block text-2xl font-semibold text-charcoal underline underline-offset-4 decoration-black/15 hover:decoration-black/45 transition leading-snug"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      restaurant.mapQuery
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {restaurant.addressLine1}
                    <br />
                    <span className="text-xl font-normal text-charcoal/65">
                      {restaurant.addressLine2}
                    </span>
                  </a>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-black/12 to-transparent" />

                <div>
                  <div className="text-[10px] font-mono tracking-[0.32em] uppercase text-charcoal/45">
                    Teléfono
                  </div>
                  <a
                    className="mt-4 inline-block text-2xl font-semibold text-charcoal underline underline-offset-4 decoration-black/15 hover:decoration-black/45 transition"
                    href={`tel:${restaurant.phoneE164}`}
                  >
                    {restaurant.phoneDisplay}
                  </a>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-black/12 to-transparent" />
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={restaurant.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-salsa px-7 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition hover:brightness-95"
                >
                  Ordenar en línea
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-semibold text-charcoal/70 underline underline-offset-4 decoration-black/20 hover:decoration-black/50 transition"
                >
                  Volver al inicio →
                </Link>
              </div>

              {/* Storefront — sin borde, sin radius */}
              <div className="relative mt-14 aspect-[4/3] overflow-hidden">
                <Image
                  src="/old-site/images/home/DSC00751.png"
                  alt="Fachada de El Tepeyac"
                  fill
                  sizes="640px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Cierre parallax ──────────────────────────────────────────── */}
      <ParallaxSection
        image={{
          src: "/old-site/images/contact/tepeyac-mayo-1.jpg",
          alt: "El Tepeyac ambiente",
          sizes: "100vw",
        }}
        className="h-[50vh] min-h-[380px]"
        strength={22}
        overlay={<div className="absolute inset-0 bg-black/50" />}
      >
        <Container className="relative flex h-full items-center">
          <div className="text-white">
            <div className="text-[10px] font-mono tracking-[0.36em] uppercase text-white/55">
              Servicio todos los días
            </div>
            <h2 className="mt-6 text-3xl leading-[1.05] sm:text-4xl lg:text-5xl">
              {restaurant.hours}
            </h2>
            <p className="mt-5 text-base text-white/70">
              {restaurant.addressLine1}, {restaurant.addressLine2}
            </p>
          </div>
        </Container>
      </ParallaxSection>
    </div>
  );
}
