"use client";

import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import { restaurant } from "@/lib/restaurant";

export function MenuClient({ menuImage }: { menuImage: StaticImageData }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col items-center max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-black font-heading text-salsa drop-shadow-sm">
            Nuestro Men&uacute;
          </h1>
          <p className="text-lg md:text-xl text-charcoal/80 font-body max-w-2xl mx-auto">
            Descubre nuestra auténtica selección de platillos y bebidas. Haz clic en el menú para verlo a gran detalle.
          </p>
          <div className="w-full max-w-xs mx-auto ornament my-6 opacity-80"></div>
        </div>

        {/* Thumbnail View */}
        <div
          className="relative w-full overflow-hidden rounded-sm shadow-xl cursor-zoom-in group transition-all duration-500 hover:-translate-y-1 paper p-3 md:p-5"
          onClick={() => setIsFullscreen(true)}
        >
          <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
          <div className="relative rounded shadow-sm border border-border/40 overflow-hidden bg-bone">
            <Image
              src={menuImage}
              alt="Menú de El Tepeyac Taqueria"
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
              placeholder="blur"
              priority
            />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-ink/90 text-bone p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-xl flex flex-col items-center justify-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
            <span className="text-xs font-mono font-medium tracking-wider uppercase">Ampliar</span>
          </div>
        </div>

        {/* Order CTA */}
        <div className="flex flex-col items-center justify-center space-y-6 pt-12 md:pt-16 mt-8 w-full">
          <div className="w-24 ornament mb-4 opacity-50"></div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ink">¿Listo para probarlo?</h2>
          <p className="text-charcoal/80 font-body text-lg max-w-lg text-center">
            Pide en línea para recoger o a domicilio, calientito y listo.
          </p>
          <a
            href={restaurant.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center overflow-hidden bg-salsa px-10 py-4 text-base font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:shadow-[0_4px_20px_rgba(215,58,47,0.3)] active:scale-[0.98] rounded-md mt-4"
          >
            {/* Barrido en hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-maiz transition-transform duration-300 ease-out group-hover:translate-x-0"
            />
            <span className="relative group-hover:text-charcoal transition-colors duration-300">Ordenar Ahora</span>
          </a>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-lg cursor-zoom-out"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-[110]">
            <button
              className="bg-bone/10 hover:bg-bone/20 text-bone rounded-full p-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-bone/50"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              aria-label="Cerrar pantalla completa"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div
            className="relative w-full h-full flex items-center justify-center p-4 sm:p-8"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsFullscreen(false);
              }
            }}
          >
            <div
              className="relative w-full h-full overflow-auto rounded flex justify-center items-start scroll-smooth"
              style={{ paddingBottom: '5vh' }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsFullscreen(false);
                }
              }}
            >
              <Image
                src={menuImage}
                alt="Menú Completo de El Tepeyac Taqueria"
                className="w-auto max-w-full md:max-w-none md:w-[90vw] lg:w-[80vw] object-contain h-auto shadow-2xl rounded bg-bone"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
