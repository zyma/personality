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
            to={`/${lang}`}
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

            {/* Main Description from Markdown Body */}
            {content.htmlContent && (
              <div
                className="clay-text text-lg mt-6 max-w-2xl mx-auto prose prose-lg dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: content.htmlContent }}
              />
            )}
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

          {/* Story-like Blocks from Markdown Frontmatter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Superpowers */}
            <div className="clay-card p-8" style={{ background: `linear-gradient(145deg, ${colors.bg}40, white)` }}>
              <div className="emoji-block-icon text-4xl mb-4">💪</div>
              <h2 className="clay-heading text-xl mb-4">{t("sections.superpowers")}</h2>
              <p className="clay-text">
                {content.superpowers || "Content coming soon..."}
              </p>
            </div>

            {/* Annoyances */}
            <div className="clay-card p-8" style={{ background: `linear-gradient(145deg, var(--clay-coral)40, white)` }}>
              <div className="emoji-block-icon text-4xl mb-4">😤</div>
              <h2 className="clay-heading text-xl mb-4">{t("sections.annoyances")}</h2>
              <p className="clay-text">
                {content.annoyances || "Content coming soon..."}
              </p>
            </div>

            {/* Relationships */}
            <div className="clay-card p-8" style={{ background: `linear-gradient(145deg, var(--clay-pink)40, white)` }}>
              <div className="emoji-block-icon text-4xl mb-4">❤️</div>
              <h2 className="clay-heading text-xl mb-4">{t("sections.relationships")}</h2>
              <p className="clay-text">
                {content.relationships || "Content coming soon..."}
              </p>
            </div>

            {/* Career */}
            <div className="clay-card p-8" style={{ background: `linear-gradient(145deg, var(--clay-mint)40, white)` }}>
              <div className="emoji-block-icon text-4xl mb-4">💼</div>
              <h2 className="clay-heading text-xl mb-4">{t("sections.career")}</h2>
              <p className="clay-text">
                {content.career || "Content coming soon..."}
              </p>
            </div>
          </div>

          {/* Back to All Types */}
          <div className="text-center">
            <Link to={`/${lang}`}>
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
