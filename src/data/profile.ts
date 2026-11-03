export type PillarIcon = "code" | "users" | "mic";

export interface Profile {
  name: string; fullName: string; username: string; headline: string; intro: string;
  location: string; role: string; github: string; linkedin: string; email: string;
}
export interface Pillar {
  number: string; title: string; subtitle: string; description: string; icon: PillarIcon;
}
export interface FeaturedProject {
  name: string; category: string; description: string; stack: string[]; repo: string; featured: boolean;
}
export interface ExperienceItem {
  period: string; title: string; organisation: string;
  category: "Technology" | "Leadership"; description: string;
}
export interface SpeakingCategory {
  title: string; description: string; tag: "Corporate" | "Community" | "Media";
}

export const profile: Profile = {
  name: "Jaymaxcklien",
  fullName: "Jaymaxcklien Bravyain Anak James",
  username: "Jaymax0701",
  headline: "Technology. Leadership. Communication.",
  intro: "I work at the intersection of business and technology — analysing systems, building digital solutions, leading people and connecting ideas through communication.",
  location: "Bintulu, Sarawak, Malaysia",
  role: "System Analyst · Business Applications",
  github: "https://github.com/Jaymax0701",
  linkedin: "",
  email: "",
};

export const pillars: Pillar[] = [
  { number: "01", title: "Technology", subtitle: "Analyse · Build · Improve", description: "Business applications, enterprise systems, software development and practical digital transformation.", icon: "code" },
  { number: "02", title: "Leadership", subtitle: "Lead · Organise · Empower", description: "Creating alignment, coordinating people and turning shared ideas into meaningful programmes.", icon: "users" },
  { number: "03", title: "Communication", subtitle: "Host · Speak · Connect", description: "Emcee engagements, public speaking, interviews and conversations that bring people together.", icon: "mic" },
];

export const featuredProjects: FeaturedProject[] = [
  { name: "ChurchConnect", category: "Software engineering", description: "A church management platform exploring connected administration, role-based access and practical digital workflows.", stack: ["React", "Vite", "Supabase"], repo: "https://github.com/Jaymax0701/churchconnect", featured: true },
];

export const experience: ExperienceItem[] = [
  { period: "Current", title: "System Analyst — Business Applications", organisation: "Bintulu Port Holdings Berhad", category: "Technology", description: "Working with business applications and enterprise processes, with a focus on analysis, system support and digital initiatives." },
  { period: "Leadership", title: "Emerging Leader Club — Vice President 1", organisation: "Bintulu Port Holdings Berhad", category: "Leadership", description: "Contributing to emerging-leader initiatives spanning capability, stakeholder engagement, growth, communication and culture." },
  { period: "Community", title: "Youth Multimedia & Church Leadership", organisation: "Church and community involvement", category: "Leadership", description: "Supporting youth and ministry activities through coordination, multimedia, communication and team involvement." },
];

export const speakingCategories: SpeakingCategory[] = [
  { title: "Corporate & Formal Events", description: "Formal functions, corporate gatherings, dinners, conferences and professional programmes.", tag: "Corporate" },
  { title: "Church, Youth & Community", description: "Church celebrations, youth programmes, conferences and community occasions.", tag: "Community" },
  { title: "Podcast & Conversations", description: "Interviewing, presenting and facilitating conversations, including the Beyond Port-Cast initiative.", tag: "Media" },
];

export const skills: string[] = [
  "System Analysis", "ERP & Business Applications", "Business Process Analysis", "React", "JavaScript",
  "Python", "APIs", "SQL", "Power BI", "Cybersecurity Fundamentals", "Public Speaking",
  "Event Hosting", "Team Coordination", "Programme Planning",
];
