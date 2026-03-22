// ── Estructura centralizada de galerías ────────────────────────────────────────

export type GalleryPhoto = {
  src: string;
  col?: "col-span-4" | "col-span-6" | "col-span-8";
  aspect?: "aspect-[3/4]" | "aspect-[4/3]" | "aspect-[16/9]" | "aspect-square";
};

export type Album = {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  href: string;
  cover: string;
  photos: GalleryPhoto[];
};

export const galleryAlbums: Album[] = [
  {
    slug: "lugar",
    eyebrow: "Galería principal",
    title: "El Lugar",
    subtitle: "El restaurante, el equipo y los momentos del día a día en East Harlem.",
    href: "#fotos",
    cover: "/old-site/images/home/abril-4.jpg",
    photos: [
      { src: "/old-site/images/home/abril-4.jpg",                       col: "col-span-8", aspect: "aspect-[16/9]" },
      { src: "/old-site/images/contact/tepeyac-mayo-4.jpg",             col: "col-span-4", aspect: "aspect-[3/4]"  },
      { src: "/old-site/images/contact/tepeyac-mayo-1.jpg",             col: "col-span-4", aspect: "aspect-[4/3]"  },
      { src: "/old-site/images/home/DSC00068-v2-Enhanced-NR-min.png",   col: "col-span-4", aspect: "aspect-[4/3]"  },
      { src: "/old-site/images/home/DSC00751.png",                      col: "col-span-4", aspect: "aspect-[4/3]"  },
      { src: "/old-site/images/contact/tepeyac-mayo-3.jpg",             col: "col-span-6", aspect: "aspect-[16/9]" },
      { src: "/old-site/images/home/DSC00014.jpg",                      col: "col-span-6", aspect: "aspect-[16/9]" },
    ],
  },
  {
    slug: "altar",
    eyebrow: "Historia de temporada",
    title: "Altar Día de Muertos",
    subtitle: "Una historia de temporada contada con color, flores y memoria.",
    href: "/gallery/altar-dia-de-muertos",
    cover: "/old-site/images/contact/tepeyac-mayo-4.jpg",
    photos: [
      { src: "/old-site/images/contact/tepeyac-mayo-4.jpg" },
      { src: "/old-site/images/home/abril-4.jpg" },
      { src: "/old-site/images/contact/tepeyac-mayo-1.jpg" },
      { src: "/old-site/images/home/DSC00014.jpg" },
      { src: "/old-site/images/contact/tepeyac-mayo-3.jpg" },
      { src: "/old-site/images/home/DSC00751.png" },
    ],
  },
  {
    slug: "catering",
    eyebrow: "Eventos y catering",
    title: "Galería de Catering",
    subtitle: "Montajes, bandejas y platos para grupos de 10 a 500 personas.",
    href: "/gallery/catering-gallery",
    cover: "/old-site/images/home/DSC00068-v2-Enhanced-NR-min.png",
    photos: [
      { src: "/old-site/images/home/abril-4.jpg" },
      { src: "/old-site/images/contact/tepeyac-mayo-1.jpg" },
      { src: "/old-site/images/home/DSC00014.jpg" },
      { src: "/old-site/images/contact/tepeyac-mayo-4.jpg" },
      { src: "/old-site/images/home/DSC00068-v2-Enhanced-NR-min.png" },
      { src: "/old-site/images/contact/tepeyac-mayo-3.jpg" },
      { src: "/old-site/images/home/DSC00751.png" },
      { src: "/old-site/images/home/abril-4.jpg" },
      { src: "/old-site/images/contact/tepeyac-mayo-1.jpg" },
    ],
  },
] as const;
