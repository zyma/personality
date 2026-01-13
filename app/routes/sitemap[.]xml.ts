import { getAllContentPages } from "~/lib/markdown";

interface SitemapUrl {
    loc: string;
    changefreq: string;
    priority: string;
    lastmod?: string;
}

export async function loader({ request }: { request: Request }) {
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    const pages = getAllContentPages();

    // Static pages (home, types)
    const mbtiTypes = [
        "INTJ", "INTP", "ENTJ", "ENTP",
        "INFJ", "INFP", "ENFJ", "ENFP",
        "ISTJ", "ISFJ", "ESTJ", "ESFJ",
        "ISTP", "ISFP", "ESTP", "ESFP"
    ];

    const supportedLanguages = ["en", "es", "de", "fr", "ru"];

    const staticUrls: SitemapUrl[] = [];

    supportedLanguages.forEach(lang => {
        // Home
        staticUrls.push({ loc: `${baseUrl}/${lang}`, changefreq: "daily", priority: "1.0" });

        // Feature Hubs
        staticUrls.push({ loc: `${baseUrl}/${lang}/battle`, changefreq: "monthly", priority: "0.9" });
        staticUrls.push({ loc: `${baseUrl}/${lang}/scenarios`, changefreq: "weekly", priority: "0.9" });
        staticUrls.push({ loc: `${baseUrl}/${lang}/fandoms`, changefreq: "weekly", priority: "0.9" });

        // Types
        mbtiTypes.forEach(type => {
            staticUrls.push({
                loc: `${baseUrl}/${lang}/types/${type}`,
                changefreq: "monthly",
                priority: "0.8"
            });
        });
    });

    // Add Root (Redirect)
    staticUrls.push({ loc: baseUrl, changefreq: "daily", priority: "1.0" });

    // Dynamic content pages from markdown
    const contentUrls: SitemapUrl[] = pages.map(page => ({
        loc: `${baseUrl}${page.url}`,
        changefreq: "weekly",
        priority: "0.7",
        lastmod: page.lastModified
    }));

    const allUrls = [...staticUrls, ...contentUrls];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${url.lastmod ? `
    <lastmod>${url.lastmod}</lastmod>` : ""}
  </url>`).join("\n")}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
        }
    });
}
