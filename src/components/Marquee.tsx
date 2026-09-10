interface MarqueeProps {
  items?: string[];
  speedSec?: number;
  className?: string;
}

export function Marquee({
  items = [
    "PRECISION CONSTRUCTION",
    "PROJECT MANAGEMENT",
    "COMMERCIAL TOWERS",
    "LUXURY RESIDENTIAL",
    "FEASIBILITY & CONSULTING",
    "BIM INTEGRATION",
  ],
  className = "",
}: MarqueeProps) {
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className={`py-5 border-y border-[#E5E5E5] bg-[#FBFBFA] overflow-hidden select-none whitespace-nowrap flex ${className}`}
    >
      <div className="flex animate-marquee items-center shrink-0">
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center">
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#525252] hover:text-[#D4913A] transition-colors px-6">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4913A] shrink-0" />
          </div>
        ))}
      </div>
      <div className="flex animate-marquee items-center shrink-0" aria-hidden="true">
        {repeated.map((item, idx) => (
          <div key={`dup-${idx}`} className="flex items-center">
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#525252] hover:text-[#D4913A] transition-colors px-6">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4913A] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
