const starter = [
  "Custom homepage",
  "Services section",
  "About section",
  "Reviews",
  "Gallery",
  "Contact / quote form",
  "Mobile responsive",
  "Basic SEO",
  "Full launch",
];

const professional = [
  "Everything in Starter",
  "Multiple pages",
  "More advanced design",
  "Lead capture",
  "Google Maps integration",
  "More customization",
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-charcoal py-24">
      <div className="mx-auto max-w-6xl px-7">
        <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
          Pricing
        </span>
        <h2 className="mb-9 font-display text-3xl sm:text-4xl">
          Two ways to get started
        </h2>
        <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-ember/15 bg-steel p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-fog">
              Starter
            </h3>
            <p className="my-5 font-display text-5xl text-ember">$500</p>
            <ul className="mb-7">
              {starter.map((item) => (
                <li
                  key={item}
                  className="border-t border-white/5 py-2 text-sm text-cream first:border-none"
                >
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="block rounded-md border-[1.5px] border-ember py-3 text-center text-sm font-semibold text-ember transition hover:bg-ember hover:text-black"
            >
              Start Here
            </a>
          </div>

          <div className="relative rounded-xl border border-ember bg-gradient-to-b from-ember/10 to-steel p-8">
            <span className="absolute -top-3 right-6 rounded-full bg-ember px-3 py-1 text-[11px] font-bold text-black">
              Most Popular
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-fog">
              Professional
            </h3>
            <p className="my-5 font-display text-5xl text-ember">$750</p>
            <ul className="mb-7">
              {professional.map((item) => (
                <li
                  key={item}
                  className="border-t border-white/5 py-2 text-sm text-cream first:border-none"
                >
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="block rounded-md bg-ember py-3 text-center text-sm font-semibold text-black transition hover:bg-emberGlow"
            >
              Start Here
            </a>
          </div>
        </div>
        <p className="mt-6 text-sm text-fog">
          Simple structure: 50% to begin, 50% on approval before launch.
        </p>
      </div>
    </section>
  );
}
