export interface ExperienceEntry {
  company: string;
  date: string;
  role: string;
  description: string;
  tags: string[];
  details?: string;
  current?: boolean;
  projects?: {
    name: string;
    focus: string;
    description: string;
    url?: string;
  }[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "Qualabs",
    current: true,
    date: "OCT 2025 — PRESENT",
    role: "Team Leader · Technical Project Manager",
    description:
      "Lead a team of four software engineers and one technical lead, connecting Disney stakeholders with engineering execution. Translate business needs and user pain points into delivery priorities, epics and actionable user stories, while keeping scope, risks and progress visible across teams.",
    tags: [
      "Team leadership",
      "Technical delivery",
      "Requirements engineering",
      "Stakeholder management",
      "Agile / Scrum",
      "Streaming",
    ],
    projects: [
      {
        name: "Playback Inspector · Disney+",
        focus: "Streaming · Internal quality-control platform",
        description:
          "Lead development of an internal platform used to validate streaming assets. Coordinate feature delivery across web, mobile and platform integrations, bringing stakeholder requirements into the engineering backlog. Present product demos and milestones, gather feedback and turn it into concrete improvements for subsequent iterations.",
      },
    ],
    details:
      "Facilitate sprint planning, daily stand-ups, retrospectives and backlog refinement to maintain shared priorities and surface blockers. Act as the primary point of contact for Disney stakeholders, communicating delivery timelines, risks and progress, and coordinating cross-team collaboration to move features through to delivery.",
  },
  {
    company: "Flow Labs",
    date: "MAY 2024 — OCT 2025",
    role: "Semi Senior Full Stack Software Developer",
    description:
      "Developed two large mobile applications with Flutter and Dart, using Cubit for state management and integrating native libraries for platform-specific capabilities. Worked across audio processing, custom wearable integration and backend services, connecting reactive interfaces with device events and application logic.",
    tags: [
      "Flutter",
      "Dart",
      "Cubit",
      "Native libraries",
      "FFmpeg",
      "Firebase",
      "Node.js",
      "AWS",
    ],
    projects: [
      {
        name: "DwellSpring",
        url: "https://dwellspring.io/",
        focus: "Wellness · Audio engineering",
        description:
          "Built features for a wellness and sleep app with an extensive playlist experience and a sound editor. Worked with FFmpeg for audio processing, native libraries and Cubit-managed UI state to support sound editing and playback workflows. Extended into Node.js backend development, implementing APIs and core business logic.",
      },
      {
        name: "Safety Swim",
        focus: "Connected devices · Mobile integration",
        description:
          "Integrated the mobile app with the company’s custom wristband for young children’s water safety. Implemented application behavior around device events, including water-contact and low-battery alarms, connecting wearable signals with alert flows and visible device status in Flutter.",
      },
    ],
  },
  {
    company: "Light-it",
    date: "FEB 2021 — AUG 2023",
    role: "Junior Full Stack Software Developer",
    description:
      "Developed full stack features across multiple client projects, building dynamic React interfaces and implementing APIs and backend functionality in Laravel. Worked with SQL databases and managed AWS servers for application hosting and deployment, gaining hands-on experience across the application stack.",
    tags: [
      "React",
      "PHP / Laravel",
      "API development",
      "SQL",
      "AWS deployment",
      "Client communication",
    ],
    details:
      "Contributed within both small and large development teams, collaborating closely with QA engineers, project managers and fellow developers. Communicated directly with US-based clients while working on their products, developing the technical collaboration and communication skills that later supported my move into team leadership.",
  },
];
