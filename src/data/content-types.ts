/**
 * Shared shapes for the detail pages behind the tutorials, documentation,
 * case studies, careers, and API reference index pages.
 */

export type Section = {
  heading: string;
  /** Paragraphs of prose. */
  body?: string[];
  /** Rendered as a checkmark list. */
  list?: string[];
  code?: { language: string; source: string };
  /** Anchor id, when something links directly to this section. */
  id?: string;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  /** Eyebrow label above the title. */
  category: string;
  readingTime: string;
  sections: Section[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  customer: string;
  industry: string;
  logo: string;
  metrics: { label: string; value: string }[];
  sections: Section[];
};

export type IndustryPage = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  challenges: string[];
  outcomes: { label: string; value: string }[];
  /** Slugs of case studies to surface on this page. */
  featured: string[];
};

export type JobPosting = {
  slug: string;
  title: string;
  description: string;
  team: string;
  location: string;
  type: string;
  salaryRange: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
};

export type Endpoint = {
  id: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  title: string;
  description: string;
  parameters: { name: string; type: string; required: boolean; description: string }[];
  example: string;
  response: string;
};

export type ApiResource = {
  slug: string;
  title: string;
  description: string;
  overview: string;
  endpoints: Endpoint[];
};
