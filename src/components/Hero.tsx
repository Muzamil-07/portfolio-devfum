"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function HeroSidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".sidebar-label", { y: 20, opacity: 0, duration: 0.5 })
        .from(
          ".sidebar-heading .line",
          { y: 60, opacity: 0, duration: 0.7, stagger: 0.1 },
          "-=0.3"
        )
        .from(".sidebar-desc", { y: 15, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".sidebar-search", { y: 15, opacity: 0, duration: 0.4 }, "-=0.2")
        .from(".sidebar-filter", { y: 15, opacity: 0, duration: 0.4 }, "-=0.2")
        .from(
          ".stat-item",
          { y: 20, opacity: 0, duration: 0.4, stagger: 0.08 },
          "-=0.2"
        );
    },
    { scope: sidebarRef }
  );

  return (
    <div ref={sidebarRef} className="sticky top-20">
      <p className="sidebar-label text-xs font-semibold tracking-widest text-blue-600 uppercase mb-5 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
        AI + XR Studio
      </p>

      <h1 className="sidebar-heading text-[2.8rem] font-bold leading-[1.08] tracking-tight mb-6">
        <span className="line block">
          Thinking <span className="italic font-normal text-gray-400">that</span>
        </span>
        <span className="line block">drives impact</span>
      </h1>

      <p className="sidebar-desc text-sm text-gray-400 leading-relaxed mb-8 max-w-[280px]">
        Real projects, real challenges, and technically crafted with clarity, precision, and purpose.
      </p>

      <div className="sidebar-search relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm">
          ⌕
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

      <div className="sidebar-filter mb-10">
        <button className="w-full flex items-center justify-between px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors">
          <span className="text-gray-900 font-medium">All Categories</span>
          <span className="text-gray-400 text-xs">▼</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        <div className="stat-item">
          <p className="text-xs text-gray-400 mb-1">Brands</p>
          <p className="text-3xl font-bold tracking-tight">75</p>
        </div>
        <div className="stat-item">
          <p className="text-xs text-gray-400 mb-1">Launches</p>
          <p className="text-3xl font-bold tracking-tight">123</p>
        </div>
        <div className="stat-item">
          <p className="text-xs text-gray-400 mb-1">Users</p>
          <p className="text-3xl font-bold tracking-tight">9M+</p>
        </div>
        <div className="stat-item">
          <p className="text-xs text-gray-400 mb-1">Speed</p>
          <p className="text-3xl font-bold tracking-tight">45%</p>
        </div>
      </div>
    </div>
  );
}
