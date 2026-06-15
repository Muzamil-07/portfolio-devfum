"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface FooterProps {
  onOpenContact: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      gsap.fromTo(
        ".footer-reveal",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[var(--color-dark)] text-[var(--color-dark-text)]"
    >
      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
        <div>
          <p className="footer-reveal mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/42">
            Devfum portfolio
          </p>
          <h2 className="footer-reveal max-w-[780px] text-[clamp(3rem,8vw,8rem)] font-black leading-[0.86] tracking-[-0.06em]">
            Turn the idea into something real.
          </h2>
        </div>

        <div className="footer-reveal flex flex-col justify-between gap-10 border-t border-white/12 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div>
            <p className="mb-4 max-w-[420px] text-base leading-[1.6] text-white/62">
              Devfum helps teams move from rough concept to working product proof across AI, automation, XR, and cloud. Built fast enough to test, and clear enough to decide what comes next.
            </p>
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex min-h-12 items-center rounded-full border border-white/18 px-5 text-sm font-semibold text-white transition-all hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)] hover:border-[var(--color-accent)]"
            >
              Start your project
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 font-mono text-[11px] uppercase tracking-[0.16em] text-white/54">
            <div className="space-y-3">
              <a className="block transition-colors hover:text-white" href="#work">
                Work
              </a>
              <button
                type="button"
                onClick={onOpenContact}
                className="block text-left uppercase tracking-[0.16em] transition-colors hover:text-white"
              >
                Contact
              </button>
            </div>
            <div className="space-y-3">
              <a className="block transition-colors hover:text-white" href="mailto:contact@devfum.com">
                contact@devfum.com
              </a>
              <a
                className="block transition-colors hover:text-white"
                href="https://pk.linkedin.com/company/devfum"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="footer-reveal border-t border-white/12 pt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-white/34 lg:col-span-2">
          (C) {new Date().getFullYear()} Devfum. Selected work, built for client review.
        </div>
      </div>
    </footer>
  );
}
