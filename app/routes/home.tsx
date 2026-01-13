import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import "~/styles/clay.css";
import LanguageSwitcher from "~/components/LanguageSwitcher";
import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "MBTI Personality Types: Discover Who You Are | 16 Personalities" },
    { name: "description", content: "Explore the 16 MBTI personality types. Take the test and understand your strengths, relationships, and career paths. Simple, fun, and accurate." },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { property: "og:title", content: "MBTI Personality Types: Discover Who You Are" },
    { property: "og:description", content: "Explore the 16 MBTI personality types and understand your potential." },
    { property: "og:type", content: "website" },
  ];
};

// Type card color assignments (Semantic Groups)
const typeColors: Record<string, string> = {
  // Analysts (Lilac)
  INTJ: "clay-card-lavender",
  INTP: "clay-card-lavender",
  ENTJ: "clay-card-lavender",
  ENTP: "clay-card-lavender",

  // Diplomats (Mint)
  INFJ: "clay-card-mint",
  INFP: "clay-card-mint",
  ENFJ: "clay-card-mint",
  ENFP: "clay-card-mint",

  // Sentinels (Sky Blue)
  ISTJ: "clay-card-sky",
  ISFJ: "clay-card-sky",
  ESTJ: "clay-card-sky",
  ESFJ: "clay-card-sky",

  // Explorers (Lemon Yellow)
  ISTP: "clay-card-lemon",
  ISFP: "clay-card-lemon",
  ESTP: "clay-card-lemon",
  ESFP: "clay-card-lemon",
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language;

  const mbtiTypes = [
    "INTJ", "INTP", "ENTJ", "ENTP",
    "INFJ", "INFP", "ENFJ", "ENFP",
    "ISTJ", "ISFJ", "ESTJ", "ESFJ",
    "ISTP", "ISFP", "ESTP", "ESFP"
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob-1"></div>
        <div className="aurora-blob aurora-blob-2"></div>
        <div className="aurora-blob aurora-blob-3"></div>
        <div className="aurora-blob aurora-blob-4"></div>
      </div>

      {/* Header: Clean Title + Fortune Widget */}
      <header className="relative z-10 px-6 py-8 flex items-center justify-between container mx-auto max-w-lg md:max-w-4xl">
        {/* Left: Site Title */}
        <div className="flex flex-col">
          <h1 className="clay-heading text-2xl md:text-3xl leading-none" style={{ color: 'var(--text-primary)' }}>
            {t("brand.title")}
          </h1>
          <span className="clay-text text-sm font-bold opacity-60">{t("brand.subtitle")}</span>
        </div>

        {/* Right: Floating Fortune Cookie */}
        <div className="clay-card rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
          <span className="text-2xl emoji-pop">🥠</span>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-20">
        <div className="container mx-auto max-w-lg md:max-w-4xl">

          {/* Bento Grid */}
          <div className="bento-nav">
            {/* Scenarios - Large Tile */}
            <Link to={`/${currentLang}/scenarios`} className="bento-tile bento-tile-lg">
              <div>
                <span className="bento-tag">{t("bento.scenario.tag")}</span>
                <div className="bento-title whitespace-pre-line">{t("bento.scenario.title")}</div>
                <div className="bento-desc mt-2">{t("bento.scenario.desc")}</div>
              </div>
              <div className="text-right">
                <span className="bento-emoji">🧟</span>
              </div>
            </Link>

            {/* Battle Arena */}
            <Link to={`/${currentLang}/battle`} className="bento-tile bento-tile-sm bento-tile-battle">
              <span className="bento-tag">{t("bento.battle.tag")}</span>
              <div className="flex justify-between items-end">
                <span className="bento-title text-xl whitespace-pre-line">{t("bento.battle.title")}</span>
                <span className="bento-emoji text-3xl">🥊</span>
              </div>
            </Link>

            {/* Fandoms */}
            <Link to={`/${currentLang}/fandoms`} className="bento-tile bento-tile-sm bento-tile-fandoms">
              <span className="bento-tag">{t("bento.fandom.tag")}</span>
              <div className="flex justify-between items-end">
                <span className="bento-title text-xl whitespace-pre-line">{t("bento.fandom.title")}</span>
                <span className="bento-emoji text-3xl">☕</span>
              </div>
            </Link>
          </div>

          {/* Section Divider */}
          <div className="section-title">
            <span>{t("home.choose_type")}</span>
          </div>

          {/* Classic Grid - 16 Types (Vertical Pills) */}
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {mbtiTypes.map((type) => (
              <Link
                key={type}
                to={`/${currentLang}/types/${type}`}
                className="type-card"
              >
                <span className="type-card-emoji emoji-pop">
                  {t(`types.${type}.emoji`)}
                </span>
                <span className="type-card-code">{type}</span>
              </Link>
            ))}
          </div>

          {/* SEO Content */}
          <div className="mt-16 max-w-3xl mx-auto text-center opacity-80 hidden md:block">
            <p className="clay-text text-sm">
              Discover the 16 MBTI personality types with a fresh aesthetic.
              Dive into our clay-style interactive hub.
            </p>
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
