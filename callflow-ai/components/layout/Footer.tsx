import Link from "next/link";
import { PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-void">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-signal text-void">
              <PhoneCall size={16} strokeWidth={2.5} />
            </span>
            CallFlow AI
          </Link>
          <p className="mt-4 max-w-xs text-sm text-ink-muted">
            AI receptionists that answer calls 24/7, qualify leads, and book
            appointments — so no customer ever hits voicemail again.
          </p>
        </div>

        <FooterColumn
          title="Product"
          links={[
            { href: "/demo", label: "AI Demo" },
            { href: "/pricing", label: "Pricing" },
          ]}
        />
        <FooterColumn
          title="Company"
          links={[{ href: "/contact", label: "Contact" }]}
        />
        <FooterColumn
          title="Get started"
          links={[
            { href: "/demo", label: "Try the AI receptionist" },
            { href: "/contact", label: "Book a free demo call" },
          ]}
        />
      </div>

      <div className="border-t border-border-subtle py-6">
        <div className="container-page flex flex-col items-center justify-between gap-3 font-mono text-xs text-ink-faint md:flex-row">
          <span>© {new Date().getFullYear()} CallFlow AI. All rights reserved.</span>
          <span>Built for businesses that don&apos;t want to miss a call again.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
        {title}
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="focus-ring rounded text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
