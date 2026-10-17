export interface QuickFact {
  emoji: string;
  label: string;
  value: string;
}

export interface AboutContent {
  intro: string;
  paragraphs: string[];
  quickFacts: QuickFact[];
  interests: string[];
}

export const about: AboutContent = {
  intro:
    "A web developer in the making, based in Sylhet, Bangladesh — learning the MERN stack by building real things and explaining them clearly.",
  paragraphs: [
    "My journey started with curiosity about how the websites I used every day actually worked. That curiosity turned into structured learning through Programming Hero, where I have been building a foundation in HTML, CSS, JavaScript and React, and I am now working my way through the MERN stack.",
    "I learn best by building. BazarDor and FitLog began as course assignments, but I treated them like real products — authentication, dynamic routes, state management, responsive layouts and careful UI details. Along the way I wrote a DEV.to article explaining why I chose the MERN stack, because understanding something well enough to explain it is the real test.",
    "Today I work full-time as a Content Writer at Russkin Bright, a marketing agency. Writing and coding turned out to complement each other: both are about structuring ideas so another person can follow them. I care about clear communication as much as clean components.",
    "Outside of code, I love watching movies and travelling whenever I can. New places and new problems appeal to me for the same reason — they make me look at things from a different angle.",
  ],
  quickFacts: [
    { emoji: "📍", label: "Based in", value: "Sylhet, Bangladesh" },
    { emoji: "📚", label: "Learning", value: "MERN stack · Programming Hero" },
    { emoji: "💼", label: "Day job", value: "Content Writer · Russkin Bright" },
    { emoji: "🎯", label: "Focus", value: "React, Next.js, TypeScript, Node.js" },
    { emoji: "🎬", label: "Hobbies", value: "Movies & travelling" },
  ],
  interests: [
    "Building practical, useful applications",
    "Writing clear technical content",
    "Clean, readable code and honest UX",
    "Learning something new every week",
  ],
};
