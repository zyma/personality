import { useTranslation } from "react-i18next";
import { Globe, BookOpen, Users, Info } from "lucide-react";

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
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl tracking-tight">MBTI Wiki</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Globe className="w-4 h-4" />
              <select 
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                className="bg-transparent border-none focus:ring-0 cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {t("welcome")}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <aside className="md:col-span-1 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h2 className="font-bold mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Quick Links
              </h2>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">What is MBTI?</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Test Basics</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Type Relationships</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50">
              <h2 className="font-bold mb-2 flex items-center gap-2 text-blue-900 dark:text-blue-100">
                <Users className="w-4 h-4" />
                Community
              </h2>
              <p className="text-sm text-blue-800 dark:text-blue-200/70 mb-4">
                Join our international community of personality enthusiasts.
              </p>
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors text-sm font-semibold">
                Join Discussion
              </button>
            </div>
          </aside>

          <div className="md:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {mbtiTypes.map((type) => (
              <div 
                key={type}
                className="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
              >
                <span className="text-2xl font-black mb-2 text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                  {type}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                  {t(`types.${type}`)}
                </span>
                <div className="w-8 h-1 bg-slate-100 dark:bg-slate-800 rounded-full group-hover:bg-blue-600 group-hover:w-12 transition-all"></div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-24 border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2026 MBTI Wiki. Built with React Router 7.</p>
        </div>
      </footer>
    </div>
  );
}
