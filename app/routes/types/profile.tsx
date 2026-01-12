import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router";
import "~/styles/clay.css";
import LanguageSwitcher from "~/components/LanguageSwitcher";

// Type card color assignments
// Type card color assignments (Semantic Groups)
// Analysts (Lilac), Diplomats (Mint), Sentinels (Sky), Explorers (Lemon)
const typeColors: Record<string, { bg: string; dark: string }> = {
  // Analysts
  INTJ: { bg: "#e2d1f9", dark: "#c9b3e6" },
  INTP: { bg: "#e2d1f9", dark: "#c9b3e6" },
  ENTJ: { bg: "#e2d1f9", dark: "#c9b3e6" },
  ENTP: { bg: "#e2d1f9", dark: "#c9b3e6" },

  // Diplomats
  INFJ: { bg: "#c8f7dc", dark: "#9ee7c0" },
  INFP: { bg: "#c8f7dc", dark: "#9ee7c0" },
  ENFJ: { bg: "#c8f7dc", dark: "#9ee7c0" },
  ENFP: { bg: "#c8f7dc", dark: "#9ee7c0" },

  // Sentinels
  ISTJ: { bg: "#bde0fe", dark: "#89c4f4" },
  ISFJ: { bg: "#bde0fe", dark: "#89c4f4" },
  ESTJ: { bg: "#bde0fe", dark: "#89c4f4" },
  ESFJ: { bg: "#bde0fe", dark: "#89c4f4" },

  // Explorers
  ISTP: { bg: "#fef3c7", dark: "#fde68a" },
  ISFP: { bg: "#fef3c7", dark: "#fde68a" },
  ESTP: { bg: "#fef3c7", dark: "#fde68a" },
  ESFP: { bg: "#fef3c7", dark: "#fde68a" },
};

export default function TypePage() {
  const { type } = useParams();
  const { t } = useTranslation();

  const colors = typeColors[type as string] || { bg: "#e2d1f9", dark: "#c9b3e6" };
  const typeName = t(`types.${type}.name`);
  const typeEmoji = t(`types.${type}.emoji`);

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
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <Link
            to="/"
            className="clay-card px-5 py-3 flex items-center gap-2 hover:scale-105 transition-transform"
            style={{ background: 'white', textDecoration: 'none' }}
          >
            <span className="text-xl">←</span>
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
              MBTI Wiki
            </span>
          </Link>

          {/* Language Selector */}
          <LanguageSwitcher />
        </div>
      </nav>

      <main className="relative z-10 px-6 pb-20">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Header */}
          <header className="text-center py-12">
            {/* Large Character Emoji */}
            <div
              className="clay-card w-32 h-32 mx-auto mb-8 flex items-center justify-center"
              style={{ background: `linear-gradient(145deg, ${colors.bg}, ${colors.dark})` }}
            >
              <span className="text-6xl">{typeEmoji}</span>
            </div>

            {/* Type Code */}
            <h1 className="clay-heading text-6xl md:text-7xl mb-4">{type}</h1>

            {/* Type Name */}
            <p className="clay-text text-2xl font-semibold" style={{ color: 'var(--text-secondary)' }}>
              {typeName}
            </p>
          </header>

          {/* Trait Progress Bars */}
          <section className="mb-12">
            <div className="clay-card p-8" style={{ background: 'white' }}>
              <h2 className="clay-heading text-xl mb-6">🧬 {t("sections.superpowers") || "Personality Traits"}</h2>

              <div className="space-y-6">
                {/* Introversion/Extraversion */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Introversion</span>
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Extraversion</span>
                  </div>
                  <div className="puffy-progress">
                    <div
                      className="puffy-progress-fill"
                      style={{
                        width: type?.startsWith('E') ? '75%' : '25%',
                        background: `linear-gradient(145deg, ${colors.bg}, ${colors.dark})`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Sensing/Intuition */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Sensing</span>
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Intuition</span>
                  </div>
                  <div className="puffy-progress">
                    <div
                      className="puffy-progress-fill"
                      style={{
                        width: type?.includes('N') ? '70%' : '30%',
                        background: `linear-gradient(145deg, var(--clay-sky), var(--clay-sky-dark))`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Thinking/Feeling */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Thinking</span>
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Feeling</span>
                  </div>
                  <div className="puffy-progress">
                    <div
                      className="puffy-progress-fill"
                      style={{
                        width: type?.includes('F') ? '65%' : '35%',
                        background: `linear-gradient(145deg, var(--clay-pink), var(--clay-pink-dark))`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Judging/Perceiving */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Judging</span>
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Perceiving</span>
                  </div>
                  <div className="puffy-progress">
                    <div
                      className="puffy-progress-fill"
                      style={{
                        width: type?.endsWith('P') ? '70%' : '30%',
                        background: `linear-gradient(145deg, var(--clay-lemon), var(--clay-lemon-dark))`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Story-like Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Superpowers */}
            <div className="clay-card p-8" style={{ background: `linear-gradient(145deg, ${colors.bg}40, white)` }}>
              <div className="emoji-block-icon text-4xl mb-4">💪</div>
              <h2 className="clay-heading text-xl mb-4">{t("sections.superpowers")}</h2>
              <p className="clay-text">
                {type} types are known for their exceptional analytical abilities and strategic thinking.
                They excel at seeing the big picture while managing complex details.
              </p>
            </div>

            {/* Annoyances */}
            <div className="clay-card p-8" style={{ background: `linear-gradient(145deg, var(--clay-coral)40, white)` }}>
              <div className="emoji-block-icon text-4xl mb-4">😤</div>
              <h2 className="clay-heading text-xl mb-4">{t("sections.annoyances")}</h2>
              <p className="clay-text">
                Inefficiency and illogical decisions can frustrate {type} personalities.
                They prefer well-thought-out plans over spontaneous chaos.
              </p>
            </div>

            {/* Relationships */}
            <div className="clay-card p-8" style={{ background: `linear-gradient(145deg, var(--clay-pink)40, white)` }}>
              <div className="emoji-block-icon text-4xl mb-4">❤️</div>
              <h2 className="clay-heading text-xl mb-4">{t("sections.relationships")}</h2>
              <p className="clay-text">
                In relationships, {type} individuals value deep intellectual connection and loyalty.
                They seek partners who appreciate their unique perspective.
              </p>
            </div>

            {/* Career */}
            <div className="clay-card p-8" style={{ background: `linear-gradient(145deg, var(--clay-mint)40, white)` }}>
              <div className="emoji-block-icon text-4xl mb-4">💼</div>
              <h2 className="clay-heading text-xl mb-4">{t("sections.career")}</h2>
              <p className="clay-text">
                {type} types thrive in roles that require problem-solving and innovation.
                They make excellent strategists, architects, and leaders.
              </p>
            </div>
          </div>

          {/* Back to All Types */}
          <div className="text-center">
            <Link to="/">
              <button className="clay-button">
                🏠 {t("hero.badge") || "Explore All Types"}
              </button>
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
