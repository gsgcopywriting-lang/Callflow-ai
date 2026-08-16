const points = [
  {
    icon: "⚡",
    title: "Fast to launch",
    body: "Most sites are live within a week of getting your info.",
  },
  {
    icon: "📱",
    title: "Mobile-first",
    body: "Most of your customers will find you on their phone. We design for that first.",
  },
  {
    icon: "📞",
    title: "Built to convert",
    body: "Clear calls, quote forms, and CTAs — not just a digital brochure.",
  },
];

export default function WhatWeDo() {
  return (
    <section id="what" className="bg-charcoal py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-7 md:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
            What We Do
          </span>
          <h2 className="font-display text-3xl sm:text-4xl">
            Your website should bring in calls, not just exist.
          </h2>
          <p className="mt-4 max-w-[52ch] text-[15px] text-fog">
            Most trades websites look like they were built in 2012 and never
            touched again — slow, hard to read on a phone, and missing the
            one thing that matters: a clear way for someone to ask for a
            quote.
          </p>
          <p className="mt-4 max-w-[52ch] text-[15px] text-fog">
            We fix that. Every site we build is fast, mobile-first, and
            structured around getting the visitor to call or request a quote
            — because that&apos;s the only metric that actually pays your
            bills.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {points.map((p) => (
            <div key={p.title} className="flex gap-4">
              <span className="flex-shrink-0 text-2xl">{p.icon}</span>
              <div>
                <h3 className="font-body text-[15px] font-semibold">
                  {p.title}
                </h3>
                <p className="mt-1 text-[13px] text-fog">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
