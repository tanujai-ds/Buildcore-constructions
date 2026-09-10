import { useState } from "react";
import { Page, Project } from "../../types";
import { projectsData } from "../../data/siteData";
import { PageHero } from "../../components/ui/PageHero";
import { ProjectCard } from "../../components/ui/ProjectCard";
import { Reveal } from "../../components/animations/Reveal";
import { Button } from "../../components/ui/Button";

interface ProjectsListProps {
  initialFilter?: "all" | "residential" | "commercial";
  onNavigate: (p: Page) => void;
}

export function ProjectsList({ initialFilter = "all", onNavigate }: ProjectsListProps) {
  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);

  const filters = [
    { key: "all", label: "ALL BUILDS", count: projectsData.length },
    {
      key: "residential",
      label: "RESIDENTIAL",
      count: projectsData.filter((p) => p.category === "residential").length,
    },
    {
      key: "commercial",
      label: "COMMERCIAL & PRECINCTS",
      count: projectsData.filter((p) => p.category === "commercial").length,
    },
  ];

  const filteredProjects: Project[] =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <div className="bg-white text-[#1A1A1A]">
      <PageHero
        label="PROJECTS / PORTFOLIO"
        title="OUR DELIVERED WORK"
        subtitle="A selective catalog of landmark commercial towers, multi-residential precincts, and bespoke architectural homes delivered across Australia."
        image="https://images.unsplash.com/photo-1576731753569-3e93a228048c?w=1920&h=700&fit=crop&auto=format"
      />

      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Architectural Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12 pb-6 border-b border-[#E5E5E5]">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => {
                const isActive = activeFilter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    className={`px-5 py-2.5 text-xs tracking-[0.14em] font-semibold uppercase transition-all duration-200 flex items-center gap-2.5 cursor-pointer rounded-xs ${
                      isActive
                        ? "bg-[#D4913A] text-white shadow-xs"
                        : "bg-[#FBFBFA] text-[#525252] hover:text-[#111111] hover:bg-[#F5F5F4] border border-[#E5E5E5]"
                    }`}
                  >
                    <span>{f.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 font-bold rounded-xs ${
                        isActive ? "bg-white text-[#D4913A]" : "bg-[#E5E5E5] text-[#525252]"
                      }`}
                    >
                      {f.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-[#737373] font-medium tracking-wide">
              SHOWING {filteredProjects.length} OF {projectsData.length} TOTAL CONTRACTS
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <Reveal key={project.id} direction="up" delay={idx * 70}>
                <ProjectCard
                  project={project}
                  index={idx}
                  onClick={() => onNavigate("projects-detail")}
                />
              </Reveal>
            ))}
          </div>

          {/* Bottom Consultation CTA */}
          <div className="mt-24 p-12 bg-[#FBFBFA] border border-[#E5E5E5] text-center max-w-3xl mx-auto rounded-xs shadow-xs">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] uppercase mb-4">
              PLANNING A NEW DEVELOPMENT?
            </h3>
            <p className="text-sm text-[#525252] leading-relaxed mb-8 max-w-lg mx-auto font-normal">
              Our pre-construction estimating team can review your preliminary drawings and provide an early buildability and cost plan.
            </p>
            <Button
              size="lg"
              variant="primary"
              onClick={() => onNavigate("contact-project")}
            >
              DISCUSS YOUR PLANS
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
