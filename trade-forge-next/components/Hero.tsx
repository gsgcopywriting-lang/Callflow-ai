const sparks = [
  { left: "15%", delay: "0s" },
  { left: "35%", delay: "1s" },
  { left: "55%", delay: "2s" },
  { left: "75%", delay: "0.5s" },
  { left: "90%", delay: "1.7s" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0">
        {sparks.map((s, i) => (
          <span
            key={i}
            className="animate-rise absolute bottom-0 h-[3px] w-[3px] rounded-full bg-emberGlow shadow-[0_0_8px_2px_rgba(255,184,77,0.6)]"
            style={{ left: s.left, animationDelay: s.delay }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-7">
        <div className="max-w-2xl">
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
            Websites for Roofers &amp; Trades Businesses
          </span>
          <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
            We build modern websites
            <br />
            for <span className="text-ember">roofing companies.</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg text-fog">
            Fast, mobile-friendly websites designed to turn visitors into
            quote requests — not just another page that sits there looking
            pretty.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <a
              href="#contact"
              className="rounded-md bg-ember px-8 py-4 text-[15px] font-semibold text-black transition hover:-translate-y-0.5 hover:bg-emberGlow"
            >
              Get a Free Website Preview
            </a>
            <a
              href="#work"
              className="rounded-md border-[1.5px] border-cream/30 px-8 py-4 text-[15px] font-semibold text-cream transition hover:-translate-y-0.5"
            >
              See Our Work
            </a>
          </div>
          <p className="mt-4 text-sm text-fog">
            No cost, no obligation — we&apos;ll show you what your new site
            could look like before you spend a dollar.
          </p>
        </div>
      </div>
    </section>
  );
}
