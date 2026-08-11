import type { Article } from "./content-types";

const tutorials: Article[] = [
  {
    slug: "quickstart",
    title: "Quick Start Guide",
    description: "Get up and running with Payflo in under 15 minutes.",
    category: "Getting Started",
    readingTime: "8 min",
    sections: [
      {
        heading: "Before you begin",
        body: [
          "You need a Payflo account and an API key with write access. Keys are created per environment, so the sandbox key you use here will not touch production data.",
          "Everything in this guide runs against the sandbox. Nothing you do will file a return or move money.",
        ],
        list: [
          "A Payflo account with the Admin or Developer role",
          "A sandbox API key from Settings → Developers",
          "Node 18 or later, if you want to follow the code samples",
        ],
      },
      {
        heading: "Install the SDK",
        body: ["The SDK wraps the REST API and handles auth, retries, and pagination for you."],
        code: {
          language: "bash",
          source: "npm install @payflo/node\nexport PAYFLO_API_KEY=sk_sandbox_...",
        },
      },
      {
        heading: "Create your first company",
        body: [
          "A company is the top-level container for employees, pay schedules, and filings. Most integrations create one company per customer.",
        ],
        code: {
          language: "javascript",
          source:
            "import Payflo from '@payflo/node';\n\nconst payflo = new Payflo(process.env.PAYFLO_API_KEY);\n\nconst company = await payflo.companies.create({\n  legal_name: 'Acme Corp',\n  ein: '12-3456789',\n  address: {\n    line1: '100 Market St',\n    city: 'San Francisco',\n    state: 'CA',\n    postal_code: '94103',\n  },\n});\n\nconsole.log(company.id); // cmp_8f2a...",
        },
      },
      {
        heading: "Add an employee and run payroll",
        body: [
          "With a company in place, add an employee and open a payroll run. The run stays in draft until you submit it, so you can inspect the calculated taxes first.",
        ],
        code: {
          language: "javascript",
          source:
            "const employee = await payflo.employees.create({\n  company_id: company.id,\n  first_name: 'Dana',\n  last_name: 'Reyes',\n  compensation: { type: 'salary', annual_cents: 12000000 },\n});\n\nconst run = await payflo.payrolls.create({\n  company_id: company.id,\n  pay_period_start: '2025-01-01',\n  pay_period_end: '2025-01-15',\n});\n\nconsole.log(run.totals.employer_taxes_cents);",
        },
      },
      {
        heading: "What to do next",
        body: [
          "You now have a working end-to-end integration in sandbox. Before going live, configure your tax jurisdictions and connect a funding source.",
        ],
      },
    ],
  },
  {
    slug: "setup",
    title: "Initial Setup",
    description: "Configure your organization settings and preferences.",
    category: "Getting Started",
    readingTime: "10 min",
    sections: [
      {
        heading: "Organization profile",
        body: [
          "Your organization profile drives what appears on pay stubs, tax filings, and employee notifications. Get it right before you add employees, because some fields lock once a payroll has been filed.",
        ],
        list: [
          "Legal entity name, exactly as registered with the IRS",
          "Federal EIN and any state withholding account numbers",
          "Primary work address for each jurisdiction you operate in",
          "Fiscal year start, which determines annual limit resets",
        ],
      },
      {
        heading: "Pay schedules",
        body: [
          "A pay schedule defines how often employees are paid and when funds must be available. Payflo derives filing deadlines from it, so changing a schedule mid-quarter requires a short reconciliation.",
          "Most customers run a single semi-monthly or biweekly schedule. You can attach multiple schedules to one company if hourly and salaried staff are paid differently.",
        ],
      },
      {
        heading: "Roles and permissions",
        body: ["Payflo ships with four roles. Assign the narrowest one that lets someone do their job."],
        list: [
          "Admin — full access, including funding sources and tax settings",
          "Payroll Manager — can run and approve payroll, cannot change banking",
          "Developer — API key management and sandbox access, no payroll approval",
          "Viewer — read-only reporting access",
        ],
      },
      {
        heading: "Notification preferences",
        body: [
          "Set reminders relative to your pay dates rather than to fixed calendar days. Payflo shifts reminders automatically when a pay date lands on a weekend or federal holiday.",
        ],
      },
    ],
  },
  {
    slug: "api-integration",
    title: "API Integration",
    description: "Learn how to integrate our API into your systems.",
    category: "Developers",
    readingTime: "14 min",
    sections: [
      {
        heading: "Authentication",
        body: [
          "Every request carries a bearer token. Keys are scoped to one environment and one company set, so a compromised sandbox key cannot read production payroll.",
          "Rotate keys from Settings → Developers. Old keys stay valid for 24 hours after rotation to give deploys time to pick up the new value.",
        ],
        code: {
          language: "bash",
          source:
            "curl https://api.payflo.dev/v1/companies \\\n  -H \"Authorization: Bearer $PAYFLO_API_KEY\"",
        },
      },
      {
        heading: "Idempotency",
        body: [
          "Payroll requests move money. Send an Idempotency-Key header on every POST so a retry after a network timeout does not create a second payroll run.",
          "Keys are remembered for 24 hours. Replaying a key returns the original response rather than performing the write again.",
        ],
        code: {
          language: "bash",
          source:
            "curl -X POST https://api.payflo.dev/v1/payrolls \\\n  -H \"Authorization: Bearer $PAYFLO_API_KEY\" \\\n  -H \"Idempotency-Key: run-2025-01-15-acme\" \\\n  -d company_id=cmp_8f2a",
        },
      },
      {
        heading: "Webhooks",
        body: [
          "Payroll is asynchronous. Rather than polling, subscribe to webhooks and react when a run settles or a filing is accepted.",
        ],
        list: [
          "payroll.submitted — the run was accepted and is calculating",
          "payroll.settled — funds have moved and stubs are available",
          "filing.accepted — a tax authority acknowledged the filing",
          "filing.rejected — action required, includes a reason code",
        ],
      },
      {
        heading: "Verifying webhook signatures",
        body: [
          "Each delivery is signed with your endpoint secret. Compare using a constant-time function, and reject anything older than five minutes to blunt replay attempts.",
        ],
        code: {
          language: "javascript",
          source:
            "import crypto from 'node:crypto';\n\nfunction verify(payload, header, secret) {\n  const [ts, sig] = header.split(',').map((p) => p.split('=')[1]);\n  if (Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false;\n\n  const expected = crypto\n    .createHmac('sha256', secret)\n    .update(`${ts}.${payload}`)\n    .digest('hex');\n\n  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));\n}",
        },
      },
      {
        heading: "Rate limits",
        body: [
          "The default limit is 100 requests per second per key, burstable to 300. Responses include X-RateLimit-Remaining. On a 429, back off using the Retry-After header rather than a fixed sleep.",
        ],
      },
    ],
  },
  {
    slug: "run-first-payroll",
    title: "Running Your First Payroll",
    description: "Learn how to process your first payroll run with our step-by-step guide.",
    category: "Payroll",
    readingTime: "12 min",
    sections: [
      {
        heading: "Open the run",
        body: [
          "Payflo opens a draft run automatically at the start of each pay period. The draft pulls in salaried employees at their standard rate and waits for hourly totals.",
        ],
      },
      {
        heading: "Enter hours and one-off items",
        body: [
          "Import hours from a connected time system or enter them directly. This is also where bonuses, commissions, reimbursements, and deductions go.",
          "Reimbursements are not taxable and are kept separate from gross wages on the stub. Bonuses default to the supplemental withholding rate.",
        ],
      },
      {
        heading: "Review the preview",
        body: [
          "The preview shows employee net pay, employer taxes, and the total debit against your funding account. Check the debit total before approving, because that is the amount that will be pulled.",
        ],
        list: [
          "Gross wages by employee and by department",
          "Employee tax withholding, broken out by jurisdiction",
          "Employer-side taxes, including FUTA and SUTA",
          "Total cash requirement and the date it will be debited",
        ],
      },
      {
        heading: "Approve before the cutoff",
        body: [
          "Standard ACH settlement requires approval four business days before the pay date. Same-day ACH is available on eligible accounts with an 11am ET cutoff.",
          "Once approved, a run cannot be edited. It can be reversed within 24 hours if funds have not yet settled.",
        ],
      },
      {
        heading: "After the run",
        body: [
          "Stubs publish to the employee portal the morning of the pay date. Payflo files the associated tax deposits on your behalf according to your deposit schedule.",
        ],
      },
    ],
  },
  {
    slug: "employee-onboarding",
    title: "Employee Onboarding",
    description: "Streamline your employee onboarding process with our comprehensive guide.",
    category: "People",
    readingTime: "9 min",
    sections: [
      {
        heading: "Self-service onboarding",
        body: [
          "Send an invite and the employee completes their own profile: personal details, Form W-4, direct deposit, and I-9 attestation. Nothing lands in payroll until every required item is done.",
        ],
      },
      {
        heading: "What Payflo collects",
        list: [
          "Legal name, SSN, and home address for tax jurisdiction assignment",
          "Federal Form W-4 and the state equivalent where one exists",
          "Bank account and routing number, with instant verification",
          "Signed I-9 attestation and supporting document upload",
        ],
      },
      {
        heading: "Work location matters",
        body: [
          "Tax jurisdiction follows where the work happens, not where the company is registered. A remote employee in another state usually creates a new withholding obligation there.",
          "Payflo flags this during onboarding and walks you through registering, so the first payroll is not filed against a jurisdiction you lack an account for.",
        ],
      },
      {
        heading: "Contractors",
        body: [
          "Contractors onboard through the same flow but complete a W-9 instead of a W-4. They are paid outside the payroll run and receive a 1099-NEC at year end.",
        ],
      },
    ],
  },
  {
    slug: "tax-setup",
    title: "Tax Configuration",
    description: "Set up your tax settings correctly to ensure compliance and accuracy.",
    category: "Compliance",
    readingTime: "11 min",
    sections: [
      {
        heading: "Federal setup",
        body: [
          "Enter your EIN and deposit schedule. The IRS assigns you a monthly or semi-weekly schedule based on prior-year liability, and depositing on the wrong cadence draws a penalty even when the amount is right.",
        ],
      },
      {
        heading: "State and local accounts",
        body: [
          "Each state where you have an employee needs its own withholding account, and most need an unemployment insurance account too. Registration can take two to six weeks, so start before your first payroll there.",
          "Until an account number is on file, Payflo calculates and holds the liability rather than filing it. Nothing is lost, but the filing is late if the account is not opened in time.",
        ],
      },
      {
        heading: "Unemployment rates",
        body: [
          "Your SUTA rate is assigned annually and varies by state and claims history. Update it when the notice arrives — the new rate usually applies retroactively to January 1, and Payflo will true up prior runs automatically.",
        ],
      },
      {
        heading: "Common mistakes",
        list: [
          "Using the FEIN in place of a state withholding number",
          "Leaving the prior year's SUTA rate in place after a new assessment",
          "Missing a local jurisdiction, which is common in OH, PA, NY, and KY",
          "Registering in the company's home state but not the employee's",
        ],
      },
    ],
  },
  {
    slug: "payroll",
    title: "Payroll Processing",
    description: "Learn about running payroll, adjustments, and special payments.",
    category: "Payroll",
    readingTime: "10 min",
    sections: [
      {
        heading: "Regular runs",
        body: [
          "A regular run follows your pay schedule and covers standard wages plus anything entered for that period. Most companies never need anything else.",
        ],
      },
      {
        heading: "Off-cycle runs",
        body: [
          "Use an off-cycle run for a correction, a termination payout, or a bonus you do not want blended into regular wages. Off-cycle runs file against the same quarter and appear separately on reports.",
        ],
      },
      {
        heading: "Supplemental wages",
        body: [
          "Bonuses and commissions are supplemental wages. Payflo defaults to the flat 22% federal supplemental rate, which is usually what you want. The aggregate method is available where a flat rate would badly over- or under-withhold.",
        ],
      },
      {
        heading: "Corrections and reversals",
        body: [
          "A run can be reversed within 24 hours if funds have not settled. After settlement, issue a correcting off-cycle run instead — this keeps the audit trail intact and files an amended return automatically if the quarter has closed.",
        ],
        list: [
          "Void — cancels an unsettled payment, no filing impact",
          "Reversal — pulls back a settled payment, requires employee notice",
          "Correction — adjusts a prior run and amends the affected filing",
        ],
      },
    ],
  },
  {
    slug: "compliance",
    title: "Compliance",
    description: "Stay compliant with tax laws and regulations.",
    category: "Compliance",
    readingTime: "9 min",
    sections: [
      {
        heading: "What Payflo files for you",
        list: [
          "Form 941 quarterly, or Form 944 for small annual filers",
          "Form 940 annually for federal unemployment",
          "State withholding and unemployment returns in every registered jurisdiction",
          "W-2s and 1099-NECs, filed and distributed by January 31",
        ],
      },
      {
        heading: "Deposit deadlines",
        body: [
          "Deposits are separate from returns and are usually what triggers penalties. Semi-weekly depositors owe funds within three business days of the pay date; monthly depositors owe by the 15th of the following month.",
          "Payflo schedules deposits automatically from your pay dates. The one thing you control is having funds available — a failed debit is treated as a missed deposit.",
        ],
      },
      {
        heading: "Wage and hour rules",
        body: [
          "Payflo calculates overtime at 1.5x for hours past 40 in a workweek, and applies daily overtime in states that require it. Exempt classification is your call, and it is the most common source of back-pay exposure.",
        ],
      },
      {
        heading: "Recordkeeping",
        body: [
          "Federal rules require payroll records for at least three years and the calculations behind them for two. Payflo retains everything for seven years and exports it on demand, which covers every state requirement we are aware of.",
        ],
      },
    ],
  },
  {
    slug: "reporting",
    title: "Reporting",
    description: "Generate and customize various payroll reports.",
    category: "Reporting",
    readingTime: "7 min",
    sections: [
      {
        heading: "Standard reports",
        list: [
          "Payroll register — every line of a run, by employee",
          "Tax liability — what was withheld, owed, and deposited",
          "Labor distribution — cost split by department, project, or location",
          "General ledger export — journal entries for your accounting system",
        ],
      },
      {
        heading: "Custom reports",
        body: [
          "Build a report by picking fields and a date range, then save it. Saved reports can run on a schedule and land in your inbox or an S3 bucket.",
        ],
      },
      {
        heading: "Pulling reports over the API",
        body: [
          "Report generation is asynchronous. Request the report, then poll the job or wait for the report.ready webhook before downloading.",
        ],
        code: {
          language: "javascript",
          source:
            "const job = await payflo.reports.create({\n  company_id: company.id,\n  type: 'payroll_register',\n  start_date: '2025-01-01',\n  end_date: '2025-03-31',\n  format: 'csv',\n});\n\nconst report = await payflo.reports.wait(job.id);\nconsole.log(report.download_url);",
        },
      },
      {
        heading: "Accounting integrations",
        body: [
          "Connected accounting systems receive journal entries automatically after each run settles. Map your accounts once and Payflo keeps posting to them.",
        ],
      },
    ],
  },
  {
    slug: "benefits",
    title: "Benefits Management",
    description: "Set up and manage employee benefits.",
    category: "People",
    readingTime: "8 min",
    sections: [
      {
        heading: "Deduction types",
        body: [
          "Whether a deduction is pre-tax or post-tax changes both employee net pay and employer tax liability, so this setting matters more than it looks.",
        ],
        list: [
          "Pre-tax — medical, dental, vision, HSA, and traditional 401(k)",
          "Post-tax — Roth 401(k), garnishments, and voluntary benefits",
          "Employer contributions — tracked for reporting, not deducted from pay",
        ],
      },
      {
        heading: "Annual limits",
        body: [
          "Payflo tracks contribution limits across the year and stops deductions once an employee reaches the cap. Limits update each January without any action from you.",
          "For a mid-year hire, enter prior-employer contributions so the limit is enforced against the full year rather than just time with you.",
        ],
      },
      {
        heading: "Open enrollment",
        body: [
          "Elections made during open enrollment take effect on the plan year start date, not immediately. Payflo holds the change and applies it to the first run of the new plan year.",
        ],
      },
      {
        heading: "Garnishments",
        body: [
          "Garnishments are court-ordered and take priority over voluntary deductions. Payflo applies federal and state disposable-income limits so an order cannot take more than the law allows.",
        ],
      },
    ],
  },
  {
    slug: "integrations",
    title: "Integrations",
    description: "Connect with your favorite HR and accounting tools.",
    category: "Developers",
    readingTime: "6 min",
    sections: [
      {
        heading: "Available connectors",
        list: [
          "Accounting — QuickBooks Online, Xero, NetSuite, Sage Intacct",
          "Time tracking — Deputy, When I Work, Harvest, Clockify",
          "HRIS — BambooHR, Rippling, Namely",
          "Identity — Okta, Google Workspace, Microsoft Entra ID",
        ],
      },
      {
        heading: "How syncing works",
        body: [
          "Connectors sync on a schedule and after each payroll run. Payflo treats the source system as authoritative for the records it owns — employee records from your HRIS, hours from your time system.",
          "Conflicts surface as a review item rather than being silently resolved, so a bad sync cannot quietly change someone's pay.",
        ],
      },
      {
        heading: "Building your own",
        body: [
          "Anything a connector does is available over the REST API. Subscribe to webhooks for payroll and filing events rather than polling.",
        ],
      },
    ],
  },
  {
    slug: "security",
    title: "Security",
    description: "Learn about security features and best practices.",
    category: "Security",
    readingTime: "8 min",
    sections: [
      {
        heading: "How your data is protected",
        list: [
          "TLS 1.2 or higher in transit, AES-256 at rest",
          "Bank details and SSNs held in a separate encrypted store",
          "SOC 2 Type II audited annually",
          "Backups encrypted and replicated across three regions",
        ],
      },
      {
        heading: "Access controls",
        body: [
          "Enforce SSO and require MFA for every role that can approve payroll or change banking details. These two settings prevent most of the account takeover attempts we see.",
        ],
      },
      {
        heading: "Protecting API keys",
        body: [
          "Keys are shown once at creation. Store them in a secrets manager, never in source control, and use a separate key per service so revoking one does not take everything down.",
        ],
        list: [
          "Use sandbox keys everywhere except production",
          "Rotate on a schedule and immediately after any staff departure",
          "Scope each key to the narrowest set of companies it needs",
        ],
      },
      {
        heading: "Audit logs",
        body: [
          "Every state change records who did it, when, and from where. Logs are exportable and stream to your SIEM. They are append-only — nobody, including Payflo staff, can edit them.",
        ],
      },
    ],
  },
];

export default tutorials;
