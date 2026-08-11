import type { Article } from "./content-types";

/**
 * Reference documentation. Where a tutorial walks through a task, these pages
 * describe how a subsystem behaves.
 */
const documentation: Article[] = [
  {
    slug: "quick-start",
    title: "Quick Start Guide",
    description: "Get up and running with Payflo in minutes.",
    category: "Getting Started",
    readingTime: "6 min",
    sections: [
      {
        heading: "The object model",
        body: [
          "Four objects carry most of the system. A company owns employees; employees belong to a pay schedule; a payroll run pays employees for one period on one schedule.",
        ],
        list: [
          "Company — legal entity, tax accounts, funding source",
          "Employee — person, compensation, withholding elections",
          "Pay schedule — frequency, pay dates, approval cutoffs",
          "Payroll run — one period's calculation and payment",
        ],
      },
      {
        heading: "Environments",
        body: [
          "Sandbox and production are fully separate: different keys, different data, no shared state. Sandbox never moves money or files a return, and tax calculations there use the same engine as production.",
        ],
      },
      {
        heading: "Your first request",
        code: {
          language: "bash",
          source:
            "curl https://api.payflo.dev/v1/companies \\\n  -H \"Authorization: Bearer $PAYFLO_API_KEY\" \\\n  -d legal_name='Acme Corp' \\\n  -d ein='12-3456789'",
        },
      },
      {
        heading: "Versioning",
        body: [
          "The API is versioned by URL path. Breaking changes ship as a new version; additive changes land in place. Versions are supported for 24 months after their successor is released.",
        ],
      },
    ],
  },
  {
    slug: "integration",
    title: "Integration Guide",
    description: "Learn how to integrate Payflo with your existing systems.",
    category: "Developers",
    readingTime: "12 min",
    sections: [
      {
        heading: "Choosing an integration model",
        body: [
          "Most teams pick one of three shapes depending on how much of the payroll experience they want to own.",
        ],
        list: [
          "Embedded UI — drop our components in, we own the interface",
          "Headless API — you build the interface, we handle calculation and filing",
          "Hybrid — embedded onboarding, your own payroll approval flow",
        ],
      },
      {
        heading: "Embedded components",
        body: [
          "Components render in an iframe and are authorized with a short-lived session token minted server-side. Never expose an API key to the browser.",
        ],
        code: {
          language: "javascript",
          source:
            "// Server\nconst session = await payflo.sessions.create({\n  company_id: 'cmp_8f2a',\n  component: 'employee_onboarding',\n  expires_in: 900,\n});\n\n// Browser\nPayflo.mount('#onboarding', { token: session.token });",
        },
      },
      {
        heading: "Syncing your own records",
        body: [
          "Store the Payflo object id alongside your own record rather than matching on email or name. Ids are stable; the fields people use to match are not.",
          "When a sync conflict occurs, Payflo returns a 409 with both versions rather than picking a winner.",
        ],
      },
      {
        heading: "Testing",
        body: [
          "Sandbox provides deterministic test fixtures. Specific EINs and routing numbers trigger specific outcomes so you can exercise failure paths without waiting for a real rejection.",
        ],
        list: [
          "EIN 00-0000001 — filing rejected, invalid account",
          "Routing 110000000 — ACH return, account closed",
          "Employee SSN 000-00-0002 — jurisdiction registration missing",
        ],
      },
    ],
  },
  {
    slug: "payroll-processing",
    title: "Payroll Processing",
    description: "Learn about our payroll processing system and features.",
    category: "Payroll",
    readingTime: "10 min",
    sections: [
      {
        heading: "Run lifecycle",
        body: [
          "A run moves through five states. Only draft is editable, and only settled is final.",
        ],
        list: [
          "draft — open for edits, recalculates on every change",
          "pending_approval — locked, waiting on an approver",
          "submitted — approved, funds requested",
          "settled — money moved, stubs published",
          "reversed — pulled back before or shortly after settlement",
        ],
      },
      {
        heading: "Calculation order",
        body: [
          "Order matters, because each step changes the base for the next. Payflo calculates gross, subtracts pre-tax deductions, applies taxes to the reduced base, then subtracts post-tax deductions and garnishments.",
          "This is why moving a deduction between pre-tax and post-tax changes employer tax liability, not just employee net pay.",
        ],
      },
      {
        heading: "Funding",
        body: [
          "Payflo debits one total per run covering net pay plus employer taxes. Standard ACH settles in four business days; same-day ACH is available on eligible accounts.",
          "A failed debit halts the run before payments go out. Nothing partially executes.",
        ],
      },
      {
        heading: "Multi-state employees",
        body: [
          "An employee working across states may owe withholding in more than one. Payflo applies reciprocity agreements where they exist and splits withholding by work location otherwise.",
        ],
      },
    ],
  },
  {
    slug: "tax-calculations",
    title: "Tax Calculations",
    description: "Understanding how our tax engine works.",
    category: "Compliance",
    readingTime: "11 min",
    sections: [
      {
        heading: "What the engine computes",
        list: [
          "Federal income tax withholding, per the current Publication 15-T",
          "Social Security and Medicare, including the additional Medicare surtax",
          "FUTA, with the credit reduction applied in affected states",
          "State income tax and state unemployment in every registered jurisdiction",
          "Local taxes, including school district and municipal levies",
        ],
      },
      {
        heading: "How jurisdiction is determined",
        body: [
          "Jurisdiction follows work location first and residence second. For an employee who lives and works in different states, Payflo applies the reciprocity agreement between them if one exists, and withholds for both where it does not.",
        ],
      },
      {
        heading: "Wage bases and limits",
        body: [
          "Social Security, FUTA, and SUTA all stop at a wage base. Payflo tracks year-to-date wages per employee per jurisdiction and stops withholding at the cap automatically.",
          "For a mid-year hire, enter prior-employer year-to-date wages. Without them the employee is treated as starting at zero, which over-withholds.",
        ],
      },
      {
        heading: "Rate updates",
        body: [
          "Federal and state rate changes are applied on their effective dates without any action from you. The one rate you must supply is your SUTA rate, which is assigned to you individually each year.",
        ],
      },
      {
        heading: "Retroactive changes",
        body: [
          "When a rate changes retroactively, Payflo recalculates affected runs and reports the delta. It is collected or refunded on the next run rather than as a separate transaction.",
        ],
      },
    ],
  },
  {
    slug: "compliance",
    title: "Compliance",
    description: "Stay compliant with our built-in compliance tools.",
    category: "Compliance",
    readingTime: "9 min",
    sections: [
      {
        heading: "Filing calendar",
        body: [
          "Payflo derives your filing calendar from your registrations and deposit schedules. It shows what is due, what was filed, and what was accepted by each authority.",
        ],
      },
      {
        heading: "Registration tracking",
        body: [
          "Every jurisdiction where you have an employee needs an account before Payflo can file there. Missing registrations appear as blocking items with the registration link for that state.",
          "Liability is still calculated and held while a registration is pending, so nothing is lost — but the filing will be late if the account is not open by the deadline.",
        ],
      },
      {
        heading: "Notices",
        body: [
          "Forward any notice you receive to notices@payflo.dev. Payflo identifies the period and filing it refers to, drafts a response, and tracks it to resolution.",
        ],
      },
      {
        heading: "Year-end",
        body: [
          "W-2s and 1099-NECs generate in early January from the year's runs. Review the preview before the January 31 deadline — corrections after distribution require a W-2c, which is slower and visible to the employee.",
        ],
      },
    ],
  },
  {
    slug: "reporting",
    title: "Reporting",
    description: "Generate and customize payroll reports.",
    category: "Reporting",
    readingTime: "7 min",
    sections: [
      {
        heading: "Report types",
        list: [
          "Payroll register — line-level detail for a run or date range",
          "Tax liability — withheld, owed, and deposited by jurisdiction",
          "Labor distribution — cost by department, project, or location",
          "Employee census — headcount, compensation, and tenure",
          "General ledger — journal entries ready for your accounting system",
        ],
      },
      {
        heading: "Data freshness",
        body: [
          "Reports read from a replica that lags production by under a minute. A report pulled immediately after approving a run may not include it yet; wait for the payroll.settled webhook.",
        ],
      },
      {
        heading: "Export formats",
        body: [
          "CSV, XLSX, JSON, and PDF. Download links are signed and expire after one hour. Generate a fresh link rather than storing the URL.",
        ],
      },
      {
        heading: "Scheduled delivery",
        body: [
          "Any saved report can run on a schedule and deliver by email, SFTP, or S3. Scheduled reports run against the same permissions as their creator, so they stop if that account is deactivated.",
        ],
      },
    ],
  },
  {
    slug: "employee-portal",
    title: "Employee Portal",
    description: "Set up and manage the employee self-service portal.",
    category: "People",
    readingTime: "6 min",
    sections: [
      {
        heading: "What employees can do",
        list: [
          "View and download pay stubs and tax documents",
          "Update address, direct deposit, and withholding elections",
          "Enroll in benefits during an open enrollment window",
          "See time off balances when a time system is connected",
        ],
      },
      {
        heading: "Branding",
        body: [
          "The portal takes your logo, colors, and custom domain. Employees never see Payflo branding unless you leave the default in place.",
        ],
      },
      {
        heading: "Access and authentication",
        body: [
          "Employees sign in with email and a one-time code, or through your identity provider if SSO is configured. Access ends automatically 90 days after termination, with tax document access preserved through year-end.",
        ],
      },
      {
        heading: "What changes require approval",
        body: [
          "Address and withholding updates apply immediately. Bank account changes hold for one business day and notify the previous account, which is the single most effective control against payroll diversion fraud.",
        ],
      },
    ],
  },
  {
    slug: "security",
    title: "Security",
    description: "Learn about our security features and best practices.",
    category: "Security",
    readingTime: "8 min",
    sections: [
      {
        heading: "Certifications",
        list: [
          "SOC 2 Type II, audited annually",
          "PCI DSS Level 1 for card-funded accounts",
          "Annual third-party penetration testing, summary available under NDA",
        ],
      },
      {
        heading: "Encryption",
        body: [
          "TLS 1.2 or higher in transit and AES-256 at rest. Bank account numbers and SSNs live in a separate store with their own keys, so a compromise of the primary database does not expose them.",
        ],
      },
      {
        heading: "Recommended configuration",
        list: [
          "Require SSO and MFA for every role that can approve payroll",
          "Use a distinct API key per service, scoped to the companies it needs",
          "Enable bank-change notifications for admins",
          "Stream audit logs to your SIEM",
        ],
      },
      {
        heading: "Reporting a vulnerability",
        body: [
          "Send findings to security@payflo.dev. We acknowledge within one business day and do not pursue legal action against good-faith research that follows our disclosure policy.",
        ],
      },
    ],
  },
];

export default documentation;
