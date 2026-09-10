import { NavItem } from "../types";

export const navItems: NavItem[] = [
  { label: "HOME", page: "home" },
  {
    label: "ABOUT",
    children: [
      { label: "Company", page: "about-company", description: "Our history, values, leadership and standards." },
      { label: "Our Approach", page: "about-approach", description: "Our 6 core delivery pillars and QA methodology." },
      { label: "Team", page: "about-team", description: "Experienced directors, project leads and site engineers." },
      { label: "Why BuildCore", page: "about-why", description: "Our track record, differentiators and testimonials." },
    ],
  },
  {
    label: "SERVICES",
    children: [
      { label: "ARCHITECTURAL DRAWINGS", page: "services-architectural-drawings", description: "Precision working drawings, elevations, sections & sanction sets." },
      { label: "2D PLANS AS PER VASTU", page: "services-vastu-plans", description: "16-zone spatial floorplans aligned with Vedic Vastu Shastra." },
      { label: "3D MODELING & WALKTHROUGH", page: "services-3d-modeling-walkthrough", description: "Hyper-realistic 3D CGI visuals & 4K cinematic walkthroughs." },
      { label: "INTERIOR DESIGN", page: "services-interior-design", description: "Bespoke residential & executive spaces with custom millwork." },
      { label: "STRUCTURAL DRAWINGS", page: "services-structure-drawings", description: "Seismic-resilient RCC engineering & Bar Bending Schedules." },
      { label: "ESTIMATING & COSTING", page: "services-estimating-costing", description: "Granular BOQ preparation, rate analysis & budget control." },
      { label: "LANDSCAPE DESIGN", page: "services-landscape-design", description: "Sustainable outdoor living, hardscaping & smart irrigation." },
      { label: "LAND ADVISORS", page: "services-land-advisors", description: "Title due diligence, zoning validation & development yield." },
      { label: "GIS MAPPING SERVICES", page: "services-gis-mapping", description: "Drone photogrammetry, contour mapping & spatial analytics." },
    ],
  },
  {
    label: "PROJECTS",
    children: [
      { label: "All Projects", page: "projects-all", description: "Comprehensive portfolio of delivered assets." },
      { label: "Residential", page: "projects-residential", description: "Bespoke residences & multi-residential builds." },
      { label: "Commercial", page: "projects-commercial", description: "Towers, logistics & commercial precincts." },
      { label: "Project Details", page: "projects-detail", description: "Featured in-depth case study." },
    ],
  },
  { label: "PROCESS", page: "process" },
  {
    label: "INSIGHTS",
    children: [
      { label: "Articles", page: "insights-articles", description: "Industry thought leadership & whitepapers." },
      { label: "Project Updates", page: "insights-updates", description: "Live site progress reports & milestones." },
    ],
  },
  {
    label: "CONTACT",
    children: [
      { label: "Start a Project", page: "contact-project", description: "Submit your project brief for tender review." },
      { label: "General Enquiry", page: "contact-general", description: "Head office, phone, careers and partnerships." },
    ],
  },
];
