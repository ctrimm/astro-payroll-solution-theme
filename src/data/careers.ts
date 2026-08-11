import type { JobPosting } from "./content-types";

const jobs: JobPosting[] = [
  {
    slug: "senior-software-engineer",
    title: "Senior Software Engineer",
    description: "Help build and scale our core payroll infrastructure.",
    team: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
    salaryRange: "$165,000 – $210,000 + equity",
    about:
      "Payroll is unforgiving. A rounding error is somebody's rent, and a missed deposit is a penalty with our customer's name on it. You would work on the systems that calculate, move, and file — where correctness is the product and the deadline is set by a tax authority rather than by us.",
    responsibilities: [
      "Design and build services in the payroll calculation and payments path",
      "Own correctness: property tests, reconciliation jobs, and replayable audit trails",
      "Work with our compliance team to turn regulatory changes into shipped code",
      "Improve the developer experience of our public API and SDKs",
      "Take part in the on-call rotation for the systems your team owns",
    ],
    requirements: [
      "5+ years building and operating production backend services",
      "Strong grounding in relational data modeling and transactional correctness",
      "Experience with systems where a bug has financial or legal consequences",
      "Comfort working across a service boundary you do not fully own",
      "Clear written communication — we default to writing things down",
    ],
    niceToHave: [
      "Payroll, payments, accounting, or tax domain experience",
      "Familiarity with ACH, NACHA rules, or bank integrations",
      "TypeScript and Go, which is most of what we run",
      "Experience running a public API through a breaking version change",
    ],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    description: "Create beautiful, intuitive experiences for our customers.",
    team: "Design",
    location: "Remote (US)",
    type: "Full-time",
    salaryRange: "$140,000 – $180,000 + equity",
    about:
      "Payroll interfaces are usually terrible, and the reason is not laziness — the domain is genuinely dense. You would work on making a complicated thing legible: helping an admin understand what they are about to approve, and helping an employee understand what happened to their paycheck.",
    responsibilities: [
      "Own end-to-end design for a product area, from problem framing to shipped detail",
      "Design flows where the cost of a misunderstanding is real money",
      "Extend our design system and the embedded components customers put in their own products",
      "Run research with payroll admins, and sit in on real payroll runs",
      "Partner with engineering early, while constraints can still change the design",
    ],
    requirements: [
      "4+ years designing software products, with shipped work you can walk through",
      "A portfolio showing complex, data-dense interfaces — not just marketing pages",
      "Fluency in a modern design tool and comfort working in a component system",
      "Ability to explain a design decision in terms of the user problem it solves",
    ],
    niceToHave: [
      "Experience in fintech, HR tech, or another compliance-heavy domain",
      "Front-end skills sufficient to prototype in code",
      "Accessibility experience, particularly WCAG 2.2 AA",
    ],
  },
  {
    slug: "customer-success-manager",
    title: "Customer Success Manager",
    description: "Help our customers succeed with our payroll solutions.",
    team: "Customer Success",
    location: "Remote (US)",
    type: "Full-time",
    salaryRange: "$95,000 – $130,000 + variable",
    about:
      "Our customers are platforms embedding payroll for their own users, which means when something goes wrong it is their reputation on the line first. You would own a portfolio of those relationships — through implementation, through their first year-end, and through the occasional bad day.",
    responsibilities: [
      "Own a portfolio of embedded payroll customers from launch onward",
      "Run implementations: tax registration, data migration, first payroll",
      "Be the escalation path when a filing is rejected or a run needs reversing",
      "Prepare customers for year-end well before January",
      "Bring recurring friction back to product with enough detail to act on",
    ],
    requirements: [
      "3+ years in customer success or account management at a B2B software company",
      "Experience owning technical implementations, not just relationships",
      "Composure with an upset customer on a deadline",
      "Willingness to learn payroll compliance in real depth",
    ],
    niceToHave: [
      "Payroll, PEO, or accounting background",
      "CPP or FPC certification",
      "Experience with API-first products and technical buyers",
    ],
  },
];

export default jobs;
