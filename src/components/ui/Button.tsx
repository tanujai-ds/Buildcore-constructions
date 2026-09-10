import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  icon?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  icon = true,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: "px-5 py-2.5 text-xs tracking-[0.1em]",
    md: "px-6 py-3.5 text-xs tracking-[0.12em]",
    lg: "px-8 py-4 text-sm tracking-[0.14em]",
  };

  const variantStyles = {
    primary:
      "bg-[#D4913A] text-white font-semibold hover:bg-[#E5A13B] border border-[#D4913A] shadow-xs rounded-xs",
    secondary:
      "bg-white text-[#111111] font-semibold hover:bg-[#F9F9F8] border border-[#E5E5E5] shadow-xs rounded-xs",
    outline:
      "bg-transparent text-[#111111] font-semibold border border-[#111111]/30 hover:border-[#111111] hover:bg-[#111111]/5 rounded-xs",
    link:
      "bg-transparent text-[#D4913A] font-semibold hover:text-[#E5A13B] p-0 border-0",
  };

  return (
    <button
      className={`group relative inline-flex items-center justify-center gap-2.5 transition-all duration-300 ease-out cursor-pointer select-none active:scale-[0.98] ${
        variant !== "link" ? "hover:scale-[1.02]" : ""
      } ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon && (
        <svg
          className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      )}
    </button>
  );
}
