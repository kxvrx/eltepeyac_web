export const restaurant = {
  name: "El Tepeyac Taqueria",
  taglineEN: "Authentic and traditional Mexican cuisine",
  taglineES: "Cocina mexicana auténtica y tradicional",
  addressLine1: "1505 Lexington Ave",
  addressLine2: "New York, NY 10029",
  phoneDisplay: "+1 (212) 814-4882",
  phoneE164: "+12128144882",
  hours: "Lun–Dom · 8:00 AM – 11:30 PM",
  orderUrl: "https://www.getsauce.com/order/el-tepeyac-taqueria-97-st/menu?dispatch-type=pickup",
  mapQuery: "1505 Lexington Ave, New York, NY 10029",
} as const;

export type Dish = {
  id: string;
  name: string;
  note?: string;
  accent?: "cilantro" | "salsa" | "oaxaca";
};

export const popularDishes: Dish[] = [
  { id: "guacamole", name: "Guacamole", note: "Nuestra insignia local!", accent: "cilantro" },
  { id: "tacos", name: "Tacos", note: "Clásicos, rápidos, auténticos", accent: "salsa" },
  { id: "burrito", name: "Burritos", note: "NYC's Top 5 Burritos", accent: "oaxaca" },
  { id: "enchiladas", name: "Enchiladas", note: "Como las de tu casa", accent: "salsa" },
  { id: "ceviche", name: "Ceviche", note: "Fresco y delicioso", accent: "cilantro" },
  { id: "quesadilla", name: "Quesadillas", note: "Con tortilla de Maíz azul", accent: "oaxaca" },
];

export const galleryCollections = [
  {
    slug: "gallery",
    title: "Galería",
    subtitle: "Momentos, platos y el lugar.",
    href: "/gallery",
  },
  {
    slug: "altar-dia-de-muertos",
    title: "Altar Día de Muertos",
    subtitle: "Una historia de temporada contada con color y flores.",
    href: "/gallery/altar-dia-de-muertos",
  },
  {
    slug: "catering-gallery",
    title: "Galería de catering",
    subtitle: "Eventos, montajes y platos para grupos.",
    href: "/gallery/catering-gallery",
  },
] as const;

