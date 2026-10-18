import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const progressPercent = Math.min(Math.max((currentScroll / totalHeight) * 100, 0), 100);
      setProgress(progressPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none origin-left"
      style={{
        transform: `scaleX(${progress / 100})`,
        background: "linear-gradient(90deg, #B37424, #D4913A 60%, #F0C060)",
        transition: "transform 80ms linear",
      }}
    />
  );
}
