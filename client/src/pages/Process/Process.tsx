import { useState } from "react";
import { Page } from "../../types";
import { processPhases } from "../../data/siteData";
import { PageHero } from "../../components/ui/PageHero";
import { Button } from "../../components/ui/Button";

interface ProcessPageProps {
  onNavigate: (p: Page) => void;
}

export function ProcessPage({ onNavigate }: ProcessPageProps) {
  const [activeStep, setActiveStep] = useState(0);
  const currentPhase = processPhases[activeStep];

  return (
    <div className="bg-white text-[#1A1A1A]">
      <PageHero
        label="METHODOLOGY / DELIVERY"
        title="5-PHASE PROCESS"
        subtitle="A structured, transparent delivery framework refined across 380+ projects to eliminate construction volatility and protect client capital."
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=700&fit=crop&auto=format"
      />

      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Phase Selector Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[#E5E5E5] border border-[#E5E5E5] mb-12 shadow-xs rounded-xs overflow-hidden">
            {processPhases.map((phase, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={phase.num}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 text-left transition-all duration-300 cursor-pointer relative ${
                    isActive
                      ? "bg-[#D4913A] text-white shadow-xs"
                      : "bg-[#FBFBFA] text-[#111111] hover:bg-[#F5F5F4]"
                  }`}
                >
                  <div
                    className={`text-3xl sm:text-4xl font-extrabold mb-2 ${
                      isActive ? "text-white" : "text-[#D4913A]"
                    }`}
                  >
                    {phase.num}
                  </div>
                  <div className="text-xs sm:text-sm font-bold uppercase leading-tight tracking-wide">
                    {phase.title}
                  </div>
                  <div
                    className={`text-[10px] font-medium mt-1 ${
                      isActive ? "text-white/90 font-semibold" : "text-[#737373]"
                    }`}
                  >
                    {phase.duration}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Deep Dive Card */}
          <div className="bg-[#FBFBFA] border border-[#E5E5E5] p-8 sm:p-12 shadow-xs rounded-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl sm:text-6xl font-extrabold text-[#D4913A] leading-none">
                    {currentPhase.num}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] uppercase">
                      {currentPhase.title}
                    </h3>
                    <span className="text-xs font-semibold tracking-[0.16em] text-[#D4913A] uppercase block">
                      ESTIMATED DURATION: {currentPhase.duration}
                    </span>
                  </div>
                </div>

                <p className="text-sm font-semibold text-[#111111] tracking-wide uppercase">
                  {currentPhase.tagline}
                </p>

                <p className="text-base text-[#525252] leading-relaxed font-normal">
                  {currentPhase.description}
                </p>
              </div>

              {/* Right Deliverables Checklist */}
              <div className="lg:col-span-5 bg-white border border-[#E5E5E5] p-8 rounded-xs shadow-xs">
                <h4 className="text-xs font-semibold tracking-[0.18em] text-[#111111] uppercase pb-4 mb-6 border-b border-[#E5E5E5]">
                  PHASE ARTIFACTS & DELIVERABLES
                </h4>
                <ul className="space-y-4">
                  {currentPhase.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#FFF9F2] border border-[#D4913A] flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-[#D4913A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm text-[#333333] leading-snug font-normal">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="mt-16 text-center">
            <Button
              size="lg"
              variant="primary"
              onClick={() => onNavigate("contact-project")}
            >
              SCHEDULE A PROCESS & TENDER WORKSHOP
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
