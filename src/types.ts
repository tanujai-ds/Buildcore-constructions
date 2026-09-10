export type Page =
  | "home"
  | "about-company"
  | "about-approach"
  | "about-team"
  | "about-why"
  | "services-architectural-drawings"
  | "services-vastu-plans"
  | "services-3d-modeling-walkthrough"
  | "services-interior-design"
  | "services-structure-drawings"
  | "services-estimating-costing"
  | "services-landscape-design"
  | "services-land-advisors"
  | "services-gis-mapping"
  | "services-construction"
  | "services-pm"
  | "services-consulting"
  | "services-design"
  | "services-renovation"
  | "projects-all"
  | "projects-residential"
  | "projects-commercial"
  | "projects-detail"
  | "process"
  | "insights-articles"
  | "insights-updates"
  | "contact-project"
  | "contact-general";

export interface NavChild {
  label: string;
  page: Page;
  description?: string;
}

export interface NavItem {
  label: string;
  page?: Page;
  children?: NavChild[];
}

export interface Project {
  id: string;
  title: string;
  category: "residential" | "commercial" | "industrial";
  client: string;
  location: string;
  year: string;
  value: string;
  duration: string;
  area: string;
  status: string;
  heroImage: string;
  gallery: string[];
  summary: string;
  challenge: string;
  solution: string;
  highlights: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  page: Page;
  tagline: string;
  description: string;
  features: string[];
  capabilities: { title: string; desc: string }[];
  stats: { value: string; label: string }[];
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  tenure: string;
  bio: string;
  image: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  image: string;
  author: string;
}

export interface ProjectUpdate {
  id: string;
  title: string;
  project: string;
  date: string;
  milestone: string;
  progressPercent: number;
  image: string;
  summary: string;
}
