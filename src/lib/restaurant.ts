export const restaurant = {
  name: "El Tepeyac Taqueria",
  taglineEN: "Authentic and traditional Mexican cuisine",
  taglineES: "Cocina mexicana auténtica y tradicional",
  addressLine1: "1505 Lexington Ave",
  addressLine2: "New York, NY 10029",
  phoneDisplay: "+1 (212) 814-4882",
  phoneE164: "+12128144882",
  hours: "Mon–Sun · 8:00 AM – 11:00 PM",
  orderUrl: "https://getsauce.com/",
  mapQuery: "1505 Lexington Ave, New York, NY 10029",
} as const;

export type Dish = {
  id: string;
  name: string;
  note?: string;
  accent?: "cilantro" | "salsa" | "oaxaca";
};

export const popularDishes: Dish[] = [
  { id: "guacamole", name: "Guacamole", note: "Fresh · Famous signature", accent: "cilantro" },
  { id: "tacos", name: "Tacos", note: "Classic · Fast · Satisfying", accent: "salsa" },
  { id: "burrito", name: "Burritos", note: "Big · Comforting", accent: "oaxaca" },
  { id: "enchiladas", name: "Enchiladas", note: "Traditional · Saucy", accent: "salsa" },
  { id: "ceviche", name: "Ceviche", note: "Bright · Fresh", accent: "cilantro" },
  { id: "quesadilla", name: "Quesadillas", note: "Blue corn moments", accent: "oaxaca" },
];

export const galleryCollections = [
  {
    slug: "gallery",
    title: "Gallery",
    subtitle: "Moments, plates, and the room.",
    href: "/gallery",
  },
  {
    slug: "altar-dia-de-muertos",
    title: "Altar Día de Muertos",
    subtitle: "A seasonal story told in color and flowers.",
    href: "/gallery/altar-dia-de-muertos",
  },
  {
    slug: "catering-gallery",
    title: "Catering Gallery",
    subtitle: "Large-format plates, events, and setups.",
    href: "/gallery/catering-gallery",
  },
] as const;

