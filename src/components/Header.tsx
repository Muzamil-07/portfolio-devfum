"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface HeaderProps {
  onOpenContact: () => void;
  onWorkClick: () => void;
}

export default function Header({ onOpenContact, onWorkClick }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      gsap.fromTo(
        ".header-item",
        { y: -14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power3.out" }
      );
    },
    { scope: headerRef }
  );

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-bg)]/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="header-item text-base font-black tracking-[-0.04em] text-[var(--color-ink)]"
          aria-label="Devfum home"
        >
          Devfum
        </Link>

        <nav className="header-item flex items-center gap-1 rounded-full border border-[var(--color-line)] bg-[var(--color-card)] p-1">
          <button
            type="button"
            onClick={onWorkClick}
            className="min-h-10 rounded-full px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted-strong)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
          >
            Work
          </button>
          <button
            type="button"
            onClick={onOpenContact}
            className="min-h-10 rounded-full bg-[var(--color-ink)] px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-bg)] transition-all hover:scale-[1.02] hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)]"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}
