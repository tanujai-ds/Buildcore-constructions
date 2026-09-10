import { Page } from "../../types";
import { PageHero } from "../../components/ui/PageHero";
import { teamMembers } from "../../data/siteData";
import { Reveal } from "../../components/animations/Reveal";
import { Button } from "../../components/ui/Button";

interface AboutTeamProps {
  onNavigate: (p: Page) => void;
}

export function AboutTeam({ onNavigate }: AboutTeamProps) {
  return (
    <div className="bg-white text-[#1A1A1A]">
      <PageHero
        label="ABOUT / TEAM"
        title="LEADERSHIP & ENGINEERS"
        subtitle="Experienced construction directors, registered master builders, and certified project superintendents directly involved in the field delivery of your build."
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=700&fit=crop&auto=format"
      />

      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <Reveal key={member.name} direction="up" delay={idx * 80}>
                <div className="group bg-[#FBFBFA] border border-[#E5E5E5] overflow-hidden transition-all duration-300 hover:border-[#D4913A] hover:shadow-md flex flex-col justify-between h-full rounded-xs">
                  {/* Portrait with grayscale to color hover */}
                  <div className="aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-[#F0F0EF] relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                    {/* Tenure pill */}
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-semibold tracking-[0.14em] text-white bg-[#D4913A] px-3 py-1 uppercase rounded-xs shadow-xs">
                        {member.tenure}
                      </span>
                    </div>
                  </div>

                  {/* Content details */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#111111] uppercase tracking-tight leading-tight mb-1 group-hover:text-[#D4913A] transition-colors">
                        {member.name}
                      </h3>

                      <span className="text-xs font-semibold tracking-[0.16em] text-[#D4913A] uppercase block mb-3">
                        {member.role}
                      </span>

                      <div className="text-[11px] font-medium text-[#737373] mb-4 pb-3 border-b border-[#E5E5E5]">
                        {member.credentials}
                      </div>

                      <p className="text-xs text-[#525252] leading-relaxed font-normal">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Bottom recruitment banner */}
          <div className="mt-20 p-10 bg-[#FBFBFA] border border-[#E5E5E5] flex flex-col md:flex-row items-center justify-between gap-8 rounded-xs shadow-xs">
            <div>
              <span className="text-xs tracking-[0.2em] text-[#D4913A] uppercase font-semibold block mb-1">
                CAREERS AT BUILDCORE
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] uppercase">
                JOIN OUR HIGH-PERFORMANCE TEAM
              </h3>
              <p className="text-sm text-[#525252] mt-2 max-w-xl font-normal">
                We are continually seeking experienced site managers, project engineers, contract administrators, and estimators passionate about quality craftsmanship.
              </p>
            </div>
            <Button variant="primary" onClick={() => onNavigate("contact-general")}>
              VIEW CAREER OPPORTUNITIES
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
