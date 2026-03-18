"use client";

import Image, { type ImageProps } from "next/image";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";

type ParallaxImage = Pick<
  ImageProps,
  "src" | "alt" | "priority" | "quality" | "sizes" | "placeholder" | "blurDataURL"
>;

export function ParallaxSection({
  image,
  className = "",
  imageClassName = "",
  strength = 22,
  overlay,
  children,
}: PropsWithChildren<{
  image: ParallaxImage;
  className?: string;
  imageClassName?: string;
  strength?: number;
  overlay?: React.ReactNode;
}>) {
  const rootRef = useRef<HTMLElement | null>(null);
  const frame = useRef<number | null>(null);
  const [y, setY] = useState(0);

  // useState + useEffect evita hydration mismatch (server siempre false, cliente lo actualiza)
  const [shouldAnimate, setShouldAnimate] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    const small = window.matchMedia?.("(max-width: 860px)")?.matches ?? false;
    setShouldAnimate(!reduce && !coarse && !small);
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return;
    const el = rootRef.current;
    if (!el) return;

    const tick = () => {
      frame.current = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const mid = rect.top + rect.height / 2;
      const t = (mid - vh / 2) / (vh / 2);
      const next = Math.max(-strength, Math.min(strength, -t * strength));
      setY(next);
    };

    const onScroll = () => {
      if (frame.current != null) return;
      frame.current = window.requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current != null) window.cancelAnimationFrame(frame.current);
    };
  }, [shouldAnimate, strength]);

  return (
    <section ref={rootRef} className={`relative w-full overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <div
          className="absolute inset-[-0.025%] will-change-transform"
          style={{
            transform: shouldAnimate
              ? `translate3d(0, ${y}px, 0)`
              : "translate3d(0, 0, 0)",
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={image.priority}
            quality={image.quality}
            sizes={image.sizes ?? "100vw"}
            placeholder={image.placeholder}
            blurDataURL={image.blurDataURL}
            className={`object-cover ${imageClassName}`}
          />
        </div>
        {overlay ? <div className="absolute inset-0">{overlay}</div> : null}
      </div>

      <div className="relative h-full">{children}</div>
    </section>
  );
}

