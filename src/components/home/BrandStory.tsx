export function BrandStory() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-border bg-bone">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03),transparent_40%),radial-gradient(circle_at_20%_20%,rgba(31,78,168,0.10),transparent_55%),radial-gradient(circle_at_80%_75%,rgba(47,125,58,0.10),transparent_60%)]" />
      <div className="relative mx-auto max-w-3xl px-7 py-14 text-center sm:px-10">
        <div className="text-xs font-mono tracking-[0.22em] text-muted">
          OUR RESTAURANT, OUR FAMILY
        </div>
        <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-semibold leading-[1.06] tracking-tight text-charcoal sm:text-4xl">
          Food tastes better when it’s shared.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-charcoal/75">
          Our recipes have been passed down through generations. We keep it simple:
          honest ingredients, quick service, and the kind of warmth you feel even in a
          small bright room.
        </p>

        <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[0_16px_45px_rgba(0,0,0,0.06)]">
            <div className="text-xs font-mono tracking-[0.22em] text-muted">ENGLISH</div>
            <p className="mt-3 text-sm leading-6 text-charcoal/75">
              We cook the way our family taught us — for people who show up hungry and
              leave feeling taken care of.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[0_16px_45px_rgba(0,0,0,0.06)]">
            <div className="text-xs font-mono tracking-[0.22em] text-muted">ESPAÑOL</div>
            <p className="mt-3 text-sm leading-6 text-charcoal/75">
              Cocinamos como nos enseñó la familia: con sazón, cariño y rapidez — para
              que compartas un buen momento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

