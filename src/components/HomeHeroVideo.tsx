import { useState, useRef, useEffect } from "react";

const HERO_VIDEOS = [
  "/video/7816246-hd_1920_1080_25fps.mp4",
  "/video/vdieo4.mp4",
  "/video/video5.mp4",
];

export function HomeHeroVideo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = () => {
    // Smooth crossfade out before advancing
    setFadeState("out");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
      setFadeState("in");
    }, 400);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay with sound might be blocked, ensure muted
            video.muted = true;
            video.play().catch(() => {});
          });
      }
    }
  }, [currentIndex]);

  return (
    <div className="absolute top-20 right-0 bottom-0 left-0 overflow-hidden pointer-events-none select-none">
      {/* Active Video Element */}
      <video
        ref={videoRef}
        key={HERO_VIDEOS[currentIndex]}
        src={HERO_VIDEOS[currentIndex]}
        autoPlay
        muted
        playsInline
        preload="metadata"
        onEnded={handleVideoEnded}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
          fadeState === "in" ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
        }`}
      />

      {/* Refined video overlay: Maximum clarity for full-screen background video */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />

      {/* Video Sequence Indicator Pill (Interactive, Bottom Right) */}
      <div className="absolute bottom-24 right-6 lg:right-12 z-20 pointer-events-auto hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E5E5E5] shadow-xs">
        <span className="w-2 h-2 rounded-full bg-[#D4913A] animate-pulse" />
        <span className="text-[10px] font-bold tracking-wider text-[#111111] uppercase font-mono mr-1">
          SCENE 0{currentIndex + 1} / 0{HERO_VIDEOS.length}
        </span>
        <div className="flex gap-1 items-center">
          {HERO_VIDEOS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFadeState("out");
                setTimeout(() => {
                  setCurrentIndex(idx);
                  setFadeState("in");
                }, 300);
              }}
              aria-label={`Jump to video ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-6 bg-[#D4913A]"
                  : "w-2 bg-[#D4D4D4] hover:bg-[#A3A3A3]"
              }`}
            />
          ))}

          {/* Fullscreen Expand Button */}
          <button
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen?.().catch(() => {});
              } else {
                document.exitFullscreen?.().catch(() => {});
              }
            }}
            aria-label="Toggle Fullscreen"
            title="Toggle Fullscreen"
            className="ml-1.5 p-0.5 text-[#555555] hover:text-[#D4913A] transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
