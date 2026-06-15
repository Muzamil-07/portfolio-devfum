"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const footerLinks = [
  { label: "Work", href: "#work", external: false },
  { label: "contact@devfum.com", href: "mailto:contact@devfum.com", external: true },
  { label: "LinkedIn", href: "https://pk.linkedin.com/company/devfum", external: true },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      gsap.fromTo(
        ".footer-reveal",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: footerRef }
  );

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)]"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden sm:block"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to right, var(--color-line) 1px, transparent 1px) 50% 0 / min(100%, 1440px) 100% no-repeat",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:px-6 sm:pb-0 lg:px-8">
        <nav
          className="footer-reveal flex flex-col divide-y divide-[var(--color-line)] border-b border-[var(--color-line)] sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          aria-label="Footer"
        >
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex min-h-12 items-center py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)] sm:min-h-14 sm:px-3 sm:tracking-[0.16em]"
              {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-reveal flex items-start justify-between gap-6 py-7 sm:items-center sm:py-6">
          <p className="min-w-0 max-w-[22rem] font-mono text-[10px] leading-[1.65] uppercase tracking-[0.14em] text-[var(--color-muted)] sm:max-w-none sm:tracking-[0.16em]">
            (C) {new Date().getFullYear()} Devfum. Selected work, built for client review.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex min-h-11 shrink-0 items-center font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)] sm:tracking-[0.16em]"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
