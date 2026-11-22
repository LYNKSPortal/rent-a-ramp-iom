"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import MobileMenu from "@/components/layout/MobileMenu";
import { NAV_LINKS } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-shadow duration-300",
        scrolled && "shadow-lg shadow-black/10"
      )}
    >
      <div className="border-b border-grey-200 bg-white">
        <Container className="flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="shrink-0" onClick={() => setMenuOpen(false)}>
            <Logo />
            <span className="sr-only">Rent a Ramp — Home</span>
          </Link>

          <div className="hidden lg:block">
            <Button href="/booking" size="md">
              Book a Ramp
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </Container>
      </div>

      <div className="hidden border-b border-white/20 bg-ink lg:block">
        <Container>
          <nav aria-label="Primary" className="flex h-12 items-center justify-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wide text-white/80 transition-colors hover:text-orange"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
