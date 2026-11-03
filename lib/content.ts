export const profile = {
  name: "John Matthew Banto",
  shortName: "Matt Banto",
  portrait: "/images/matt-banto-about.jpg",
  email: "johnmatthewbanto333@gmail.com",
  github: "https://github.com/MattU27",
  linkedin: "https://www.linkedin.com/in/john-matthew-banto-593008392/",
  resume: "/resume/John_Matthew_Banto_Developer_Resume.pdf",
  location: "Manila, Philippines · UTC+8",
};

export const projects = [
  {
    number: "01",
    title: "Internal E-Bidding System",
    category: "Business workflows",
    lead: "Bringing reports, approvals and post-award work into one application.",
    summary:
      "Bidding work involves reports, approvals and post-award steps. This internal system brings those workflows into one application.",
    contribution:
      "I was the sole full-stack developer, taking the system from requirements gathering through interface and database work, implementation, pre-production QA and maintenance.",
    preview: {
      image: "/media/e-bidding-workflow.jpg",
      alt: "E-Bidding pre-bid report form with branch, project and opportunity ID fields, using fictional test data",
      caption: "Pre-bid report creation",
      highlights: ["Structured pre-bid reports", "Approval workflows and PDF reports", "Post-award work"],
      detail: "The walkthrough shows opportunity ID availability feedback beside the form field.",
    },
    stack:
      "Next.js · React · TypeScript · Supabase · PostgreSQL · Tailwind CSS",
    note: "Internal company application. Source code and production access are private.",
  },
  {
    number: "02",
    title: "Shipment Tracking System",
    category: "Operations and tracking",
    lead: "A clearer view from shipment request to proof of delivery.",
    summary:
      "Shipment work needs a clear view of requests, approvals and delivery progress. This internal application supports tracking through proof of delivery.",
    contribution:
      "I was the sole full-stack developer, building and maintaining the application and working through user-requested improvements.",
    preview: {
      image: "/media/shipment-workflow.jpg",
      alt: "E-Shipment Tracking shipment details beside approval progress and timestamped tracking updates, using fictional test data",
      caption: "Shipment details, approval progress and tracking updates",
      highlights: ["Shipment requests and tracking", "Approval progress and status updates", "Proof of delivery"],
      detail: "A shared spreadsheet and conversations with users helped me prioritize maintenance and improvements.",
    },
    stack:
      "Next.js · React · TypeScript · Supabase · PostgreSQL · Tailwind CSS",
    note: "Internal company application. Source code and production access are private.",
  },
];

export const skills = [
  {
    title: "Web development",
    items: "React, Next.js, TypeScript, Tailwind CSS",
    description: "Building interfaces and full-stack web applications.",
  },
  {
    title: "Backend & data",
    items: "Supabase, PostgreSQL",
    description:
      "The part of full-stack work I’m most interested in developing further.",
  },
  {
    title: "Project experience",
    items: "Flutter, Dart, Firebase",
    description: "Used in projects alongside my web development work.",
  },
  {
    title: "Design & development tools",
    items: "Codex / ChatGPT",
    description:
      "AI-assisted development with Codex/ChatGPT.",
  },
];


