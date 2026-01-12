import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "ru", name: "Русский", flag: "🇷🇺" }
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setIsOpen(false);

        // Construct new path
        const currentPath = location.pathname;
        const segments = currentPath.split('/').filter(Boolean);

        // If the first segment is a language code, replace it
        if (languages.some(l => l.code === segments[0])) {
            segments[0] = code;
        } else {
            // Otherwise prepend it (though we should always have it now)
            segments.unshift(code);
        }

        const newPath = `/${segments.join('/')}${location.search}${location.hash}`;
        navigate(newPath);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {/* Current Language Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="clay-card flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 hover:scale-105"
                style={{
                    background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                    boxShadow: isOpen
                        ? '4px 4px 10px rgba(0,0,0,0.1), -2px -2px 6px rgba(255,255,255,1), inset 2px 2px 4px rgba(0,0,0,0.05)'
                        : '6px 6px 12px rgba(0,0,0,0.08), -3px -3px 8px rgba(255,255,255,1)'
                }}
            >
                <span className="text-2xl">{currentLang.flag}</span>
                <span className="font-bold text-sm hidden sm:block" style={{ color: 'var(--text-primary)' }}>
                    {currentLang.name}
                </span>
                <span
                    className="text-xs transition-transform duration-200"
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: 'var(--text-muted)'
                    }}
                >
                    ▼
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="absolute top-full right-0 mt-3 py-2 z-50 clay-card"
                    style={{
                        background: 'white',
                        minWidth: '180px',
                        animation: 'fadeIn 0.2s ease-out'
                    }}
                >
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-200"
                            style={{
                                background: lang.code === i18n.language
                                    ? 'linear-gradient(145deg, var(--clay-lavender), var(--clay-lavender-dark))'
                                    : 'transparent',
                                color: 'var(--text-primary)',
                            }}
                            onMouseEnter={(e) => {
                                if (lang.code !== i18n.language) {
                                    e.currentTarget.style.background = 'rgba(226, 209, 249, 0.3)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (lang.code !== i18n.language) {
                                    e.currentTarget.style.background = 'transparent';
                                }
                            }}
                        >
                            <span className="text-2xl">{lang.flag}</span>
                            <span className="font-semibold text-sm">{lang.name}</span>
                            {lang.code === i18n.language && (
                                <span className="ml-auto text-sm">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            )}

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
