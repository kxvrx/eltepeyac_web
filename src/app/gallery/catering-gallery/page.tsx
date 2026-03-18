import { Container } from "@/components/ui/Container";
import { ExternalButtonLink } from "@/components/ui/Button";
import { restaurant } from "@/lib/restaurant";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Galería de catering",
  description: "Montajes de catering y platos para eventos.",
};

const tiles = [
  {
    src: "/old-site/images/home/abril-4.jpg",
    title: "Almuerzo de oficina",
    note: "Bandejas, guarniciones y montaje rápido.",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/old-site/images/contact/tepeyac-mayo-1.jpg",
    title: "Estilo familiar",
    note: "Listo para servir, hecho al momento.",
    ratio: "aspect-[3/4]",
  },
  {
    src: "/old-site/images/home/DSC00014.jpg",
    title: "Evento pequeño",
    note: "Fácil de recoger, sabor cálido.",
    ratio: "aspect-[4/5]",
  },
] as const;

export default function CateringGalleryPage() {
  return (
    <div>
      <section className="py-14 sm:py-18">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="text-[11px] font-mono tracking-[0.28em] text-charcoal/55">
                CATERING
              </div>
              <h1 className="mt-4 text-5xl leading-[0.92] sm:text-6xl">Galería de catering</h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-charcoal/75">
                Un portafolio visual para eventos — diseñado para decidir rápido. Cambia estas
                imágenes de ejemplo por fotos reales cuando quieras.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ExternalButtonLink href={restaurant.orderUrl} tone="salsa" className="rounded-md">
                  Ordenar / Cotizar
                </ExternalButtonLink>
                <Link
                  href="/contact"
                  className="rounded-md border border-border bg-paper px-5 py-3 text-sm font-semibold text-charcoal hover:bg-black/[0.02]"
                >
                  Contactar catering
                </Link>
                <Link
                  href="/gallery"
                  className="text-sm font-semibold text-charcoal/75 underline underline-offset-4 decoration-black/20 hover:decoration-black/45"
                >
                  Volver a galería
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="paper grain overflow-hidden rounded-2xl p-7">
                <div className="text-[11px] font-mono tracking-[0.28em] text-charcoal/55">
                  NOTAS
                </div>
                <div className="mt-4 text-sm leading-6 text-charcoal/75">
                  Agrega paquetes, mínimos y ventanas de recogida aquí. Este bloque funciona
                  como un “insert” de menú: ideal para leer rápido.
                </div>
                <div className="mt-6 ornament" />
                <div className="mt-6 grid gap-3 text-sm text-charcoal/75">
                  <div>
                    <span className="font-semibold text-charcoal">Rápido:</span> consulta → respuesta
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal">Flexible:</span> chico a grande
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal">Al momento:</span> hecho al pedir
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, idx) => {
              const t = tiles[idx % tiles.length];
              return (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-2xl border border-border bg-paper shadow-[0_18px_55px_rgba(0,0,0,0.06)]"
                >
                  <div className={`relative ${t.ratio}`}>
                    <Image src={t.src} alt="Catering placeholder" fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/12 via-transparent to-black/0" />
                  </div>
                  <div className="paper border-t border-border px-6 py-5">
                    <div className="text-[11px] font-mono tracking-[0.28em] text-charcoal/55">
                      SETUP
                    </div>
                    <div className="mt-2 text-base font-semibold text-charcoal">{t.title}</div>
                    <div className="mt-1 text-sm text-charcoal/70">{t.note}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}

