import { Container } from "@/components/ui/Container";
import { restaurant } from "@/lib/restaurant";
import ContactForm from "./ui/ContactForm";
import Link from "next/link";
import { ParallaxSection } from "@/components/ui/ParallaxSection";
import { SocialSection } from "./ui/SocialSection";

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

      {/* ── Mapa ─────────────────────────────────────────────────────────── */}
      <section className="flex flex-col lg:flex-row overflow-hidden">

        {/* Panel izquierdo — info sobre fondo cilantro, alineada a la derecha */}
        <div className="relative flex flex-col items-end justify-center bg-cilantro px-8 py-14 text-right sm:px-14 sm:py-16 lg:w-[40%] lg:py-20">

          {/* Icono pin */}
          <div className="mb-8 flex h-11 w-11 items-center justify-center border border-white/20 bg-white/10">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-bone" stroke="currentColor" strokeWidth="1.6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" />
              <circle cx="12" cy="8" r="2.25" strokeLinecap="round" />
            </svg>
          </div>

          <div className="text-[10px] font-mono tracking-[0.38em] uppercase text-bone/50">
            Encuéntranos
          </div>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-bone sm:text-4xl lg:text-[2.6rem]">
            East Harlem,<br />
            <span className="text-bone/60">Nueva York</span>
          </h2>

          {/* Separador */}
          <div className="my-8 h-px w-full bg-bone/15" />

          {/* Datos */}
          <div className="grid w-full gap-6">
            <div>
              <div className="text-[10px] font-mono tracking-[0.32em] uppercase text-bone/45">
                Dirección
              </div>
              <a
                href="https://maps.app.goo.gl/QfCEj54E1Ze2CGMh6"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-base font-semibold leading-6 text-bone/85 underline underline-offset-4 decoration-bone/20 hover:decoration-bone/55 transition"
              >
                {restaurant.addressLine1}<br />
                <span className="font-normal text-bone/60">{restaurant.addressLine2}</span>
              </a>
            </div>

            <div>
              <div className="text-[10px] font-mono tracking-[0.32em] uppercase text-bone/45">
                Horario
              </div>
              <div className="mt-2 text-base font-semibold text-bone/85">
                {restaurant.hours}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono tracking-[0.32em] uppercase text-bone/45">
                Teléfono
              </div>
              <a
                href={`tel:${restaurant.phoneE164}`}
                className="mt-2 block text-base font-semibold text-bone/85 underline underline-offset-4 decoration-bone/20 hover:decoration-bone/55 transition"
              >
                {restaurant.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Separador */}
          <div className="mt-8 mb-8 h-px w-full bg-bone/15" />

          {/* CTA */}
          <a
            href="https://maps.app.goo.gl/QfCEj54E1Ze2CGMh6"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-3 border border-bone/30 bg-bone/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-bone transition hover:bg-bone/20"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            <span>Abrir en Google Maps</span>
          </a>

        </div>

        {/* Panel derecho — mapa iframe */}
        <div className="relative h-[380px] lg:h-auto lg:flex-1">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(restaurant.mapQuery)}&z=16&output=embed&hl=es`}
            className="absolute inset-0 h-full w-full border-0"
            style={{
              filter: "grayscale(20%) sepia(8%) contrast(1.04) brightness(0.97) saturate(0.9)",
            }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de El Tepeyac Taqueria"
          />
          {/* Fade sutil en el borde izquierdo para blend con el panel verde */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-cilantro/30 to-transparent"
          />
        </div>
      </section>

      {/* ── Formulario ────────────────────────────────────────────────── */}
      <section id="contactForm" className="py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="mt-6 text-5xl leading-[1.0] sm:text-5xl">
              Cuéntanos qué necesitas
            </h2>
            <p className="mt-6 text-xl leading-7 text-charcoal/65">
              Respondemos lo más rápido posible. Para catering, incluye fecha, hora y número de personas.
            </p>
            <div className="my-10 h-px bg-gradient-to-r from-transparent via-black/15 to-transparent" />
            <ContactForm />
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-semibold text-charcoal/70 underline underline-offset-4 decoration-black/20 hover:decoration-black/50 transition"
              >
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Catering CTA ─────────────────────────────────────────────── */}
      <ParallaxSection
        image={{
          src: "/old-site/images/contact/post.png",
          alt: "El Tepeyac catering y eventos",
          sizes: "100vw",
        }}
        className="h-[58vh] min-h-[440px]"
        strength={26}
        overlay={
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/55 to-black/20" />
        }
      >
        <Container className="relative flex h-full items-center">
          <div className="max-w-lg text-white">
            <div className="text-[10px] font-mono tracking-[0.38em] uppercase text-white/90">
              Catering · Eventos
            </div>
            <h2 className="text-white mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.2rem]">
              Tu evento,<br />
              <span className="text-white/80">nuestro sabor.</span>
            </h2>
            <p className="mt-6 max-w-sm text-xl leading-7 text-white/85">
              Bodas, fiestas, eventos corporativos — llevamos la cocina de
              El Tepeyac hasta donde lo necesites. Grupos de 10 a 500 personas.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={`tel:${restaurant.phoneE164}`}
                className="inline-flex items-center border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Llamar ahora →
              </a>
            </div>
          </div>
        </Container>
      </ParallaxSection>

      <SocialSection />
    </div>
  );
}
