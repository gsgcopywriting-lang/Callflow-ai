"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, PhoneCall } from "lucide-react";
import Button from "@/components/ui/Button";

const links = [
  { href: "/demo", label: "AI Demo" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-void/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-signal text-void">
            <PhoneCall size={16} strokeWidth={2.5} />
          </span>
          CallFlow AI
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring rounded text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button href="/demo" variant="secondary">
            Try the demo
          </Button>
          <Button href="/contact">Book free demo</Button>
        </div>

        <button
          className="focus-ring rounded p-2 text-ink md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border-subtle bg-void md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-ink-muted transition-colors hover:bg-surface hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button href="/demo" variant="secondary" className="w-full">
                Try the demo
              </Button>
              <Button href="/contact" className="w-full">
                Book free demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
