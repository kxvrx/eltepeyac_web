import Image from "next/image";
import { ExternalButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { restaurant } from "@/lib/restaurant";

export default function Home() {
  return (
    <div>
      {/* HERO (photo-led like the old site) */}
      <section className="relative h-[68vh] min-h-[520px] w-full overflow-hidden">
        <Image
          src="/old-site/images/home/abril-4.jpg"
          alt="El Tepeyac interior colors and banners"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />

        <Container className="relative flex h-full items-center justify-center py-16">
          <div className="text-center">
            <div className="mx-auto relative h-16 w-64 sm:h-20 sm:w-80">
              <Image
                src="/old-site/images/logos/logo_blanco.png"
                alt="Taqueria El Tepeyac"
                fill
                sizes="320px"
                className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
              />
            </div>
            <div className="mt-6 text-xs font-semibold tracking-[0.26em] text-white/85">
              {restaurant.taglineEN.toUpperCase()}
            </div>
          </div>
        </Container>
      </section>

      {/* GUACAMOLE (full-bleed background image) */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/old-site/images/home/DSC00068-v2-Enhanced-NR-min.png"
            alt="Avocados for guacamole"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <Container className="relative py-20 sm:py-28">
          <div className="text-center text-white">
            <h2 className="text-4xl font-extrabold tracking-[0.08em] sm:text-5xl">
              GUACAMOLE
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/85">
              This is how we made our famous signature Guacamole
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <div className="relative overflow-hidden rounded-sm border border-white/25 bg-black/35 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="relative aspect-video">
                <Image
                  src="/old-site/images/logos/logo_guac.png"
                  alt="Guacamole signature visual"
                  fill
                  sizes="800px"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full border border-white/55 bg-black/35">
                    <div className="ml-1 h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-white/90" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <ExternalButtonLink href={restaurant.orderUrl} tone="salsa">
                Order Now
              </ExternalButtonLink>
              <a
                className="text-sm font-semibold text-white/85 underline underline-offset-4 decoration-white/40 hover:decoration-white/80"
                href={`tel:${restaurant.phoneE164}`}
              >
                {restaurant.phoneDisplay}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* STORY (deep red block with round photo) */}
      <section className="w-full bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.12),transparent_45%),linear-gradient(180deg,#b41616,#3a0202)] py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[340px_1fr]">
            <div className="mx-auto">
              <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                <Image
                  src="/old-site/images/home/DSC00751.png"
                  alt="El Tepeyac storefront"
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="text-white">
              <h3 className="text-2xl font-extrabold tracking-[0.08em] sm:text-3xl">
                EN TEPEYAC…
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/88">
                Creemos que la comida sabe mejor cuando se comparte. Cada plato que servimos
                está inspirado en las recetas de nuestra familia, transmitidas de generación
                en generación. Aquí no solo vienes a comer — vienes a sentirte parte de algo
                más grande: un espacio donde la tradición mexicana, el sabor auténtico y el
                calor humano se mezclan para crear momentos que se convierten en recuerdos.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="w-full bg-white py-14">
        <Container>
          <h2 className="text-center text-xl font-extrabold tracking-[0.08em] text-charcoal sm:text-2xl">
            OUR RESTAURANT, OUR FAMILY
          </h2>
        </Container>
      </section>
    </div>
  );
}
