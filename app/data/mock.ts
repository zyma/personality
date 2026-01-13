
export const TYPES_DATA = {
    INTJ: {
        id: "INTJ",
        name: "Architect",
        korean_title: "The Tired Mastermind",
        totem: "🦉",
        color: "#9F7AEA", // Purple
        superpower: "Predicting 'I told you so' moments",
        lucky_item: "Noise-canceling Headphones",
        palette: ["#6B46C1", "#9F7AEA", "#E9D8FD"]
    },
    ENFP: {
        id: "ENFP",
        name: "Campaigner",
        korean_title: "Human Glitter",
        totem: "🦄",
        color: "#38B2AC", // Teal
        superpower: "Befriending introverts against their will",
        lucky_item: "Shiny Object",
        palette: ["#319795", "#81E6D9", "#E6FFFA"]
    },
    ISTP: {
        id: "ISTP",
        name: "Virtuoso",
        korean_title: "Chill Mechanic",
        totem: "🐆",
        color: "#D69E2E", // Yellow
        superpower: "Fixing things with brute force",
        lucky_item: "Multi-tool",
        palette: ["#D69E2E", "#F6E05E", "#FFFFF0"]
    },
    ESFJ: {
        id: "ESFJ",
        name: "Consul",
        korean_title: "Gossip Queen",
        totem: "🦚",
        color: "#3182CE", // Blue
        superpower: "Social network dominance",
        lucky_item: "Party Planner",
        palette: ["#3182CE", "#90CDF4", "#EBF8FF"]
    },
    // Placeholders for others to prevent crashes
    INTP: { id: "INTP", name: "Logician", totem: "🐙", color: "#805AD5", korean_title: "Naptime Philosopher", superpower: "Debugging reality", lucky_item: "Unfinished Projects", palette: ["#805AD5", "#B794F4", "#D6BCFA"] },
    ENTJ: { id: "ENTJ", name: "Commander", totem: "🦁", color: "#553C9A", korean_title: "CEO of Everything", superpower: "Hostile takeover", lucky_item: "Megaphone", palette: ["#553C9A", "#9F7AEA", "#E9D8FD"] },
    ENTP: { id: "ENTP", name: "Debater", totem: "🦊", color: "#9F7AEA", korean_title: "Chaos Agent", superpower: "Winning arguments", lucky_item: "Badge", palette: ["#9F7AEA", "#D6BCFA", "#FAF5FF"] },
    INFJ: { id: "INFJ", name: "Advocate", totem: "🦋", color: "#48BB78", korean_title: "Mystic Therapist", superpower: "Soul reading", lucky_item: "Crystal Ball", palette: ["#48BB78", "#9AE6B4", "#F0FFF4"] },
    INFP: { id: "INFP", name: "Mediator", totem: "🦌", color: "#38B2AC", korean_title: "Daydream Believer", superpower: "Crying beautifully", lucky_item: "Cookie", palette: ["#38B2AC", "#81E6D9", "#E6FFFA"] },
    ENFJ: { id: "ENFJ", name: "Protagonist", totem: "🐬", color: "#2F855A", korean_title: "Golden Retriever", superpower: "Supportiveness", lucky_item: "Bracelet", palette: ["#2F855A", "#68D391", "#F0FFF4"] },
    ISTJ: { id: "ISTJ", name: "Logistician", totem: "🐝", color: "#2B6CB0", korean_title: "Spreadsheet Warrior", superpower: "Deadlines", lucky_item: "Label Maker", palette: ["#2B6CB0", "#63B3ED", "#EBF8FF"] },
    ISFJ: { id: "ISFJ", name: "Defender", totem: "🐻", color: "#4299E1", korean_title: "Secret Guardian", superpower: "Cleaning", lucky_item: "Cookies", palette: ["#4299E1", "#90CDF4", "#EBF8FF"] },
    ESTJ: { id: "ESTJ", name: "Executive", totem: "🦅", color: "#2C5282", korean_title: "The Manager", superpower: "Yelling", lucky_item: "Clipboard", palette: ["#2C5282", "#63B3ED", "#EBF8FF"] },
    ISFP: { id: "ISFP", name: "Adventurer", totem: "🦢", color: "#ECC94B", korean_title: "Aesthetic Rebel", superpower: "Vibing", lucky_item: "Camera", palette: ["#ECC94B", "#FAF089", "#FFFFF0"] },
    ESTP: { id: "ESTP", name: "Entrepreneur", totem: "🦈", color: "#DD6B20", korean_title: "Risk Taker", superpower: "Doing it live", lucky_item: "Energy Drink", palette: ["#DD6B20", "#F6Ad55", "#FFFAF0"] },
    ESFP: { id: "ESFP", name: "Performer", totem: "🦜", color: "#ED8936", korean_title: "Party Starter", superpower: "Entertainment", lucky_item: "Mic", palette: ["#ED8936", "#FBD38D", "#FFFAF0"] },
};

export const SCENARIOS_DATA = [
    {
        id: "zombie-apocalypse",
        title: "Zombie Apocalypse",
        desc: "Who leads? Who dies first?",
        reactions: [
            { type: "ENTJ", text: "Establishes a dictatorship within 5 minutes. Creates a spreadsheet for rations." },
            { type: "ISTP", text: "Already has a bunker. Refuses to let anyone in except the dog." },
            { type: "INFP", text: "Tries to reason with the zombies. Gets bitten immediately." },
            { type: "ESFP", text: "Live streams the apocalypse. 'Hey guys, welcome back to my channel!'" },
            { type: "INTJ", text: "Calculated this scenarios years ago. Watching from a safe distance." }
        ]
    },
    {
        id: "first-date",
        title: "First Date Disaster",
        desc: "Awkward silence or TMI?",
        reactions: [
            { type: "ENFP", text: "Asks 50 deep questions before the appetizers arrive." },
            { type: "ISTJ", text: "Arrives 15 minutes early. brought a resume." },
            { type: "ESTP", text: "Takes you skydiving. Forgets to pay for dinner." }
        ]
    }
];

export const FANDOMS_DATA = [
    {
        id: "harry-potter",
        title: "Harry Potter",
        vibe_text: "Dark Academia & Magic ✨",
        poster_img: "⚡",
        characters: [
            { name: "Hermione Granger", type: "ISTJ" },
            { name: "Luna Lovegood", type: "INFP" },
            { name: "Draco Malfoy", type: "INTJ" },
            { name: "Fred & George", type: "ENTP" }
        ]
    },
    {
        id: "the-office",
        title: "The Office",
        vibe_text: "Paper Sales & Pranks 🖇️",
        poster_img: "☕",
        characters: [
            { name: "Jim Halpert", type: "ENTP" },
            { name: "Dwight Schrute", type: "ESTJ" },
            { name: "Michael Scott", type: "ENFP" },
            { name: "Pam Beesly", type: "ISFJ" }
        ]
    }
];
