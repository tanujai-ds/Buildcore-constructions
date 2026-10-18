import { Page } from "../../types";
import { PageHero } from "../../components/ui/PageHero";
import { Reveal } from "../../components/animations/Reveal";
import { Button } from "../../components/ui/Button";

interface AboutApproachProps {
  onNavigate: (p: Page) => void;
}

export function AboutApproach({ onNavigate }: AboutApproachProps) {
  const pillars = [
    {
      num: "01",
      title: "Radical Transparency",
      subtitle: "Open-book commercial clarity",
      description: "Weekly written earned-value reports, real-time schedule float telemetry, and zero surprise variations. You are provided with continuous visibility into supply chain costs, procurement milestones, and site progress.",
    },
    {
      num: "02",
      title: "Pre-Construction De-Risking",
      subtitle: "Solving challenges before concrete pours",
      description: "Our pre-construction engagement is where significant client capital is preserved. We interrogate architectural documentation, model BIM clashes at LOD 400, and lock down subcontractor pricing prior to site mobilisation.",
    },
    {
      num: "03",
      title: "Trusted Trade Alliances",
      subtitle: "Reliable priority trade allocation",
      description: "We work with an established, vetted panel of tier-one subcontractors. Ethical commercial terms and rapid progress payments ensure our jobsites receive priority labor and senior foreman attention.",
    },
    {
      num: "04",
      title: "Formal QA/QC Hold Points",
      subtitle: "Digital Inspection Test Plans (ITPs)",
      description: "Every structural pour, waterproofing membrane, and facade gasket undergoes mandatory formal inspection hold points signed off digitally before subsequent trades proceed. No compromises are accepted.",
    },
    {
      num: "05",
      title: "Critical Path Scheduling",
      subtitle: "Proactive float management",
      description: "We update master construction programs weekly using real site production metrics. Critical path activities are protected through parallel sequencing and buffer mitigation strategies rather than reactive panic.",
    },
    {
      num: "06",
      title: "Zero Harm HSE Governance",
      subtitle: "Protecting life, limb and environment",
      description: "Certified to ISO 45001 and ISO 14001, our jobsites maintain industry-benchmark safety records. Clean, organized, respectful sites yield superior craftsmanship, zero lost time, and uninterrupted production.",
    },
  ];

  return (
    <div className="bg-white text-[#1A1A1A]">
      <PageHero
        label="ABOUT / APPROACH"
        title="OUR METHODOLOGY"
        subtitle="Six foundational operational pillars engineered to eliminate construction volatility and deliver certainty on every project."
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=700&fit=crop&auto=format"
      />

      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <Reveal key={pillar.num} direction="up" delay={idx * 70}>
                <div className="h-full p-8 bg-[#FBFBFA] border border-[#E5E5E5] hover:border-[#D4913A] transition-all duration-300 group flex flex-col justify-between rounded-xs shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E5E5]">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#D4913A] leading-none">
                        {pillar.num}
                      </span>
                      <span className="w-6 h-[2px] bg-[#E5E5E5] group-hover:bg-[#D4913A] transition-colors" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#111111] uppercase tracking-tight mb-1 group-hover:text-[#D4913A] transition-colors">
                      {pillar.title}
                    </h3>

                    <span className="text-xs text-[#D4913A] tracking-wider uppercase font-semibold block mb-4">
                      {pillar.subtitle}
                    </span>

                    <p className="text-sm text-[#525252] leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#E5E5E5] flex items-center gap-2 text-xs text-[#737373] group-hover:text-[#111111] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4913A]" />
                    <span className="tracking-widest uppercase font-semibold text-[10px]">BUILDCORE STANDARD</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" variant="primary" onClick={() => onNavigate("process")}>
              SEE HOW WE DELIVER (5-STAGE PROCESS)
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
