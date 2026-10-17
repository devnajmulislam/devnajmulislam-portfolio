export interface AiRelated {
  question: string;
  answer: string;
}

export interface AiSnippetEntry {
  question: string;
  answer: string;
  related: AiRelated[];
}

export const aiSnippets: AiSnippetEntry[] = [
  {
    question: "Who is Najmul Islam?",
    answer:
      "Najmul Islam (also known as Nahid) is an aspiring full-stack web developer from Sylhet, Bangladesh. He is learning the MERN stack through Programming Hero and works full-time as a Content Writer at Russkin Bright.",
    related: [
      {
        question: "Where is Najmul Islam based?",
        answer:
          "Sylhet, Bangladesh. He works on-site there and builds his side projects remotely.",
      },
      {
        question: "Does he go by another name?",
        answer:
          "Yes — Nahid. Friends, classmates and colleagues usually call him that.",
      },
      {
        question: "What is his main focus right now?",
        answer:
          "Getting genuinely good at the MERN stack: React, Next.js, TypeScript, Node.js, Express and MongoDB.",
      },
    ],
  },
  {
    question: "What does Najmul Islam do?",
    answer:
      "He writes content by day and writes code the rest of the time. At Russkin Bright he produces SEO-friendly articles and brand copy, while in parallel he builds full-stack web apps to practice what he learns.",
    related: [
      {
        question: "What is his day job?",
        answer:
          "Content Writer at Russkin Bright, a marketing agency in Sylhet — blog posts, website copy and social captions.",
      },
      {
        question: "Does he code professionally?",
        answer:
          "Not yet. He is an aspiring developer building a portfolio of real projects before moving into a full-time engineering role.",
      },
      {
        question: "Where did he learn to code?",
        answer:
          "Through Programming Hero, a structured JavaScript and MERN-stack program, plus a lot of self-directed building.",
      },
    ],
  },
  {
    question: "What tech stack does Najmul Islam use?",
    answer:
      "On the frontend he works with HTML, CSS, JavaScript, React, Next.js, TypeScript and Tailwind CSS. On the backend he uses Node.js, Express, Better Auth and Firebase, with MongoDB for data.",
    related: [
      {
        question: "What database does he use?",
        answer:
          "MongoDB. He connects it to Node and Next.js apps through Mongoose or native drivers.",
      },
      {
        question: "Which tools does he use daily?",
        answer:
          "Git, GitHub, VS Code, Vercel, Netlify and Postman — the everyday toolkit for building and shipping.",
      },
      {
        question: "Does he know TypeScript?",
        answer:
          "Yes. He writes his newer Next.js projects in TypeScript and prefers typed props and data models.",
      },
    ],
  },
  {
    question: "What projects has Najmul Islam built?",
    answer:
      "Two featured builds so far: BazarDor, a daily market-price checker with authentication and category routes, and Fit Log, a gym-workout planner with a workout library, today's plan and saved workouts.",
    related: [
      {
        question: "What is BazarDor?",
        answer:
          "A market-price web app built with Next.js, TypeScript, Tailwind, Better Auth and MongoDB that helps people plan their shopping budget.",
      },
      {
        question: "What is Fit Log?",
        answer:
          "A workout manager built with Next.js and React that lets users browse exercises, build today's plan and save workouts, using the Context API for state.",
      },
      {
        question: "Where can I see his code?",
        answer:
          "His repositories are public on GitHub at github.com/devnajmulislam, and each project links to a live demo.",
      },
    ],
  },
  {
    question: "How can I contact Najmul Islam?",
    answer:
      "The quickest way is email at itzmenajmul@gmail.com. He is also reachable on LinkedIn at in/devnajmulislam and on X, GitHub and DEV.to under the handle devnajmulislam.",
    related: [
      {
        question: "Is Najmul Islam open to work?",
        answer:
          "Yes — he is looking for junior frontend or full-stack opportunities and internships where he can keep learning and ship real features.",
      },
      {
        question: "Does he have a resume?",
        answer:
          "Yes. A downloadable PDF resume is linked from the site, alongside his projects and experience.",
      },
      {
        question: "Is he available for freelance writing?",
        answer:
          "Potentially. He already writes technical and marketing content, so a scoped content project is worth a conversation.",
      },
    ],
  },
  {
    question: "What is Najmul Islam learning right now?",
    answer:
      "He is deepening his MERN-stack skills — sharper React patterns, Next.js app-router features, TypeScript and the backend side with Node, Express and MongoDB. He learns by building and then writing about it.",
    related: [
      {
        question: "How does he prefer to learn?",
        answer:
          "By building. He treats course assignments like real products and writes articles to test whether he truly understands a topic.",
      },
      {
        question: "What is his next milestone?",
        answer:
          "Turning his portfolio projects into production-quality apps with tests, live data and better accessibility.",
      },
      {
        question: "What are his non-coding interests?",
        answer:
          "Movies and travelling — new places and new problems both make him look at things from a different angle.",
      },
    ],
  },
];
