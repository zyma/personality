import type { Route } from "./+types/sitemap[.]xml";
import { TYPES_DATA } from "~/data/mock";

const LANGUAGES = ["en", "de", "es", "fr", "ru"];

export async function loader() {
    const baseUrl = "https://mbtivibes.com"; // Replace with actual domain
    const types = Object.keys(TYPES_DATA);
    const paths = ["", "/scenarios", "/fandoms", "/battle"];

    const urls: string[] = [];

    LANGUAGES.forEach((lang) => {
        paths.forEach((path) => {
            urls.push(`${baseUrl}/${lang}${path}`);
        });
        types.forEach((type) => {
            urls.push(`${baseUrl}/${lang}/types/${type}`);
        });
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
            .map(
                (url) => `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${url.includes("/types/") ? "0.8" : "1.0"}</priority>
  </url>`
            )
            .join("")}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
