import { restaurant } from "@/lib/restaurant";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="bg-cilantro text-bone">
      <Container className="py-10 sm:py-14">
        <div className="flex flex-col items-center justify-center">
          <div className="text-[18px] font-mono tracking-[0.34em] uppercase text-bone/60">
            Taqueria · Tradicional · NYC
          </div>
        </div>
        <div className="mt-10 grid gap-14 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="mt-5 relative h-20 w-64 sm:h-24 sm:w-80">
              <Image
                src="https://res.cloudinary.com/kxvrx-cloudinary/image/upload/f_auto,q_auto/logo_blanco.png"
                alt="Taqueria El Tepeyac"
                fill
                sizes="(max-width: 640px) 256px, 320px"
                className="object-contain object-center"
              />
            </div>
            <p className="mt-5 max-w-sm text-lg leading-7 text-bone/60">
              La comida sabe mejor cuando se comparte.
            </p>

            <div className="mt-2 h-px bg-gradient-to-r from-transparent via-bone/20 to-transparent" />

            <div className="mt-2 flex flex-wrap gap-6 text-lg text-bone/70">
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
            <div className="text-[19px] font-mono tracking-[0.34em] uppercase text-bone/45">
              Horario
            </div>
            <div className="mt-4 text-lg leading-7 text-bone/70">{restaurant.hours}</div>

            <div className="mt-10 text-[19px] font-mono tracking-[0.34em] uppercase text-bone/45">
              Ubicación
            </div>
            <a
              className="mt-4 inline-block text-lg leading-7 text-bone/70 underline underline-offset-4 decoration-bone/20 hover:decoration-bone/55 transition"
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
            <div className="text-[19px] font-mono tracking-[0.34em] uppercase text-bone/45">
              Páginas
            </div>
            <div className="mt-4 grid gap-3 text-lg">
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
              <div className="text-[19px] font-mono tracking-[0.28em] uppercase text-bone/45">
                Catering
              </div>
              <p className="mt-3 text-lg leading-6 text-bone/55">
                Para pedidos grandes y eventos, usa la página de contacto o llámanos.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-bone/10 pt-7 text-md text-bone/60 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} {restaurant.name}. Todos los derechos reservados.
          </div>
          <div className="font-mono tracking-[0.22em] uppercase"><a href="https://studios.kxvrx.com" target="_blank" rel="noopener noreferrer">Hecho por @KxvrxStudios</a></div>
        </div>
      </Container>
    </footer>
  );
}
