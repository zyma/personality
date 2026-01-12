import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import "~/styles/clay.css";
import LanguageSwitcher from "~/components/LanguageSwitcher";

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
  const { t } = useTranslation();

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

      {/* Hero Section */}
      <header className="relative z-10 text-center px-6 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
          {/* Badge */}
          <div className="inline-block mb-6">
            <span className="pill-badge">
              ✨ {t("hero.badge")}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="clay-heading clay-heading-xl mb-6">
            {t("hero.title")}
          </h1>

          {/* Subtitle */}
          <p className="clay-text text-lg md:text-xl max-w-2xl mx-auto mb-10">
            {t("hero.subtitle")}
          </p>

          {/* CTA Button */}
          <button className="clay-button text-lg">
            🔮 {t("hero.cta")}
          </button>
        </div>
      </header>

      {/* Bento Grid - 16 Types */}
      <main className="relative z-10 px-4 pb-20">
        <div className="container mx-auto max-w-5xl">
          <div className="bento-grid">
            {mbtiTypes.map((type) => (
              <Link
                to={`/types/${type}`}
                key={type}
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
            ))}
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
