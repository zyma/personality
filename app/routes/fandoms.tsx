import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import "~/styles/clay.css";
import LanguageSwitcher from "~/components/LanguageSwitcher";
import type { Route } from "./+types/fandoms";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Fandoms | MBTI Wiki" },
        { name: "description", content: "Explore personality types in pop culture and fiction." },
    ];
};

export default function FandomsPage() {
    const { t, i18n } = useTranslation();
    const { lang } = useParams();
    const currentLang = lang || i18n.language;

    // Manual list of fandoms created in Phase 1
    const fandoms = [
        { id: "office_drama", icon: "🏢", title: "Office Drama", desc: "Corporate chaos archetypes" },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {/* Aurora Background */}
            <div className="aurora-bg">
                <div className="aurora-blob aurora-blob-1"></div>
                <div className="aurora-blob aurora-blob-2"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-10 py-6 px-6">
                <div className="container mx-auto max-w-6xl flex items-center justify-between">
                    <Link to={`/${currentLang}`} className="clay-card px-5 py-3 flex items-center gap-2 hover:scale-105 transition-transform text-decoration-none">
                        <span className="text-xl">←</span>
                        <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Home</span>
                    </Link>
                    <LanguageSwitcher />
                </div>
            </nav>

            <main className="relative z-10 px-4 pb-20">
                <div className="container mx-auto max-w-4xl">
                    <header className="text-center mb-12">
                        <h1 className="clay-heading clay-heading-lg mb-4">📺 Fandoms</h1>
                        <p className="clay-text text-lg">Typing your favorite characters.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {fandoms.map((item) => (
                            <Link key={item.id} to={`/${currentLang}/fandoms/${item.id}`} className="clay-card p-6 flex items-start gap-4 hover:scale-[1.02] transition-transform text-decoration-none">
                                <div className="text-4xl">{item.icon}</div>
                                <div>
                                    <h3 className="clay-heading text-xl mb-2">{item.title}</h3>
                                    <p className="clay-text">{item.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
