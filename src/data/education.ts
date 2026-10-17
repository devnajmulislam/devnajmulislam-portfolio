export interface LearningEntry {
  title: string;
  institution: string;
  period: string;
  status: string;
  description: string;
}

export interface EducationContent {
  entries: LearningEntry[];
  note: string;
}

export const education: EducationContent = {
  entries: [
    {
      title: "Complete Web Development — MERN Stack",
      institution: "Programming Hero",
      period: "Ongoing",
      status: "In progress",
      description:
        "Structured, project-based training covering HTML, CSS, JavaScript, React, Node.js, Express and MongoDB, with assignments that are built out into full applications.",
    },
  ],
  note: "I began college-level study but did not complete it. My development skills come from Programming Hero and from building and refining my own projects.",
};
