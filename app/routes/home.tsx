import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { useState } from "react";
import "~/styles/clay.css";
import LanguageSwitcher from "~/components/LanguageSwitcher";
import { TYPES_DATA, SCENARIOS_DATA, FANDOMS_DATA } from "~/data/mock";
import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "MBTI Vibes: Soft Pop Universe" },
    { name: "description", content: "Discover your type in a soft pop world." },
  ];
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language;

  // Daily Fortune State
  const [fortune, setFortune] = useState<string | null>(null);
  const handleFortuneClick = () => {
    const fortunes = ["Today is a good day to vibe.", "Avoid spreadsheets today.", "Your crush knows.", "Buy the shoes."];
    setFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
  };

  // Content from Mock Data
  const dailyScenario = SCENARIOS_DATA[0]; // Zombie Apocalypse
  const dailyFandom = FANDOMS_DATA[1]; // The Office

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
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">MBTI Vibes</h1>
              <span className="text-slate-500 font-bold text-sm">Soft Pop Universe</span>
            </div>

            {/* Fortune Button */}
            <button
              onClick={handleFortuneClick}
              className="clay-card w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-90"
              title="Get Daily Fortune"
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
                  🔥 Scenario of the Day
                </span>
                <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">
                  {dailyScenario.title}
                </h2>
                <p className="text-slate-500 font-bold">{dailyScenario.desc}</p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm font-bold text-slate-400">Read 5 reactions ➔</span>
              </div>
            </Link>

            {/* Stacked Small Cards */}
            <div className="flex flex-col gap-4">

              {/* Battle Card */}
              <Link to={`/${currentLang}/battle`} className="clay-card p-5 flex-1 flex items-center justify-between hover:scale-[1.02] group">
                <div>
                  <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                    ⚔️ VS MODE
                  </span>
                  <h3 className="text-xl font-black text-slate-800 mt-1">Battle<br />Arena</h3>
                </div>
                <div className="text-4xl emoji-pop group-hover:scale-125 transition-transform">🥊</div>
              </Link>

              {/* Fandom Card */}
              <Link to={`/${currentLang}/fandoms`} className="clay-card p-5 flex-1 flex items-center justify-between hover:scale-[1.02] group">
                <div>
                  <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                    📺 FANDOM
                  </span>
                  <h3 className="text-xl font-black text-slate-800 mt-1">Pop<br />Culture</h3>
                </div>
                <div className="text-4xl emoji-pop group-hover:scale-125 transition-transform">🍿</div>
              </Link>
            </div>
          </div>

          {/* 3. TYPE GRID (Footer) */}
          <div className="section-title mb-6 px-2 flex items-center gap-4">
            <span className="text-2xl font-black text-slate-800">Choose Your Type</span>
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
                {/* <span className="text-[10px] text-slate-400 font-bold hidden md:block text-center leading-none px-1">
                  {type.korean_title}
                </span> */}
              </Link>
            ))}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center">
        <div className="container mx-auto px-6">
          <p className="clay-text text-sm">
            © 2026 MBTI Vibes • Soft Pop Prototype
          </p>
        </div>
      </footer>
    </div>
  );
}
