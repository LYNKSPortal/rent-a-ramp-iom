"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { track } from "@vercel/analytics";

export default function ConversionAnalytics() {
  useEffect(() => {
    function click(event: MouseEvent) {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      const url = new URL(link.href, window.location.origin);
      if (url.hostname === "wa.me") track("whatsapp_click", { page: window.location.pathname });
      else if (url.protocol === "mailto:") track("email_click", { page: window.location.pathname });
      else if (url.origin === window.location.origin && url.pathname === "/booking") track("booking_cta_click", { page: window.location.pathname });
    }
    function submitted() { track("booking_request_submitted"); }
    document.addEventListener("click", click);
    window.addEventListener("booking-request-submitted", submitted);
    return () => {
      document.removeEventListener("click", click);
      window.removeEventListener("booking-request-submitted", submitted);
    };
  }, []);
  return <Analytics beforeSend={(event) => ({ ...event, url: event.url.split("?")[0].split("#")[0] })} />;
}
