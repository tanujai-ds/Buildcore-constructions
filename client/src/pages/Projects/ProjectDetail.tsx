import { Page } from "../../types";
import { projectsData } from "../../data/siteData";
import { PageHero } from "../../components/ui/PageHero";
import { Reveal } from "../../components/animations/Reveal";
import { Button } from "../../components/ui/Button";

interface ProjectDetailProps {
  onNavigate: (p: Page) => void;
}

export function ProjectDetail({ onNavigate }: ProjectDetailProps) {
  const project = projectsData[0]; // Collins Street Tower featured

  const specs = [
    { label: "CAPITAL VALUE", value: project.value },
    { label: "PROGRAM DURATION", value: project.duration },
    { label: "GROSS FLOOR AREA", value: project.area },
    { label: "LOCATION", value: project.location },
    { label: "CLIENT / DEVELOPER", value: project.client },
    { label: "STATUS", value: project.status },
    { label: "ENVIRONMENTAL RATING", value: "5-Star Green Star & 5.5 NABERS" },
    { label: "STRUCTURAL FORM", value: "Post-Tensioned Concrete & Structural Steel Core" },
    { label: "FACILITY SCALE", value: "32 Levels + 4 Basements + Public Retail Arcade" },
  ];

  return (
    <div className="bg-white text-[#1A1A1A]">
      <PageHero
        label={`PROJECT CASE STUDY / ${project.category.toUpperCase()}`}
        title={project.title}
        subtitle={project.summary}
        image={project.heroImage}
        actions={
          <button
            onClick={() => onNavigate("projects-all")}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#D4913A] hover:text-[#E5A13B] transition-colors uppercase cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            BACK TO ALL PROJECTS
          </button>
        }
      />

      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Main Narrative */}
            <div className="lg:col-span-8 space-y-12">
              {/* Challenge & Solution */}
              <Reveal direction="up">
                <div className="space-y-6">
                  <span className="text-xs font-semibold tracking-[0.2em] text-[#D4913A] uppercase block">
                    PROJECT EXECUTION CHRONICLE
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] uppercase leading-tight">
                    NAVIGATING URBAN SUB-SURFACE CONSTRAINTS
                  </h2>
                  <p className="text-base text-[#525252] leading-relaxed font-normal">
                    Appointed as principal head contractor under an AS 4902 design and construct agreement, BuildCore delivered the Collins Street Tower through complex CBD perimeter constraints, adjacent historical 1890s banking halls, and dense pedestrian thoroughfares.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="up" delay={80}>
                <div className="p-8 bg-[#FBFBFA] border-l-2 border-[#D4913A] border-y border-r border-[#E5E5E5] rounded-xs shadow-xs">
                  <h3 className="text-lg sm:text-xl font-bold text-[#111111] uppercase mb-2">
                    THE STRUCTURAL CHALLENGE
                  </h3>
                  <p className="text-sm text-[#525252] leading-relaxed font-normal">
                    {project.challenge}
                  </p>
                </div>
              </Reveal>

              <Reveal direction="up" delay={140}>
                <div className="p-8 bg-[#FBFBFA] border-l-2 border-[#111111] border-y border-r border-[#E5E5E5] rounded-xs shadow-xs">
                  <h3 className="text-lg sm:text-xl font-bold text-[#111111] uppercase mb-2">
                    THE BUILDCORE ENGINEERING SOLUTION
                  </h3>
                  <p className="text-sm text-[#525252] leading-relaxed font-normal">
                    {project.solution}
                  </p>
                </div>
              </Reveal>

              {/* Key Project Highlights */}
              <Reveal direction="up" delay={200}>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111111] uppercase tracking-wide mb-6 pb-3 border-b border-[#E5E5E5]">
                    DELIVERY MILESTONES & ACHIEVEMENTS
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {project.highlights.map((hl, idx) => (
                      <div key={idx} className="p-6 bg-[#FBFBFA] border border-[#E5E5E5] rounded-xs shadow-xs">
                        <div className="w-6 h-[2px] bg-[#D4913A] mb-3" />
                        <p className="text-xs font-semibold text-[#111111] uppercase tracking-wide leading-relaxed">
                          {hl}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Gallery Grid */}
              <Reveal direction="up" delay={260}>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111111] uppercase tracking-wide mb-6 pb-3 border-b border-[#E5E5E5]">
                    SITE DOCUMENTATION GALLERY
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.gallery.map((img, idx) => (
                      <div key={idx} className="aspect-[4/3] bg-[#F5F5F4] border border-[#E5E5E5] overflow-hidden group rounded-xs shadow-xs">
                        <img
                          src={img}
                          alt={`${project.title} detail ${idx + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Specifications Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="bg-[#FBFBFA] border border-[#E5E5E5] p-8 shadow-xs rounded-xs">
                <h3 className="text-sm font-bold tracking-[0.16em] text-[#111111] uppercase pb-4 mb-6 border-b border-[#E5E5E5]">
                  PROJECT SPECIFICATIONS
                </h3>

                <div className="divide-y divide-[#E5E5E5]">
                  {specs.map((item, idx) => (
                    <div key={idx} className="py-3.5">
                      <span className="text-[10px] tracking-[0.16em] text-[#D4913A] uppercase font-semibold block mb-1">
                        {item.label}
                      </span>
                      <p className="text-sm text-[#111111] font-medium leading-snug">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
                  <Button
                    className="w-full"
                    variant="primary"
                    onClick={() => onNavigate("contact-project")}
                  >
                    DISCUSS A SIMILAR PROJECT
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
