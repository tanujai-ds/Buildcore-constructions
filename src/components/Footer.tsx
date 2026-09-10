import { Page } from "../types";
import BrandLogo from "./BrandLogo";

interface FooterProps {
  onNavigate: (p: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const serviceLinks: [string, Page][] = [
    ["Architectural Drawings", "services-architectural-drawings"],
    ["2D Plans as per Vastu", "services-vastu-plans"],
    ["3D Modeling & Walkthrough", "services-3d-modeling-walkthrough"],
    ["Interior Design", "services-interior-design"],
    ["Structural Drawings", "services-structure-drawings"],
    ["Estimating & Costing", "services-estimating-costing"],
    ["Landscape Design", "services-landscape-design"],
    ["Land Advisors", "services-land-advisors"],
    ["GIS Mapping Services", "services-gis-mapping"],
  ];

  const companyLinks: [string, Page][] = [
    ["About BuildCore", "about-company"],
    ["Our Approach & QA", "about-approach"],
    ["Executive & Engineering Team", "about-team"],
    ["Why BuildCore", "about-why"],
    ["5-Phase Delivery Process", "process"],
  ];

  return (
    <footer className="bg-[#FBFBFA] border-t border-[#E5E5E5] text-[#525252]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-[#E5E5E5]">
          {/* Col 1: Brand & Credentials */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <button
              onClick={() => onNavigate("home")}
              className="mb-6 block text-left cursor-pointer focus:outline-none"
            >
              <BrandLogo size="lg" />
            </button>
            <p className="text-sm text-[#737373] leading-relaxed max-w-sm mb-6 font-normal">
              Precision commercial and luxury residential construction, project management, and advisory services across Australia. Tier-one delivery systems with direct director accountability.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-medium text-[#525252]">
              <span className="px-2.5 py-1 bg-white border border-[#E5E5E5] rounded-xs shadow-xs">
                ISO 9001 / 14001 / 45001
              </span>
              <span className="px-2.5 py-1 bg-white border border-[#E5E5E5] rounded-xs shadow-xs">
                UNLIMITED BUILDER LICENCE
              </span>
              <span className="px-2.5 py-1 bg-white border border-[#E5E5E5] rounded-xs shadow-xs">
                GREEN STAR MEMBER
              </span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.16em] text-[#111111] uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-[2px] bg-[#D4913A]" />
              <span>SERVICES</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              {serviceLinks.map(([label, page]) => (
                <li key={label}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="hover:text-[#D4913A] transition-colors text-left cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.16em] text-[#111111] uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-[2px] bg-[#D4913A]" />
              <span>COMPANY</span>
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              {companyLinks.map(([label, page]) => (
                <li key={label}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="hover:text-[#D4913A] transition-colors text-left cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Coordinates */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.16em] text-[#111111] uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-[2px] bg-[#D4913A]" />
              <span>HEADQUARTERS</span>
            </h4>
            <div className="space-y-4 text-xs font-medium">
              <div>
                <span className="text-[10px] tracking-[0.14em] text-[#737373] uppercase block mb-1 font-semibold">
                  OFFICE
                </span>
                <p className="text-[#111111] leading-relaxed">
                  Level 12, 200 Queen Street<br />
                  Melbourne VIC 3000, Australia
                </p>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.14em] text-[#737373] uppercase block mb-1 font-semibold">
                  DIRECT LINE
                </span>
                <a
                  href="tel:+61390001234"
                  className="text-[#111111] hover:text-[#D4913A] transition-colors"
                >
                  +61 3 9000 1234
                </a>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.14em] text-[#737373] uppercase block mb-1 font-semibold">
                  COMMERCIAL ENQUIRIES
                </span>
                <a
                  href="mailto:enquiries@buildcore.com.au"
                  className="text-[#D4913A] font-semibold hover:underline"
                >
                  enquiries@buildcore.com.au
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#737373] font-normal">
          <p>© 2026 BUILDCORE PTY LTD. ALL RIGHTS RESERVED. ABN 82 104 291 002.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate("contact-general")} className="hover:text-[#111111] transition-colors">
              Privacy & Legal
            </button>
            <span>•</span>
            <button onClick={() => onNavigate("contact-project")} className="hover:text-[#111111] transition-colors">
              Tender Submissions
            </button>
            <span>•</span>
            <button onClick={() => onNavigate("process")} className="hover:text-[#111111] transition-colors">
              Safety Charter
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
