import matter from "gray-matter";
import { marked } from "marked";

export interface ContentPage {
  slug: string;
  lang: string;
  title: string;
  description: string;
  content: string;
  htmlContent: string;
  author?: string;
  lastModified?: string;
  // MBTI Specific Fields
  emoji?: string;
  color_group?: string;
  superpowers?: string;
  annoyances?: string;
  relationships?: string;
  career?: string;
  // SEO fields
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  robots?: string;
}

export interface ContentMeta {
  slug: string;
  lang: string;
  title: string;
  description: string;
  url: string;
  lastModified?: string;
}

const SUPPORTED_LANGUAGES = ["en", "es", "de", "fr", "ru"];

// Import all markdown files at build time using Vite's glob import
const contentModules = import.meta.glob("/content/**/*.md", {
  query: "?raw",
  eager: true,
  import: "default"
}) as Record<string, string>;

/**
 * Get all content file paths
 */
function getContentPaths(): string[] {
  return Object.keys(contentModules);
}

/**
 * Parse markdown content and extract frontmatter
 */
function parseMarkdownContent(rawContent: string, lang: string, slug: string): ContentPage {
  const { data, content } = matter(rawContent);
  const htmlContent = marked.parse(content) as string;

  return {
    slug,
    lang,
    title: data.title || slug,
    description: data.description || "",
    content,
    htmlContent,
    author: data.author,
    lastModified: data.lastModified,
    // MBTI Specific Fields
    emoji: data.emoji,
    color_group: data.color_group,
    superpowers: data.superpowers,
    annoyances: data.annoyances,
    relationships: data.relationships,
    career: data.career,
    // SEO fields
    keywords: data.keywords,
    canonical: data.canonical,
    ogImage: data.ogImage,
    ogType: data.ogType,
    twitterCard: data.twitterCard,
    robots: data.robots,
  };
}

/**
 * Get a content page by language and slug
 */
export function getContentPage(lang: string, slug: string): ContentPage | null {
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    return null;
  }

  const filePath = `/content/${lang}/${slug}.md`;
  const rawContent = contentModules[filePath];

  if (!rawContent) {
    console.log(`Content not found for path: ${filePath}`);
    console.log(`Available paths: ${getContentPaths().join(", ")}`);
    return null;
  }

  return parseMarkdownContent(rawContent, lang, slug);
}

/**
 * Get all content pages for a specific language
 */
export function getContentPagesByLanguage(lang: string): ContentMeta[] {
  const pages: ContentMeta[] = [];
  const langPrefix = `/content/${lang}/`;

  for (const [filePath, rawContent] of Object.entries(contentModules)) {
    if (filePath.startsWith(langPrefix) && filePath.endsWith(".md")) {
      const slug = filePath.replace(langPrefix, "").replace(".md", "");
      const page = parseMarkdownContent(rawContent, lang, slug);

      pages.push({
        slug: page.slug,
        lang: page.lang,
        title: page.title,
        description: page.description,
        url: `/${lang}/${page.slug}`,
        lastModified: page.lastModified,
      });
    }
  }

  return pages;
}

/**
 * Get all content pages across all languages
 */
export function getAllContentPages(): ContentMeta[] {
  const allPages: ContentMeta[] = [];

  for (const lang of SUPPORTED_LANGUAGES) {
    const langPages = getContentPagesByLanguage(lang);
    allPages.push(...langPages);
  }

  return allPages;
}

/**
 * Get all supported languages
 */
export function getSupportedLanguages(): string[] {
  return SUPPORTED_LANGUAGES;
}

/**
 * Check if content exists for a given path
 */
export function contentExists(lang: string, slug: string): boolean {
  const filePath = `/content/${lang}/${slug}.md`;
  return filePath in contentModules;
}
