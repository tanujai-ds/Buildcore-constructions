import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<"default" | "view" | "pointer">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 1024;

    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewElement = target.closest('[data-cursor="view"]');
      if (viewElement) {
        setCursorType("view");
        return;
      }

      const clickable = target.closest('button, a, input, select, textarea, [role="button"]');
      if (clickable) {
        setCursorType("pointer");
        return;
      }

      setCursorType("default");
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Small Precision Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#D4913A] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${
            cursorType === "view" ? 0 : cursorType === "pointer" ? 1.5 : 1
          })`,
        }}
      />

      {/* Outer Follower Ring / View Pill */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
          cursorType === "view"
            ? "w-16 h-16 rounded-full bg-[#D4913A] text-white font-bold text-[10px] tracking-widest uppercase shadow-lg scale-100"
            : cursorType === "pointer"
            ? "w-10 h-10 rounded-full border border-[#D4913A] bg-[#D4913A]/10 scale-100"
            : "w-8 h-8 rounded-full border border-black/20 scale-75"
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        {cursorType === "view" && <span className="font-semibold tracking-[0.14em]">VIEW</span>}
      </div>
    </>
  );
}
