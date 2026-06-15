"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectCarousel from "./ProjectCarousel";
import { aiProjects, Project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AISolutionsProps {
  onOpenCaseStudy: (project: Project) => void;
}

export default function AISolutions({ onOpenCaseStudy }: AISolutionsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".ai-heading", {
        scrollTrigger: {
          trigger: ".ai-heading",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      gsap.from(".ai-underline", {
        scrollTrigger: {
          trigger: ".ai-heading",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3,
      });

      gsap.from(".ai-carousel", {
        scrollTrigger: {
          trigger: ".ai-carousel",
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
    <section ref={sectionRef} id="ai" className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="ai-heading text-2xl font-bold tracking-tight">
              AI Solutions
            </h2>
            <div className="ai-underline h-0.5 w-12 bg-blue-600 mt-3" />
          </div>
          <a
            href="#"
            className="text-xs font-medium tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1"
          >
            View All <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      <div className="ai-carousel pl-4 md:pl-[max(1rem,calc((100vw-1440px)/2+1rem))]">
        <ProjectCarousel
          projects={aiProjects}
          onOpenCaseStudy={onOpenCaseStudy}
        />
      </div>
    </section>
  );
}
