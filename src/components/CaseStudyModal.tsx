"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Project } from "@/data/projects";
import ProjectMockup from "@/components/ProjectMockup";

gsap.registerPlugin(useGSAP);

interface CaseStudyModalProps {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export default function CaseStudyModal({
  project,
  projects,
  onClose,
  onSelectProject,
}: CaseStudyModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const closeModalRef = useRef<() => void>(() => {});

  useGSAP(
    (_context, contextSafe) => {
      const safe = contextSafe ?? ((fn: () => void) => fn);

      closeModalRef.current = safe(() => {
        if (!overlayRef.current || !panelRef.current) {
          onClose();
          return;
        }

        gsap
          .timeline({
            defaults: { ease: "power3.inOut" },
            onComplete: () => {
              onClose();
              document.body.style.overflow = "";
              previouslyFocused.current?.focus();
            },
          })
          .to(panelRef.current, { opacity: 0, y: 24, scale: 0.98, duration: 0.28 })
          .to(overlayRef.current, { opacity: 0, duration: 0.22 }, "<0.04");
      });
    },
    { scope: overlayRef, dependencies: [onClose], revertOnUpdate: true }
  );

  const closeModal = useCallback(() => {
    closeModalRef.current();
  }, []);

  useEffect(() => {
    if (!project || !overlayRef.current || !panelRef.current) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const focusTarget = panelRef.current.querySelector<HTMLButtonElement>("[data-modal-close]");

    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(panelRef.current, { opacity: 0, y: reducedMotion ? 0 : 32, scale: reducedMotion ? 1 : 0.96 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => focusTarget?.focus(),
    });

    tl.to(overlayRef.current, { opacity: 1, duration: reducedMotion ? 0.01 : 0.28 })
      .to(
        panelRef.current,
        { opacity: 1, y: 0, scale: 1, duration: reducedMotion ? 0.01 : 0.44 },
        "-=0.12"
      )
      .fromTo(
        ".modal-reveal",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: reducedMotion ? 0.01 : 0.44, stagger: 0.06 },
        "-=0.18"
      );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeModal, project]);

  if (!project) return null;

  const relatedProjects = project.relatedIds
    .map((id) => projects.find((item) => item.id === id))
    .filter((item): item is Project => Boolean(item));

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/62 p-2 opacity-0 backdrop-blur-sm sm:p-4"
      onClick={(event) => {
        if (event.target === overlayRef.current) closeModal();
      }}
      role="presentation"
    >
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        className="max-h-[96vh] w-full max-w-[1360px] overflow-hidden rounded-[22px] border border-[var(--color-line-strong)] bg-[var(--color-bg)] text-[var(--color-ink)] shadow-[0_32px_120px_rgba(0,0,0,0.32)]"
      >
        <div ref={scrollContainerRef} className="flex h-[96vh] flex-col overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-bg)]/95 px-4 py-3 backdrop-blur-xl sm:px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Case study preview
            </p>
            <button
              type="button"
              data-modal-close
              onClick={closeModal}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-line-strong)] font-mono text-xs text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface)]"
              aria-label="Close project modal"
            >
              X
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
            <div className="min-w-0 border-b border-[var(--color-line)] p-4 sm:p-6 xl:border-b-0 xl:border-r xl:p-8">
              <div className="modal-reveal lg:sticky lg:top-24">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  {project.category} / {project.year}
                </p>
                <h2
                  id="case-study-title"
                  className="project-title mb-6 max-w-full text-[clamp(2rem,5.5vw,5.5rem)] font-black leading-[0.88] tracking-[-0.06em] [overflow-wrap:anywhere]"
                >
                  {project.title}
                </h2>
                <p className="mb-8 max-w-[640px] text-lg leading-[1.5] text-[var(--color-muted-strong)]">
                  {project.description}
                </p>

                <div className="grid grid-cols-2 gap-4 border-y border-[var(--color-line)] py-5">
                  <Meta label="Industry" value={project.industry} />
                  <Meta label="Client" value={project.clientType} />
                  <Meta label="Year" value={project.year} />
                  <Meta label="Stack" value={project.techStack.slice(0, 3).join(" / ")} />
                </div>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-reveal mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink)] transition-all hover:border-[var(--color-ink)] hover:bg-[var(--color-surface)]"
                  >
                    Visit live site
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </div>
            </div>

            <div className="min-w-0 p-4 sm:p-6 xl:p-8">
              <div className="modal-reveal mb-8">
                <ProjectMockup project={project} />
              </div>

              <div className="grid gap-3">
                {project.results.map((result) => (
                  <div
                    key={result}
                    className="modal-reveal min-w-0 rounded-[14px] border border-[var(--color-line)] bg-[var(--color-card)] p-4"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                      Result
                    </p>
                    <p className="mt-3 text-sm font-semibold leading-snug break-words">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid border-t border-[var(--color-line)] lg:grid-cols-3">
            <Section title="Overview" body={project.caseStudy.overview} />
            <Section title="Challenge" body={project.challenge} />
            <Section title="Solution" body={project.solution} />
          </div>

          <div className="border-t border-[var(--color-line)] p-4 sm:p-6 lg:p-8">
            <div className="modal-reveal mb-5 flex items-end justify-between gap-6">
              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  More screens
                </p>
                <h3 className="text-3xl font-black tracking-[-0.04em]">Product states</h3>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {project.gallery.length > 0
                ? project.gallery.map((src, index) => (
                    <div key={src} className="modal-reveal">
                      <div className="relative aspect-[16/11] overflow-hidden rounded-[18px] bg-[var(--color-surface)]">
                        <Image
                          src={src}
                          alt={`${project.title} product state ${index + 1}`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                  ))
                : [0, 1, 2].map((item) => (
                    <div key={item} className="modal-reveal">
                      <ProjectMockup project={project} compact />
                    </div>
                  ))}
            </div>
          </div>

          {relatedProjects.length > 0 && (
            <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)] p-4 sm:p-6 lg:p-8">
              <p className="modal-reveal mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                Related projects
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {relatedProjects.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectProject(item)}
                    className="modal-reveal group rounded-[14px] border border-[var(--color-line)] bg-[var(--color-card)] p-4 text-left transition-colors hover:border-[var(--color-ink)]"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                      {item.category} / {item.year}
                    </span>
                    <span className="mt-5 block text-xl font-black tracking-[-0.035em]">
                      {item.title}
                    </span>
                    <span className="mt-3 block text-sm text-[var(--color-muted-strong)]">
                      {item.outcome}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--color-muted)]">
        {label}
      </p>
      <p className="text-sm font-semibold leading-snug">{value}</p>
    </div>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section className="modal-reveal border-b border-[var(--color-line)] p-4 sm:p-6 lg:border-b-0 lg:border-r lg:p-8 last:lg:border-r-0">
      <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {title}
      </p>
      <p className="text-base leading-[1.7] text-[var(--color-muted-strong)]">{body}</p>
    </section>
  );
}
