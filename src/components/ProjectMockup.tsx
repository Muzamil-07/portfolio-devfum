import Image from "next/image";
import { Project, VisualKind } from "@/data/projects";

interface ProjectMockupProps {
  project: Project;
  compact?: boolean;
}

const kindLabels: Record<VisualKind, string> = {
  forecast: "Risk forecast",
  legal: "Citation graph",
  vision: "Inspection lane",
  market: "Signal desk",
  graph: "Entity graph",
  spatial: "Spatial retail",
  operations: "Guided ops",
  immersive: "Training sim",
  construction: "Construction docs",
  health: "Clinical workflow",
  finance: "Market desk",
  compliance: "Compliance docs",
  commerce: "Commerce search",
  assistant: "AI assistant",
  manufacturing: "3D manufacturing",
  packaging: "Packaging view",
  configurator: "3D configurator",
  apparel: "Apparel design",
  analytics: "Analytics desk",
};

export default function ProjectMockup({ project, compact = false }: ProjectMockupProps) {
  if (project.thumbnail) {
    if (compact) {
      return (
        <div className="project-visual-shell relative aspect-[16/11] overflow-hidden rounded-[18px] bg-[var(--color-surface)]">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 33vw, 25vw"
          />
        </div>
      );
    }

    return (
      <div className="project-visual-shell relative overflow-hidden rounded-[18px] bg-[var(--color-surface)]">
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, 55vw"
          className="h-auto w-full"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    );
  }

  const { surface, ink, muted, kind } = project.visualTheme;

  return (
    <div
      className={`project-visual-shell relative overflow-hidden rounded-[18px] border border-white/10 ${compact ? "aspect-[16/11]" : "aspect-[16/10]"}`}
      style={{ backgroundColor: surface }}
    >
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
        <div className="relative h-full w-full max-w-[860px] rounded-[14px] border border-white/10 bg-[#F7F7F5] shadow-[0_28px_80px_rgba(0,0,0,0.26)]">
          <div className="flex h-9 items-center gap-2 border-b border-black/10 px-4">
            <span className="h-2 w-2 rounded-full bg-black/20" />
            <span className="h-2 w-2 rounded-full bg-black/12" />
            <span className="h-2 w-2 rounded-full bg-black/8" />
            <span className="ml-3 h-3 flex-1 rounded-full bg-black/[0.06]" />
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/35">
              {kindLabels[kind]}
            </span>
          </div>

          <div className="grid h-[calc(100%-36px)] grid-cols-[0.36fr_1fr]">
            <aside className="border-r border-black/10 bg-[#ECECEA] p-4">
              <div className="mb-5 h-6 w-20 rounded-full bg-black/80" />
              <div className="space-y-2">
                {[0, 1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-2 rounded-full bg-black/10"
                    style={{ width: `${88 - item * 9}%` }}
                  />
                ))}
              </div>
              <div className="mt-7 grid grid-cols-2 gap-2">
                {[0, 1, 2, 3].map((item) => (
                  <div key={item} className="aspect-square rounded-lg bg-black/[0.055]" />
                ))}
              </div>
            </aside>

            <main className="grid grid-rows-[auto_1fr] gap-4 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="mb-2 h-3 w-36 rounded-full bg-black/75" />
                  <div className="h-2 w-48 max-w-full rounded-full bg-black/12" />
                </div>
                <div className="rounded-full border border-black/10 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-black/45">
                  {project.year}
                </div>
              </div>

              <MockupBody kind={kind} ink={ink} muted={muted} compact={compact} />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupBody({
  kind,
  ink,
  muted,
  compact,
}: {
  kind: VisualKind;
  ink: string;
  muted: string;
  compact: boolean;
}) {
  if (kind === "vision") {
    return (
      <div className="grid grid-cols-[1fr_0.62fr] gap-3">
        <div className="relative overflow-hidden rounded-xl" style={{ backgroundColor: ink }}>
          <div className="absolute inset-x-5 top-5 h-16 rounded-lg border border-white/12" />
          <div className="absolute bottom-5 left-5 right-5 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((item) => (
              <span key={item} className="h-12 rounded-lg border border-white/10 bg-white/[0.055]" />
            ))}
          </div>
          <span className="absolute left-[36%] top-[28%] h-16 w-16 rounded-full border border-white/35" />
          <span className="absolute left-[39%] top-[33%] h-6 w-6 rounded-full bg-white/20" />
        </div>
        <MetricStack muted={muted} compact={compact} />
      </div>
    );
  }

  if (kind === "graph" || kind === "legal") {
    return (
      <div className="grid grid-cols-[1fr_0.55fr] gap-3">
        <div className="relative overflow-hidden rounded-xl" style={{ backgroundColor: ink }}>
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <span
              key={item}
              className="absolute rounded-full border border-white/20 bg-white/[0.08]"
              style={{
                height: `${28 + (item % 3) * 12}px`,
                width: `${28 + (item % 3) * 12}px`,
                left: `${16 + (item % 3) * 26}%`,
                top: `${18 + Math.floor(item / 3) * 38}%`,
              }}
            />
          ))}
          <div className="absolute inset-8 border border-white/10" />
          <div className="absolute left-1/2 top-1/2 h-px w-3/5 -translate-x-1/2 rotate-[-18deg] bg-white/18" />
          <div className="absolute left-1/2 top-1/2 h-px w-2/5 -translate-x-1/2 rotate-[24deg] bg-white/16" />
        </div>
        <MetricStack muted={muted} compact={compact} />
      </div>
    );
  }

  if (kind === "spatial" || kind === "operations" || kind === "immersive") {
    return (
      <div className="grid grid-cols-[1fr_0.55fr] gap-3">
        <div className="relative overflow-hidden rounded-xl" style={{ backgroundColor: ink }}>
          <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-white/25 bg-white/[0.045]" />
          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-white/18 bg-white/[0.08]" />
          <div className="absolute bottom-5 left-5 right-5 h-2 rounded-full bg-white/12" />
          <div className="absolute right-5 top-5 h-20 w-24 rounded-xl border border-white/14 bg-white/[0.05]" />
        </div>
        <MetricStack muted={muted} compact={compact} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[1fr_0.55fr] gap-3">
      <div className="rounded-xl p-4" style={{ backgroundColor: ink }}>
        <div className="flex h-full items-end gap-2">
          {[42, 58, 35, 74, 52, 86, 66].map((height, item) => (
            <span
              key={item}
              className="flex-1 rounded-t-md bg-white/[0.12]"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
      <MetricStack muted={muted} compact={compact} />
    </div>
  );
}

function MetricStack({ muted, compact }: { muted: string; compact: boolean }) {
  return (
    <div className="grid grid-rows-3 gap-3">
      {[0, 1, 2].map((item) => (
        <div key={item} className="rounded-xl border border-black/10 p-3" style={{ backgroundColor: muted }}>
          <div className="mb-3 h-2 w-12 rounded-full bg-black/18" />
          <div className={`${compact ? "h-7" : "h-9"} w-16 rounded bg-black/75`} />
          <div className="mt-3 h-2 w-full rounded-full bg-black/10" />
        </div>
      ))}
    </div>
  );
}
