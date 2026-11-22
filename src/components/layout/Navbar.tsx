"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { CONTACT } from "@/lib/site-config";
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

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-4"
              aria-label={`Contact us on WhatsApp at ${CONTACT.whatsapp}`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0" aria-hidden="true">
                <path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.47 0 .11 5.35.1 11.93c0 2.1.55 4.16 1.6 5.98L0 24l6.24-1.64a11.94 11.94 0 0 0 5.8 1.48h.01c6.58 0 11.94-5.35 11.95-11.93a11.88 11.88 0 0 0-3.48-8.43ZM12.05 21.83a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.7.97.99-3.61-.24-.37a9.9 9.9 0 0 1-1.52-5.3c0-5.46 4.45-9.9 9.91-9.9a9.84 9.84 0 0 1 7 2.9 9.84 9.84 0 0 1 2.9 7c0 5.46-4.45 9.9-9.93 9.9Zm5.44-7.41c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
              </svg>
              {CONTACT.whatsapp}
            </a>
            <Button href="/booking" size="md">
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
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
