import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router";
import "~/styles/clay.css";
import LanguageSwitcher from "~/components/LanguageSwitcher";
import { FANDOMS_DATA, TYPES_DATA } from "~/data/mock";
import type { Route } from "./+types/fandoms";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Pop Culture MBTI Database | Fandom Vibes" },
        { name: "description", content: "Discover the MBTI types of characters from Harry Potter, The Office, and more. Find your fictional soulmate!" },
        { property: "og:title", content: "Fandom MBTI Database: Who matches your vibe?" },
        { property: "og:description", content: "Explore character personalities in a Soft Pop universe." },
        { property: "og:image", content: "/og-image-fandoms.png" },
    ];
};

export default function Fandoms() {
    const { t } = useTranslation();
    const { lang } = useParams();

    // Prototype: Just showing "Harry Potter" fully expanded
    const fandom = FANDOMS_DATA[0];

    return (
        <div className="min-h-screen relative overflow-hidden font-nunito bg-[#F0F4F8]">
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

            <main className="relative z-10 px-4 pb-20">
                <div className="container mx-auto max-w-lg md:max-w-4xl">

                    {/* Hero Banner */}
                    <header className="clay-card p-8 mb-8 text-center bg-gradient-to-br from-indigo-900 to-purple-800 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="text-6xl mb-4 animate-pulse">{fandom.poster_img}</div>
                            <h1 className="text-5xl font-black tracking-tight mb-2">{fandom.title}</h1>
                            <p className="text-xl font-bold opacity-80">{fandom.vibe_text}</p>
                        </div>
                    </header>

                    {/* Character Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {fandom.characters.map((char, i) => {
                            // @ts-ignore
                            const typeInfo = TYPES_DATA[char.type];
                            return (
                                <Link to={`/${lang}/types/${char.type}`} key={i} className="clay-card p-4 flex flex-col items-center text-center hover:scale-105 transition-transform group">
                                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl mb-3 shadow-inner group-hover:bg-purple-100 transition-colors">
                                        {typeInfo?.totem || t(`types.${char.type}.vibe.totem`)}
                                    </div>
                                    <h3 className="font-bold text-slate-800 leading-tight mb-1">{char.name}</h3>
                                    <span className="bg-slate-200 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-full">
                                        {char.type}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Other Fandoms (Locked) */}
                    <div className="mt-12 opacity-50">
                        <h3 className="text-xl font-bold text-slate-400 mb-4 px-2 uppercase tracking-widest">{t("fandoms.also_trending")}</h3>
                        <div className="clay-card p-4 flex items-center gap-4 grayscale">
                            <div className="text-3xl">☕</div>
                            <div className="font-bold text-slate-500">{t("bento.fandom.title")} ({t("common.coming_soon")})</div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
