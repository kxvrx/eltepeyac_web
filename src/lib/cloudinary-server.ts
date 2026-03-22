// ── Cloudinary server-only utility ────────────────────────────────────────────
// Este archivo NUNCA debe importarse desde un Client Component ("use client")
// Next.js lo garantiza porque usa variables de entorno secretas (sin NEXT_PUBLIC_)

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:  "kxvrx-cloudinary",
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
  secure:      true,
});

const BASE_TRANSFORM = "f_auto,q_auto";

/**
 * Devuelve todas las URLs de imágenes cuyo public_id empiece con `prefix`.
 * Ej: fetchAlbumPhotos("altar_") → todas las fotos que se llamen altar_*.
 *
 * Las imágenes se ordenan por nombre (A→Z) para que el orden sea
 * predecible y lo controles renombrando: altar_01_portada.jpg, altar_02_flores.jpg...
 */
export type PhotoMeta = {
  src:    string;
  width:  number;
  height: number;
};

export async function fetchAlbumPhotos(prefix: string): Promise<string[]> {
  const result = await cloudinary.search
    .expression(`public_id:${prefix}*`)
    .sort_by("public_id", "asc")
    .max_results(100)
    .execute();

  return result.resources.map(
    (r: { public_id: string; format: string }) =>
      `https://res.cloudinary.com/kxvrx-cloudinary/image/upload/${BASE_TRANSFORM}/${r.public_id}.${r.format}`
  );
}

/**
 * Igual que fetchAlbumPhotos pero devuelve también width y height de cada imagen.
 * Usado en sub-galerías para renderizar masonry con proporciones naturales.
 */
export async function fetchAlbumPhotosWithMeta(prefix: string): Promise<PhotoMeta[]> {
  const result = await cloudinary.search
    .expression(`public_id:${prefix}*`)
    .sort_by("public_id", "asc")
    .max_results(100)
    .execute();

  return result.resources.map(
    (r: { public_id: string; format: string; width: number; height: number }) => ({
      src:    `https://res.cloudinary.com/kxvrx-cloudinary/image/upload/${BASE_TRANSFORM}/${r.public_id}.${r.format}`,
      width:  r.width,
      height: r.height,
    })
  );
}

/**
 * Devuelve la URL de la primera imagen del álbum (cover automático).
 * Si el álbum no tiene fotos, devuelve null.
 */
export async function fetchAlbumCover(prefix: string): Promise<string | null> {
  const photos = await fetchAlbumPhotos(prefix);
  return photos[0] ?? null;
}
