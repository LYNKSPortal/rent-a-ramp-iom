"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.revealState = "visible";
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    for (const element of elements) {
      if (element.getBoundingClientRect().top < window.innerHeight) continue;
      element.dataset.revealState = "pending";
      element.style.animationDelay = `${Math.min(Number(element.dataset.revealDelay) || 0, 240)}ms`;
      observer.observe(element);
    }
    function showAll() {
      if (!preference.matches) return;
      observer.disconnect();
      for (const element of elements) delete element.dataset.revealState;
    }
    preference.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", showAll);
      for (const element of elements) {
        delete element.dataset.revealState;
        element.style.removeProperty("animation-delay");
      }
    };
  }, []);
  return null;
}
