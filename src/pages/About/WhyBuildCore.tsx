import { Page } from "../../types";
import { PageHero } from "../../components/ui/PageHero";
import { Reveal } from "../../components/animations/Reveal";
import { Button } from "../../components/ui/Button";

interface AboutWhyProps {
  onNavigate: (p: Page) => void;
}

export function AboutWhy({ onNavigate }: AboutWhyProps) {
  const differentiators = [
    {
      num: "01",
      title: "ZERO VARIATION 'BUYING' STRATEGY",
      body: "Many contractors win tenders by submitting artificially low initial bids and clawing back margin through aggressive, punitive variations during construction. BuildCore interrogates and prices realistic site scopes up front. What we quote is what we build.",
    },
    {
      num: "02",
      title: "94% CONTRACTUAL PROGRAMME HIT RATE",
      body: "Milestone delivery is an executive obsession, not a casual projection. Over the past 5 years and 68 completed commercial contracts, 94% reached practical completion on or before the contractual handover date.",
    },
    {
      num: "03",
      title: "TIER-ONE TECH WITH BOUTIQUE AGILITY",
      body: "We deploy 3D BIM clash detection, Procore digital QA/QC field tracking, and Open-Space 360 site walkthrough telemetry without the bureaucratic overhead, multi-layered hierarchies, or bloated fees of tier-one mega-corporations.",
    },
    {
      num: "04",
      title: "EXECUTIVE DIRECTORS ON ACTIVE SITE DECKS",
      body: "Our founding directors, James and Daniel Reeves, conduct regular weekly site walks on every single active project. When critical structural or architectural decisions are made, you deal directly with decision-makers who hold equity.",
    },
  ];

  const testimonials = [
    {
      quote:
        "BuildCore delivered our $142M commercial tower in the Melbourne CBD ahead of our critical tenant occupation window. Their proactive handling of deep basement heritage constraints was a masterclass in modern construction engineering.",
      author: "Julian Vance",
      title: "Development Director",
      company: "Regal Property Group",
    },
    {
      quote:
        "We have developed luxury multi-residential projects with three different head contractors over the last twelve years. BuildCore is the only construction partner whose final accounting matched their initial pre-tender feasibility to the dollar.",
      author: "Claire Chen",
      title: "Managing Principal",
      company: "Urban Heritage Living",
    },
    {
      quote:
        "The team's safety standards and logistics coordination on our 22,000 sqm automated distribution hub in Port Melbourne were flawless. They handed over superflat slabs certified for high-speed robotics with zero defects.",
      author: "Marcus Thorne",
      title: "Head of Industrial Capital",
      company: "Pacific Industrial Assets",
    },
  ];

  return (
    <div className="bg-white text-[#1A1A1A]">
      <PageHero
        label="ABOUT / WHY BUILDCORE"
        title="THE BUILDCORE DIFFERENCE"
        subtitle="Why Australia's most discerning developers, institutions, and architects entrust their flagship capital projects to our teams."
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=700&fit=crop&auto=format"
      />

      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <Reveal direction="up">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#D4913A] uppercase block mb-3">
                  COMPETITIVE ADVANTAGE
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] uppercase leading-tight">
                  ENGINEERED FOR CERTAINTY
                </h2>
              </Reveal>

              {differentiators.map((diff, idx) => (
                <Reveal key={diff.num} direction="up" delay={idx * 80}>
                  <div className="flex items-start gap-6 group">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#D4913A] transition-colors leading-none shrink-0">
                      {diff.num}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#111111] uppercase tracking-wide mb-2 group-hover:text-[#D4913A] transition-colors">
                        {diff.title}
                      </h3>
                      <p className="text-sm text-[#525252] leading-relaxed font-normal">
                        {diff.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Testimonials Sidebar */}
            <div className="bg-[#FBFBFA] border border-[#E5E5E5] p-8 sm:p-10 shadow-xs rounded-xs">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[#E5E5E5]">
                <span className="w-2 h-2 rounded-full bg-[#D4913A]" />
                <h3 className="text-lg font-bold text-[#111111] uppercase tracking-wider">
                  CLIENT TESTIMONIALS
                </h3>
              </div>

              <div className="space-y-8 divide-y divide-[#E5E5E5]">
                {testimonials.map((t, idx) => (
                  <div key={idx} className={idx > 0 ? "pt-8" : ""}>
                    <p className="text-sm text-[#404040] italic leading-relaxed mb-4 font-normal">
                      "{t.quote}"
                    </p>
                    <div>
                      <div className="text-base font-bold text-[#111111] uppercase">
                        {t.author}
                      </div>
                      <div className="text-xs text-[#D4913A] font-semibold">
                        {t.title} — {t.company}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-[#E5E5E5]">
                <Button
                  className="w-full"
                  variant="primary"
                  onClick={() => onNavigate("contact-project")}
                >
                  START YOUR PROJECT CONVERSATION
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
