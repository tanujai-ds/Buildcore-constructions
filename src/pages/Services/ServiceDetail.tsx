import { Page, ServiceItem } from "../../types";
import { servicesData } from "../../data/siteData";
import { PageHero } from "../../components/ui/PageHero";
import { Reveal } from "../../components/animations/Reveal";
import { Button } from "../../components/ui/Button";

export type ServiceKey =
  | "architectural-drawings"
  | "vastu-plans"
  | "3d-modeling-walkthrough"
  | "interior-design"
  | "structure-drawings"
  | "estimating-costing"
  | "landscape-design"
  | "land-advisors"
  | "gis-mapping"
  | "construction"
  | "pm"
  | "consulting"
  | "design"
  | "renovation";

interface ServiceDetailProps {
  serviceKey: ServiceKey;
  onNavigate: (p: Page) => void;
}

const allServicesNav: { key: ServiceKey; title: string; page: Page; num: string }[] = [
  { key: "architectural-drawings", title: "ARCHITECTURAL DRAWINGS", page: "services-architectural-drawings", num: "01" },
  { key: "vastu-plans", title: "2D PLANS AS PER VASTU", page: "services-vastu-plans", num: "02" },
  { key: "3d-modeling-walkthrough", title: "3D MODELING & WALKTHROUGH", page: "services-3d-modeling-walkthrough", num: "03" },
  { key: "interior-design", title: "INTERIOR DESIGN", page: "services-interior-design", num: "04" },
  { key: "structure-drawings", title: "STRUCTURAL DRAWINGS", page: "services-structure-drawings", num: "05" },
  { key: "estimating-costing", title: "ESTIMATING & COSTING", page: "services-estimating-costing", num: "06" },
  { key: "landscape-design", title: "LANDSCAPE DESIGN", page: "services-landscape-design", num: "07" },
  { key: "land-advisors", title: "LAND ADVISORS", page: "services-land-advisors", num: "08" },
  { key: "gis-mapping", title: "GIS MAPPING SERVICES", page: "services-gis-mapping", num: "09" },
];

export function ServiceDetail({ serviceKey, onNavigate }: ServiceDetailProps) {
  const service: ServiceItem = servicesData[serviceKey] || servicesData["architectural-drawings"];

  return (
    <div className="bg-white text-[#1A1A1A]">
      <PageHero
        label={`SERVICES / ${service.title}`}
        title={service.title}
        subtitle={service.tagline}
        image={service.image}
      />

      {/* Main Service Content */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Main Overview & Capabilities */}
            <div className="lg:col-span-8 space-y-12">
              <Reveal direction="up">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#D4913A] uppercase block mb-3">
                  SERVICE OVERVIEW
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] uppercase leading-tight">
                  PRECISION PLANNING & RIGOROUS EXECUTION
                </h2>
                <p className="mt-6 text-base sm:text-lg text-[#525252] leading-relaxed font-normal">
                  {service.description}
                </p>
              </Reveal>

              {/* Technical Capabilities */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#111111] uppercase tracking-wide mb-6 pb-3 border-b border-[#E5E5E5]">
                  CORE TECHNICAL CAPABILITIES
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {service.capabilities.map((cap, idx) => (
                    <Reveal key={idx} direction="up" delay={idx * 80}>
                      <div className="p-6 bg-[#FBFBFA] border border-[#E5E5E5] h-full flex flex-col justify-between group hover:border-[#D4913A] transition-colors rounded-xs shadow-xs">
                        <div>
                          <div className="w-6 h-[2px] bg-[#D4913A] mb-4" />
                          <h4 className="text-base sm:text-lg font-bold text-[#111111] uppercase mb-2">
                            {cap.title}
                          </h4>
                          <p className="text-xs text-[#525252] leading-relaxed font-normal">
                            {cap.desc}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Visual Showcase */}
              <div className="aspect-[16/9] overflow-hidden border border-[#E5E5E5] relative rounded-xs shadow-sm">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 border border-[#E5E5E5] flex items-center justify-between rounded-xs">
                  <span className="text-xs tracking-[0.14em] font-semibold text-[#D4913A] uppercase">
                    ENGINEERED SPECIFICATIONS & ACCREDITED STANDARDS
                  </span>
                  <span className="text-xs text-[#111111] font-medium">
                    VERIFIED QA/QC COMPLIANCE
                  </span>
                </div>
              </div>
            </div>

            {/* Right Scope Checklist & Metrics */}
            <div className="lg:col-span-4 space-y-8">
              {/* Metrics Block */}
              <div className="bg-[#FBFBFA] border border-[#E5E5E5] p-8 shadow-xs rounded-xs">
                <h3 className="text-sm font-bold tracking-[0.16em] text-[#111111] uppercase pb-4 mb-6 border-b border-[#E5E5E5]">
                  TRACK RECORD METRICS
                </h3>
                <div className="space-y-6">
                  {service.stats.map((st, idx) => (
                    <div key={idx}>
                      <div className="text-3xl sm:text-4xl font-extrabold text-[#D4913A] leading-none">
                        {st.value}
                      </div>
                      <div className="text-xs text-[#111111] tracking-wider uppercase mt-1 font-semibold">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-[#FBFBFA] border border-[#E5E5E5] p-8 shadow-xs rounded-xs">
                <h3 className="text-sm font-bold tracking-[0.16em] text-[#111111] uppercase pb-4 mb-6 border-b border-[#E5E5E5]">
                  SCOPE INCLUSIONS
                </h3>
                <ul className="space-y-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4913A] mt-2 shrink-0" />
                      <span className="text-sm text-[#333333] leading-snug font-normal">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
                  <Button
                    className="w-full"
                    variant="primary"
                    onClick={() => onNavigate("contact-project")}
                  >
                    CONSULT ON THIS SERVICE
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigator to All 9 Services */}
          <div className="mt-24 pt-16 border-t border-[#E5E5E5]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] text-[#D4913A] uppercase block mb-2">
                  OUR FULL SUITE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] uppercase">
                  EXPLORE OTHER SERVICES
                </h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("contact-project")}
              >
                REQUEST PROJECT CONSULTATION →
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {allServicesNav.map((s) => {
                const isCurrent = s.key === serviceKey || (serviceKey in servicesData && servicesData[serviceKey]?.page === s.page);
                return (
                  <button
                    key={s.key}
                    onClick={() => onNavigate(s.page)}
                    className={`p-5 text-left border transition-all duration-300 rounded-xs flex items-center justify-between cursor-pointer group ${
                      isCurrent
                        ? "bg-[#FFFDF8] border-[#D4913A] shadow-xs"
                        : "bg-[#FBFBFA] border-[#E5E5E5] hover:border-[#D4913A] hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-[#D4913A]">{s.num}</span>
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-tight text-[#111111] group-hover:text-[#D4913A] transition-colors">
                        {s.title}
                      </span>
                    </div>
                    <svg
                      className="w-4 h-4 text-[#A3A3A3] group-hover:text-[#D4913A] group-hover:translate-x-1 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
