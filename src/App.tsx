import { useState } from "react";
import { Page } from "./types";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { CustomCursor } from "./components/CustomCursor";

// Page Components
import { HomePage } from "./pages/Home/Home";
import { AboutCompany } from "./pages/About/Company";
import { AboutApproach } from "./pages/About/Approach";
import { AboutTeam } from "./pages/About/Team";
import { AboutWhy } from "./pages/About/WhyBuildCore";
import { ServiceDetail } from "./pages/Services/ServiceDetail";
import { ProjectsList } from "./pages/Projects/ProjectsList";
import { ProjectDetail } from "./pages/Projects/ProjectDetail";
import { ProcessPage } from "./pages/Process/Process";
import { InsightsPage } from "./pages/Insights/Insights";
import { ContactPage } from "./pages/Contact/Contact";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigate = (page: Page) => {
    if (page === currentPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "instant" });
      setIsTransitioning(false);
    }, 120);
  };

  const renderActivePage = () => {
    switch (currentPage) {
      // Home
      case "home":
        return <HomePage onNavigate={navigate} />;

      // About
      case "about-company":
        return <AboutCompany onNavigate={navigate} />;
      case "about-approach":
        return <AboutApproach onNavigate={navigate} />;
      case "about-team":
        return <AboutTeam onNavigate={navigate} />;
      case "about-why":
        return <AboutWhy onNavigate={navigate} />;

      // Services - All 9 Offerings
      case "services-architectural-drawings":
        return <ServiceDetail serviceKey="architectural-drawings" onNavigate={navigate} />;
      case "services-vastu-plans":
        return <ServiceDetail serviceKey="vastu-plans" onNavigate={navigate} />;
      case "services-3d-modeling-walkthrough":
        return <ServiceDetail serviceKey="3d-modeling-walkthrough" onNavigate={navigate} />;
      case "services-interior-design":
        return <ServiceDetail serviceKey="interior-design" onNavigate={navigate} />;
      case "services-structure-drawings":
        return <ServiceDetail serviceKey="structure-drawings" onNavigate={navigate} />;
      case "services-estimating-costing":
        return <ServiceDetail serviceKey="estimating-costing" onNavigate={navigate} />;
      case "services-landscape-design":
        return <ServiceDetail serviceKey="landscape-design" onNavigate={navigate} />;
      case "services-land-advisors":
        return <ServiceDetail serviceKey="land-advisors" onNavigate={navigate} />;
      case "services-gis-mapping":
        return <ServiceDetail serviceKey="gis-mapping" onNavigate={navigate} />;

      // Legacy Service Aliases
      case "services-construction":
        return <ServiceDetail serviceKey="structure-drawings" onNavigate={navigate} />;
      case "services-pm":
        return <ServiceDetail serviceKey="estimating-costing" onNavigate={navigate} />;
      case "services-consulting":
        return <ServiceDetail serviceKey="land-advisors" onNavigate={navigate} />;
      case "services-design":
        return <ServiceDetail serviceKey="architectural-drawings" onNavigate={navigate} />;
      case "services-renovation":
        return <ServiceDetail serviceKey="interior-design" onNavigate={navigate} />;

      // Projects
      case "projects-all":
        return <ProjectsList initialFilter="all" onNavigate={navigate} />;
      case "projects-residential":
        return <ProjectsList initialFilter="residential" onNavigate={navigate} />;
      case "projects-commercial":
        return <ProjectsList initialFilter="commercial" onNavigate={navigate} />;
      case "projects-detail":
        return <ProjectDetail onNavigate={navigate} />;

      // Process
      case "process":
        return <ProcessPage onNavigate={navigate} />;

      // Insights
      case "insights-articles":
        return <InsightsPage type="articles" onNavigate={navigate} />;
      case "insights-updates":
        return <InsightsPage type="updates" onNavigate={navigate} />;

      // Contact
      case "contact-project":
        return <ContactPage type="project" onNavigate={navigate} />;
      case "contact-general":
        return <ContactPage type="general" onNavigate={navigate} />;

      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col selection:bg-[#D4913A] selection:text-white">
      {/* Scroll Progress Bar at top */}
      <ScrollProgress />

      {/* Desktop Precision Custom Cursor */}
      <CustomCursor />

      {/* Persistent Sticky Navbar */}
      <Navbar current={currentPage} onNavigate={navigate} />

      {/* Page Content Shell with Smooth Transition */}
      <main
        className={`flex-grow transition-opacity duration-200 ease-out ${
          isTransitioning ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
        }`}
      >
        {renderActivePage()}
      </main>

      {/* Persistent Global Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
