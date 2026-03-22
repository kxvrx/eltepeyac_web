import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const heading = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  // Fraunces supports variable weights; keep it responsive and elegant.
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eltepeyactaqueria.com";
const ogImage = "https://res.cloudinary.com/kxvrx-cloudinary/image/upload/f_auto,q_auto,w_1200/home_DSC00751.png";

export const metadata: Metadata = {
  title: {
    default: "El Tepeyac Taqueria | East Harlem, NY",
    template: "%s | El Tepeyac Taqueria",
  },
  description:
    "Cocina mexicana auténtica y tradicional en East Harlem. Favoritos frescos hechos con cariño — guacamole famoso, tacos, burritos y más.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "El Tepeyac Taqueria",
    description:
      "Cocina mexicana auténtica y tradicional en East Harlem. Ordena en línea y visítanos en Lexington Ave.",
    type: "website",
    url: siteUrl,
    siteName: "El Tepeyac Taqueria",
    images: [{ url: ogImage, width: 1200, alt: "El Tepeyac Taqueria — East Harlem, NY" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Tepeyac Taqueria",
    description: "Cocina mexicana auténtica y tradicional en East Harlem.",
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${heading.variable} ${body.variable} ${mono.variable} antialiased`}>
        <Script
          id="restaurant-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "El Tepeyac Taqueria",
              url: siteUrl,
              telephone: "+1-212-814-4882",
              address: {
                "@type": "PostalAddress",
                streetAddress: "1505 Lexington Ave",
                addressLocality: "New York",
                addressRegion: "NY",
                postalCode: "10029",
                addressCountry: "US",
              },
              servesCuisine: ["Mexican", "Poblana"],
              priceRange: "$$",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "08:00",
                  closes: "23:00",
                },
              ],
            }),
          }}
        />
        <div className="min-h-dvh bg-bone">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
