"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/data/projects";

gsap.registerPlugin(useGSAP);

interface ProjectCarouselProps {
  projects: Project[];
  dark?: boolean;
  onOpenCaseStudy: (project: Project) => void;
}

export default function ProjectCarousel({
  projects,
  dark = false,
  onOpenCaseStudy,
}: ProjectCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll(".carousel-card");
    if (cards.length === 0) return;

    const singleSetWidth = Array.from(cards)
      .slice(0, projects.length)
      .reduce((sum, card) => {
        const style = getComputedStyle(card);
        const marginRight = parseFloat(style.marginRight) || 0;
        return sum + (card as HTMLElement).offsetWidth + marginRight;
      }, 0);

    tweenRef.current = gsap.to(track, {
      x: -singleSetWidth,
      duration: projects.length * 8,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => {
          return ((parseFloat(String(x)) % singleSetWidth) + singleSetWidth) % singleSetWidth * -1;
        }),
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [projects.length]);

  const handleMouseEnter = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 0, duration: 0.6 });
  };
  const handleMouseLeave = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6 });
  };

  const duplicated = [...projects, ...projects, ...projects];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className="flex will-change-transform">
        {duplicated.map((project, i) => (
          <div
            key={`${project.title}-${i}`}
            className="carousel-card flex-shrink-0 w-[380px] mr-8"
          >
            <ProjectCard
              {...project}
              dark={dark}
              onViewCaseStudy={() => onOpenCaseStudy(project)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
