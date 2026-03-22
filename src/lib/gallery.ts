// ── Estructura centralizada de galerías ────────────────────────────────────────
//
// Las fotos ya NO están hardcodeadas aquí.
// Cada álbum tiene un `prefix` que matchea el nombre de las imágenes en Cloudinary.
//
// Convención de nombres en Cloudinary:
//   altar_01-portada.jpg   → álbum "altar",  foto #1
//   altar_02-flores.jpg    → álbum "altar",  foto #2
//   catering_01-bandejas.jpg → álbum "catering", foto #1
//
// Para agregar fotos: súbelas a Cloudinary con el prefijo correcto. Listo.

import {
  homeAbril,
  galleryAltarCover,
  galleryCateringCover,
} from "@/lib/images";

export type GalleryPhoto = {
  src: string;
  col?: "col-span-4" | "col-span-6" | "col-span-8";
  aspect?: "aspect-[3/4]" | "aspect-[4/3]" | "aspect-[16/9]" | "aspect-square";
};

export type Album = {
  slug: string;
  prefix: string;   // prefijo en Cloudinary → "altar_", "catering_"
  eyebrow: string;
  title: string;
  subtitle: string;
  href: string;
  cover: string;   // imagen estática de portada (desde images.ts)
};

// ── Álbumes registrados ────────────────────────────────────────────────────────
// Para crear un álbum nuevo:
//   1. Agrégalo aquí con su prefix y cover
//   2. Sube las fotos a Cloudinary con ese prefix
//   3. Listo — aparece automáticamente en la galería
export const galleryAlbums: Album[] = [
  {
    slug: "lugar",
    prefix: "home_",
    eyebrow: "Galería principal",
    title: "El Lugar",
    subtitle: "El restaurante, el equipo y los momentos del día a día en East Harlem.",
    href: "#fotos",
    cover: homeAbril,
  },
  {
    slug: "altar",
    prefix: "altar_",
    eyebrow: "Historia de temporada",
    title: "Altar Día de Muertos",
    subtitle: "Una historia de temporada contada con color, flores y memoria.",
    href: "/gallery/altar-dia-de-muertos",
    cover: galleryAltarCover,
  },
  {
    slug: "catering",
    prefix: "catering_",
    eyebrow: "Eventos y catering",
    title: "Galería de Catering",
    subtitle: "Montajes, bandejas y platos para grupos de 10 a 500 personas.",
    href: "/gallery/catering-gallery",
    cover: galleryCateringCover,
  },
];
