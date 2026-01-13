import { useTranslation } from "react-i18next";
import { useParams, Link, useLoaderData } from "react-router";
import { getContentPage } from "~/lib/markdown";
import type { Route } from "./+types/profile";
import "~/styles/clay.css";
import LanguageSwitcher from "~/components/LanguageSwitcher";
import { TYPES_DATA } from "~/data/mock";
import JsonLd from "~/components/JsonLd";

export const meta: Route.MetaFunction = ({ params }) => {
  const type = params.type || "INTJ";
  // @ts-ignore
  const data = TYPES_DATA[type] || TYPES_DATA.INTJ;
  return [
    { title: `${type} Dashboard | ${data.name} | MBTI Vibes` },
    { name: "description", content: `Explore the ${data.korean_title} (${type}) vibe. Check superpowers, totems, and daily connections.` },
    { property: "og:title", content: `${type} (${data.name}) Profile Dashboard` },
    { property: "og:description", content: `Spirit Animal: ${data.totem} | Superpower: ${data.superpower}` },
    { property: "og:image", content: `/og-image-${type}.png` },
  ];
};

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

  // Get Data from Mock (Prototype Source)
  // @ts-ignore
  const mockType = TYPES_DATA[type] || TYPES_DATA.INTJ; // Fallback to INTJ

  const colors = (page?.color_group && groupColors[page.color_group]) || groupColors.analyst;
  const typeName = mockType.name;
  const typeEmoji = (mockType.totem || page?.emoji || "✨") as string;

  const currentPalette = mockType.palette;

  // Characteristic Logic (Localized)
  const stats = [
    { label: t("dashboard.traits.introversion"), value: type.includes("I") ? 75 : 25, side: t("dashboard.traits.extraversion") },
    { label: t("dashboard.traits.sensing"), value: type.includes("S") ? 70 : 30, side: t("dashboard.traits.intuition") },
    { label: t("dashboard.traits.thinking"), value: type.includes("T") ? 65 : 35, side: t("dashboard.traits.feeling") },
    { label: t("dashboard.traits.judging"), value: type.includes("J") ? 80 : 20, side: t("dashboard.traits.perceiving") },
  ];

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": type,
    "alternateName": typeName,
    "description": mockType.superpower,
    "image": `/avatars/${type}.png`,
  };

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
              background: `linear-gradient(135deg, ${mockType.color}20, white)`
            }}
          >
            <div className="relative z-10">
              <div className="text-8xl mb-4 emoji-pop animate-float">{typeEmoji}</div>
              <h1 className="text-6xl font-black text-slate-800 tracking-tight leading-none mb-1">{type}</h1>
              <p className="text-xl font-bold text-slate-600 bg-white/50 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
                {t(`types.${type}.vibe.korean_title`)}
              </p>
            </div>
          </header>

          <section className="clay-card p-6 mb-8">
            <h3 className="text-xl font-black text-slate-800 mb-6">{t("dashboard.bars_title")}</h3>
            <div className="space-y-6">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    <span>{s.label}</span>
                    <span>{s.side}</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner flex">
                    <div
                      className="h-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${s.value}%`,
                        background: `linear-gradient(90deg, ${mockType.color}, ${mockType.palette[1]})`,
                        borderRadius: 'var(--radius-pill)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. VIBE GRID (2x2 Bento) */}
          <section className="grid grid-cols-2 gap-4 mb-8">

            {/* Totem Card */}
            <div className="clay-card p-6 flex flex-col items-center justify-center text-center aspect-square" style={{ borderRadius: '24px' }}>
              <div className="text-5xl mb-2 emoji-pop">{mockType.totem}</div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("dashboard.spirit_animal")}</span>
            </div>

            {/* Lucky Item Card */}
            <div className="clay-card p-6 flex flex-col items-center justify-center text-center aspect-square" style={{ borderRadius: '24px' }}>
              <div className="text-4xl mb-3 emoji-pop">🎒</div>
              <span className="text-sm font-bold text-slate-700 leading-tight">
                {t(`types.${type}.vibe.lucky_item`)}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{t("dashboard.lucky_item")}</span>
            </div>

            {/* Color Palette Card */}
            <div className="clay-card p-6 flex flex-col items-center justify-center aspect-square" style={{ borderRadius: '24px' }}>
              <div className="flex -space-x-2 mb-3">
                {currentPalette.map((color: string, i: number) => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white shadow-md" style={{ backgroundColor: color }}></div>
                ))}
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("dashboard.aesthetic")}</span>
            </div>

            {/* Superpower Card */}
            <div className="clay-card p-6 flex flex-col items-center justify-center text-center aspect-square bg-gradient-to-br from-white to-slate-50" style={{ borderRadius: '24px' }}>
              <div className="text-3xl mb-2">⚡</div>
              <span className="text-md font-extrabold text-slate-800 leading-tight">
                "{t(`types.${type}.vibe.superpower`)}"
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{t("dashboard.superpower")}</span>
            </div>

          </section>

          <section className="clay-card p-8 mb-8 text-center bg-white/40 backdrop-blur-md">
            <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner">
              🏠
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">{t("dashboard.room_title")}</h3>
            <p className="text-slate-500 font-bold text-sm mb-6">{t("dashboard.room_desc")}</p>
            <button className="clay-button text-sm px-6 py-3 bg-white hover:bg-slate-50 scale-90 opacity-60 cursor-not-allowed">
              {t("common.coming_soon")}
            </button>
          </section>

          <JsonLd data={jsonLdData} />

          {/* 3. WIDGET: Today's Connection */}
          <section className="mb-8">
            <div className="clay-card p-6 flex items-center gap-4 bg-gradient-to-r from-pink-50 to-purple-50" style={{ borderRadius: '24px' }}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">
                💞
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase">{t("dashboard.soulmate_title")}</h3>
                <p className="text-lg font-black text-slate-800">{randomFandomChar}</p>
                <p className="text-xs text-slate-500">{t("dashboard.from_universe", { universe: "The Office" })}</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-black text-slate-800 mb-4 px-2">{t("dashboard.how_survives", { type })}</h3>
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

          <div className="text-center mt-12 pb-8">
            <Link to={`/${lang}`} className="inline-block text-slate-400 font-bold hover:text-slate-600 transition-colors">
              {t("common.back_to_hub")}
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
