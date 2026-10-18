import { Page } from "../../types";
import { articlesData, projectUpdatesData } from "../../data/siteData";
import { PageHero } from "../../components/ui/PageHero";
import { Reveal } from "../../components/animations/Reveal";

interface InsightsProps {
  type: "articles" | "updates";
  onNavigate: (p: Page) => void;
}

export function InsightsPage({ type, onNavigate }: InsightsProps) {
  const isArticles = type === "articles";

  return (
    <div className="bg-white text-[#1A1A1A]">
      <PageHero
        label={`INSIGHTS / ${isArticles ? "WHITE PAPERS & ARTICLES" : "LIVE SITE UPDATES"}`}
        title={isArticles ? "INDUSTRY INSIGHTS" : "PROJECT UPDATES"}
        subtitle={
          isArticles
            ? "Thought leadership on early contractor involvement, structural risk mitigation, embodied carbon, and digital twin BIM coordination."
            : "Real-time construction milestones, crane lifts, and practical completion announcements from our active Australian jobsites."
        }
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&h=700&fit=crop&auto=format"
      />

      {/* Switcher Tab */}
      <div className="sticky top-20 z-30 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#E5E5E5]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex gap-4">
          <button
            onClick={() => onNavigate("insights-articles")}
            className={`py-4 px-6 text-xs tracking-[0.14em] font-semibold uppercase transition-colors border-b-2 cursor-pointer ${
              isArticles
                ? "border-[#D4913A] text-[#D4913A] bg-white"
                : "border-transparent text-[#737373] hover:text-[#111111]"
            }`}
          >
            INDUSTRY ARTICLES ({articlesData.length})
          </button>
          <button
            onClick={() => onNavigate("insights-updates")}
            className={`py-4 px-6 text-xs tracking-[0.14em] font-semibold uppercase transition-colors border-b-2 cursor-pointer ${
              !isArticles
                ? "border-[#D4913A] text-[#D4913A] bg-white"
                : "border-transparent text-[#737373] hover:text-[#111111]"
            }`}
          >
            SITE UPDATES ({projectUpdatesData.length})
          </button>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {isArticles ? (
            /* Articles Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {articlesData.map((article, idx) => (
                <Reveal key={article.id} direction="up" delay={idx * 80}>
                  <article className="group bg-[#FBFBFA] border border-[#E5E5E5] overflow-hidden flex flex-col justify-between h-full hover:border-[#D4913A] hover:shadow-md transition-all rounded-xs">
                    <div>
                      <div className="aspect-[16/10] overflow-hidden bg-[#F5F5F4]">
                        <img
                          src={article.image}
                          alt={article.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between text-[10px] font-semibold text-[#737373] mb-3 uppercase tracking-wider">
                          <span className="text-[#D4913A]">{article.category}</span>
                          <span>{article.readTime}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#111111] uppercase tracking-tight leading-snug group-hover:text-[#D4913A] transition-colors mb-3">
                          {article.title}
                        </h3>
                        <p className="text-xs text-[#525252] leading-relaxed line-clamp-3 font-normal">
                          {article.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-[#F0F0EF] flex items-center justify-between text-xs text-[#737373] font-medium">
                      <span>By {article.author}</span>
                      <span>{article.date}</span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            /* Project Updates Grid */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projectUpdatesData.map((update, idx) => (
                <Reveal key={update.id} direction="up" delay={idx * 80}>
                  <div className="bg-[#FBFBFA] border border-[#E5E5E5] overflow-hidden p-6 flex flex-col justify-between h-full group hover:border-[#D4913A] hover:shadow-md transition-all rounded-xs">
                    <div>
                      <div className="aspect-video overflow-hidden mb-6 border border-[#E5E5E5] rounded-xs">
                        <img
                          src={update.image}
                          alt={update.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#737373] font-semibold mb-2">
                        <span className="text-[#D4913A] uppercase">{update.project}</span>
                        <span>{update.date}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#111111] uppercase tracking-tight mb-2">
                        {update.title}
                      </h3>
                      <p className="text-xs text-[#525252] leading-relaxed mb-6 font-normal">
                        {update.summary}
                      </p>
                    </div>

                    {/* Progress milestone bar */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-2">
                        <span className="text-[#737373]">{update.milestone}</span>
                        <span className="text-[#D4913A]">{update.progressPercent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#D4913A] transition-all duration-1000"
                          style={{ width: `${update.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
