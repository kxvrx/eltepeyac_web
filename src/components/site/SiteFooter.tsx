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
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-10 md:grid-cols-12 md:gap-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="mt-2 relative h-16 w-52 sm:mt-5 sm:h-24 sm:w-80">
              <Image
                src="https://res.cloudinary.com/kxvrx-cloudinary/image/upload/f_auto,q_auto/logo_blanco.png"
                alt="Taqueria El Tepeyac"
                fill
                sizes="(max-width: 640px) 256px, 320px"
                className="object-contain object-center"
              />
            </div>
            <p className="mt-4 max-w-sm text-sm md:text-lg leading-6 md:leading-7 text-bone/60">
              La comida sabe mejor cuando se comparte.
            </p>

            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-bone/20 to-transparent w-full max-w-[200px]" />

            <div className="mt-4 flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-lg text-bone/70">
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
                data-umami-event="order-click"
                data-umami-event-location="footer"
              >
                Ordenar en línea
              </a>
            </div>
          </div>

          {/* Horario + Ubicación */}
          <div className="col-span-1 md:col-span-3 flex flex-col break-words">
            <div className="text-[13px] md:text-[19px] font-mono tracking-[0.2em] md:tracking-[0.34em] uppercase text-bone/45">
              Horario
            </div>
            <div className="mt-2 md:mt-4 text-sm md:text-lg leading-relaxed md:leading-7 text-bone/70">{restaurant.hours}</div>

            <div className="mt-6 md:mt-10 text-[13px] md:text-[19px] font-mono tracking-[0.2em] md:tracking-[0.34em] uppercase text-bone/45">
              Ubicación
            </div>
            <a
              className="mt-2 md:mt-4 inline-block text-sm md:text-lg leading-relaxed md:leading-7 text-bone/70 underline underline-offset-4 decoration-bone/20 hover:decoration-bone/55 transition"
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

          {/* Páginas */}
          <div className="col-span-1 md:col-span-4 flex flex-col break-words">
            <div className="text-[13px] md:text-[19px] font-mono tracking-[0.2em] md:tracking-[0.34em] uppercase text-bone/45">
              Páginas
            </div>
            <div className="mt-2 md:mt-4 grid gap-2 md:gap-3 text-sm md:text-lg">
              <Link
                className="w-fit text-bone/70 underline underline-offset-4 decoration-bone/20 hover:decoration-bone/55 transition"
                href="/"
              >
                Inicio
              </Link>
              <Link
                className="w-fit text-bone/70 underline underline-offset-4 decoration-bone/20 hover:decoration-bone/55 transition"
                href="/menu"
              >
                Menú
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
          </div>

          {/* Catering */}
          <div className="col-span-2 md:col-span-12 mt-4 md:mt-6 border-t border-bone/15 pt-8 md:pt-10 flex flex-col items-center text-center">
            <div className="text-[13px] md:text-[19px] font-mono tracking-[0.15em] md:tracking-[0.28em] uppercase text-bone/45">
              Catering
            </div>
            <p className="mt-2 md:mt-3 text-xs md:text-lg leading-snug md:leading-6 text-bone/55 max-w-md">
              Para pedidos y eventos, contáctanos.
            </p>
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
