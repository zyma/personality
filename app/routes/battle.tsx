import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { Trophy, Swords, RefreshCw, Sparkles } from "lucide-react";
import "~/styles/clay.css";
import LanguageSwitcher from "~/components/LanguageSwitcher";
import type { Route } from "./+types/battle";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "MBTI Battle Arena | Who Wins?" },
        { name: "description", content: "Simulate battles between personality types. Chaos vs Order. Logic vs Feeling." },
    ];
};

const TYPES = [
    "INTJ", "INTP", "ENTJ", "ENTP",
    "INFJ", "INFP", "ENFJ", "ENFP",
    "ISTJ", "ISFJ", "ESTJ", "ESFJ",
    "ISTP", "ISFP", "ESTP", "ESFP"
];

const EMOJIS: Record<string, string> = {
    INTJ: "🦉", INTP: "🐙", ENTJ: "🦁", ENTP: "🦊",
    INFJ: "🦋", INFP: "🦌", ENFJ: "🐬", ENFP: "🦜",
    ISTJ: "🐝", ISFJ: "🐻", ESTJ: "🦅", ESFJ: "🐕",
    ISTP: "🐆", ISFP: "🦢", ESTP: "🦈", ESFP: "🦚"
};

// Simple "Power Stats" for simulation fun
// Scale 1-10: Chaos, Logic, Empathy, Stubbornness
const STATS: Record<string, { chaos: number, logic: number, empathy: number, stubborn: number }> = {
    INTJ: { chaos: 2, logic: 10, empathy: 3, stubborn: 9 },
    INTP: { chaos: 6, logic: 10, empathy: 2, stubborn: 8 },
    ENTJ: { chaos: 3, logic: 9, empathy: 2, stubborn: 10 },
    ENTP: { chaos: 10, logic: 8, empathy: 4, stubborn: 7 },

    INFJ: { chaos: 2, logic: 5, empathy: 10, stubborn: 8 },
    INFP: { chaos: 6, logic: 3, empathy: 10, stubborn: 6 },
    ENFJ: { chaos: 3, logic: 4, empathy: 10, stubborn: 7 },
    ENFP: { chaos: 9, logic: 3, empathy: 9, stubborn: 5 },

    ISTJ: { chaos: 0, logic: 9, empathy: 4, stubborn: 10 },
    ISFJ: { chaos: 1, logic: 4, empathy: 9, stubborn: 6 },
    ESTJ: { chaos: 2, logic: 8, empathy: 3, stubborn: 10 },
    ESFJ: { chaos: 3, logic: 3, empathy: 9, stubborn: 7 },

    ISTP: { chaos: 5, logic: 9, empathy: 2, stubborn: 8 },
    ISFP: { chaos: 5, logic: 2, empathy: 8, stubborn: 5 },
    ESTP: { chaos: 9, logic: 7, empathy: 3, stubborn: 6 },
    ESFP: { chaos: 8, logic: 2, empathy: 8, stubborn: 4 },
};

