import { restaurant } from "@/lib/restaurant";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-bone">
      <Container className="py-20 sm:py-24">
        <div className="grid gap-14 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="text-[10px] font-mono tracking-[0.34em] uppercase text-bone/45">
              Taqueria · East Harlem · NYC
            </div>
            <div className="mt-5 text-3xl font-light tracking-tight text-bone">
              {restaurant.name}
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-bone/60">
              La comida sabe mejor cuando se comparte. Recetas de familia, hechas al momento
              — rápido, cálido y auténtico.
            </p>

            <div className="mt-10 h-px bg-gradient-to-r from-transparent via-bone/20 to-transparent" />

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-bone/70">
              <a
                className="underline underline-offset-4 decoration-bone/20 hover:decoration-bone/55 transition"
                href={`tel:${restaurant.phoneE164}`}
              >
                {restaurant.phoneDisplay}
              </a>
              <a
                className="underline underline-offset-4 decoration-bone/20 hover:decoration-bone/55 transition"
                href={restaurant.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ordenar en línea
              </a>
            </div>
          </div>

          {/* Horario + Ubicación */}
          <div className="md:col-span-3">
            <div className="text-[10px] font-mono tracking-[0.34em] uppercase text-bone/45">
              Horario
            </div>
            <div className="mt-4 text-sm leading-7 text-bone/70">{restaurant.hours}</div>

            <div className="mt-10 text-[10px] font-mono tracking-[0.34em] uppercase text-bone/45">
              Ubicación
            </div>
            <a
              className="mt-4 inline-block text-sm leading-7 text-bone/70 underline underline-offset-4 decoration-bone/20 hover:decoration-bone/55 transition"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                restaurant.mapQuery
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {restaurant.addressLine1}
              <br />
              {restaurant.addressLine2}
            </a>
          </div>

          {/* Páginas + nota */}
          <div className="md:col-span-4">
            <div className="text-[10px] font-mono tracking-[0.34em] uppercase text-bone/45">
              Páginas
            </div>
            <div className="mt-4 grid gap-3 text-sm">
              <Link
                className="w-fit text-bone/70 underline underline-offset-4 decoration-bone/20 hover:decoration-bone/55 transition"
                href="/"
              >
                Inicio
              </Link>
              <Link
                className="w-fit text-bone/70 underline underline-offset-4 decoration-bone/20 hover:decoration-bone/55 transition"
                href="/gallery"
              >
                Galería
              </Link>
              <Link
                className="w-fit text-bone/70 underline underline-offset-4 decoration-bone/20 hover:decoration-bone/55 transition"
                href="/contact"
              >
                Contacto
              </Link>
            </div>

            <div className="mt-12 border-l border-bone/15 pl-6">
              <div className="text-[10px] font-mono tracking-[0.28em] uppercase text-bone/45">
                Catering
              </div>
              <p className="mt-3 text-sm leading-6 text-bone/55">
                Para pedidos grandes y eventos, usa la página de contacto — respondemos rápido.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-bone/10 pt-7 text-xs text-bone/40 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} {restaurant.name}. Todos los derechos reservados.
          </div>
          <div className="font-mono tracking-[0.22em] uppercase">Hecho con maíz y cariño</div>
        </div>
      </Container>
    </footer>
  );
}
