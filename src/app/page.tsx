import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { restaurant, popularDishes } from "@/lib/restaurant";
import Link from "next/link";
import { ParallaxSection } from "@/components/ui/ParallaxSection";
import {
  logoBlanco, homeInterior, homeAbril, homeGuacamole, homeHero,
  contactMayo1, contactMayo4,
} from "@/lib/images";


export default function Home() {
  return (
    <div>
      {/* ── Hero — envuelto en -mt para quedar detrás del header ──────── */}
      <div className="-mt-[68px] sm:-mt-[72px]">
        <ParallaxSection
          image={{
            src: homeInterior,
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
                    src={logoBlanco}
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
                    href="/menu"
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
            {/* Se elimina `mt-8` para asegurar que el espacio superior e inferior sea idéntico (gobernado por py-28) */}
            <h2 className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Auténtico sabor mexicano
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-xl leading-8 text-charcoal/65">
              En el corazón de East Harlem, servimos tradición, ingredientes reales y
              un ambiente acogedor que te hace sentir en casa desde el primer momento.
            </p>
            <div className="mx-auto mt-5 ornament max-w-xs" />
            <div className="mt-5 flex flex-wrap justify-center gap-x-0.5 gap-y-1 font-mono text-[15px] uppercase tracking-[0.12em] text-charcoal/50">
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
          { src: homeAbril,     flex: 2 },
          { src: homeInterior,  flex: 1 },
          { src: contactMayo1,  flex: 1 },
          { src: contactMayo4,  flex: 1 },
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
              <p className="mt-7 max-w-md text-xl leading-7 text-charcoal/65">
                Recetas insignia de la casa, no te puedes perder estas especialidades tradicionales desde México.
              </p>
              <div className="mt-10 flex flex-wrap justify-center">
                <a
                  href={restaurant.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-salsa px-7 py-4 text-md font-semibold uppercase tracking-wider text-bone transition hover:brightness-95"
                >
                  Ver menú completo
                </a>
              </div>
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
        </Container>
      </section>

      {/* ── Guacamole + Video ─────────────────────────────────────────── */}
      <ParallaxSection
        image={{
          src: homeGuacamole,
          alt: "Aguacates frescos El Tepeyac",
          sizes: "100vw",
        }}
        strength={200}
        overlay={
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-transparent" />
        }
      >
        {/* Zona de fundido superior: transición suave desde el color hueso (#fbf7ee) hacia la imagen */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none z-0"
          style={{
            height: "210px",
            background:
              "linear-gradient(to bottom, #fbf7ee 0%, rgba(251,247,238,0.95) 15%, rgba(251,247,238,0.82) 30%, rgba(251,247,238,0.5) 50%, rgba(251,247,238,0.18) 70%, rgba(251,247,238,0.05) 85%, rgba(251,247,238,0) 100%)",
          }}
        />
        {/* pb-72 y pb-80 compensan la sección de abajo; el pt está incrementado por el fundido superior */}
        <Container className="pt-32 pb-72 sm:pt-48 sm:pb-60 relative z-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
            <div>
              <div className="text-[20px] font-mono tracking-[0.36em] uppercase text-bone/60">
                Nuestra especialidad
              </div>
              <h2 className="mt-6 text-4xl leading-[1.0] text-bone sm:text-5xl">
                Fresco,{" "}
                <span className="text-bone/80">hacemos guacamole todos los días!</span>
              </h2>
              <p className="mt-6 text-xl leading-7 text-bone/75">
                Tomate, cebolla, cilantro, limón, aguacate. Sin más secretos. <br />
                El guacamole que se te graba en la memoria desde la primera probada.
              </p>
              <div className="mt-10 flex flex-wrap justify-center">
                <a
                  href={restaurant.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-cilantro px-7 py-4 text-md font-semibold uppercase tracking-wider text-bone transition hover:brightness-95"
                >
                  Ordenar guacamole
                </a>
              </div>
            </div>

            {/* Video de Google Drive */}
            <div className="relative aspect-video w-full overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.5)]">
              <iframe
                src="https://drive.google.com/file/d/1ZDyYJuiswtwoBkalw462QDi-LO4OIK53/preview"
                title="El Tepeyac — Guacamole"
                allow="autoplay"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </Container>
      </ParallaxSection>

      {/* ── Historia — ÚLTIMA SECCIÓN ─────────────────────────────────── */}
      {/*
        -mt-52: sube 208px encima del parallax → los aguacates se ven debajo
        Dos capas de fondo:
          1) fade div (300px): transparent → bone, cubre la zona de mezcla
          2) solid div: bone puro desde 300px hacia abajo
        El contenido arranca en pt-80 (320px), ya en la zona sólida.
      */}
      <section className="relative -mt-52 z-10 pb-20 sm:pb-28">
        {/* Zona de fundido: adaptado a 210px con una curva curva S (ease-in-out) de opacidad para extra suavidad */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "210px",
            background:
              "linear-gradient(to bottom, rgba(251,247,238,0) 0%, rgba(251,247,238,0.05) 15%, rgba(251,247,238,0.18) 30%, rgba(251,247,238,0.5) 50%, rgba(251,247,238,0.82) 70%, rgba(251,247,238,0.95) 85%, #fbf7ee 100%)",
          }}
        />
        {/* Fondo sólido empieza justo donde termina la imagen (208px) */}
        <div
          className="absolute left-0 right-0 bottom-0 bg-[#fbf7ee] pointer-events-none"
          style={{ top: "208px" }}
        />

        {/* pt-80 = 320px → el contenido arranca pasada la zona de fundido (300px) */}
        <Container className="relative z-10 pt-80 sm:pt-[340px]">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-start">
            {/* Columna texto — texto oscuro sobre fondo claro */}
            <div>
              {/* Eyebrow con acento dorado */}
              <div className="flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-cilantro" />
                <span className="text-[20px] font-mono tracking-[0.38em] uppercase text-charcoal/45">
                  Historia
                </span>
              </div>

              <h2 className="mt-5 text-4xl leading-[1.05] text-charcoal sm:text-5xl">
                Recetas con historias<br className="hidden sm:block" />
              </h2>
              <h3 className="mt-1 text-3xl leading-[1.05] text-charcoal sm:text-4xl">
                que pasan de generación.
              </h3>


              {/* Divisor decorativo */}
              <div className="mt-8 h-[2px] w-12 bg-maiz rounded-full" />

              <p className="mt-7 text-xl leading-7 text-charcoal/85">
                Creemos que la comida sabe mejor cuando se comparte. Cada plato está inspirado
                en tradiciones mexicanas, hecho con sazón, cariño y rapidez. <br /> Aquí no solo
                vienes a comer, vienes a sentirte en casa.
              </p>
              <p className="mt-5 text-xl leading-7 text-charcoal/85">
                Desde el corazón de Manhattan, llevamos la cocina de México a tu mesa todos los días de
                la semana.
              </p>

              {/* Stats rápidos */}
              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-charcoal/10 pt-8 sm:grid-cols-3">
                {[
                  { value: "15+", label: "Años de tradición" },
                  { value: "7", label: "Días a la semana" },
                  { value: "300+", label: "Reviews positivas" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl sm:text-4xl font-light tracking-tight text-charcoal">{stat.value}</div>
                    <div className="mt-2 text-[11px] sm:text-lg font-mono tracking-[0.22em] uppercase text-charcoal/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-salsa px-7 py-4 text-md font-semibold uppercase tracking-wider text-bone transition hover:brightness-95"
                >
                  Contáctanos
                </Link>
              </div>
            </div>

            {/* Imagen storefront */}
            <div className="relative w-full overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.45)]" style={{ aspectRatio: "4/5" }}>
              <Image
                src={homeHero}
                alt="Fachada de El Tepeyac"
                fill
                sizes="640px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
