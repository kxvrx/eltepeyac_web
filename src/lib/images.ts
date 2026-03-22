// ── URLs centralizadas de imágenes en Cloudinary ──────────────────────────────
// Cloud:   kxvrx-cloudinary
// Carpeta: eltepeyac  (todas las imágenes viven aquí)
// Naming:  {subcarpeta}_{nombre-original}.ext
//
// La versión (v17...) se omite a propósito — Cloudinary sirve la última
// versión sin ella, y así no hay que tocar el código si se re-sube una imagen.

const BASE = "https://res.cloudinary.com/kxvrx-cloudinary/image/upload";
const OPT = "f_auto,q_auto";
const WIDE = "f_auto,q_auto,w_1920";
const MED = "f_auto,q_auto,w_1200";

function img(name: string, transform = OPT) {
  return `${BASE}/${transform}/${name}`;
}

// ── Logos ──────────────────────────────────────────────────────────────────────
export const logoBlanco = img("logo_blanco.png");
export const logoColor = img("logo_color.png");
export const logoGuac = img("logo_guac.png");

// ── Home ──────────────────────────────────────────────────────────────────────
export const homeHero = img("home_DSC00751.png", WIDE);
export const homeInterior = img("home_DSC00014.jpg", WIDE);
export const homeGuacamole = img("home_DSC00068-v2-Enhanced-NR-min.png", MED);
export const homeAbril = img("home_abril-4.jpg", MED);

// ── Contact / Banners ─────────────────────────────────────────────────────────
export const contactMayo1 = img("contact_tepeyac-mayo-1.jpg", WIDE);
export const contactMayo3 = img("contact_tepeyac-mayo-3.jpg", WIDE);
export const contactMayo4 = img("contact_tepeyac-mayo-4.jpg", MED);
export const contactPost = img("contact_post.jpg", WIDE);

// ── Gallery Covers──────────────────────────────────────────────────────────────────
export const galleryAltarCover = img("altar_oct-39.jpg", "w_1200,f_auto,q_auto");
export const galleryCateringCover = img("catering_14.png", "w_1200,f_auto,q_auto");
