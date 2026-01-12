import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router";
import { ArrowLeft, Brain, Target, Heart, Briefcase } from "lucide-react";

export default function TypePage() {
  const { type } = useParams();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2d2d2d] dark:bg-[#121212] dark:text-[#e0e0e0]">
      <nav className="border-b border-[#e5e0d8] dark:border-[#2d2d2d] bg-white/50 dark:bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[#6366f1] font-bold hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            Back to Wiki
          </Link>
          <span className="font-serif italic font-bold text-xl">{type} Profile</span>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-16 max-w-4xl">
        <header className="mb-16">
          <h1 className="text-6xl font-serif font-black mb-4 text-[#1a1a1a] dark:text-white uppercase tracking-tight">
            {type}: {t(`types.${type}`)}
          </h1>
          <div className="w-24 h-1.5 bg-[#6366f1] rounded-full"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-3xl border border-[#e5e0d8] dark:border-[#2d2d2d]">
            <Brain className="w-8 h-8 text-[#6366f1] mb-4" />
            <h2 className="text-xl font-serif font-bold mb-3">Core Strengths</h2>
            <p className="text-[#666] dark:text-[#a0a0a0] leading-relaxed">
              Description of {type}'s key strengths and mental processing patterns goes here.
            </p>
          </div>
          <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-3xl border border-[#e5e0d8] dark:border-[#2d2d2d]">
            <Target className="w-8 h-8 text-[#6366f1] mb-4" />
            <h2 className="text-xl font-serif font-bold mb-3">Growth Areas</h2>
            <p className="text-[#666] dark:text-[#a0a0a0] leading-relaxed">
              Potential challenges and development paths for the {type} personality.
            </p>
          </div>
        </div>

        <section className="prose prose-slate dark:prose-invert max-w-none space-y-12 text-lg leading-relaxed text-[#444] dark:text-[#bbb]">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] dark:text-white mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-400" /> Relationships
            </h3>
            <p>Details about how {type} interacts with others, their communication style, and ideal partners.</p>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] dark:text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-orange-400" /> Career Path
            </h3>
            <p>Work environments where {type} individuals typically thrive and common professional roles.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
