# El Tepeyac Taqueria — Sitio Web

Sitio web oficial de **El Tepeyac Taqueria** (East Harlem, NYC).
Construido con Next.js 15, Tailwind CSS 4 y Cloudinary para gestión de imágenes.

---

## Tabla de contenido

1. [Stack tecnológico](#stack-tecnológico)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Configuración inicial](#configuración-inicial)
4. [Variables de entorno](#variables-de-entorno)
5. [Sistema de galerías](#sistema-de-galerías)
6. [Agregar fotos a un álbum existente](#agregar-fotos-a-un-álbum-existente)
7. [Crear un álbum nuevo completo](#crear-un-álbum-nuevo-completo)
8. [Cómo aparece el nuevo álbum en /gallery](#cómo-aparece-el-nuevo-álbum-en-gallery)
9. [Antes de publicar a producción](#antes-de-publicar-a-producción)
10. [Comandos de desarrollo](#comandos-de-desarrollo)

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| [Next.js 15](https://nextjs.org) | Framework (App Router, Server Components) |
| [React 19](https://react.dev) | UI |
| [Tailwind CSS 4](https://tailwindcss.com) | Estilos |
| [Cloudinary](https://cloudinary.com) | Almacenamiento y optimización de imágenes |
| [Resend](https://resend.com) | Envío de correos desde el formulario de contacto |
| [Fraunces + IBM Plex](https://fonts.google.com) | Tipografía (vía `next/font`) |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx              ← Layout global (header, footer, metadata, SEO)
│   ├── page.tsx                ← Página de inicio (Home)
│   ├── not-found.tsx           ← Página 404 personalizada
│   ├── error.tsx               ← Página de error personalizada
│   ├── robots.ts               ← robots.txt dinámico
│   ├── sitemap.ts              ← sitemap.xml dinámico
│   ├── contact/
│   │   ├── page.tsx            ← Página de contacto
│   │   ├── actions.ts          ← Server Action: envío de email con Resend
│   │   └── ui/
│   │       ├── ContactForm.tsx ← Formulario controlado con validación
│   │       └── SocialSection.tsx ← Embeds de Instagram y TikTok
│   └── gallery/
│       ├── page.tsx            ← /gallery — Banner de álbumes + grid de fotos
│       ├── altar-dia-de-muertos/
│       │   └── page.tsx        ← Sub-galería: Altar Día de Muertos
│       ├── catering-gallery/
│       │   └── page.tsx        ← Sub-galería: Catering
│       └── ui/
│           ├── GalleryClient.tsx   ← Banner de álbumes + lightbox galería principal
│           └── SubAlbumClient.tsx  ← Grid masonry + lightbox sub-galerías
├── components/
│   ├── site/
│   │   ├── SiteHeader.tsx      ← Navegación principal
│   │   └── SiteFooter.tsx      ← Pie de página
│   └── ui/
│       ├── Container.tsx       ← Contenedor de ancho máximo
│       ├── Button.tsx          ← Componente de botón reutilizable
│       └── ParallaxSection.tsx ← Sección con efecto parallax
└── lib/
    ├── restaurant.ts           ← Datos del restaurante (nombre, teléfono, horario, URLs)
    ├── images.ts               ← URLs centralizadas de imágenes en Cloudinary
    ├── gallery.ts              ← ⭐ Definición de álbumes (slug, prefix, título, cover)
    └── cloudinary-server.ts    ← Funciones server-only para fetchear fotos de Cloudinary
```

---

## Configuración inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear archivo de variables de entorno

Copia el archivo de ejemplo y rellena los valores:

```bash
cp .env.example .env.local
```

### 3. Correr en desarrollo

```bash
npm run dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con estas variables:

```env
# URL pública del sitio (sin slash al final)
# Cámbiala al dominio real cuando lo tengas
NEXT_PUBLIC_SITE_URL=https://tudominio.com

# Cloudinary — Dashboard → Settings → Access Keys
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Resend — Dashboard → API Keys
RESEND_API_KEY=tu_api_key_de_resend

# Email donde llegan los mensajes del formulario de contacto
CONTACT_EMAIL_TO=correo@ejemplo.com
```

> **Importante:** Nunca subas `.env.local` a git. Ya está incluido en `.gitignore`.

---

## Sistema de galerías

El sistema de galerías funciona de forma **completamente dinámica** con Cloudinary.
No es necesario tocar código para agregar fotos — solo subir imágenes con el prefijo correcto.

### ¿Cómo funciona?

```
Cloudinary                            Sitio web
─────────────────────────────────     ─────────────────────────────────
altar_01-portada.jpg             →    /gallery/altar-dia-de-muertos
altar_02-flores.jpg              →    (se carga automáticamente)
altar_03-ofrenda.jpg             →

catering_01-bandejas.jpg         →    /gallery/catering-gallery
catering_02-montaje.jpg          →    (se carga automáticamente)
```

Cada álbum tiene un `prefix` (ej. `"altar_"`). Al abrir la página, el servidor consulta Cloudinary buscando todas las imágenes cuyo nombre empieza con ese prefijo, ordenadas alfabéticamente.

### Convención de nombres en Cloudinary

```
{prefijo}{orden}-{descripcion}.{ext}

Ejemplos:
  altar_01-portada.jpg
  altar_02-flores-cempasuchil.jpg
  altar_10-ofrenda-completa.png

  catering_01-bandejas-sabor.jpg
  catering_02-montaje-evento.jpg
```

> El orden alfabético controla el orden de las fotos.
> Usar `01`, `02`... garantiza que se muestren en el orden correcto.

---

## Agregar fotos a un álbum existente

Para añadir fotos a un álbum que ya existe (ej. Altar o Catering):

### Paso 1 — Subir la imagen a Cloudinary

1. Entra a [cloudinary.com](https://cloudinary.com) → **Media Library**
2. Sube la imagen con el nombre correcto:
   - Para Altar: `altar_XX-descripcion.jpg`
   - Para Catering: `catering_XX-descripcion.jpg`
   - Para la galería principal: `home_XX-descripcion.jpg`
3. Asegúrate de que el nombre mantenga el orden numérico deseado

### Paso 2 — Listo

No se requiere ningún cambio en el código. La foto aparece automáticamente la próxima vez que el sitio se reconstruya o se haga redeploy.

---

## Crear un álbum nuevo completo

Sigue estos pasos para agregar una galería completamente nueva al sitio.

---

### Paso 1 — Subir la imagen de portada a Cloudinary

Sube una foto representativa que servirá como portada en el banner de `/gallery`.

**Nombre sugerido:** `{nuevoalbum}_cover.jpg`
**Ejemplo:** `eventos_cover.jpg`

---

### Paso 2 — Registrar la portada en `images.ts`

Abre `src/lib/images.ts` y agrega la nueva portada al final:

```typescript
// src/lib/images.ts

// ... (líneas existentes)
export const galleryAltarCover    = img("altar_oct-39.jpg",   "w_1200,f_auto,q_auto");
export const galleryCateringCover = img("catering_14.png",    "w_1200,f_auto,q_auto");

// ↓ AGREGA ESTA LÍNEA con el nombre real de tu imagen en Cloudinary
export const galleryEventosCover  = img("eventos_cover.jpg",  "w_1200,f_auto,q_auto");
```

---

### Paso 3 — Registrar el álbum en `gallery.ts`

Abre `src/lib/gallery.ts` y agrega el nuevo álbum al array `galleryAlbums`:

```typescript
// src/lib/gallery.ts

import {
  homeAbril,
  galleryAltarCover,
  galleryCateringCover,
  galleryEventosCover,   // ← importa la nueva portada
} from "@/lib/images";

export const galleryAlbums: Album[] = [
  // ... (álbumes existentes)

  // ↓ AGREGA EL NUEVO ÁLBUM AL FINAL
  {
    slug: "eventos",                                              // ID único (sin espacios ni acentos)
    prefix: "eventos_",                                           // prefijo en Cloudinary
    eyebrow: "Celebraciones especiales",                          // etiqueta pequeña sobre el título
    title: "Eventos Especiales",                                  // título del álbum
    subtitle: "Cumpleaños, celebraciones y reuniones en El Tepeyac.", // descripción corta
    href: "/gallery/eventos-especiales",                          // URL (debe coincidir con el paso 4)
    cover: galleryEventosCover,                                   // imagen de portada
  },
];
```

**Referencia de campos:**

| Campo | Descripción | Ejemplo |
|---|---|---|
| `slug` | ID único. Solo letras minúsculas y guiones | `"eventos"` |
| `prefix` | Prefijo en Cloudinary. Todas las fotos del álbum deben empezar con esto | `"eventos_"` |
| `eyebrow` | Texto pequeño que aparece sobre el título | `"Celebraciones especiales"` |
| `title` | Título principal del álbum | `"Eventos Especiales"` |
| `subtitle` | Descripción de 1-2 líneas | `"Cumpleaños y reuniones..."` |
| `href` | Ruta de la página (debe coincidir con la carpeta del paso 4) | `"/gallery/eventos-especiales"` |
| `cover` | Variable importada desde `images.ts` | `galleryEventosCover` |

---

### Paso 4 — Crear la página del álbum

Crea la carpeta y el archivo:

```
src/app/gallery/eventos-especiales/page.tsx
```

Usa este template (reemplaza `"eventos"` con tu `slug` y ajusta los textos):

```typescript
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { fetchAlbumPhotosWithMeta } from "@/lib/cloudinary-server";
import { galleryAlbums } from "@/lib/gallery";
import { SubAlbumClient } from "../ui/SubAlbumClient";

export const metadata = {
  title: "Eventos Especiales — El Tepeyac",
  description: "Cumpleaños, celebraciones y reuniones en El Tepeyac.",
};

export default async function EventosEspecialesPage() {
  const album  = galleryAlbums.find((a) => a.slug === "eventos")!;
  const photos = await fetchAlbumPhotosWithMeta(album.prefix);

  return (
    <div className="bg-[#fafaf8]">
      {/* Header */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16">
        <Container>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="font-mono text-[11px] tracking-[0.45em] uppercase text-cilantro">
                {album.eyebrow}
              </div>
              <h1 className="mt-4 text-5xl leading-[0.92] text-charcoal sm:text-6xl lg:text-7xl">
                {album.title}
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-charcoal">
                {album.subtitle}
              </p>
            </div>
            <Link
              href="/gallery"
              className="w-fit border-b border-charcoal/40 pb-0.5 text-base font-semibold text-charcoal/70 transition-colors hover:border-charcoal hover:text-charcoal"
            >
              ← Galería principal
            </Link>
          </div>
        </Container>
      </section>

      {/* Fotos */}
      {photos.length === 0 ? (
        <>
          <section className="pb-10">
            <Container>
              <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-charcoal/12 py-28 text-center">
                <p className="font-mono text-sm tracking-widest text-charcoal/35 uppercase">
                  Álbum vacío
                </p>
                <p className="font-mono text-xs text-charcoal/25">
                  Sube imágenes con el prefijo{" "}
                  <code className="rounded bg-charcoal/5 px-1.5 py-0.5">eventos_</code>{" "}
                  en Cloudinary
                </p>
              </div>
            </Container>
          </section>
          <SubAlbumClient photos={[]} albums={galleryAlbums} currentSlug={album.slug} />
        </>
      ) : (
        <>
          <div className="relative w-full" style={{ height: "clamp(380px, 58vw, 740px)" }}>
            <Image src={photos[0].src} alt={album.title} fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="pt-0.5">
            <SubAlbumClient photos={photos} albums={galleryAlbums} currentSlug={album.slug} />
          </div>
        </>
      )}
    </div>
  );
}
```

---

### Paso 5 — Agregar la ruta al sitemap

Abre `src/app/sitemap.ts` y agrega la nueva URL al array:

```typescript
{
  url: `${siteUrl}/gallery/eventos-especiales`,
  lastModified: now,
  changeFrequency: "monthly",
  priority: 0.6,
},
```

---

### Paso 6 — Subir las fotos a Cloudinary

Sube todas las fotos del álbum usando el prefijo registrado:

```
eventos_01-bienvenida.jpg
eventos_02-mesa-principal.jpg
eventos_03-pastel.jpg
...
```

**Listo.** El álbum aparece en el sitio con grid masonry, lightbox y navegación entre álbumes.

---

## Cómo aparece el nuevo álbum en /gallery

La página `/gallery` muestra un **banner con los primeros 3 álbumes** de `galleryAlbums` en un layout tipo bento:

```
┌──────────────────────┬─────────────────┐
│                      │   ÁLBUM [1]     │
│      ÁLBUM [0]       │─────────────────│
│  (galería principal) │   ÁLBUM [2]     │
│                      │                 │
└──────────────────────┴─────────────────┘
```

- **`ALBUMS[0]`** → Panel grande izquierdo (62% del ancho). Siempre es la galería principal del restaurante.
- **`ALBUMS[1]`** → Panel superior derecho.
- **`ALBUMS[2]`** → Panel inferior derecho.

Los álbumes en posición `[3]` en adelante **no aparecen en el banner principal**, pero sí aparecen en la sección **"Explorar otros álbumes"** al pie de cada sub-galería.

### Mostrar un cuarto álbum en el banner

Para añadir un cuarto panel en el banner, edita `AlbumGrid` en `src/app/gallery/ui/GalleryClient.tsx`:

```typescript
function AlbumGrid() {
  return (
    <div className="flex h-screen min-h-[600px] flex-col lg:flex-row">
      {/* Panel principal — siempre ALBUMS[0] */}
      <AlbumCard album={ALBUMS[0]} priority featured className="h-[48vh] lg:h-full lg:w-[62%] flex-shrink-0" />

      {/* Columna derecha — agrega más AlbumCard aquí */}
      <div className="flex flex-1 flex-col gap-px bg-black">
        <AlbumCard album={ALBUMS[1]} className="flex-1" />
        <AlbumCard album={ALBUMS[2]} className="flex-1" />
        <AlbumCard album={ALBUMS[3]} className="flex-1" />  {/* ← nuevo */}
      </div>
    </div>
  );
}
```

---

## Antes de publicar a producción

### 1. Actualiza el dominio real

Edita `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://tudominiofinal.com
```

Esto actualiza automáticamente los metadatos Open Graph, el JSON-LD Schema para Google, el `sitemap.xml` y el `robots.txt`.

### 2. Verifica el build sin errores

```bash
npm run build
```

### 3. Configura las variables de entorno en el servidor

En Vercel, Railway u otro proveedor: agrega las mismas variables de `.env.local` en el panel de configuración de entorno del proyecto.

---

## Comandos de desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción (después de build)
npm run start

# Verificar errores de linting
npm run lint
```

---

## Datos del restaurante

Los datos centrales (nombre, teléfono, horario, URL de pedidos en línea) están en:

```
src/lib/restaurant.ts
```

Cualquier cambio ahí se refleja automáticamente en todo el sitio: header, footer, página de contacto, schema JSON-LD, etc.

---

*Desarrollado por KXVRX Studios*
