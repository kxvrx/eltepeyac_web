"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Container } from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center bg-[#fafaf8]">
      <Container>
        <div className="max-w-lg py-24">
          <div className="font-mono text-[11px] tracking-[0.45em] uppercase text-cilantro">
            Error inesperado
          </div>
          <h1 className="mt-4 text-5xl leading-tight text-charcoal sm:text-6xl">
            Algo salió mal
          </h1>
          <p className="mt-5 text-lg leading-7 text-charcoal/70">
            Ocurrió un error en esta página. Puedes intentar recargarla o
            regresar al inicio.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={reset}
              className="inline-flex items-center bg-cilantro px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:brightness-95"
            >
              Intentar de nuevo
            </button>
            <Link
              href="/"
              className="border-b border-charcoal/30 pb-0.5 text-sm font-semibold text-charcoal/60 transition-colors hover:border-charcoal hover:text-charcoal"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
