const projects = [
  {
    name: "Summit Roofing Co.",
    tag: "Modern & Trustworthy",
    desc: "Clean, professional, built for a general residential/commercial roofing company.",
    gradient: "from-[#1a2f42] to-[#0c1824]",
  },
  {
    name: "RapidGuard Roofing",
    tag: "Emergency & Storm Response",
    desc: "Urgency-focused design with sticky call buttons for 24/7 emergency contractors.",
    gradient: "from-[#2b1414] to-[#140a0a]",
  },
  {
    name: "Crown & Slate Roofing",
    tag: "Premium & High-End",
    desc: "Quiet luxury positioning for contractors targeting high-value properties.",
    gradient: "from-[#332818] to-[#1a140c]",
  },
];

export default function Work() {
  return (
    <section id="work" className="bg-black py-24">
      <div className="mx-auto max-w-6xl px-7">
        <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
          Our Work
        </span>
        <h2 className="font-display text-3xl sm:text-4xl">
          Concept demos — built to show what&apos;s possible
        </h2>
        <p className="mt-4 mb-9 max-w-[60ch] text-[15px] text-fog">
          These are demo builds, not client sites — a look at three different
          directions a roofing company website can take.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.name}
              className="overflow-hidden rounded-xl border border-ember/10 bg-charcoal transition hover:border-ember"
            >
              <div
                className={`flex aspect-[16/10] items-end bg-gradient-to-br ${p.gradient} relative p-4`}
              >
                <span className="relative z-10 font-display text-xl tracking-wide text-white">
                  {p.name}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-[15px] font-semibold">{p.tag}</h3>
                <p className="mt-2 text-[13px] text-fog">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
