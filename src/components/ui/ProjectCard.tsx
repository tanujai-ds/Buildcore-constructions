import { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index?: number;
  className?: string;
}

export function ProjectCard({ project, onClick, index, className = "" }: ProjectCardProps) {
  return (
    <article
      onClick={onClick}
      data-cursor="view"
      className={`group relative bg-white border border-[#E5E5E5] rounded-xs overflow-hidden cursor-pointer text-left transition-all duration-500 hover:border-[#D4913A] hover:shadow-lg flex flex-col justify-between ${className}`}
    >
      {/* Visual Container */}
      <div className="relative aspect-[16/11] overflow-hidden bg-[#F5F5F4]">
        <img
          src={project.heroImage}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Index badge top left */}
        {index !== undefined && (
          <div className="absolute top-4 left-4 z-10">
            <span className="text-xs font-bold tracking-wider text-[#111111] bg-white/90 backdrop-blur-sm px-2.5 py-1 border border-white/50 rounded-xs shadow-xs">
              {(index + 1).toString().padStart(2, "0")}
            </span>
          </div>
        )}

        {/* Category Pill top right */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[10px] tracking-[0.16em] font-semibold text-white bg-[#D4913A] px-3 py-1 uppercase rounded-xs shadow-xs">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content Meta */}
      <div className="p-6 relative z-10 flex flex-col justify-between flex-grow transition-transform duration-300 group-hover:-translate-y-0.5">
        <div>
          <div className="flex items-center justify-between text-xs text-[#737373] mb-2 font-medium">
            <span>{project.location}</span>
            <span>{project.year}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] group-hover:text-[#D4913A] transition-colors leading-snug mb-2">
            {project.title}
          </h3>

          <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed mb-4 font-normal">
            {project.summary}
          </p>
        </div>

        {/* Bottom Bar: Value + Arrow */}
        <div className="pt-4 border-t border-[#F0F0EF] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] tracking-[0.14em] text-[#A3A3A3] uppercase font-semibold">VALUE</span>
            <span className="text-sm font-bold text-[#D4913A]">
              {project.value}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-[#111111] group-hover:text-[#D4913A] transition-colors font-semibold">
            <span className="text-[11px] tracking-[0.14em] uppercase">VIEW</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1 text-[#D4913A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}
