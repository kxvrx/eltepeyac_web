import { restaurant } from "@/lib/restaurant";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-charcoal text-bone">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-lg font-semibold tracking-tight">{restaurant.name}</div>
            <p className="mt-3 max-w-sm text-sm text-bone/75">
              Food tastes better when it’s shared. Family recipes, made fresh — fast, warm,
              and authentic.
            </p>
            <p className="mt-6 text-xs font-mono tracking-[0.2em] text-bone/60">
              AUTHENTIC · EAST HARLEM · NYC
            </p>
          </div>

          <div>
            <div className="text-xs font-mono tracking-[0.2em] text-bone/60">HOURS</div>
            <div className="mt-2 text-sm text-bone/80">{restaurant.hours}</div>

            <div className="mt-7 text-xs font-mono tracking-[0.2em] text-bone/60">
              LOCATION
            </div>
            <a
              className="mt-2 inline-block text-sm text-bone/80 underline underline-offset-4 decoration-bone/30 hover:decoration-bone/70"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                restaurant.mapQuery
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {restaurant.addressLine1}
              <br />
              {restaurant.addressLine2}
            </a>
          </div>

          <div>
            <div className="text-xs font-mono tracking-[0.2em] text-bone/60">CONTACT</div>
            <div className="mt-2 grid gap-2 text-sm">
              <a
                className="text-bone/80 underline underline-offset-4 decoration-bone/30 hover:decoration-bone/70"
                href={`tel:${restaurant.phoneE164}`}
              >
                {restaurant.phoneDisplay}
              </a>
              <Link
                href="/contact"
                className="text-bone/80 underline underline-offset-4 decoration-bone/30 hover:decoration-bone/70"
              >
                Contact page
              </Link>
              <Link
                href="/gallery"
                className="text-bone/80 underline underline-offset-4 decoration-bone/30 hover:decoration-bone/70"
              >
                Gallery
              </Link>
            </div>

            <div className="mt-7 rounded-2xl bg-bone/5 p-4">
              <div className="text-xs font-mono tracking-[0.2em] text-bone/60">
                ORDER ONLINE
              </div>
              <a
                href={restaurant.orderUrl}
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-salsa px-4 py-2 text-sm font-semibold text-bone hover:brightness-[0.97]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Order Now <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-bone/10 pt-6 text-xs text-bone/55 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} {restaurant.name}. All rights reserved.</div>
          <div className="font-mono tracking-[0.18em]">MADE WITH CILANTRO & CARE</div>
        </div>
      </Container>
    </footer>
  );
}

