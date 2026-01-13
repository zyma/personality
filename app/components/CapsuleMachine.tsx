import { useState } from "react";
import { useTranslation } from "react-i18next";
import "~/styles/clay.css";

interface Prize {
    id: string;
    emoji: string;
}

const PRIZES: Prize[] = [
    { id: "clover", emoji: "🍀" },
    { id: "gem", emoji: "💎" },
    { id: "treat", emoji: "🍦" },
    { id: "rocket", emoji: "🚀" },
    { id: "rainbow", emoji: "🌈" },
];

export default function CapsuleMachine() {
    const { t } = useTranslation();
    const [state, setState] = useState<"idle" | "spinning" | "revealed">("idle");
    const [prize, setPrize] = useState<Prize | null>(null);

    const handleSpin = () => {
        if (state !== "idle") return;

        setState("spinning");

        // Simulate spinning duration
        setTimeout(() => {
            const randomPrize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
            setPrize(randomPrize);
            setState("revealed");
        }, 2000);
    };

    const reset = () => {
        setState("idle");
        setPrize(null);
    };

    return (
        <div className="clay-card p-8 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
            <h3 className="text-2xl font-black text-slate-800 mb-6">{t("capsule.title")}</h3>

            <div className="relative w-48 h-48 mb-8">
                {/* Machine Body */}
                <div className={`w-full h-full rounded-full border-8 border-slate-200 bg-white shadow-inner flex items-center justify-center overflow-hidden ${state === "spinning" ? "animate-spin-slow" : ""}`}>
                    {state === "idle" && (
                        <div className="text-6xl emoji-pop">🎰</div>
                    )}
                    {state === "spinning" && (
                        <div className="flex gap-4 animate-bounce">
                            <span className="text-4xl">💊</span>
                            <span className="text-4xl">🟡</span>
                            <span className="text-4xl">🔵</span>
                        </div>
                    )}
                    {state === "revealed" && prize && (
                        <div className="animate-scale-in flex flex-col items-center">
                            <div className="text-7xl mb-2">{prize.emoji}</div>
                        </div>
                    )}
                </div>
            </div>

            {state === "idle" && (
                <button
                    onClick={handleSpin}
                    className="clay-button bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                >
                    {t("capsule.spin_btn")}
                </button>
            )}

            {state === "spinning" && (
                <div className="font-bold text-slate-400 animate-pulse uppercase tracking-widest">
                    {t("capsule.spinning")}
                </div>
            )}

            {state === "revealed" && prize && (
                <div className="animate-fade-in">
                    <h4 className="text-xl font-bold text-slate-800">
                        {t(`capsule.prizes.${prize.id}.name`)}
                    </h4>
                    <p className="text-slate-500 font-bold text-sm mb-4">
                        {t(`capsule.prizes.${prize.id}.desc`)}
                    </p>
                    <button
                        onClick={reset}
                        className="text-slate-400 font-bold hover:text-slate-600 transition-colors uppercase text-xs"
                    >
                        {t("capsule.try_again")}
                    </button>
                </div>
            )}
        </div>
    );
}
