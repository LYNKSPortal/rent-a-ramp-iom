import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { CONTACT, OPENING_HOURS, SITE } from "@/lib/site-config";
import { NAV_LINKS } from "@/lib/nav-links";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {SITE.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">
              Opening Hours
            </h3>
            <ul className="mt-4 space-y-3">
              {OPENING_HOURS.map((row) => (
                <li key={row.label} className="text-sm text-white/75">
                  <span className="block text-white/50">{row.label}</span>
                  {row.hours}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-orange">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`} className="hover:text-orange">
                  WhatsApp: {CONTACT.whatsapp}
                </a>
              </li>
              <li className="text-white/60">
                {CONTACT.addressLines.join(", ")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50">
            <Link href="/safety" className="hover:text-orange">
              Safety Guidance
            </Link>
            <Link href="/terms" className="hover:text-orange">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
