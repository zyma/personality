import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router";
import "~/styles/clay.css";
import LanguageSwitcher from "~/components/LanguageSwitcher";
import { SCENARIOS_DATA, TYPES_DATA } from "~/data/mock";
import type { Route } from "./+types/scenarios";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Daily MBTI Scenarios | Soft Pop React" },
        { name: "description", content: "What would an INTJ do in a zombie apocalypse? See how every type handles crazy situations." },
        { property: "og:title", content: "MBTI Scenarios: How would you react?" },
        { property: "og:description", content: "From zombie survival to first dates - see the MBTI breakdown." },
        { property: "og:image", content: "/og-image-scenarios.png" },
    ];
};

export default function Scenarios() {
    const { t } = useTranslation();
    const { lang } = useParams();

    // Prototype: Just showing the first scenario fully expanded
    const scenario = SCENARIOS_DATA[0]; // Zombie Apocalypse
    const otherScenarios = SCENARIOS_DATA.slice(1);

    return (
        <div className="min-h-screen relative overflow-hidden font-nunito bg-[#F0F4F8]">
            <div className="aurora-bg">
                <div className="aurora-blob aurora-blob-1"></div>
                <div className="aurora-blob aurora-blob-2"></div>
            </div>

            <nav className="relative z-10 py-6 px-6">
                <div className="container mx-auto max-w-lg md:max-w-2xl flex items-center justify-between">
                    <Link to={`/${lang}`} className="clay-card rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform">
                        <span className="text-xl">←</span>
                    </Link>
                    <LanguageSwitcher />
                </div>
            </nav>

            <main className="relative z-10 px-4 pb-20">
                <div className="container mx-auto max-w-lg md:max-w-2xl">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-black uppercase tracking-wider inline-block mb-4">
                            {t("home.scenario_tag")}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-2">
                            {scenario.title}
                        </h1>
                        <p className="text-xl text-slate-500 font-bold max-w-md mx-auto">
                            {scenario.desc}
                        </p>
                    </div>

                    {/* Reaction List */}
                    <div className="space-y-4">
                        {scenario.reactions.map((reaction, i) => {
                            // @ts-ignore
                            const typeData = TYPES_DATA[reaction.type];
                            return (
                                <div key={i} className="clay-card p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform">

                                    {/* Avatar Left */}
                                    <Link to={`/${lang}/types/${reaction.type}`} className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white flex flex-col items-center justify-center shadow-inner">
                                        <span className="text-3xl emoji-pop">{typeData?.totem || t(`types.${reaction.type}.vibe.totem`)}</span>
                                        <span className="text-[10px] font-black text-slate-400 mt-1">{reaction.type}</span>
                                    </Link>

                                    {/* Text Right */}
                                    <div>
                                        <p className="text-slate-800 font-bold leading-tight">
                                            "{reaction.text}"
                                        </p>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                    {/* Other Scenarios Link */}
                    <div className="mt-12">
                        <h3 className="text-xl font-black text-slate-800 mb-4 px-2">{t("scenarios.more")}</h3>
                        <div className="grid gap-4">
                            {otherScenarios.map((s) => (
                                <div key={s.id} className="clay-card p-4 flex justify-between items-center opacity-60 hover:opacity-100 transition-opacity cursor-not-allowed">
                                    <span className="font-bold text-slate-700">{s.title}</span>
                                    <span className="text-xs bg-slate-200 px-2 py-1 rounded">{t("common.locked")}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
