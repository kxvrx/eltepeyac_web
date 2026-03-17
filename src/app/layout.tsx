import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Sans, IBM_Plex_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const heading = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
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

export const metadata: Metadata = {
  title: {
    default: "El Tepeyac Taqueria | East Harlem, NY",
    template: "%s | El Tepeyac Taqueria",
  },
  description:
    "Authentic and traditional Mexican cuisine in East Harlem. Fresh, made-with-love favorites — famous guacamole, tacos, burritos, and more.",
  metadataBase: new URL("https://eltepeyac.example"),
  openGraph: {
    title: "El Tepeyac Taqueria",
    description:
      "Authentic and traditional Mexican cuisine in East Harlem. Order online and visit us on Lexington Ave.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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
              url: "https://eltepeyac.example",
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
