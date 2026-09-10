import { useEffect, useRef, useState } from "react";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string; // e.g. "aspect-[4/3]" or "aspect-video"
  priority?: boolean;
}

export function ImageReveal({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-[4/3]",
  priority = false,
}: ImageRevealProps) {
  const [isRevealed, setIsRevealed] = useState(priority);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "50px" }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [priority]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-[#141414] ${aspectRatio} ${className}`}
      style={{
        clipPath: isRevealed ? "inset(0% 0% 0% 0%)" : "inset(12% 0% 12% 0%)",
        transition: "clip-path 900ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          opacity: isRevealed ? 1 : 0,
          transform: isRevealed ? "scale(1)" : "scale(1.06)",
          transition: "opacity 800ms ease, transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}
