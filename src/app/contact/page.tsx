import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { restaurant } from "@/lib/restaurant";
import { ExternalButtonLink } from "@/components/ui/Button";
import ContactForm from "./ui/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Hours, location, and a quick way to reach us.",
};

export default function ContactPage() {
  return (
    <div>
      {/* HERO (photo-led like the old contact page) */}
      <section className="relative h-[44vh] min-h-[360px] w-full overflow-hidden">
        <Image
          src="/old-site/images/contact/tepeyac-mayo-3.jpg"
          alt="Decor wreath"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <Container className="relative flex h-full items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Contacta con nosotros
            </h1>
            <p className="mt-3 text-sm text-white/85">Contact with us</p>
          </div>
        </Container>
      </section>

      {/* FORM + IMAGE (restaurant feel, not app cards) */}
      <section className="bg-white py-16">
        <Container>
          <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-charcoal">
                Escríbenos
              </h2>
              <div className="mt-7">
                <ContactForm />
              </div>

              <div className="mt-10 border-t border-black/10 pt-8 text-sm text-charcoal/75">
                <div className="font-semibold text-charcoal">Hours</div>
                <div className="mt-1">{restaurant.hours}</div>

                <div className="mt-6 font-semibold text-charcoal">Location</div>
                <a
                  className="mt-1 inline-block underline underline-offset-4 decoration-black/20 hover:decoration-black/40"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    restaurant.mapQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {restaurant.addressLine1}, {restaurant.addressLine2}
                </a>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    className="rounded-full bg-charcoal px-4 py-2 text-sm font-semibold text-bone"
                    href={`tel:${restaurant.phoneE164}`}
                  >
                    Call
                  </a>
                  <ExternalButtonLink href={restaurant.orderUrl} tone="salsa">
                    Order Now
                  </ExternalButtonLink>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-sm bg-neutral-100 shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/old-site/images/home/DSC00751.png"
                  alt="El Tepeyac storefront"
                  fill
                  sizes="560px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

