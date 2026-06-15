"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CTAProps {
  onOpenContact: () => void;
}

export default function CTA({ onOpenContact }: CTAProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".cta-heading",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      ).fromTo(
        ".cta-button",
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 },
        "-=0.4"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 bg-white text-center"
    >
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="cta-heading text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-10">
          Have a similar project?
          <br />
          Let&apos;s discuss.
        </h2>
        <button
          onClick={onOpenContact}
          className="cta-button inline-flex items-center px-8 py-4 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-all hover:scale-105"
        >
          Contact DevFum
        </button>
      </div>
    </section>
  );
}
