"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectCarousel from "./ProjectCarousel";
import { xrProjects, Project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface XRSolutionsProps {
  onOpenCaseStudy: (project: Project) => void;
}

export default function XRSolutions({ onOpenCaseStudy }: XRSolutionsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".xr-heading", {
        scrollTrigger: {
          trigger: ".xr-heading",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      gsap.from(".xr-underline", {
        scrollTrigger: {
          trigger: ".xr-heading",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3,
      });

      gsap.from(".xr-carousel", {
        scrollTrigger: {
          trigger: ".xr-carousel",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="xr" className="py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="xr-heading text-2xl font-bold tracking-tight text-white">
              XR Solutions
            </h2>
            <div className="xr-underline h-0.5 w-12 bg-blue-600 mt-3" />
          </div>
          <a
            href="#"
            className="text-xs font-medium tracking-widest uppercase text-gray-500 hover:text-white transition-colors flex items-center gap-1"
          >
            View All <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      <div className="xr-carousel pl-4 md:pl-[max(1rem,calc((100vw-1440px)/2+1rem))]">
        <ProjectCarousel
          projects={xrProjects}
          dark
          onOpenCaseStudy={onOpenCaseStudy}
        />
      </div>

      <div className="dot-grid-dark h-16 mt-16" />
    </section>
  );
}
