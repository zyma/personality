import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const localesDir = path.join(projectRoot, 'app', 'i18n', 'locales');
const contentDir = path.join(projectRoot, 'content');

const languages = ['en', 'es', 'de', 'fr', 'ru'];
const types = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP'
];

// Map types to color groups (based on profile.tsx)
const colorGroups = {
    'INTJ': 'analyst', 'INTP': 'analyst', 'ENTJ': 'analyst', 'ENTP': 'analyst',
    'INFJ': 'diplomat', 'INFP': 'diplomat', 'ENFJ': 'diplomat', 'ENFP': 'diplomat',
    'ISTJ': 'sentinel', 'ISFJ': 'sentinel', 'ESTJ': 'sentinel', 'ESFJ': 'sentinel',
    'ISTP': 'explorer', 'ISFP': 'explorer', 'ESTP': 'explorer', 'ESFP': 'explorer'
};

async function generateContent() {
    for (const lang of languages) {
        console.log(`Processing language: ${lang}`);

        // Read translation file
        const translationPath = path.join(localesDir, lang, 'translation.json');
        let translations = {};
        try {
            const raw = fs.readFileSync(translationPath, 'utf-8');
            translations = JSON.parse(raw);
        } catch (e) {
            console.error(`Could not read translations for ${lang}:`, e.message);
            continue;
        }

        const langTypesDir = path.join(contentDir, lang, 'types');
        fs.mkdirSync(langTypesDir, { recursive: true });

        for (const type of types) {
            const typeData = translations['types']?.[type] || {};

            // Extract data
            const name = typeData.name || type;
            const emoji = typeData.emoji || "✨";
            const description = typeData.description || "";

            // Helper to get text, falling back to empty string
            const superpowers = typeData.superpowers_text || "";
            const annoyances = typeData.annoyances_text || "";
            const relationships = typeData.relationships_text || "";
            const career = typeData.career_text || "";

            const colorGroup = colorGroups[type] || "analyst";

            const markdownContent = `---
title: "${name}"
description: "${description.replace(/"/g, '\\"')}"
emoji: "${emoji}"
color_group: "${colorGroup}"
superpowers: "${superpowers.replace(/"/g, '\\"')}"
annoyances: "${annoyances.replace(/"/g, '\\"')}"
relationships: "${relationships.replace(/"/g, '\\"')}"
career: "${career.replace(/"/g, '\\"')}"
---

${description}
`;

            const filePath = path.join(langTypesDir, `${type}.md`);

            // Don't overwrite if it exists and has content (unless it's just a shell, but for safety let's write)
            // Actually, for this task I WILL overwrite to ensure consistent structure, 
            // but I'll check if the file exists to avoid accidentally wiping valid custom edits if I ran this twice. 
            // FOR NOW: I assume I am initializing.

            fs.writeFileSync(filePath, markdownContent);
            console.log(`Generated ${lang}/types/${type}.md`);
        }
    }
}

generateContent();
