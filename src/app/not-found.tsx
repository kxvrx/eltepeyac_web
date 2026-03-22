import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center bg-[#fafaf8]">
      <Container>
        <div className="max-w-lg py-24">
          <div className="font-mono text-[11px] tracking-[0.45em] uppercase text-cilantro">
            Error 404
          </div>
          <h1 className="mt-4 text-5xl leading-tight text-charcoal sm:text-6xl">
            Página no encontrada
          </h1>
          <p className="mt-5 text-lg leading-7 text-charcoal/70">
            La página que buscas no existe o fue movida. Regresa al inicio y
            encuentra lo que necesitas.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center bg-cilantro px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:brightness-95"
            >
              ← Volver al inicio
            </Link>
            <Link
              href="/contact"
              className="border-b border-charcoal/30 pb-0.5 text-sm font-semibold text-charcoal/60 transition-colors hover:border-charcoal hover:text-charcoal"
            >
              Contactarnos
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
