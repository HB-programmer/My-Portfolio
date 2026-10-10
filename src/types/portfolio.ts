export type NavItem = {
  label: string;
  href: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
  fill: number;
};

export type JourneyStop = {
  year: string;
  title: string;
  period: string;
  description: string;
  bullets: string[];
};

export type Project = {
  number: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
};

export type Part = {
  label: string;
  value: string;
};

export type Telemetry = {
  value: string;
  label: string;
  detail: string;
};

export type Blog = {
  title: string;
  summary: string;
  tags: string[];
  url: string;
};

export type VisitorMode = "explorer" | "recruiter";

export type SkillGroup = {
  label: string;
  skills: string[];
};

export type ExperienceGlance = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};
