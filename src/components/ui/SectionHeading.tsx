interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  action,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          {/* Eyebrow Label with Yellow Bar */}
          <div className="flex items-center gap-3.5 mb-4">
            <span className="w-8 h-[2px] bg-[#D4913A]" />
            <span className="text-xs tracking-[0.18em] font-semibold uppercase text-[#D4913A]">
              {label}
            </span>
          </div>

          {/* Main Editorial Headline in deep charcoal/black */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.05] text-[#111111]">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-4 text-sm sm:text-base max-w-2xl leading-relaxed font-normal text-[#525252]">
              {subtitle}
            </p>
          )}
        </div>

        {action && (
          <button
            onClick={action.onClick}
            className="group inline-flex items-center gap-2 text-xs tracking-[0.14em] font-semibold text-[#D4913A] hover:text-[#E5A13B] transition-colors self-start md:self-end cursor-pointer"
          >
            <span>{action.label}</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
