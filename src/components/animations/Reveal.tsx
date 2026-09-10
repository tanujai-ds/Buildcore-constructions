import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number; // in ms
  duration?: number; // in ms
  threshold?: number;
  className?: string;
  cascade?: boolean;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 650,
  threshold = 0.15,
  className = "",
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0) scale(1)";
    switch (direction) {
      case "up":
        return "translateY(32px)";
      case "down":
        return "translateY(-32px)";
      case "left":
        return "translateX(32px)";
      case "right":
        return "translateX(-32px)";
      default:
        return "none";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

interface StaggerProps {
  children: React.ReactNode[];
  staggerMs?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}

export function Stagger({
  children,
  staggerMs = 80,
  direction = "up",
  className = "",
}: StaggerProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, idx) => (
        <Reveal key={idx} direction={direction} delay={idx * staggerMs}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
