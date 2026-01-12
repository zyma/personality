import type { Route } from "./+types/content";
import { getContentPage, getSupportedLanguages } from "~/lib/markdown";
import { Link } from "react-router";
import { ArrowLeft, Calendar, User } from "lucide-react";

export async function loader({ params }: Route.LoaderArgs) {
    const { lang, "*": slugPath } = params;
    const slug = slugPath || "index";

    // Validate language
    const supportedLanguages = getSupportedLanguages();
    if (!lang || !supportedLanguages.includes(lang)) {
        return { notFound: true, lang: lang || "en" };
    }

    const page = getContentPage(lang, slug);

    if (!page) {
        return { notFound: true, lang };
    }

    return {
        notFound: false,
        page,
        lang
    };
}

export function meta({ data }: Route.MetaArgs) {
    if (data.notFound || !data.page) {
        return [
            { title: "Page Not Found | MBTI Wiki" },
            { name: "description", content: "The requested page could not be found." },
            { name: "robots", content: "noindex, nofollow" }
        ];
    }

    const { page, lang } = data;
    const meta = [
        { title: `${page.title} | MBTI Wiki` },
        { name: "description", content: page.description },
        { property: "og:title", content: page.title },
        { property: "og:description", content: page.description },
        { property: "og:type", content: page.ogType || "article" },
        { property: "og:locale", content: lang },
        { name: "twitter:title", content: page.title },
        { name: "twitter:description", content: page.description },
        { name: "twitter:card", content: page.twitterCard || "summary" },
    ];

    // Add optional SEO tags if present
    if (page.keywords) {
        meta.push({ name: "keywords", content: page.keywords });
    }
    if (page.robots) {
        meta.push({ name: "robots", content: page.robots });
    }
    if (page.ogImage) {
        meta.push({ property: "og:image", content: page.ogImage });
        meta.push({ name: "twitter:image", content: page.ogImage });
    }
    if (page.canonical) {
        meta.push({ tagName: "link", rel: "canonical", href: page.canonical } as any);
    }

    return meta;
}

export default function ContentPage({ loaderData }: Route.ComponentProps) {
    const { notFound, page, lang } = loaderData;

    if (notFound || !page) {
        return <NotFoundPage lang={lang} />;
    }

    return (
        <div className="min-h-screen bg-[#faf9f6] text-[#2d2d2d] dark:bg-[#121212] dark:text-[#e0e0e0]">
            {/* Navigation */}
            <nav className="border-b border-[#e5e0d8] dark:border-[#2d2d2d] bg-white/50 dark:bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to={`/${lang}`} className="flex items-center gap-2 text-[#6366f1] font-bold hover:opacity-80 transition-opacity">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Wiki
                    </Link>
                    <span className="font-serif italic font-bold text-xl">{page.title}</span>
                </div>
            </nav >

            <main className="container mx-auto px-6 py-16 max-w-4xl">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-5xl md:text-6xl font-serif font-black mb-6 text-[#1a1a1a] dark:text-white leading-tight">
                        {page.title}
                    </h1>
                    {page.description && (
                        <p className="text-xl text-[#666] dark:text-[#a0a0a0] leading-relaxed border-l-4 border-[#6366f1] pl-6 italic mb-6">
                            {page.description}
                        </p>
                    )}
                    <div className="flex items-center gap-6 text-sm text-[#999] dark:text-[#666]">
                        {page.author && (
                            <span className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {page.author}
                            </span>
                        )}
                        {page.lastModified && (
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {page.lastModified}
                            </span>
                        )}
                    </div>
                    <div className="w-24 h-1.5 bg-[#6366f1] rounded-full mt-8"></div>
                </header>

                {/* Content */}
                <article
                    className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-[#444] dark:prose-p:text-[#bbb] prose-p:leading-relaxed prose-li:text-[#444] dark:prose-li:text-[#bbb] prose-a:text-[#6366f1] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1a1a1a] dark:prose-strong:text-white"
                    dangerouslySetInnerHTML={{ __html: page.htmlContent }}
                />
            </main>

            {/* Footer */}
            <footer className="mt-32 border-t border-[#e5e0d8] dark:border-[#2d2d2d] py-16 bg-white dark:bg-[#0a0a0a]">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[#999] text-sm font-medium tracking-wide">
                        © 2026 MBTI GLOBAL WIKI • ELEGANCE IN PERSONALITY
                    </p>
                </div>
            </footer>
        </div >
    );
}

function NotFoundPage({ lang }: { lang: string }) {
    return (
        <div className="min-h-screen bg-[#faf9f6] text-[#2d2d2d] dark:bg-[#121212] dark:text-[#e0e0e0] flex flex-col">
            {/* Navigation */}
            <nav className="border-b border-[#e5e0d8] dark:border-[#2d2d2d] bg-white/50 dark:bg-black/50 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to={`/${lang}`} className="flex items-center gap-2 text-[#6366f1] font-bold hover:opacity-80 transition-opacity">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Wiki
                    </Link>
                </div>
            </nav >

            {/* 404 Content */}
            < main className="flex-1 flex items-center justify-center px-6" >
                <div className="text-center max-w-xl">
                    <div className="text-9xl font-serif font-black text-[#6366f1] mb-8 opacity-20">
                        404
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-black mb-6 text-[#1a1a1a] dark:text-white">
                        Page Not Found
                    </h1>
                    <p className="text-xl text-[#666] dark:text-[#a0a0a0] mb-12 leading-relaxed">
                        The page you're looking for doesn't exist or has been moved.
                        Let's get you back on track.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="px-8 py-4 bg-[#6366f1] text-white rounded-2xl font-bold hover:bg-[#5558e3] transition-colors shadow-lg shadow-indigo-500/20"
                        >
                            Go to Homepage
                        </Link>
                        <Link
                            to={`/${lang}/about`}
                            className="px-8 py-4 bg-white dark:bg-[#1e1e1e] text-[#1a1a1a] dark:text-white rounded-2xl font-bold border border-[#e5e0d8] dark:border-[#2d2d2d] hover:border-[#6366f1] transition-colors"
                        >
                            About Us
                        </Link>
                    </div>
                </div>
            </main >

            {/* Footer */}
            < footer className="border-t border-[#e5e0d8] dark:border-[#2d2d2d] py-8 bg-white dark:bg-[#0a0a0a]" >
                <div className="container mx-auto px-6 text-center">
                    <p className="text-[#999] text-sm font-medium tracking-wide">
                        © 2026 MBTI GLOBAL WIKI
                    </p>
                </div>
            </footer >
        </div >
    );
}
