"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const features = [
  {
    icon: "◈",
    title: "CAD Geometry Upload",
    description:
      "Seamless support for various 3D file formats with automated surface area and volume calculation.",
  },
  {
    icon: "◎",
    title: "Real-time 3D Viewer",
    description:
      "Interactive WebGL viewer to inspect parts and identify potential fit-test issues instantly.",
  },
  {
    icon: "◆",
    title: "Smart Pricing Engine",
    description:
      "Dynamic algorithm factoring in material type, infill density, and support structure complexity.",
  },
];

const techStack = ["THREE.JS", "NODE.JS", "REACT", "TYPESCRIPT", "AWS S3"];

export default function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" },
      });

      tl.from(".cs-label", { y: 20, opacity: 0, duration: 0.5 })
        .from(".cs-title", { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".cs-desc", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(
          ".cs-feature",
          { x: -30, opacity: 0, duration: 0.5, stagger: 0.15 },
          "-=0.2"
        )
        .from(
          ".cs-image",
          { scale: 0.95, opacity: 0, duration: 0.8 },
          "-=0.8"
        )
        .from(
          ".cs-testimonial",
          { y: 30, opacity: 0, duration: 0.6 },
          "-=0.4"
        )
        .from(
          ".cs-tech-tag",
          { y: 10, opacity: 0, duration: 0.4, stagger: 0.08 },
          "-=0.3"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="work" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-400">
            More Projects
          </h2>
          <a
            href="#"
            className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest"
          >
            View All Case Studies
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="cs-label text-xs font-semibold tracking-widest uppercase text-blue-600 block mb-4">
              The Solution
            </span>
            <h3 className="cs-title text-3xl font-bold tracking-tight mb-6">
              Automated CAD Portal
            </h3>
            <p className="cs-desc text-gray-500 leading-relaxed mb-10">
              We engineered an automated CAD portal that provides instant
              pricing based on geometry analysis. The system allows users to
              upload STL/STEP files and receive real-time structural feedback
              and cost estimation.
            </p>

            <div className="space-y-6 mb-10">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                Key Features
              </h4>
              {features.map((f) => (
                <div key={f.title} className="cs-feature flex gap-4">
                  <span className="text-blue-600 text-lg mt-0.5 flex-shrink-0">
                    {f.icon}
                  </span>
                  <div>
                    <h5 className="text-sm font-semibold mb-1">{f.title}</h5>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="cs-tech-tag inline-block px-3 py-1.5 border border-gray-200 rounded text-xs font-mono tracking-wide text-gray-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="cs-image rounded-xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 aspect-video flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-white/40 backdrop-blur-sm" />
            </div>
            <div className="cs-image grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 aspect-square flex items-center justify-center">
                <div className="w-16 h-16 border border-white/20 rounded-lg rotate-12" />
              </div>
              <div className="rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 aspect-square flex items-center justify-center">
                <div className="w-20 h-20 border border-white/10 rounded-full" />
              </div>
            </div>

            <blockquote className="cs-testimonial bg-[#0a0a0a] rounded-xl p-8 text-white">
              <p className="text-lg font-medium leading-relaxed mb-4 italic">
                &ldquo;DevFum transformed our workflow from a manual bottleneck
                into a seamless, digital ecosystem. Our quote turnaround is now{" "}
                <span className="text-blue-400 font-bold not-italic">
                  instant.
                </span>
                &rdquo;
              </p>
              <cite className="text-sm text-gray-400 not-italic">
                — Marco Schmidt, CTO at Bridge3D
              </cite>
            </blockquote>
          </div>
        </div>
      </div>

      <div className="dot-grid h-16 mt-16" />
    </section>
  );
}
