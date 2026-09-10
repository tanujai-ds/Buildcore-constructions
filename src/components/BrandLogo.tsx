import { publicAsset } from "../utils/assets";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function BrandLogo({
  className = "",
  size = "md",
}: BrandLogoProps) {
  const heights = {
    sm: "h-9",
    md: "h-11 md:h-13",
    lg: "h-14 md:h-18",
    xl: "h-20 md:h-24",
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Exact original BuildCore logo as provided - seamless on white */}
      <img
        src={publicAsset("logo.png")}
        alt="BUILDCORE Construction & Consultant"
        className={`${heights[size]} w-auto object-contain transition-transform duration-300 hover:scale-[1.02]`}
      />
    </div>
  );
}
