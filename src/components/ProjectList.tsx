"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Project } from "@/data/projects";
import ProjectMockup from "@/components/ProjectMockup";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HEADER_H = 64;
const FILTER_H = 68;
const STICKY_TOP = HEADER_H + FILTER_H;

export function resetProjectCardAnimations(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>(".project-card-inner").forEach((el) => {
    gsap.set(el, { opacity: 1, scale: 1, clearProps: "transform" });
  });

  root.querySelectorAll<HTMLElement>(".project-row").forEach((row) => {
    const pieces = row.querySelectorAll<HTMLElement>(".project-reveal");
    const parallax = row.querySelector<HTMLElement>(".project-parallax");
    const rect = row.getBoundingClientRect();
    const visible = rect.top < window.innerHeight * 0.85;

    if (parallax) {
      gsap.set(parallax, { y: 0, scale: 1, clearProps: "transform" });
    }

    if (visible) {
      gsap.set(pieces, { opacity: 1, y: 0, clearProps: "transform" });
    } else {
      gsap.set(pieces, { opacity: 0, y: 24 });
    }
  });
}

interface ProjectListProps {
  projects: Project[];
  onOpenCaseStudy: (project: Project) => void;
}

export default function ProjectList({ projects, onOpenCaseStudy }: ProjectListProps) {
  const listRef = useRef<HTMLElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rows = gsap.utils.toArray<HTMLElement>(".project-row");
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      if (reducedMotion) {
        gsap.set(rows, { opacity: 1, y: 0 });
        return;
      }

      resetProjectCardAnimations(listRef.current ?? document);

      rows.forEach((row, index) => {
        const pieces = row.querySelectorAll(".project-reveal");
        const image = row.querySelector(".project-parallax");
        const rect = row.getBoundingClientRect();
        const alreadyVisible = rect.top < window.innerHeight * 0.82;

        if (!alreadyVisible) {
          gsap.fromTo(
            pieces,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.72,
              stagger: 0.09,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 82%",
                toggleActions: "play none none none",
                refreshPriority: index,
              },
            }
          );
        }

        if (image) {
          gsap.fromTo(
            image,
            { y: 28, scale: 1.04 },
            {
              y: -22,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                refreshPriority: index,
              },
            }
          );
        }

        if (isDesktop && index < rows.length - 1) {
          const cardInner = row.querySelector<HTMLElement>(".project-card-inner");
          if (cardInner) {
            gsap.fromTo(
              cardInner,
              { scale: 1, opacity: 1 },
              {
                scale: 0.93,
                opacity: 0.3,
                ease: "none",
                immediateRender: false,
                scrollTrigger: {
                  trigger: rows[index + 1],
                  start: "top bottom",
                  end: `top ${STICKY_TOP}px`,
                  scrub: true,
                  refreshPriority: index,
                },
              }
            );
          }
        }
      });
    },
    { scope: listRef, dependencies: [projects], revertOnUpdate: true }
  );

  const handlePointerEnter = contextSafe((event: React.PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;
    gsap.to(target.querySelector(".project-visual-shell"), {
      scale: 1.02,
      duration: 0.32,
      ease: "power2.out",
    });
    gsap.to(target.querySelector(".project-arrow"), {
      x: 6,
      duration: 0.28,
      ease: "power2.out",
    });
  });

  const handlePointerLeave = contextSafe((event: React.PointerEvent<HTMLElement>) => {
    const target = event.currentTarget;
    gsap.to(target.querySelector(".project-visual-shell"), {
      scale: 1,
      duration: 0.32,
      ease: "power2.out",
    });
    gsap.to(target.querySelector(".project-arrow"), {
      x: 0,
      duration: 0.28,
      ease: "power2.out",
    });
  });

  if (projects.length === 0) {
    return (
      <section
        id="work"
        className="mx-auto max-w-[1440px] px-4 py-24 sm:px-6 lg:px-8"
        aria-live="polite"
      >
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
          No projects match this filter.
        </p>
      </section>
    );
  }

  return (
    <section ref={listRef} id="work" className="relative border-b border-[var(--color-line)]">
      <div className="mx-auto max-w-[1440px]">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="project-row group cursor-pointer bg-[var(--color-bg)] lg:sticky lg:min-h-[calc(100dvh-132px)]"
            style={{ zIndex: index + 1, top: `${STICKY_TOP}px` }}
            onClick={() => onOpenCaseStudy(project)}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            tabIndex={0}
            role="button"
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpenCaseStudy(project);
              }
            }}
          >
            <div
              className="project-card-inner grid grid-cols-1 gap-0 bg-[var(--color-bg)] transition-all will-change-transform lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.65fr)] lg:overflow-hidden lg:rounded-2xl lg:border lg:border-[var(--color-line)] lg:shadow-[0_4px_40px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] lg:hover:shadow-[0_8px_50px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.05)]"
              style={{ transformOrigin: "center top" }}
            >
              <div className="project-reveal overflow-hidden p-3 sm:p-5 lg:border-r lg:border-[var(--color-line)] lg:p-8">
                <div className="project-parallax will-change-transform">
                  <ProjectMockup project={project} />
                </div>
              </div>

              <div className="project-reveal flex flex-col justify-center px-4 pb-8 pt-5 sm:px-6 sm:pb-10 sm:pt-6 lg:px-10 lg:py-10">
                <div>
                  <div className="mb-6 flex items-baseline justify-between lg:mb-8">
                    <span className="text-[1.75rem] font-extralight tracking-[-0.02em] text-[var(--color-muted)] lg:text-[2.25rem]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)]">
                      {project.year}
                    </span>
                  </div>

                  <p className="mb-6 border-b border-[var(--color-line)] pb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)] lg:mb-8 lg:pb-6">
                    {project.category}
                    <span className="mx-2 text-[var(--color-line-strong)]">/</span>
                    {project.industry}
                    <span className="mx-2 text-[var(--color-line-strong)]">/</span>
                    {project.clientType}
                  </p>

                  <h2 className="project-title mb-4 max-w-full text-[clamp(2rem,4.15vw,4.5rem)] font-black leading-[0.88] tracking-[-0.055em] text-[var(--color-ink)] lg:mb-5 [overflow-wrap:anywhere]">
                    {project.title}
                  </h2>
                  <p className="mb-5 text-[15px] leading-[1.6] text-[var(--color-muted-strong)] lg:text-base lg:leading-[1.65]">
                    {project.description}
                  </p>
                  <p className="mb-7 border-l-2 border-[var(--color-ink)]/10 pl-4 text-sm leading-[1.6] text-[var(--color-muted)] lg:mb-8">
                    {project.outcome}
                  </p>

                  <div className="mb-8 flex flex-wrap gap-1.5 lg:mb-10">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[var(--color-surface)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-muted-strong)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="relative inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-ink)]">
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[var(--color-ink)] after:transition-all after:duration-300 group-hover:after:w-full">
                      View case study
                    </span>
                    <span className="project-arrow inline-block transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
