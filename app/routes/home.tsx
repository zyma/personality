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

      {/* Navigation */}
      <nav className="relative z-10 py-6 px-6">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 clay-card flex items-center justify-center" style={{ background: 'linear-gradient(145deg, var(--clay-lavender), var(--clay-lavender-dark))' }}>
              <span className="text-2xl">🧠</span>
            </div>
            <span className="font-black text-2xl" style={{ color: 'var(--text-primary)' }}>MBTI Wiki</span>
          </div>

          {/* Language Selector */}
          <LanguageSwitcher />
        </div>
      </nav>

      {/* Hero Section & Hub */}
      <header className="relative z-10 text-center px-4 pt-12 pb-8 md:pt-20 md:pb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="inline-block mb-4">
            <span className="pill-badge">✨ {t("hero.badge")}</span>
          </div>
          <h1 className="clay-heading clay-heading-xl mb-4">{t("hero.title")}</h1>
          <p className="clay-text text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {t("hero.subtitle")}
          </p>

          {/* Daily Fortune Widget */}
          <div className="max-w-md mx-auto mb-12">
            <div className="fortune-widget">
              <div className="fortune-icon">🔮</div>
              <div className="fortune-text text-left">
                <div className="fortune-label">Daily Fortune</div>
                <div className="fortune-hint">Tap to reveal your vibe today...</div>
              </div>
              <div className="text-2xl text-primary opacity-50">➔</div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-20">
        <div className="container mx-auto max-w-6xl">

          {/* Trending Carousel */}
          <section className="trending-section">
            <div className="trending-title">
              <span>🔥</span> Trending Now
            </div>
            <div className="carousel">
              <div className="carousel-item">
                <span className="carousel-tag">Fandom</span>
                <div className="carousel-headline">The Office Drama</div>
                <div className="carousel-desc">Which character are you?</div>
              </div>
              <div className="carousel-item">
                <span className="carousel-tag">Scenario</span>
                <div className="carousel-headline">Zombie Apocalypse</div>
                <div className="carousel-desc">Survival rate: 0%</div>
              </div>
              <div className="carousel-item">
                <span className="carousel-tag">Scenario</span>
                <div className="carousel-headline">First Date Disaster</div>
                <div className="carousel-desc">Cringe levels rising...</div>
              </div>
            </div>
          </section>

          {/* Bento Navigation */}
          <div className="bento-nav">
            {/* Scenarios - Large Tile */}
            <Link to={`/${currentLang}/scenarios`} className="bento-tile bento-tile-lg">
              <div>
                <div className="bento-tile-icon">🎭</div>
                <div className="bento-tile-title">Scenarios</div>
                <div className="bento-tile-desc">See how each type reacts in chaos</div>
              </div>
              <div className="text-right opacity-50 font-black text-xl">➔</div>
            </Link>

            {/* Fandoms - Small Tile */}
            <Link to={`/${currentLang}/fandoms`} className="bento-tile bento-tile-sm bento-tile-fandoms">
              <div className="bento-tile-icon" style={{ fontSize: '2rem', marginBottom: '8px' }}>📺</div>
              <div className="bento-tile-title" style={{ fontSize: '1.25rem' }}>Fandoms</div>
            </Link>

            {/* Battle Arena - Small Tile */}
            <div className="bento-tile bento-tile-sm bento-tile-battle">
              <div className="bento-tile-icon" style={{ fontSize: '2rem', marginBottom: '8px' }}>⚔️</div>
              <div className="bento-tile-title" style={{ fontSize: '1.25rem' }}>Battle</div>
            </div>
          </div>

          {/* Section Divider */}
          <div className="section-title">
            <span>Explore All Types</span>
          </div>

          {/* Classic Grid - 16 Types */}
          <div className="bento-grid">
            {mbtiTypes.map((type) => (
              <article key={type}>
                <Link
                  to={`/${currentLang}/types/${type}`}
                  className={`clay-card type-card ${typeColors[type]}`}
                >
                  <span className="type-card-emoji">
                    {t(`types.${type}.emoji`)}
                  </span>
                  <span className="type-card-code">{type}</span>
                  <span className="type-card-name">
                    {t(`types.${type}.name`)}
                  </span>
                </Link>
              </article>
            ))}
          </div>

          {/* SEO Content */}
          <div className="mt-16 max-w-3xl mx-auto text-center opacity-80">
            <p className="clay-text text-sm">
              Discover the 16 MBTI personality types with a fresh aesthetic.
              Dive into our clay-style interactive hub to explore psychology,
              relationships, and pop culture through the Myers-Briggs lens.
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
