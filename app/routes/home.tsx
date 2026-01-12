import { useTranslation } from "react-i18next";
import { Globe, BookOpen, Info, Sparkles } from "lucide-react";
import { Link } from "react-router";

export default function Home() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const mbtiTypes = [
    "INTJ", "INTP", "ENTJ", "ENTP",
    "INFJ", "INFP", "ENFJ", "ENFP",
    "ISTJ", "ISFJ", "ESTJ", "ESFJ",
    "ISTP", "ISFP", "ESTP", "ESFP"
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "fr", name: "Français" },
    { code: "ru", name: "Русский" }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2d2d2d] dark:bg-[#121212] dark:text-[#e0e0e0]">
      {/* Navigation */}
      <nav className="border-b border-[#e5e0d8] dark:border-[#2d2d2d] bg-white/50 dark:bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#6366f1] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight font-serif italic text-[#1a1a1a] dark:text-white">MBTI Wiki</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-medium bg-[#f0ede6] dark:bg-[#1e1e1e] px-3 py-1.5 rounded-full border border-[#e5e0d8] dark:border-[#333]">
              <Globe className="w-4 h-4 text-[#666]" />
              <select 
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                className="bg-transparent border-none focus:ring-0 cursor-pointer appearance-none pr-1"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-white dark:bg-[#1e1e1e]">{lang.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-16 max-w-7xl">
        <header className="mb-20">
          <div className="flex items-center gap-2 text-[#6366f1] font-bold tracking-widest text-xs uppercase mb-4">
             <span className="w-8 h-[1px] bg-[#6366f1]"></span>
             The Definitive Guide
          </div>
          <h1 className="text-6xl md:text-7xl font-serif font-black mb-8 leading-tight max-w-4xl text-[#1a1a1a] dark:text-white">
            {t("welcome")}
          </h1>
          <p className="text-xl text-[#666] dark:text-[#a0a0a0] max-w-2xl leading-relaxed border-l-4 border-[#6366f1] pl-6 italic">
            {t("description")}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {mbtiTypes.map((type) => (
                <Link 
                  to={`/types/${type}`}
                  key={type}
                  className="group relative aspect-square bg-white dark:bg-[#1e1e1e] p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none border border-[#e5e0d8] dark:border-[#2d2d2d] hover:border-[#6366f1] dark:hover:border-[#6366f1] hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-4xl font-serif font-black text-[#1a1a1a] dark:text-white group-hover:text-[#6366f1] transition-colors">
                      {type}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#999] dark:text-[#666] mb-1 block group-hover:text-[#6366f1] transition-colors">
                      {t(`types.${type}`)}
                    </span>
                    <div className="w-6 h-[2px] bg-[#e5e0d8] dark:bg-[#333] group-hover:bg-[#6366f1] group-hover:w-full transition-all duration-500"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-10">
            <div className="bg-[#f0ede6] dark:bg-[#1e1e1e] p-8 rounded-3xl border border-[#e5e0d8] dark:border-[#2d2d2d]">
              <h2 className="font-serif font-bold text-xl mb-6 flex items-center gap-2 text-[#1a1a1a] dark:text-white">
                <Info className="w-5 h-5 text-[#6366f1]" />
                Exploration
              </h2>
              <ul className="space-y-4">
                {["What is MBTI?", "Test Basics", "Type Relationships", "The 8 Functions"].map((item) => (
                  <li key={item} className="flex items-center gap-3 group cursor-pointer">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] group-hover:scale-150 transition-transform"></span>
                    <span className="text-sm font-medium text-[#666] dark:text-[#a0a0a0] group-hover:text-[#1a1a1a] dark:group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-[#6366f1] text-white shadow-xl shadow-indigo-500/20">
              <BookOpen className="w-8 h-8 mb-4 opacity-50" />
              <h2 className="font-serif font-bold text-xl mb-3">Learn More</h2>
              <p className="text-sm text-indigo-100 leading-relaxed mb-6 opacity-80">
                Dive deep into the psychology behind personality types and human behavior.
              </p>
              <button className="w-full py-3 bg-white text-[#6366f1] rounded-2xl hover:bg-[#fafafa] transition-colors text-sm font-bold uppercase tracking-wider">
                Start Learning
              </button>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-32 border-t border-[#e5e0d8] dark:border-[#2d2d2d] py-16 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 grayscale opacity-50">
             <Sparkles className="w-5 h-5" />
             <span className="font-bold text-lg tracking-tight font-serif italic">MBTI Wiki</span>
          </div>
          <p className="text-[#999] text-sm font-medium tracking-wide">
            © 2026 MBTI GLOBAL WIKI • ELEGANCE IN PERSONALITY
          </p>
        </div>
      </footer>
    </div>
  );
}

