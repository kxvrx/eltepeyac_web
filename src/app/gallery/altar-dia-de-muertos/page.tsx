import { Container } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Altar Día de Muertos",
  description: "Una historia de temporada: flores, velas y memoria.",
};

const photos = [
  "/old-site/images/contact/tepeyac-mayo-4.jpg",
  "/old-site/images/home/abril-4.jpg",
  "/old-site/images/contact/tepeyac-mayo-1.jpg",
  "/old-site/images/home/DSC00014.jpg",
  "/old-site/images/contact/tepeyac-mayo-3.jpg",
  "/old-site/images/home/DSC00751.png",
] as const;

export default function AltarDiaDeMuertosPage() {
  return (
    <div>
      <section className="py-14 sm:py-18">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="text-[11px] font-mono tracking-[0.28em] text-charcoal/55">
                HISTORIA DE TEMPORADA
              </div>
              <h1 className="mt-4 text-5xl leading-[0.92] sm:text-6xl">
                Altar Día de Muertos
              </h1>
              <p className="mt-6 text-base leading-7 text-charcoal/75">
                Esta colección está lista para una futura entrega de fotos. Por ahora usa
                algunas imágenes existentes como ejemplo de composición.
              </p>
            </div>
            <Link
              href="/gallery"
              className="w-fit rounded-md border border-border bg-paper px-5 py-3 text-sm font-semibold text-charcoal hover:bg-black/[0.02]"
            >
              Volver a galería
            </Link>
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="paper grain rounded-2xl p-7 sm:p-9">
            <div className="flex items-end justify-between gap-6">
              <div>
                <div className="text-[11px] font-mono tracking-[0.28em] text-charcoal/55">
                  GRID
                </div>
                <h2 className="mt-3 text-3xl leading-[1.02] sm:text-4xl">
                  Layout centrado en la imagen
                </h2>
              </div>
              <div className="hidden text-sm text-charcoal/70 sm:block">Agrega 12–30 fotos después.</div>
            </div>
            <div className="mt-7 ornament" />
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className={`relative overflow-hidden rounded-xl border border-border bg-paper shadow-[0_18px_55px_rgba(0,0,0,0.06)] ${
                    idx % 3 === 1 ? "aspect-[3/4]" : idx % 3 === 2 ? "aspect-[4/5]" : "aspect-[4/3]"
                  }`}
                >
                  <Image src={src} alt="Seasonal story placeholder" fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-black/0" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

