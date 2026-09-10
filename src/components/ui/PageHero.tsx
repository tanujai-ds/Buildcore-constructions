import React from "react";
import { Reveal } from "../animations/Reveal";

interface PageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
  image?: string;
  actions?: React.ReactNode;
}

export function PageHero({ label, title, subtitle, image, actions }: PageHeroProps) {
  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#FBFBFA] border-b border-[#E5E5E5]">
      {/* Background imagery with subtle light scrim */}
      {image && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBFBFA] via-transparent to-transparent" />
        </>
      )}

      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4D4D4_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
        <Reveal direction="up" delay={50}>
          {/* Eyebrow Breadcrumb with Yellow Line */}
          <div className="flex items-center gap-3.5 mb-6">
            <span className="w-8 h-[2px] bg-[#D4913A]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4913A]">
              {label}
            </span>
          </div>
        </Reveal>

        <Reveal direction="up" delay={120}>
          <h1 className="text-3xl sm:text-6xl lg:text-8xl font-extrabold text-[#111111] tracking-tight leading-[1.02] uppercase max-w-5xl break-words">
            {title}
          </h1>
        </Reveal>

        {subtitle && (
          <Reveal direction="up" delay={200}>
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-[#525252] max-w-3xl leading-relaxed font-normal">
              {subtitle}
            </p>
          </Reveal>
        )}

        {actions && (
          <Reveal direction="up" delay={280}>
            <div className="mt-8 flex flex-wrap items-center gap-4">{actions}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
