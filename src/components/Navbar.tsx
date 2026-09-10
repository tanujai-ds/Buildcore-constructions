import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Page } from "../types";
import { navItems } from "../data/navigation";
import BrandLogo from "./BrandLogo";

interface NavbarProps {
  current: Page;
  onNavigate: (p: Page) => void;
}

export function Navbar({ current, onNavigate }: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  const isCurrentParent = (itemChildren?: { page: Page }[]) => {
    if (!itemChildren) return false;
    return itemChildren.some((c) => c.page === current);
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] shadow-sm"
          : "bg-white/80 backdrop-blur-sm border-b border-[#F0F0EF]"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-16 sm:h-20">
        {/* Brand Logo with exact provided mark */}
        <button
          onClick={() => handleNavClick("home")}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4913A] p-1 text-left cursor-pointer"
          aria-label="BuildCore Home"
        >
          <BrandLogo size="md" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const hasChildren = Boolean(item.children);
            const isActive = item.page === current || isCurrentParent(item.children);

            if (!hasChildren) {
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.page!)}
                  className={`relative px-4 py-2 text-xs tracking-[0.12em] font-semibold transition-colors cursor-pointer group ${
                    isActive ? "text-[#D4913A]" : "text-[#111111] hover:text-[#D4913A]"
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Animated Yellow Underline */}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-[2px] bg-[#D4913A] transition-all duration-300 origin-left ${
                      isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    }`}
                  />
                </button>
              );
            }

            const isOpen = openDropdown === item.label;

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                  aria-expanded={isOpen}
                  className={`relative px-4 py-2 text-xs tracking-[0.12em] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer group ${
                    isActive || isOpen ? "text-[#D4913A]" : "text-[#111111] hover:text-[#D4913A]"
                  }`}
                >
                  <span>{item.label}</span>
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#D4913A]" : "text-[#737373]"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {/* Animated Yellow Underline */}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-[2px] bg-[#D4913A] transition-all duration-300 origin-left ${
                      isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div
                    className={`absolute top-full left-0 mt-2 ${item.label === "SERVICES" ? "w-[42rem]" : "w-72"} bg-white border border-[#E5E5E5] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 rounded-sm`}
                  >
                    <div className="px-5 py-2 border-b border-[#F0F0EF] bg-[#FBFBFA]">
                      <span className="text-[10px] tracking-[0.18em] text-[#D4913A] uppercase font-semibold">
                        {item.label} DIRECTORY
                      </span>
                    </div>
                    <div className={item.label === "SERVICES" ? "grid grid-flow-col grid-rows-5" : ""}>
                      {item.children?.map((child) => (
                        <button
                          key={`${child.label}-${child.page}`}
                          onClick={() => handleNavClick(child.page)}
                          className={`w-full text-left px-5 py-3 transition-colors flex flex-col group/item border-b border-[#F5F5F4] ${
                            item.label === "SERVICES" ? "[&:nth-child(-n+5)]:border-r [&:nth-child(-n+5)]:border-[#F0F0EF]" : ""
                          } ${
                            current === child.page ? "bg-[#FFF9F2] text-[#D4913A]" : "hover:bg-[#F9F9F8] text-[#111111]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs tracking-[0.08em] font-semibold uppercase group-hover/item:text-[#D4913A] transition-colors">
                              {child.label}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4913A] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          </div>
                          {child.description && (
                            <span className="text-[11px] text-[#737373] mt-0.5 line-clamp-1 font-normal">
                              {child.description}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Header Action Button - Yellow with black text */}
          <button
            onClick={() => handleNavClick("contact-project")}
            className="ml-5 px-6 py-2.5 bg-[#D4913A] text-white text-xs tracking-[0.12em] font-semibold hover:bg-[#E5A13B] transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] rounded-xs"
          >
            START A PROJECT
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative z-[110] flex h-12 w-12 items-center justify-center rounded-sm border border-[#E5E5E5] bg-white text-[#111111] shadow-sm focus:outline-none cursor-pointer select-none"
          aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={mobileOpen}
        >
          <div className="w-6 h-5 flex flex-col justify-between items-center relative">
            <span
              className={`w-6 h-0.5 bg-[#111111] transition-all duration-300 ease-out origin-center ${
                mobileOpen ? "rotate-45 translate-y-2 bg-[#D4913A]" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#111111] transition-all duration-300 ease-out ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#111111] transition-all duration-300 ease-out origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-2 bg-[#D4913A]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && createPortal(
        <div
          className="fixed inset-x-0 bottom-0 top-16 sm:top-20 bg-white backdrop-blur-xl z-[105] lg:hidden flex flex-col overflow-y-auto border-t border-[#E5E5E5] animate-in slide-in-from-right-full duration-300"
        >
          <div className="p-4 sm:p-6 flex flex-col space-y-4 sm:space-y-6 flex-grow">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-[#F0F0EF] pb-3 sm:pb-4">
                {!item.children ? (
                  <button
                    onClick={() => handleNavClick(item.page!)}
                    className={`w-full min-h-11 text-left py-2 text-lg font-bold tracking-tight transition-colors ${
                      current === item.page ? "text-[#D4913A]" : "text-[#111111] hover:text-[#D4913A]"
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <div>
                    <div className="text-xs tracking-[0.16em] text-[#D4913A] uppercase font-semibold mb-3 flex items-center gap-2">
                      <span>{item.label}</span>
                      <span className="w-6 h-[1.5px] bg-[#D4913A]/50" />
                    </div>
                    <div className="pl-3 space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child.page}
                          onClick={() => handleNavClick(child.page)}
                          className={`w-full min-h-11 text-left py-2 text-sm font-medium tracking-wide flex items-center justify-between ${
                            current === child.page
                              ? "text-[#D4913A] font-semibold"
                              : "text-[#525252] hover:text-[#111111]"
                          }`}
                        >
                          <span>{child.label}</span>
                          <svg className="w-3.5 h-3.5 text-[#A3A3A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTAs */}
            <div className="pt-2 space-y-3 pb-6 sm:pt-4 sm:pb-8">
              <button
                onClick={() => handleNavClick("contact-project")}
                className="w-full py-4 bg-[#D4913A] text-white text-xs tracking-[0.14em] font-semibold text-center rounded-xs shadow-sm"
              >
                START A PROJECT
              </button>
              <button
                onClick={() => handleNavClick("contact-general")}
                className="w-full py-4 border border-[#E5E5E5] text-[#111111] text-xs tracking-[0.14em] font-medium text-center hover:bg-[#F9F9F8] rounded-xs"
              >
                GENERAL ENQUIRY
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </header>
  );
}
