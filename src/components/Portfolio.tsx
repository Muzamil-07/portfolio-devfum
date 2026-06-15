"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import CaseStudyModal from "@/components/CaseStudyModal";
import ContactModal from "@/components/ContactModal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProjectList, { resetProjectCardAnimations } from "@/components/ProjectList";
import { Project, ProjectCategory, projects } from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

type Filter = "All" | ProjectCategory;

const filters: Filter[] = ["All", "AI", "XR", "Web & Cloud"];

const SLUG_TO_FILTER: Record<string, Filter> = {
  ai: "AI",
  xr: "XR",
  "web-cloud": "Web & Cloud",
};

const FILTER_TO_SLUG: Record<Filter, string | null> = {
  All: null,
  AI: "ai",
  XR: "xr",
  "Web & Cloud": "web-cloud",
};

function filterFromParam(param: string | null): Filter {
  if (!param) return "All";
  return SLUG_TO_FILTER[param.toLowerCase()] ?? "All";
}

export default function Portfolio() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const workFiltersRef = useRef<HTMLDivElement>(null);
  const stickyBarRef = useRef<HTMLDivElement>(null);
  const prevFilterRef = useRef<Filter | null>(null);

  const activeFilter = filterFromParam(searchParams.get("filter"));

  const setActiveFilter = useCallback(
    (filter: Filter) => {
      const slug = FILTER_TO_SLUG[filter];
      const params = new URLSearchParams(searchParams.toString());
      if (slug) {
        params.set("filter", slug);
      } else {
        params.delete("filter");
      }
      const qs = params.toString();
      router.replace(qs ? `?${qs}` : "/", { scroll: false });
    },
    [searchParams, router]
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (prevFilterRef.current === null) {
      prevFilterRef.current = activeFilter;
      return;
    }
    if (prevFilterRef.current === activeFilter) return;
    prevFilterRef.current = activeFilter;

    const target = workFiltersRef.current;
    if (!target) return;

    const scrollTarget = { y: target, offsetY: 72 };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        gsap.set(window, { scrollTo: scrollTarget });
        resetProjectCardAnimations(document.querySelector("#work") ?? document);
        ScrollTrigger.refresh();
      });
    });
  }, [activeFilter, filteredProjects]);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set(".masthead-reveal", { opacity: 1, y: 0 });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".masthead-reveal",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.72, stagger: 0.09 }
        );

      if (workFiltersRef.current && stickyBarRef.current) {
        gsap.set(stickyBarRef.current, { yPercent: -100, opacity: 0, pointerEvents: "none" });

        ScrollTrigger.create({
          trigger: workFiltersRef.current,
          start: "bottom top+=64",
          onEnter: () => {
            gsap.to(stickyBarRef.current, {
              yPercent: 0,
              opacity: 1,
              duration: 0.35,
              ease: "power2.out",
              onStart: () => { if (stickyBarRef.current) stickyBarRef.current.style.pointerEvents = "auto"; },
            });
          },
          onLeaveBack: () => {
            gsap.to(stickyBarRef.current, {
              yPercent: -100,
              opacity: 0,
              duration: 0.25,
              ease: "power2.in",
              onComplete: () => { if (stickyBarRef.current) stickyBarRef.current.style.pointerEvents = "none"; },
            });
          },
        });
      }
    },
    { scope: pageRef }
  );

  const handleWorkClick = () => {
    const target = document.querySelector("#work-filters");
    if (!target) return;

    gsap.to(window, {
      duration: 0.9,
      scrollTo: { y: target, offsetY: 72 },
      ease: "power3.inOut",
    });
  };

  const renderFilters = () => (
    <div
      className="scrollbar-hide -mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0"
      role="tablist"
      aria-label="Project filters"
    >
      <div className="flex flex-nowrap items-center">
        {filters.map((filter, index) => {
          const active = activeFilter === filter;

          return (
            <span key={filter} className="flex shrink-0 items-center">
              {index > 0 && (
                <span className="mx-3 sm:mx-4 text-[var(--color-line-strong)]" aria-hidden="true">
                  /
                </span>
              )}
              <button
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(filter)}
                className={`py-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                  active
                    ? "text-[var(--color-ink)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                <span
                  className={`inline-block border-b pb-px transition-colors duration-200 ${
                    active
                      ? "border-[var(--color-ink)]"
                      : "border-transparent hover:border-[var(--color-line-strong)]"
                  }`}
                >
                  {filter}
                </span>
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );

  return (
    <div ref={pageRef} className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
      <Header onOpenContact={() => setContactOpen(true)} onWorkClick={handleWorkClick} />

      <main>
        <section ref={heroSectionRef} className="relative overflow-hidden border-b border-[var(--color-line)] pt-16">
          <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-4 pb-7 pt-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-10 lg:px-8 lg:pb-8 lg:pt-6">
            <div>
              <p className="masthead-reveal mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                Selected Work / {projects.length.toString().padStart(2, "0")}
              </p>
              <h1 className="masthead-reveal max-w-[720px] text-[clamp(3rem,8vw,7.8rem)] font-black leading-[0.85] tracking-[-0.055em]">
                Selected Work
              </h1>
            </div>

            <div className="masthead-reveal flex flex-col justify-end gap-6 lg:gap-7 lg:pb-0.5">
              <p className="max-w-[520px] text-balance text-lg leading-[1.6] text-[var(--color-muted-strong)] sm:text-xl sm:leading-[1.55]">
                We build working systems, not polished promises. A focused selection of AI products, automation platforms, XR experiences, fintech tools, and cloud workflows Devfum has designed, engineered, and shipped.
              </p>

              <button
                type="button"
                onClick={handleWorkClick}
                className="group inline-flex min-h-11 items-center gap-3 self-start font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-ink)]"
              >
                <span className="border-b border-[var(--color-ink)] pb-px transition-colors duration-200 group-hover:border-[var(--color-accent-strong)]">
                  Browse projects
                </span>
                <span
                  className="text-sm leading-none transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden="true"
                >
                  ↓
                </span>
              </button>
            </div>
          </div>
        </section>

        <div
          ref={workFiltersRef}
          id="work-filters"
          className="border-b border-[var(--color-line)]"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
              {filteredProjects.length.toString().padStart(2, "0")} projects
            </p>
            {renderFilters()}
          </div>
        </div>

        <div
          ref={stickyBarRef}
          className="fixed left-0 right-0 top-16 z-40 border-b border-[var(--color-line)] bg-[var(--color-bg)]/95 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
            <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)] sm:block">
              {filteredProjects.length.toString().padStart(2, "0")} shown
            </p>
            {renderFilters()}
          </div>
        </div>

        <ProjectList
          key={activeFilter}
          projects={filteredProjects}
          onOpenCaseStudy={setActiveProject}
        />
      </main>

      <Footer />
      <CaseStudyModal
        project={activeProject}
        projects={projects}
        onClose={() => setActiveProject(null)}
        onSelectProject={setActiveProject}
      />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
