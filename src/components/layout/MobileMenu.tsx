import Link from "next/link";
import Button from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/nav-links";
import { CONTACT } from "@/lib/site-config";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div id="mobile-menu" className="max-h-[calc(100dvh-4rem)] overflow-x-hidden overflow-y-auto border-t border-grey-200 bg-white lg:hidden">
      <nav aria-label="Mobile" className="flex flex-col px-5 py-6 sm:px-8">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={onClose} className="border-b border-grey-100 py-4 text-base font-medium uppercase tracking-wide text-ink-700 transition-colors hover:text-orange">
            {link.label}
          </Link>
        ))}
        <div className="mt-6 flex flex-col gap-3">
          <Button href="/booking" size="lg" onClick={onClose}>Book a Ramp</Button>
          <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`} className="py-3 text-center text-sm font-medium text-grey-600 underline underline-offset-4">Message us on WhatsApp</a>
        </div>
      </nav>
    </div>
  );
}
