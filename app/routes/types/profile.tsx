import { useTranslation } from "react-i18next";
import { useParams, Link, useLoaderData } from "react-router";
import { getContentPage } from "~/lib/markdown";
import type { Route } from "./+types/profile";
import "~/styles/clay.css";
import LanguageSwitcher from "~/components/LanguageSwitcher";

// Color definitions for semantic groups
const groupColors: Record<string, { bg: string; dark: string }> = {
  analyst: { bg: "#e2d1f9", dark: "#c9b3e6" },   // Lilac
  diplomat: { bg: "#c8f7dc", dark: "#9ee7c0" },  // Mint
  sentinel: { bg: "#bde0fe", dark: "#89c4f4" },  // Sky
  explorer: { bg: "#fef3c7", dark: "#fde68a" },  // Lemon
};

export async function loader({ params }: Route.LoaderArgs) {
  const { type, lang = "en" } = params;
  if (!type) throw new Response("Type not found", { status: 404 });

  // Fetch content from Markdown
  const page = getContentPage(lang, `types/${type}`);

  return { page, type, lang };
}

export default function TypePage({ loaderData }: Route.ComponentProps) {
  const { page, type, lang } = loaderData;
  const { t } = useTranslation();

  // Fallback defaults if markdown is missing/incomplete
  const colors = (page?.color_group && groupColors[page.color_group]) || groupColors.analyst;
  const typeName = page?.title || type;
  const typeEmoji = page?.emoji || "✨";

  const content = page || {
    superpowers: "",
    annoyances: "",
    relationships: "",
    career: "",
    htmlContent: ""
  };

  // Extended Type Data (Color Palettes)
  const typePalettes: Record<string, string[]> = {
    INTJ: ["#6B46C1", "#9F7AEA", "#E9D8FD"],
    INTP: ["#805AD5", "#B794F4", "#D6BCFA"],
    ENTJ: ["#553C9A", "#9F7AEA", "#E9D8FD"],
    ENTP: ["#9F7AEA", "#D6BCFA", "#FAF5FF"],

    INFJ: ["#48BB78", "#9AE6B4", "#F0FFF4"],
    INFP: ["#38B2AC", "#81E6D9", "#E6FFFA"],
    ENFJ: ["#2F855A", "#68D391", "#F0FFF4"],
    ENFP: ["#319795", "#81E6D9", "#E6FFFA"],

    ISTJ: ["#2B6CB0", "#63B3ED", "#EBF8FF"],
    ISFJ: ["#4299E1", "#90CDF4", "#EBF8FF"],
    ESTJ: ["#2C5282", "#63B3ED", "#EBF8FF"],
    ESFJ: ["#3182CE", "#90CDF4", "#EBF8FF"],

    ISTP: ["#D69E2E", "#F6E05E", "#FFFFF0"],
    ISFP: ["#ECC94B", "#FAF089", "#FFFFF0"],
    ESTP: ["#DD6B20", "#F6Ad55", "#FFFAF0"],
    ESFP: ["#ED8936", "#FBD38D", "#FFFAF0"],
  };

  const currentPalette = typePalettes[type] || ["#CCCCCC", "#DDDDDD", "#EEEEEE"];

  // Mock Data for "Today's Connection"
  const randomFandomChar = "The Jim to your Pam";

  // Dynamic Scenarios Link
  const scenarios = [
    { title: `${type} in a Zombie Apocalypse`, icon: "🧟" },
    { title: `Dating a ${type}`, icon: "💘" },
    { title: `How ${type} handles stress`, icon: "🤯" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-nunito bg-[#F0F4F8]">
      {/* Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob-1"></div>
        <div className="aurora-blob aurora-blob-2"></div>
      </div>

      <nav className="relative z-10 py-6 px-6">
        <div className="container mx-auto max-w-lg md:max-w-4xl flex items-center justify-between">
          <Link to={`/${lang}`} className="clay-card rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform">
            <span className="text-xl">←</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>

      <main className="relative z-10 px-6 pb-20">
        <div className="container mx-auto max-w-lg md:max-w-4xl">

          {/* 1. HERO CARD (K-UI Style) */}
          <header
            className="clay-card p-8 mb-8 text-center relative overflow-hidden"
            style={{
              borderRadius: '32px',
              background: `linear-gradient(135deg, ${colors.bg}, white)`
            }}
          >
            <div className="relative z-10">
              <div className="text-8xl mb-4 emoji-pop animate-float">{typeEmoji}</div>
              <h1 className="text-6xl font-black text-slate-800 tracking-tight leading-none mb-1">{type}</h1>
              <p className="text-xl font-bold text-slate-600 bg-white/50 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
                {t(`types.${type}.vibe.korean_title`) || typeName}
              </p>
            </div>
          </header>

          {/* 2. VIBE GRID (2x2 Bento) */}
          <section className="grid grid-cols-2 gap-4 mb-8">

            {/* Totem Card */}
            <div className="clay-card p-6 flex flex-col items-center justify-center text-center aspect-square" style={{ borderRadius: '24px' }}>
              <div className="text-5xl mb-2 emoji-pop">{t(`types.${type}.vibe.totem`) || "🐾"}</div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">SPIRIT ANIMAL</span>
            </div>

            {/* Lucky Item Card */}
            <div className="clay-card p-6 flex flex-col items-center justify-center text-center aspect-square" style={{ borderRadius: '24px' }}>
              <div className="text-4xl mb-3 emoji-pop">🎒</div>
              <span className="text-sm font-bold text-slate-700 leading-tight">
                {t(`types.${type}.vibe.lucky_item`) || "Mystery Item"}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">LUCKY ITEM</span>
            </div>

            {/* Color Palette Card */}
            <div className="clay-card p-6 flex flex-col items-center justify-center aspect-square" style={{ borderRadius: '24px' }}>
              <div className="flex -space-x-2 mb-3">
                {currentPalette.map((color, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white shadow-md" style={{ backgroundColor: color }}></div>
                ))}
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">AESTHETIC</span>
            </div>

            {/* Superpower Card */}
            <div className="clay-card p-6 flex flex-col items-center justify-center text-center aspect-square bg-gradient-to-br from-white to-slate-50" style={{ borderRadius: '24px' }}>
              <div className="text-3xl mb-2">⚡</div>
              <span className="text-md font-extrabold text-slate-800 leading-tight">
                "{t(`types.${type}.vibe.superpower`) || "Being awesome"}"
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">SUPERPOWER</span>
            </div>

          </section>

          {/* 3. WIDGET: Today's Connection */}
          <section className="mb-8">
            <div className="clay-card p-6 flex items-center gap-4 bg-gradient-to-r from-pink-50 to-purple-50" style={{ borderRadius: '24px' }}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">
                💞
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase">Today's Soulmate</h3>
                <p className="text-lg font-black text-slate-800">{randomFandomChar}</p>
                <p className="text-xs text-slate-500">from The Office Universe</p>
              </div>
            </div>
          </section>

          {/* 4. WIDGET: You in Scenarios */}
          <section>
            <h3 className="text-xl font-black text-slate-800 mb-4 px-2">How {type} Survives...</h3>
            <div className="space-y-3">
              {scenarios.map((s, i) => (
                <Link to={`/${lang}/scenarios`} key={i} className="clay-card p-4 flex items-center justify-between hover:scale-[1.02] transition-transform group" style={{ borderRadius: '20px' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:rotate-12 transition-transform">{s.icon}</span>
                    <span className="font-bold text-slate-700">{s.title}</span>
                  </div>
                  <span className="text-slate-300">➔</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Back Button */}
          <div className="text-center mt-12 pb-8">
            <Link to={`/${lang}`} className="inline-block text-slate-400 font-bold hover:text-slate-600 transition-colors">
              Back to Hub
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center">
        <div className="container mx-auto px-6">
          <p className="clay-text text-sm">
            © 2026 MBTI Wiki • Made with 💜
          </p>
        </div>
      </footer>
    </div>
  );
}
