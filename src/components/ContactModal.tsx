"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeModalRef = useRef<() => void>(() => {});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
              setSubmitted(false);
              setLoading(false);
              setError(null);
              onClose();
              document.body.style.overflow = "";
            },
          })
          .to(panelRef.current, { y: 24, opacity: 0, scale: 0.98, duration: 0.28 })
          .to(overlayRef.current, { opacity: 0, duration: 0.22 }, "<0.04");
      });
    },
    { scope: overlayRef, dependencies: [onClose], revertOnUpdate: true }
  );

  const closeModal = useCallback(() => {
    closeModalRef.current();
  }, []);

  useEffect(() => {
    if (!isOpen || !overlayRef.current || !panelRef.current) return;

    document.body.style.overflow = "hidden";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(panelRef.current, { y: reducedMotion ? 0 : 32, opacity: 0, scale: reducedMotion ? 1 : 0.96 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(overlayRef.current, { opacity: 1, duration: reducedMotion ? 0.01 : 0.28 })
      .to(
        panelRef.current,
        { y: 0, opacity: 1, scale: 1, duration: reducedMotion ? 0.01 : 0.42 },
        "-=0.12"
      )
      .fromTo(
        ".contact-reveal",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: reducedMotion ? 0.01 : 0.4, stagger: 0.055 },
        "-=0.2"
      );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeModal, isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          projectType: formData.get("projectType"),
          message: formData.get("message"),
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok) {
        setError(data.error ?? "Failed to send message. Please try again.");
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/62 p-3 opacity-0 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === overlayRef.current) closeModal();
      }}
      role="presentation"
    >
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className="w-full max-w-xl overflow-hidden rounded-[22px] border border-[var(--color-line-strong)] bg-[var(--color-bg)] text-[var(--color-ink)] shadow-[0_28px_100px_rgba(0,0,0,0.32)]"
      >
        {submitted ? (
          <div className="contact-reveal flex flex-col items-center justify-center px-6 py-16 text-center sm:px-10 sm:py-20">
            <div
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-bg)]"
              aria-hidden="true"
            >
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p id="contact-title" className="max-w-[280px] text-xl font-semibold leading-snug tracking-[-0.02em] sm:text-2xl">
              Thanks. We will review it shortly.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between border-b border-[var(--color-line)] p-5 sm:p-6">
              <div>
                <p className="contact-reveal mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  New project
                </p>
                <h2 id="contact-title" className="contact-reveal text-4xl font-black leading-[0.92] tracking-[-0.045em]">
                  Tell us what you are building.
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="contact-reveal ml-4 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-line-strong)] font-mono text-xs transition-colors hover:bg-[var(--color-surface)]"
                aria-label="Close contact modal"
              >
                X
              </button>
            </div>

            <div className="p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="contact-reveal grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" placeholder="Your name" required />
                <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
              </div>
              <div className="contact-reveal">
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  Project type
                </label>
                <select
                  name="projectType"
                  required
                  defaultValue=""
                  className="min-h-12 w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-card)] px-3 text-base outline-none transition-colors focus:border-[var(--color-ink)]"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="ai">AI</option>
                  <option value="xr">XR</option>
                  <option value="ai-consultancy">AI consultancy</option>
                  <option value="web-cloud">Web and cloud solution</option>
                </select>
              </div>
              <div className="contact-reveal">
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  Brief
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="What do you need clients, users, or stakeholders to see?"
                  className="w-full resize-none rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-card)] px-3 py-3 text-base outline-none transition-colors focus:border-[var(--color-ink)]"
                />
              </div>
              {error && (
                <p className="contact-reveal text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="contact-reveal min-h-12 w-full rounded-full bg-[var(--color-ink)] px-5 text-sm font-semibold text-[var(--color-bg)] transition-all hover:scale-[1.01] hover:bg-[var(--color-accent-strong)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {loading ? "Sending…" : "Send inquiry"}
              </button>
            </form>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="min-h-12 w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-card)] px-3 text-base outline-none transition-colors focus:border-[var(--color-ink)]"
      />
    </div>
  );
}
