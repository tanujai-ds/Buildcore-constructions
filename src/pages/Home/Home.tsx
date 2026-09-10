import { Page } from "../../types";
import { projectsData, servicesData } from "../../data/siteData";
import { Reveal } from "../../components/animations/Reveal";
import { Button } from "../../components/ui/Button";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { ProjectCard } from "../../components/ui/ProjectCard";
import { ServiceRow } from "../../components/ui/ServiceRow";

import { HomeHeroVideo } from "../../components/HomeHeroVideo";
import { publicAsset } from "../../utils/assets";

interface HomePageProps {
  onNavigate: (p: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredProjects = projectsData.slice(0, 3);
  const serviceList: { id: string; title: string; tagline: string; page: Page }[] = [
    {
      id: "architectural-drawings",
      title: "ARCHITECTURAL DRAWINGS",
      tagline: "Comprehensive architectural working drawings, elevations, sections & municipal sanction sets.",
      page: "services-architectural-drawings",
    },
    {
      id: "vastu-plans",
      title: "2D PLANS AS PER VASTU",
      tagline: "Scientific 16-zone spatial floorplans harmonizing Vedic Vastu principles with modern functionality.",
      page: "services-vastu-plans",
    },
    {
      id: "3d-modeling-walkthrough",
      title: "3D MODELING & WALKTHROUGH",
      tagline: "Hyper-realistic 3D CGI visuals, 4K animated walkthroughs & 360-degree virtual reality tours.",
      page: "services-3d-modeling-walkthrough",
    },
    {
      id: "interior-design",
      title: "INTERIOR DESIGN",
      tagline: "Bespoke residential & executive spaces with custom joinery, curated palettes & turnkey execution.",
      page: "services-interior-design",
    },
    {
      id: "structure-drawings",
      title: "STRUCTURAL DRAWINGS",
      tagline: "Earthquake-resilient structural engineering, RCC column-beam framing & Bar Bending Schedules.",
      page: "services-structure-drawings",
    },
    {
      id: "estimating-costing",
      title: "ESTIMATING & COSTING",
      tagline: "Granular BOQ preparation, itemized material take-offs, rate analysis & capital budget protection.",
      page: "services-estimating-costing",
    },
    {
      id: "landscape-design",
      title: "LANDSCAPE DESIGN",
      tagline: "Sustainable master landscape architecture, hardscape engineering, botanical curation & smart irrigation.",
      page: "services-landscape-design",
    },
    {
      id: "land-advisors",
      title: "LAND ADVISORS",
      tagline: "Strategic land acquisition due diligence, title verification, zoning validation & development yield.",
      page: "services-land-advisors",
    },
    {
      id: "gis-mapping",
      title: "GIS MAPPING SERVICES",
      tagline: "Centimeter-accurate drone UAV photogrammetry, LiDAR contour mapping & geospatial land analytics.",
      page: "services-gis-mapping",
    },
  ];

  return (
    <div className="bg-white text-[#1A1A1A]">
      {/* ─── 1. HERO SECTION (100% Full Screen Edge-to-Edge Video) ─────────── */}
      <section className="relative w-full min-h-[max(620px,100dvh)] flex items-center justify-center pt-16 sm:pt-20 overflow-hidden bg-[#FAFAF9]">
        {/* Full-Screen Background Sequential Video Player */}
        <HomeHeroVideo />

        {/* Hero Content: Centered brand mark and editorial message */}
        <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-12 w-full z-10 py-10 sm:py-16">
          <div className="flex translate-y-8 flex-col items-center gap-5 text-center sm:translate-y-12 sm:gap-7">
            {/* Centered BuildCore Brand Logo */}
            <div className="flex items-center justify-center">
              <Reveal direction="right" delay={150}>
                <div className="relative group select-none rounded-sm bg-white/90 px-3 py-2 sm:px-5 sm:py-3 shadow-[0_8px_30px_rgba(0,0,0,0.28)] ring-1 ring-white/70 backdrop-blur-sm">
                  <img
                    src={publicAsset("logo.png")}
                    alt="BUILDCORE Construction & Consultant"
                    className="h-16 sm:h-24 lg:h-32 w-auto object-contain drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              </Reveal>
            </div>

            {/* Hero Editorial Content */}
            <div className="flex w-full max-w-3xl flex-col items-center justify-center">
              {/* Main Headline In One Line */}
              <Reveal direction="up" delay={200}>
                <div className="mb-3 text-center uppercase drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)] sm:mb-4">
                  <h1 className="w-full text-center text-3xl font-extrabold leading-[1.05] tracking-tight !text-[#F5B642] sm:text-5xl lg:text-6xl">
                    BUILDCORE
                  </h1>
                  <p className="mt-2 text-[10px] font-bold tracking-[0.1em] text-white sm:text-[25px] sm:tracking-[0.14em] lg:text-[32px]">
                    CONSTRUCTION &amp; CONSULTANT
                  </p>
                </div>
              </Reveal>

              {/* Supporting Pitch */}
              <Reveal direction="up" delay={300}>
                <p className="text-white text-xs sm:text-base leading-relaxed max-w-2xl mb-5 sm:mb-7 font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                  BuildCore delivers precision construction and project management across commercial towers, civil facilities, and luxury residential estates. Tier-one delivery systems with direct director accountability.
                </p>
              </Reveal>

              {/* CTAs */}
              <Reveal direction="up" delay={400}>
                <div className="flex w-full flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                  <Button
                    size="md"
                    variant="primary"
                    onClick={() => onNavigate("contact-project")}
                  >
                    START YOUR PROJECT
                  </Button>
                  <Button
                    size="md"
                    variant="outline"
                    onClick={() => onNavigate("projects-all")}
                  >
                    EXPLORE PORTFOLIO
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

      </section>

      {/* ─── 2. SERVICES SECTION ───────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <SectionHeading
            label="01 / WHAT WE DO"
            title="OUR SERVICES"
            subtitle="Comprehensive architectural drafting, Vastu-compliant 2D planning, 3D CGI walkthroughs, structural engineering, itemized cost estimation, landscape architecture, land advisory, and GIS geospatial intelligence."
            action={{
              label: "VIEW ALL SERVICES",
              onClick: () => onNavigate("services-architectural-drawings"),
            }}
          />

          {/* Interactive Service Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceList.map((service, idx) => (
              <ServiceRow
                key={service.id}
                index={idx}
                title={service.title}
                tagline={service.tagline}
                image={servicesData[service.id]?.image ?? publicAsset("services/architectural-drawings.jpg")}
                description={servicesData[service.id]?.description ?? service.tagline}
                features={servicesData[service.id]?.features ?? []}
                page={service.page}
                onClick={() => onNavigate(service.page)}
                onContact={() => onNavigate("contact-project")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURED PROJECTS SECTION ──────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#F9F9F8] border-t border-[#E5E5E5]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <SectionHeading
            label="02 / SELECTED WORK"
            title="FEATURED BUILDS"
            subtitle="Explore landmark commercial developments, high-density residential towers, and custom architectural homes built across Victoria and NSW."
            action={{
              label: "BROWSE ALL PROJECTS",
              onClick: () => onNavigate("projects-all"),
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProjects.map((project, idx) => (
              <Reveal key={project.id} direction="up" delay={idx * 100}>
                <ProjectCard
                  project={project}
                  index={idx}
                  onClick={() => onNavigate("projects-detail")}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. PROCESS SUMMARY ────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white border-t border-[#E5E5E5]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <Reveal direction="up">
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-8 h-[2px] bg-[#D4913A]" />
                  <span className="text-xs tracking-[0.2em] font-semibold text-[#D4913A] uppercase">
                    03 / DELIVERY FRAMEWORK
                  </span>
                </div>
                <h2 className="text-4xl lg:text-6xl font-extrabold text-[#111111] uppercase leading-[1.05] mb-6">
                  DISCIPLINE <br />
                  FROM DAY ONE.
                </h2>
                <p className="text-base text-[#525252] leading-relaxed mb-8 font-normal">
                  We've refined a five-stage delivery roadmap that eliminates construction volatility, protects capital budgets, and ensures seamless handover without lingering defect lists.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onNavigate("process")}
                >
                  EXPLORE THE 5 PHASES
                </Button>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  num: "01",
                  title: "Brief & Feasibility",
                  desc: "Comprehensive site investigations, town planning viability, and order-of-magnitude budget calibration.",
                },
                {
                  num: "02",
                  title: "Design & Planning",
                  desc: "3D BIM coordination, subcontractor early market engagement, and statutory authority permit approvals.",
                },
                {
                  num: "03",
                  title: "Mobilisation",
                  desc: "Site compound establishment, critical path schedule baselines, and uncompromising HSE governance.",
                },
                {
                  num: "04",
                  title: "Construction Delivery",
                  desc: "Direct daily site supervision, weekly earned-value tracking, and strict ITP quality hold points.",
                },
                {
                  num: "05",
                  title: "Commissioning & Closeout",
                  desc: "72-hour integrated building testing, digital as-built BIM handover, and 12-month defect care.",
                },
              ].map((step, idx) => (
                <Reveal key={step.num} direction="up" delay={idx * 80}>
                  <div className="p-8 bg-[#FBFBFA] border border-[#E5E5E5] hover:border-[#D4913A] transition-all duration-300 group flex items-start gap-6 rounded-xs shadow-xs">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#D4913A] transition-colors leading-none shrink-0">
                      {step.num}
                    </span>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-[#111111] uppercase mb-2 group-hover:text-[#D4913A] transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-sm text-[#666666] leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. CALL TO ACTION ─────────────────────────────────────────────── */}
      <section className="relative py-32 lg:py-40 bg-[#FAFAF9] border-t border-[#E5E5E5] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&h=800&fit=crop&auto=format)`,
          }}
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xs" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <Reveal direction="up">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4913A] block mb-4">
              READY TO COMMENCE?
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-[#111111] tracking-tight leading-[1.02] uppercase mb-8 max-w-4xl mx-auto">
              LET'S BUILD <br />
              YOUR VISION.
            </h2>
            <p className="text-base sm:text-lg text-[#525252] max-w-xl mx-auto mb-10 leading-relaxed font-normal">
              Whether you require early contractor feasibility advisory, superintendent project management, or full turnkey construction delivery — our directors are ready to review your brief.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                variant="primary"
                onClick={() => onNavigate("contact-project")}
              >
                SUBMIT A TENDER BRIEF
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("contact-general")}
              >
                SPEAK WITH OUR TEAM
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
