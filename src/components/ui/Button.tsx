import Link from "next/link";
import type { ComponentProps, PropsWithChildren } from "react";

type Variant = "primary" | "ghost" | "outline";
type Tone = "salsa" | "cilantro" | "charcoal";

function styles(variant: Variant, tone: Tone) {
  const toneMap: Record<Tone, { solid: string; ring: string; hover: string; text: string }> = {
    salsa: {
      solid: "bg-salsa text-bone",
      ring: "ring-salsa/25",
      hover: "hover:brightness-[0.97]",
      text: "text-salsa",
    },
    cilantro: {
      solid: "bg-cilantro text-bone",
      ring: "ring-cilantro/25",
      hover: "hover:brightness-[0.97]",
      text: "text-cilantro",
    },
    charcoal: {
      solid: "bg-charcoal text-bone",
      ring: "ring-charcoal/25",
      hover: "hover:brightness-[0.98]",
      text: "text-charcoal",
    },
  };

  const t = toneMap[tone];
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-[0.02em] transition will-change-transform focus-visible:outline-none focus-visible:ring-4";

  if (variant === "primary") return `${base} ${t.solid} ${t.hover} ${t.ring}`;
  if (variant === "outline")
    return `${base} bg-transparent text-charcoal ring-1 ring-border hover:bg-black/[0.03] focus-visible:ring-charcoal/15`;
  return `${base} bg-transparent ${t.text} hover:bg-black/[0.04] focus-visible:ring-charcoal/15`;
}

export function Button({
  children,
  className = "",
  variant = "primary",
  tone = "salsa",
  ...props
}: PropsWithChildren<
  { className?: string; variant?: Variant; tone?: Tone } & ComponentProps<"button">
>) {
  return (
    <button className={`${styles(variant, tone)} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className = "",
  variant = "primary",
  tone = "salsa",
  ...props
}: PropsWithChildren<
  { className?: string; variant?: Variant; tone?: Tone } & ComponentProps<typeof Link>
>) {
  return (
    <Link className={`${styles(variant, tone)} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function ExternalButtonLink({
  children,
  className = "",
  variant = "primary",
  tone = "salsa",
  href,
  ...props
}: PropsWithChildren<{
  className?: string;
  variant?: Variant;
  tone?: Tone;
  href: string;
} & Omit<ComponentProps<"a">, "href">>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles(variant, tone)} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

