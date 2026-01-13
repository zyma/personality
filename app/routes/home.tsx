import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { useState } from "react";
import "~/styles/clay.css";
import LanguageSwitcher from "~/components/LanguageSwitcher";
import { TYPES_DATA, SCENARIOS_DATA, FANDOMS_DATA } from "~/data/mock";
import CapsuleMachine from "~/components/CapsuleMachine";
import JsonLd from "~/components/JsonLd";
import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "MBTI Vibes | Daily Personality Dashboards & Gamified Universe" },
    { name: "description", content: "Discover your MBTI type in a Soft Pop world. Play the Capsule Machine, tackle daily scenarios, and explore fandom types. 100% Instagram-able!" },
    { property: "og:title", content: "MBTI Vibes | Soft Pop Personality Universe" },
    { property: "og:description", content: "Interactive MBTI dashboards, daily challenges, and gashapon prizes." },
    { property: "og:image", content: "/og-image-main.png" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language;

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MBTI Vibes",
    "url": "https://mbtivibes.com",
    "description": "Interactive Soft Pop MBTI Universe",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mbtivibes.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Daily Fortune State
  const [fortune, setFortune] = useState<string | null>(null);
  const handleFortuneClick = () => {
    const fortunes = t("home.fortunes", { returnObjects: true }) as string[];
    setFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
  };

  // Content from Mock Data (GAMIFIED: Rotates daily)
  const todayIndex = new Date().getDate() % SCENARIOS_DATA.length;
  const mockScenario = SCENARIOS_DATA[todayIndex];
  const mockFandom = FANDOMS_DATA[todayIndex % FANDOMS_DATA.length];

  return (
    <div className="min-h-screen relative overflow-hidden font-nunito bg-[#F0F4F8]">
      {/* Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob-1"></div>
        <div className="aurora-blob aurora-blob-2"></div>
      </div>

      <main className="relative z-10 px-4 pb-20 pt-8">
        <div className="container mx-auto max-w-lg md:max-w-4xl">

          {/* 1. HEADER & FORTUNE */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">{t("home.title")}</h1>
              <span className="text-slate-500 font-bold text-sm">{t("home.subtitle")}</span>
            </div>

            {/* Fortune Button */}
            <button
              onClick={handleFortuneClick}
              className="clay-card w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-90"
              title={t("widgets.fortune.title")}
            >
              <span className="text-2xl emoji-pop">🥠</span>
            </button>
          </header>

          {/* Fortune Reveal */}
          {fortune && (
            <div className="mb-8 animate-fade-in-up">
              <div className="clay-card p-4 bg-gradient-to-r from-purple-100 to-pink-100 text-center">
                <p className="text-slate-700 font-bold">✨ {fortune}</p>
              </div>
            </div>
          )}

          {/* 2. BENTO GRID */}
          <div className="bento-nav grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">

            {/* Large Card: Scenario of the Day */}
            <Link to={`/${currentLang}/scenarios`} className="clay-card md:col-span-2 p-6 flex flex-col justify-between hover:scale-[1.01] group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl group-hover:rotate-12 transition-transform">🧟</div>
              <div>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 inline-block">
                  {t("home.scenario_tag")}
                </span>
                <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">
                  {t(`bento.scenario.title`)}
                </h2>
                <p className="text-slate-500 font-bold">{t(`bento.scenario.tag`)}</p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm font-bold text-slate-400">{t("home.read_more")}</span>
              </div>
            </Link>

            {/* Stacked Small Cards */}
            <div className="flex flex-col gap-4">

              {/* Battle Card */}
              <Link to={`/${currentLang}/battle`} className="clay-card p-5 flex-1 flex items-center justify-between hover:scale-[1.02] group">
                <div>
                  <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {t("home.vs_mode_tag")}
                  </span>
                  <h3 className="text-xl font-black text-slate-800 mt-1 whitespace-pre-line">{t("bento.battle.title")}</h3>
                </div>
                <div className="text-4xl emoji-pop group-hover:scale-125 transition-transform">🥊</div>
              </Link>

              {/* Fandom Card */}
              <Link to={`/${currentLang}/fandoms`} className="clay-card p-5 flex-1 flex items-center justify-between hover:scale-[1.02] group">
                <div>
                  <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {t("home.fandom_tag")}
                  </span>
                  <h3 className="text-xl font-black text-slate-800 mt-1 whitespace-pre-line">{t("bento.fandom.title")}</h3>
                </div>
                <div className="text-4xl emoji-pop group-hover:scale-125 transition-transform">🍿</div>
              </Link>
            </div>
          </div>

          {/* 3. GAMIFICATION: Capsule Machine */}
          <div className="section-title mb-6 px-2 flex items-center gap-4">
            <span className="text-2xl font-black text-slate-800">{t("home.capsule_tag")}</span>
            <div className="h-1 bg-slate-200 flex-1 rounded-full"></div>
          </div>

          <div className="mb-12">
            <CapsuleMachine />
          </div>

          {/* 4. TYPE GRID (Footer) */}
          <div className="section-title mb-6 px-2 flex items-center gap-4">
            <span className="text-2xl font-black text-slate-800">{t("home.choose_type")}</span>
            <div className="h-1 bg-slate-200 flex-1 rounded-full"></div>
          </div>

          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {Object.values(TYPES_DATA).map((type) => (
              <Link
                key={type.id}
                to={`/${currentLang}/types/${type.id}`}
                className="clay-card p-3 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform hover:shadow-lg"
                style={{ minHeight: '110px' }}
              >
                <span className="text-3xl emoji-pop filter drop-shadow-md">
                  {type.totem}
                </span>
                <span className="font-nunito font-black text-slate-700 tracking-wider">
                  {type.id}
                </span>
                <span className="text-[10px] text-slate-400 font-bold hidden md:block text-center leading-none px-1">
                  {t(`types.${type.id}.name`)}
                </span>
              </Link>
            ))}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center">
        <div className="container mx-auto px-6">
          <p className="clay-text text-sm">
            © 2026 {t("home.title")} • Soft Pop Prototype
          </p>
        </div>
      </footer>

      <JsonLd data={jsonLdData} />
    </div>
  );
}
