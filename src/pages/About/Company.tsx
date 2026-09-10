import { Page } from "../../types";
import { PageHero } from "../../components/ui/PageHero";
import { Reveal } from "../../components/animations/Reveal";
import { Button } from "../../components/ui/Button";

interface AboutCompanyProps {
  onNavigate: (p: Page) => void;
}

export function AboutCompany({ onNavigate }: AboutCompanyProps) {
  const credentials = [
    { label: "FOUNDED", value: "2002, Melbourne VIC Australia" },
    { label: "HEADCOUNT", value: "127 Full-Time Engineers, Managers & Trades" },
    { label: "BUILDER LICENCE", value: "Commercial & Domestic Unlimited (CDB-U / DBU)" },
    { label: "INSURANCE COVERAGE", value: "$50M Public Liability, $20M Professional Indemnity" },
    { label: "MANAGEMENT CERTIFICATIONS", value: "ISO 9001 (Quality), ISO 14001 (Environment), ISO 45001 (Safety)" },
    { label: "INDUSTRY AFFILIATIONS", value: "Master Builders Association (MBAV), AIPM, Green Building Council" },
  ];

  return (
    <div className="bg-white text-[#1A1A1A]">
      <PageHero
        label="ABOUT / COMPANY"
        title="WHO WE ARE"
        subtitle="Delivering landmark commercial towers, multi-residential precincts, and complex institutional facilities across Australia."
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=700&fit=crop&auto=format"
      />

      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal direction="up">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#D4913A] uppercase block mb-2">
                  FOUNDED ON ACCOUNTABILITY
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] uppercase leading-tight mb-8">
                  ARCHITECTURAL EXECUTION WITHOUT COMPROMISE
                </h2>
              </Reveal>

              <Reveal direction="up" delay={80}>
                <p className="text-base text-[#525252] leading-relaxed font-normal">
                  Founded in Melbourne in 2002 by brothers James and Daniel Reeves, BuildCore was conceived with a clear mission: to combine the rigorous systems, safety governance, and procurement power of a Tier-1 contractor with the personal accessibility and craftsmanship of a dedicated boutique firm.
                </p>
              </Reveal>

              <Reveal direction="up" delay={140}>
                <p className="text-base text-[#525252] leading-relaxed font-normal">
                  Through disciplined delivery, we have completed more than 380 projects totaling over $2.1 billion in construction value across Victoria, New South Wales, and Queensland. We build without compromise — upholding the highest structural integrity, transparent cost forecasting, and proactive milestone accountability.
                </p>
              </Reveal>

              <Reveal direction="up" delay={200}>
                <p className="text-base text-[#525252] leading-relaxed font-normal">
                  Whether solving complex sub-surface hydraulic pressure in waterfront tower basements or coordinating hand-crafted Kolumba brick masonry for heritage townhomes, our directors remain actively engaged on site, ensuring client capital is deployed with maximum precision.
                </p>
              </Reveal>

              <Reveal direction="up" delay={260}>
                <div className="pt-6 flex flex-wrap gap-4">
                  <Button variant="primary" onClick={() => onNavigate("about-approach")}>
                    OUR 6 DELIVERY PILLARS
                  </Button>
                  <Button variant="outline" onClick={() => onNavigate("about-team")}>
                    MEET OUR DIRECTORS
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Right Credentials Table */}
            <div className="lg:col-span-5 bg-[#FBFBFA] border border-[#E5E5E5] p-8 shadow-xs rounded-xs">
              <h3 className="text-lg font-bold tracking-[0.16em] text-[#111111] uppercase pb-4 mb-6 border-b border-[#E5E5E5]">
                CORPORATE SPECIFICATIONS
              </h3>
              <div className="divide-y divide-[#E5E5E5]">
                {credentials.map((cred, idx) => (
                  <div key={idx} className="py-4">
                    <span className="text-[10px] tracking-[0.16em] text-[#D4913A] uppercase font-semibold block mb-1">
                      {cred.label}
                    </span>
                    <p className="text-sm text-[#111111] font-medium leading-snug">
                      {cred.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
