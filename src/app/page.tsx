import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { restaurant, popularDishes } from "@/lib/restaurant";
import Link from "next/link";
import { ParallaxSection } from "@/components/ui/ParallaxSection";

// REEMPLAZA este ID con el de tu video de YouTube
const YOUTUBE_VIDEO_ID = "TODO_AGREGAR_ID_VIDEO";

export default function Home() {
  return (
    <div>
      {/* ── Hero — envuelto en -mt para quedar detrás del header ──────── */}
      <div className="-mt-[68px] sm:-mt-[72px]">
        <ParallaxSection
          image={{
            src: "/old-site/images/home/DSC00014.jpg",
            alt: "El Tepeyac — interior cálido",
            priority: true,
            sizes: "100vw",
          }}
          className="h-[100vh] min-h-[680px]"
          strength={350}
          overlay={
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/85" />
          }
        >
          <Container className="relative flex h-full flex-col items-center pt-[72px] text-center">
            {/* Bloque central — ocupa el espacio disponible y centra su contenido */}
            <div className="flex flex-1 w-full items-center justify-center">
              <div className="w-full max-w-4xl">
                <div className="mx-auto mb-8 h-16 w-56 sm:h-20 sm:w-72 relative">
                  <Image
                    src="/old-site/images/logos/logo_blanco.png"
                    alt="Taqueria El Tepeyac"
                    fill
                    sizes="290px"
                    className="object-contain drop-shadow-[0_6px_28px_rgba(0,0,0,0.55)]"
                  />
                </div>

                <h1 className="text-5xl font-light leading-[0.93] text-white sm:text-7xl lg:text-8xl [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
                  Comida Tradicional
                  <br />
                  <span className="text-white/95">Mexicana</span>
                </h1>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <a
                    href={restaurant.orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-salsa px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition hover:brightness-95"
                  >
                    Ordenar en línea
                  </a>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center bg-cilantro px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition hover:brightness-95"
                  >
                    Nuestro menú
                  </Link>
                </div>
              </div>
            </div>

            {/* Barra de horario — anclada al fondo */}
            <div className="w-full max-w-4xl pb-8">
              <div className="flex w-full items-center gap-8 border-t border-white/85 pt-6">
                <div className="text-lg text-white/85">{restaurant.hours}</div>
                <div className="ml-auto hidden text-[15px] font-mono tracking-[0.28em] uppercase text-white/85 md:block">
                  {restaurant.addressLine1}
                </div>
              </div>
            </div>
          </Container>
        </ParallaxSection>
      </div>

      {/* ── Intro ─────────────────────────────────────────────────────── */}
      <section className="py-28 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mt-8 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Auténtico sabor mexicano
            </h2>
            <p className="mx-auto mt-8 max-w-lg text-lg leading-8 text-charcoal/65">
              En el corazón de East Harlem, servimos tradición, ingredientes reales y
              un ambiente acogedor que te hace sentir en casa desde el primer momento.
            </p>
            <div className="mx-auto mt-10 ornament max-w-xs" />
            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-charcoal/40">
              {["Guacamole", "Tacos", "Burritos", "Enchiladas", "Quesadillas", "Tamales", "Caldos", "Huaraches", "Guisos", "Nachos", "Comida Peruana"].map(
                (item, i, arr) => (
                  <span key={item} className="flex items-center gap-6">
                    {item}
                    {i < arr.length - 1 && (
                      <span className="text-charcoal/20" aria-hidden="true">·</span>
                    )}
                  </span>
                )
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Photo filmstrip (edge-to-edge, sin bordes) ────────────────── */}
      <div className="flex h-64 sm:h-[26rem]">
        {[
          { src: "/old-site/images/home/abril-4.jpg", flex: 2 },
          { src: "/old-site/images/home/DSC00014.jpg", flex: 1 },
          { src: "/old-site/images/contact/tepeyac-mayo-1.jpg", flex: 1 },
          { src: "/old-site/images/contact/tepeyac-mayo-4.jpg", flex: 1 },
        ].map(({ src, flex }) => (
          <div key={src} className="relative overflow-hidden" style={{ flex }}>
            <Image src={src} alt="El Tepeyac" fill sizes="33vw" className="object-cover" />
          </div>
        ))}
      </div>

      {/* ── Especialidades ────────────────────────────────────────────── */}
      <section className="py-18 sm:py-18">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-28">
            <div className="flex flex-col justify-center">
              <h2 className="mt-7 text-4xl leading-[1.0] sm:text-5xl">
                Platos que tienes que probar!
              </h2>
              <p className="mt-7 max-w-md text-base leading-7 text-charcoal/65">
                Recetas insignia de la casa, no te puedes perder estas especialidades tradicionales Mexicanas.
              </p>
            </div>

            <div className="grid grid-cols-2 content-start gap-x-10">
              {popularDishes.map((dish) => (
                <div key={dish.id} className="border-b border-black/10 py-5">
                  <div className="mt-1.5 text-3xl font-semibold text-charcoal">{dish.name}</div>
                  <div
                    className={`text-[11px] font-mono tracking-[0.28em] uppercase ${dish.accent === "cilantro"
                      ? "text-cilantro"
                      : dish.accent === "salsa"
                        ? "text-salsa"
                        : "text-oaxaca"
                      }`}
                  >
                    {dish.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            <div>
              <div className="mt-10">
                <a
                  href={restaurant.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-salsa px-7 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition hover:brightness-95"
                >
                  Ver menú completo
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Guacamole + Video ─────────────────────────────────────────── */}
      <section className="bg-cilantro/8">
        {/* Banda de texto */}
        <Container className="py-20 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
            <div>
              <div className="text-[10px] font-mono tracking-[0.36em] uppercase text-cilantro/70">
                Nuestra especialidad
              </div>
              <h2 className="mt-6 text-4xl leading-[1.0] text-charcoal sm:text-5xl">
                Fresco,{" "}
                <span className="text-charcoal/55">siempre al momento.</span>
              </h2>
              <p className="mt-6 text-base leading-7 text-charcoal/65">
                Tomate, cebolla, cilantro, serranos, limón, aguacate. Sin más secretos.
                El guacamole que se te graba en la memoria desde la primera probada.
              </p>
              <div className="mt-3 text-sm text-charcoal/50">
                <span className="font-semibold text-charcoal/70">Ingredientes:</span>{" "}
                tomate, cebolla, cilantro, serranos, limón, aguacate.
              </div>
              <div className="mt-10">
                <a
                  href={restaurant.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-cilantro px-7 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition hover:brightness-95"
                >
                  Ordenar guacamole
                </a>
              </div>
            </div>

            {/* Video de YouTube — reemplaza YOUTUBE_VIDEO_ID */}
            <div className="relative aspect-video w-full overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.16)]">
              {YOUTUBE_VIDEO_ID === "TODO_AGREGAR_ID_VIDEO" ? (
                /* Placeholder hasta que se agregue el ID del video */
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal/8">
                  <div className="text-[10px] font-mono tracking-[0.28em] uppercase text-charcoal/40">
                    Video · Próximamente
                  </div>
                  <div className="relative mt-4 h-48 w-full overflow-hidden">
                    <Image
                      src="/old-site/images/home/DSC00068-v2-Enhanced-NR-min.png"
                      alt="Guacamole El Tepeyac"
                      fill
                      sizes="600px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                </div>
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                  title="El Tepeyac — Guacamole"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              )}
            </div>
          </div>
        </Container>

        {/* Imagen full-bleed de los aguacates */}
        <div className="relative h-56 overflow-hidden sm:h-72">
          <Image
            src="/old-site/images/home/DSC00068-v2-Enhanced-NR-min.png"
            alt="Aguacates frescos"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-cilantro/20" />
        </div>
      </section>

      {/* ── Historia — ÚLTIMA SECCIÓN ─────────────────────────────────── */}
      <section className="bg-charcoal py-28 sm:py-36 text-bone">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
            <div>
              <div className="text-[10px] font-mono tracking-[0.36em] uppercase text-bone/45">
                Historia
              </div>
              <h2 className="mt-7 text-4xl leading-[1.0] text-bone sm:text-5xl">
                Recetas que pasan de mano en mano.
              </h2>
              <p className="mt-7 text-base leading-7 text-bone/75">
                Creemos que la comida sabe mejor cuando se comparte. Cada plato está inspirado
                en tradiciones mexicanas — hecho con sazón, cariño y rapidez. Aquí no solo
                vienes a comer: vienes a sentirte en casa.
              </p>
              <p className="mt-5 text-base leading-7 text-bone/75">
                Desde East Harlem, llevamos la cocina de México a tu mesa todos los días de
                la semana, de 8 de la mañana a 11 de la noche.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-5">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-maiz px-7 py-4 text-sm font-semibold uppercase tracking-wider text-charcoal transition hover:brightness-95"
                >
                  Contáctanos
                </Link>
                <a
                  href={restaurant.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-bone/70 underline underline-offset-4 decoration-bone/25 hover:decoration-bone/60 transition"
                >
                  Ordenar en línea →
                </a>
              </div>
            </div>

            {/* Imagen storefront — sin bordes, sin radius */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <Image
                src="/old-site/images/home/DSC00751.png"
                alt="Fachada de El Tepeyac"
                fill
                sizes="640px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="text-[10px] font-mono tracking-[0.28em] uppercase text-bone/65">
                  Visítanos
                </div>
                <div className="mt-2 text-base font-semibold text-bone">
                  {restaurant.addressLine1}
                </div>
                <div className="text-sm text-bone/75">{restaurant.addressLine2}</div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
