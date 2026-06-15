"use client";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  year: string;
  dark?: boolean;
  imageColor?: string;
  onViewCaseStudy?: () => void;
}

export default function ProjectCard({
  title,
  description,
  tags,
  year,
  dark = false,
  imageColor = "#1e293b",
  onViewCaseStudy,
}: ProjectCardProps) {
  return (
    <div
      className="project-card group cursor-pointer"
      onClick={onViewCaseStudy}
    >
      <div
        className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4"
        style={{ backgroundColor: imageColor }}
      >
        <div className="project-card-image absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-2 p-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-sm"
                  style={{
                    backgroundColor: `rgba(255,255,255,${0.05 + i * 0.03})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-3 right-3 text-xs font-mono text-white/40">
          VIEW / LAUNCHES
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span key={tag} className={`tag ${dark ? "tag-dark" : ""}`}>
            {tag}
          </span>
        ))}
      </div>

      <h3
        className={`text-lg font-semibold mb-2 ${dark ? "text-white" : "text-gray-900"}`}
      >
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed mb-3 ${dark ? "text-gray-400" : "text-gray-500"}`}
      >
        {description}
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={onViewCaseStudy}
          className={`text-xs font-medium ${dark ? "text-white" : "text-gray-900"} underline underline-offset-2 hover:opacity-70 transition-opacity`}
        >
          View Case Study
        </button>
        <span
          className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}
        >
          {year}
        </span>
      </div>
    </div>
  );
}
