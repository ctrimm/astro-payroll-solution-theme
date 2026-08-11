import type { CaseStudy, IndustryPage } from "./content-types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "techcorp",
    title: "How TechCorp cut payroll processing from three days to two hours",
    description:
      "TechCorp replaced a spreadsheet-and-email payroll process with Payflo and gave their finance team its week back.",
    customer: "TechCorp",
    industry: "Technology",
    logo: "/partner-logo-1.svg",
    metrics: [
      { label: "Processing time", value: "3 days → 2 hrs" },
      { label: "Compliance achievement", value: "100%" },
      { label: "Annual cost savings", value: "$200,000" },
      { label: "Employees", value: "1,200" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "TechCorp ran payroll for 1,200 employees across nine states out of a spreadsheet that three people maintained by hand. Each cycle took roughly three days, and the last day was always a scramble to reconcile totals before the bank cutoff.",
          "The real cost was not the hours. It was that nobody could answer a question about a past run without rebuilding it, and two state registrations had lapsed without anyone noticing.",
        ],
      },
      {
        heading: "What changed",
        body: [
          "Payflo took over calculation, deposits, and filings across all nine jurisdictions. Hours flow in from their time system, and the finance team reviews a preview instead of assembling one.",
        ],
        list: [
          "Nine state registrations audited and two reinstated during onboarding",
          "Time tracking connected, removing manual hour entry entirely",
          "General ledger export mapped to their existing chart of accounts",
          "Approval limited to two named people, with an audit trail behind it",
        ],
      },
      {
        heading: "The result",
        body: [
          "Payroll now takes about two hours, most of it review. The $200,000 in annual savings is mostly redeployed headcount — the three-person payroll function is now one person part-time.",
          "The outcome the CFO cites, though, is that a question about any run from the last two years is answerable in about a minute.",
        ],
      },
    ],
  },
  {
    slug: "startup-success",
    title: "StartupCo's scaling story",
    description:
      "How a fast-growing startup managed payroll for their expanding team across 5 countries.",
    customer: "StartupCo",
    industry: "Technology",
    logo: "/partner-logo-2.svg",
    metrics: [
      { label: "Countries", value: "5" },
      { label: "Headcount growth", value: "18 → 240" },
      { label: "Time to add a country", value: "6 wks → 4 days" },
      { label: "Payroll staff", value: "0.5 FTE" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "StartupCo grew from 18 to 240 people in under two years, hiring wherever the talent was. Each new country meant a new local provider, a new portal, and a new set of deadlines nobody at head office understood.",
          "By the fifth country, their head of finance was spending more time on payroll administration than on financial planning.",
        ],
      },
      {
        heading: "What changed",
        body: [
          "Payflo consolidated US payroll and coordinates the international providers through a single interface, so there is one calendar and one consolidated view of cost.",
        ],
        list: [
          "One approval flow covering all five countries",
          "Consolidated labor cost reporting by entity and by team",
          "Registration handled ahead of the first hire in each new jurisdiction",
          "Contractor payments moved into the same system as employees",
        ],
      },
      {
        heading: "The result",
        body: [
          "Adding a new country went from a six-week project to about four days. Payroll administration is now roughly half of one person's role rather than most of the finance leader's week.",
        ],
      },
    ],
  },
  {
    slug: "enterprise-evolution",
    title: "Enterprise Inc's evolution",
    description:
      "Modernizing legacy systems and achieving seamless payroll integration for 10,000+ employees.",
    customer: "Enterprise Inc",
    industry: "Manufacturing",
    logo: "/partner-logo-3.svg",
    metrics: [
      { label: "Employees", value: "10,400" },
      { label: "Legacy systems retired", value: "4" },
      { label: "Migration downtime", value: "0 runs missed" },
      { label: "Error rate", value: "−94%" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Enterprise Inc had accumulated four payroll systems through acquisition, each with its own pay calendar and its own definition of a department. Consolidated labor cost took two weeks to produce and was contested every time.",
          "The mainframe system handling 60% of headcount had one remaining person who understood it, and he was two years from retirement.",
        ],
      },
      {
        heading: "What changed",
        body: [
          "The migration ran over three quarters, one business unit at a time, with parallel runs on both systems until totals matched to the cent for two consecutive cycles.",
        ],
        list: [
          "Seven years of historical payroll data migrated and reconciled",
          "Department taxonomy unified across all four legacy systems",
          "Parallel running for every unit before cutover — no big-bang switch",
          "Mainframe decommissioned four months ahead of schedule",
        ],
      },
      {
        heading: "The result",
        body: [
          "Not a single payroll run was missed or late during the migration. Consolidated labor reporting is now same-day, and post-run correction volume fell by 94%.",
        ],
      },
    ],
  },
  {
    slug: "retail-revolution",
    title: "RetailPro's revolution",
    description:
      "Simplifying complex payroll calculations for hourly workers across 200 retail locations.",
    customer: "RetailPro",
    industry: "Retail",
    logo: "/partner-logo-4.svg",
    metrics: [
      { label: "Locations", value: "200" },
      { label: "Hourly employees", value: "6,800" },
      { label: "Overtime disputes", value: "−88%" },
      { label: "Manager hours saved", value: "1,400/mo" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "RetailPro's 6,800 hourly employees worked variable shifts across 200 locations in states with different overtime rules. Store managers calculated overtime by hand, and they got it wrong often enough that disputes were a weekly occurrence.",
          "Two states also required daily overtime, which the previous system did not model at all.",
        ],
      },
      {
        heading: "What changed",
        body: [
          "Payflo took over overtime calculation directly from clock data, applying the correct rule per work location rather than per company.",
        ],
        list: [
          "Daily and weekly overtime applied per jurisdiction automatically",
          "Split-shift and reporting-time premiums handled where required",
          "Shift differentials configured once, applied everywhere",
          "Employees see the calculation behind their own overtime in the portal",
        ],
      },
      {
        heading: "The result",
        body: [
          "Overtime disputes fell 88%. Store managers got back roughly 1,400 hours a month collectively — time that had been going into arithmetic that a system should have been doing.",
        ],
      },
    ],
  },
];