export default function BattlePage() {
    const { t, i18n } = useTranslation();
    const { lang } = useParams();
    const currentLang = lang || i18n.language;

    const [fighter1, setFighter1] = useState<string | null>(null);
    const [fighter2, setFighter2] = useState<string | null>(null);
    const [winner, setWinner] = useState<string | null>(null);
    const [battleLog, setBattleLog] = useState<string>("");
    const [isFighting, setIsFighting] = useState(false);

    const handleFight = () => {
        if (!fighter1 || !fighter2) return;
        setIsFighting(true);
        setWinner(null);
        setBattleLog("");

        // Simulate "Calculation" delay
        setTimeout(() => {
            const stats1 = STATS[fighter1];
            const stats2 = STATS[fighter2];

            // Battle Logic: 
            // 1. Logic beats Chaos (usually)
            // 2. Stubbornness beats Empathy
            // 3. Chaos confuses Logic (random upset chance)

            let score1 = stats1.logic + stats1.stubborn + (Math.random() * 10);
            let score2 = stats2.logic + stats2.stubborn + (Math.random() * 10);

            // Chaos factor
            if (stats1.chaos > 7 && Math.random() > 0.5) score1 += 15; // Critical hit!
            if (stats2.chaos > 7 && Math.random() > 0.5) score2 += 15;

            const won = score1 > score2 ? fighter1 : fighter2;

            setWinner(won);
            setBattleLog(generateBattleCommentary(fighter1, fighter2, won));
            setIsFighting(false);
        }, 1500);
    };

    const generateBattleCommentary = (p1: string, p2: string, win: string) => {
        // Simple template generator - could be expanded
        const winnerEmoji = EMOJIS[win];
        const loser = win === p1 ? p2 : p1;

        const comments = [
            `${win} outsmarted ${loser} with a 400-page PowerPoint presentation. Critical damage!`,
            `${win} distracted ${loser} with meme theories until they forfeited.`,
            `${win} simply refused to lose. ${loser} gave up out of exhaustion.`,
            `${win} manipulated the situation emotionally. ${loser} is crying now.`,
            `${win} built a trap out of paperclips. ${loser} walked right into it.`,
            `It was close, but ${win} had the moral high ground (or so they claimed).`
        ];

        return `${winnerEmoji} ${comments[Math.floor(Math.random() * comments.length)]}`;
    };

    const resetBattle = () => {
        setFighter1(null);
        setFighter2(null);
        setWinner(null);
        setBattleLog("");
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-nunito bg-slate-50">
            <div className="aurora-bg">
                <div className="aurora-blob aurora-blob-1"></div>
                <div className="aurora-blob aurora-blob-4"></div>
            </div>

            <nav className="relative z-10 py-6 px-6">
                <div className="container mx-auto max-w-6xl flex items-center justify-between">
                    <Link to={`/${currentLang}`} className="clay-card px-5 py-3 flex items-center gap-2 hover:scale-105 transition-transform text-decoration-none bg-white">
                        <span className="text-xl">←</span>
                        <span className="font-bold text-gray-800">Home</span>
                    </Link>
                    <LanguageSwitcher />
                </div>
            </nav>

            <main className="relative z-10 px-4 pb-20">
                <div className="container mx-auto max-w-4xl text-center">
                    <header className="mb-12">
                        <h1 className="clay-heading clay-heading-lg mb-4 flex items-center justify-center gap-3">
                            <Swords className="w-10 h-10 text-slate-700" />
                            Battle Arena
                        </h1>
                        <p className="clay-text text-lg">Select two types. See who survives.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">

                        {/* Fighter 1 Selection */}
                        <div className={`clay-card p-6 min-h-[300px] flex flex-col items-center justify-center transition-all ${fighter1 ? 'bg-blue-50 border-4 border-blue-200' : 'bg-white'}`}>
                            {fighter1 ? (
                                <>
                                    <div className="text-8xl mb-4 animate-bounce-short">{EMOJIS[fighter1]}</div>
                                    <h2 className="text-3xl font-black text-slate-800">{fighter1}</h2>
                                    <button onClick={() => setFighter1(null)} className="mt-6 text-sm text-slate-500 hover:text-red-500 underline">Change</button>
                                </>
                            ) : (
                                <div className="w-full grid grid-cols-4 gap-2">
                                    {TYPES.map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setFighter1(t)}
                                            disabled={fighter2 === t}
                                            className="p-2 rounded-lg bg-slate-100 hover:bg-blue-100 transition-colors text-xs font-bold disabled:opacity-30"
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* VS Badge */}
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-slate-800 text-white flex items-center justify-center text-3xl font-black shadow-xl z-20">
                                VS
                            </div>
                        </div>

                        {/* Fighter 2 Selection */}
                        <div className={`clay-card p-6 min-h-[300px] flex flex-col items-center justify-center transition-all ${fighter2 ? 'bg-red-50 border-4 border-red-200' : 'bg-white'}`}>
                            {fighter2 ? (
                                <>
                                    <div className="text-8xl mb-4 animate-bounce-short">{EMOJIS[fighter2]}</div>
                                    <h2 className="text-3xl font-black text-slate-800">{fighter2}</h2>
                                    <button onClick={() => setFighter2(null)} className="mt-6 text-sm text-slate-500 hover:text-red-500 underline">Change</button>
                                </>
                            ) : (
                                <div className="w-full grid grid-cols-4 gap-2">
                                    {TYPES.map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setFighter2(t)}
                                            disabled={fighter1 === t}
                                            className="p-2 rounded-lg bg-slate-100 hover:bg-red-100 transition-colors text-xs font-bold disabled:opacity-30"
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Action Area */}
                    <div className="h-32 flex items-center justify-center">
                        {winner ? (
                            <div className="clay-card p-8 bg-yellow-100 border-4 border-yellow-300 w-full max-w-2xl animate-pop-in">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Trophy className="w-6 h-6 text-yellow-600" />
                                    <h3 className="text-xl font-bold text-yellow-800">WINNER: {winner}</h3>
                                </div>
                                <p className="text-lg font-medium text-slate-700">{battleLog}</p>
                                <button onClick={resetBattle} className="mt-4 flex items-center justify-center gap-2 mx-auto text-sm font-bold text-slate-500 hover:text-slate-800">
                                    <RefreshCw className="w-4 h-4" /> Reset Arena
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleFight}
                                disabled={!fighter1 || !fighter2 || isFighting}
                                className={`clay-button text-2xl px-12 py-6 flex items-center gap-3 ${(!fighter1 || !fighter2) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isFighting ? (
                                    <>Fighting... <span className="animate-spin">⚔️</span></>
                                ) : (
                                    <>FIGHT! 💥</>
                                )}
                            </button>
                        )}
                    </div>

                    {/* Instructions */}
                    {!winner && !isFighting && (
                        <div className="mt-12 opacity-60 max-w-lg mx-auto">
                            <p className="text-sm clay-text">
                                <Sparkles className="w-4 h-4 inline mr-1" />
                                Battle logic uses scientific(ish) data based on stubbornness, chaos, and pure logic stats.
                            </p>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
