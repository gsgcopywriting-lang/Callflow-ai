export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ember/15 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-7 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-xl tracking-wide">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-cream">
            <path
              d="M3 21L11 13M11 13L14 10L21 3L19 8L21 10L14 17L11 13Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          TRADE<span className="text-ember">FORGE</span>
        </a>
        <nav className="ml-auto hidden gap-7 text-sm font-medium md:flex">
          <a href="#what" className="opacity-80 hover:text-ember hover:opacity-100">
            What We Do
          </a>
          <a href="#work" className="opacity-80 hover:text-ember hover:opacity-100">
            Our Work
          </a>
          <a href="#pricing" className="opacity-80 hover:text-ember hover:opacity-100">
            Pricing
          </a>
          <a href="#contact" className="opacity-80 hover:text-ember hover:opacity-100">
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="flex-shrink-0 rounded-md bg-ember px-4 py-2.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-emberGlow"
        >
          Free Website Preview
        </a>
      </div>
    </header>
  );
}
