import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Page } from "../../types";

interface ServiceRowProps {
  index: number;
  title: string;
  tagline: string;
  image: string;
  description: string;
  features: string[];
  page: Page;
  onClick: () => void;
  onContact: () => void;
  className?: string;
}

export function ServiceRow({ index, title, tagline, image, description, features, onClick, onContact, className = "" }: ServiceRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const indexStr = (index + 1).toString().padStart(2, "0");

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className={`group relative overflow-hidden rounded-xs border border-[#E5E5E5] bg-white transition-all duration-300 hover:border-[#D4913A] hover:bg-[#FFFDF8] ${className}`}>
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 origin-center bg-[#D4913A] transition-transform duration-300 ${isOpen ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"}`} />
      <button type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-label={`${isOpen ? "Close" : "Open"} details for ${title}`} className="flex w-full cursor-pointer flex-col gap-4 p-4 text-left sm:p-5">
        <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xs border border-[#E5E5E5]">
            <img src={image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="flex min-w-0 items-start justify-between gap-4">
          <div className="min-w-0 transition-transform duration-300 group-hover:translate-x-1.5">
            <div className="mb-2 flex items-center gap-3"><span className="text-sm font-extrabold text-[#D4913A]">{indexStr}</span><span className="h-[2px] w-8 bg-[#D4913A]" /></div>
            <h3 className="text-xl font-bold tracking-tight text-[#111111] transition-colors group-hover:text-[#D4913A] sm:text-2xl">{title}</h3>
            <p className="mt-1 line-clamp-2 text-xs font-normal text-[#666666] sm:text-sm">{tagline}</p>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#737373] transition-colors group-hover:text-[#D4913A] lg:text-xs">{isOpen ? "CLOSE" : "TAP FOR DETAILS"}</span>
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xs border border-[#E5E5E5] shadow-xs transition-all duration-300 group-hover:border-[#D4913A] group-hover:bg-[#D4913A] ${isOpen ? "rotate-90 border-[#D4913A] bg-[#D4913A]" : ""}`}>
            <svg className={`h-4 w-4 transition-colors ${isOpen ? "text-white" : "text-[#525252] group-hover:text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </button>
      {isOpen && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="presentation" onClick={() => setIsOpen(false)}>
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-white/20 bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby={`service-title-${index}`} onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close service details" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-2xl text-[#111111] shadow-md transition-colors hover:bg-[#D4913A] hover:text-white">&times;</button>
            <div className="aspect-[16/8] w-full overflow-hidden bg-[#F5F5F4]">
              <img src={image} alt={title} className="h-full w-full object-cover" />
            </div>
            <div className="p-5 sm:p-8">
              <span className="text-xs font-semibold tracking-[0.18em] text-[#D4913A]">SERVICE {indexStr}</span>
              <h2 id={`service-title-${index}`} className="mt-2 text-2xl font-extrabold uppercase leading-tight text-[#111111] sm:text-3xl">{title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#525252]">{description}</p>
              <h3 className="mt-6 border-b border-[#E5E5E5] pb-3 text-sm font-bold uppercase tracking-[0.14em] text-[#111111]">WHAT THIS SERVICE INCLUDES</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {features.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm leading-relaxed text-[#333333]"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4913A]" />{feature}</li>)}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={onContact} className="min-h-12 flex-1 rounded-xs bg-[#D4913A] px-5 py-3 text-xs font-semibold tracking-[0.12em] text-white transition-colors hover:bg-[#E5A13B]">CONTACT ABOUT THIS SERVICE</button>
                <button type="button" onClick={onClick} className="min-h-12 flex-1 rounded-xs border border-[#D4D4D4] px-5 py-3 text-xs font-semibold tracking-[0.12em] text-[#111111] transition-colors hover:border-[#D4913A] hover:text-[#D4913A]">OPEN FULL DETAILS</button>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}