export const industries: IndustryPage[] = [
  {
    slug: "technology",
    title: "Payroll for technology companies",
    description: "Success stories from software companies and tech startups.",
    intro:
      "Technology companies hire fast, hire remotely, and pay a large share of compensation in equity. Each of those creates a payroll problem that a standard setup handles badly.",
    challenges: [
      "New state registrations triggered by every remote hire",
      "RSU vesting and option exercises that must be withheld correctly",
      "Rapid headcount growth outpacing manual processes",
      "Contractors and employees paid from the same budget but taxed differently",
    ],
    outcomes: [
      { label: "Avg. time to add a state", value: "4 days" },
      { label: "Equity events handled", value: "Automatic" },
      { label: "Payroll staff per 1,000 employees", value: "0.5" },
    ],
    featured: ["techcorp", "startup-success"],
  },
  {
    slug: "retail",
    title: "Payroll for retail businesses",
    description: "How retail businesses manage complex workforce payroll.",
    intro:
      "Retail payroll is an overtime problem. Variable shifts, multiple locations, and state-specific premium rules mean the calculation changes depending on where an employee stood that day.",
    challenges: [
      "Daily versus weekly overtime rules that differ by state",
      "Split-shift and reporting-time premiums",
      "High turnover driving constant onboarding and final-pay deadlines",
      "Shift differentials across locations and time bands",
    ],
    outcomes: [
      { label: "Overtime dispute reduction", value: "up to 88%" },
      { label: "Locations per admin", value: "200+" },
      { label: "Final pay compliance", value: "100%" },
    ],
    featured: ["retail-revolution"],
  },
  {
    slug: "healthcare",
    title: "Payroll for healthcare organizations",
    description: "Payroll solutions for healthcare organizations.",
    intro:
      "Healthcare runs around the clock, which means shift differentials, on-call pay, and certification-linked rates — all of it under scrutiny from both labor regulators and accreditation bodies.",
    challenges: [
      "Night, weekend, and holiday differentials stacking on one shift",
      "On-call and callback pay with their own minimums",
      "Rates tied to license and certification status",
      "Per-diem and travel staff paid on different terms than core staff",
    ],
    outcomes: [
      { label: "Differential accuracy", value: "99.9%" },
      { label: "Credential-linked rate changes", value: "Automatic" },
      { label: "Audit preparation time", value: "−70%" },
    ],
    featured: ["enterprise-evolution"],
  },
  {
    slug: "manufacturing",
    title: "Payroll for manufacturing",
    description: "Managing payroll for manufacturing workforce.",
    intro:
      "Manufacturing payroll has to reconcile to production. Crews, shifts, piece rates, and union agreements all feed the calculation, and labor cost has to land against the right job or cost center.",
    challenges: [
      "Union agreements with their own rate tables and progressions",
      "Piece-rate and incentive pay alongside hourly wages",
      "Rotating shift patterns crossing pay period boundaries",
      "Labor cost allocation to jobs, lines, and cost centers",
    ],
    outcomes: [
      { label: "Cost allocation accuracy", value: "99.7%" },
      { label: "Union reporting", value: "Automated" },
      { label: "Correction volume", value: "−94%" },
    ],
    featured: ["enterprise-evolution"],
  },
  {
    slug: "professional-services",
    title: "Payroll for professional services",
    description: "Solutions for consulting and service firms.",
    intro:
      "For consulting and service firms, payroll is the input to utilization and margin. If hours are not allocated to the right client and project, the reporting that runs the business is wrong.",
    challenges: [
      "Billable and non-billable hours tracked to project and client",
      "Consultants working across multiple state jurisdictions",
      "Commission and bonus structures tied to realization",
      "Subcontractors paid alongside employees",
    ],
    outcomes: [
      { label: "Project cost accuracy", value: "99.5%" },
      { label: "Multi-state handling", value: "Automatic" },
      { label: "Utilization reporting", value: "Same-day" },
    ],
    featured: ["startup-success", "techcorp"],
  },
  {
    slug: "nonprofit",
    title: "Payroll for nonprofits",
    description: "How nonprofits optimize their payroll processes.",
    intro:
      "Nonprofit payroll is grant accounting in disguise. Salaries split across funding sources, and each funder wants to see its share substantiated in a specific format.",
    challenges: [
      "Salary allocation across multiple grants and programs",
      "Time and effort certification for federally funded roles",
      "Restricted fund tracking down to the individual paycheck",
      "Volunteer stipends and mixed employment classifications",
    ],
    outcomes: [
      { label: "Grant allocation accuracy", value: "100%" },
      { label: "Effort reporting", value: "Automated" },
      { label: "Audit findings", value: "Zero" },
    ],
    featured: ["startup-success"],
  },
];

export default caseStudies;
