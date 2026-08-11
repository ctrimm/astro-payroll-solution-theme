import type { ApiResource } from "./content-types";

/**
 * Endpoint ids match the anchors linked from /documentation/api-reference.
 */
const resources: ApiResource[] = [
  {
    slug: "employees",
    title: "Employees",
    description: "Create, read, and update the people you pay.",
    overview:
      "An employee belongs to exactly one company and carries the compensation and withholding elections used when a payroll run is calculated. Employees are never deleted — terminate them instead, so prior runs and year-end documents stay intact.",
    endpoints: [
      {
        id: "list",
        method: "GET",
        path: "/v1/employees",
        title: "List all employees",
        description:
          "Returns employees for a company, newest first. Results are paginated with a cursor; terminated employees are excluded unless you ask for them.",
        parameters: [
          { name: "company_id", type: "string", required: true, description: "The company to list employees for." },
          { name: "status", type: "string", required: false, description: "One of active, terminated, or all. Defaults to active." },
          { name: "limit", type: "integer", required: false, description: "Between 1 and 100. Defaults to 25." },
          { name: "starting_after", type: "string", required: false, description: "Cursor from a previous page's last object id." },
        ],
        example:
          "curl https://api.payflo.dev/v1/employees \\\n  -H \"Authorization: Bearer $PAYFLO_API_KEY\" \\\n  -G -d company_id=cmp_8f2a -d limit=2",
        response:
          '{\n  "object": "list",\n  "has_more": true,\n  "data": [\n    {\n      "id": "emp_4c19",\n      "first_name": "Dana",\n      "last_name": "Reyes",\n      "status": "active",\n      "compensation": { "type": "salary", "annual_cents": 12000000 },\n      "work_location": { "state": "CA" }\n    }\n  ]\n}',
      },
      {
        id: "create",
        method: "POST",
        path: "/v1/employees",
        title: "Create a new employee",
        description:
          "Creates an employee in onboarding state. They are not included in a payroll run until required tax and payment details are complete — either supplied here or collected through self-service onboarding.",
        parameters: [
          { name: "company_id", type: "string", required: true, description: "The company this employee belongs to." },
          { name: "first_name", type: "string", required: true, description: "Legal first name, as it appears on their Social Security card." },
          { name: "last_name", type: "string", required: true, description: "Legal last name." },
          { name: "email", type: "string", required: true, description: "Used for the onboarding invitation and portal access." },
          { name: "compensation", type: "object", required: true, description: "Either { type: 'salary', annual_cents } or { type: 'hourly', rate_cents }." },
          { name: "work_location", type: "object", required: true, description: "Where the work happens. Determines tax jurisdiction." },
          { name: "start_date", type: "string", required: false, description: "ISO 8601 date. Defaults to today." },
        ],
        example:
          "curl -X POST https://api.payflo.dev/v1/employees \\\n  -H \"Authorization: Bearer $PAYFLO_API_KEY\" \\\n  -H \"Idempotency-Key: emp-dana-reyes-001\" \\\n  -d company_id=cmp_8f2a \\\n  -d first_name=Dana \\\n  -d last_name=Reyes \\\n  -d email=dana@acme.com \\\n  -d 'compensation[type]=salary' \\\n  -d 'compensation[annual_cents]=12000000' \\\n  -d 'work_location[state]=CA'",
        response:
          '{\n  "id": "emp_4c19",\n  "object": "employee",\n  "status": "onboarding",\n  "onboarding": {\n    "w4_complete": false,\n    "payment_method_complete": false,\n    "i9_complete": false\n  },\n  "created_at": "2025-01-08T17:04:22Z"\n}',
      },
    ],
  },
  {
    slug: "payroll",
    title: "Payroll",
    description: "Create, inspect, and approve payroll runs.",
    overview:
      "A payroll run covers one pay period for one pay schedule. Runs are created in draft, recalculate on every change, and become immutable once approved. Approving a run authorizes a debit, so send an Idempotency-Key on every write.",
    endpoints: [
      {
        id: "list-runs",
        method: "GET",
        path: "/v1/payroll/runs",
        title: "List all payroll runs",
        description:
          "Returns payroll runs for a company, most recent pay period first. Filter by status to find what still needs approval.",
        parameters: [
          { name: "company_id", type: "string", required: true, description: "The company to list runs for." },
          { name: "status", type: "string", required: false, description: "draft, pending_approval, submitted, settled, or reversed." },
          { name: "pay_date_after", type: "string", required: false, description: "ISO 8601 date. Only runs paid on or after this date." },
          { name: "limit", type: "integer", required: false, description: "Between 1 and 100. Defaults to 25." },
        ],
        example:
          "curl https://api.payflo.dev/v1/payroll/runs \\\n  -H \"Authorization: Bearer $PAYFLO_API_KEY\" \\\n  -G -d company_id=cmp_8f2a -d status=pending_approval",
        response:
          '{\n  "object": "list",\n  "has_more": false,\n  "data": [\n    {\n      "id": "pr_91be",\n      "status": "pending_approval",\n      "pay_period_start": "2025-01-01",\n      "pay_period_end": "2025-01-15",\n      "pay_date": "2025-01-20",\n      "totals": {\n        "gross_cents": 48200000,\n        "employee_taxes_cents": 11568000,\n        "employer_taxes_cents": 3687300,\n        "debit_cents": 40319300\n      }\n    }\n  ]\n}',
      },
      {
        id: "create-run",
        method: "POST",
        path: "/v1/payroll/runs",
        title: "Create a new payroll run",
        description:
          "Opens a draft run for a pay period. Salaried employees are populated at their standard rate; hourly employees need hours before the run can be approved. Creating a run does not move money.",
        parameters: [
          { name: "company_id", type: "string", required: true, description: "The company to run payroll for." },
          { name: "pay_period_start", type: "string", required: true, description: "ISO 8601 date, inclusive." },
          { name: "pay_period_end", type: "string", required: true, description: "ISO 8601 date, inclusive." },
          { name: "pay_date", type: "string", required: false, description: "Defaults to the next pay date on the schedule." },
          { name: "type", type: "string", required: false, description: "regular or off_cycle. Defaults to regular." },
          { name: "employee_ids", type: "array", required: false, description: "Limits an off-cycle run to specific employees." },
        ],
        example:
          "curl -X POST https://api.payflo.dev/v1/payroll/runs \\\n  -H \"Authorization: Bearer $PAYFLO_API_KEY\" \\\n  -H \"Idempotency-Key: run-2025-01-15-acme\" \\\n  -d company_id=cmp_8f2a \\\n  -d pay_period_start=2025-01-01 \\\n  -d pay_period_end=2025-01-15",
        response:
          '{\n  "id": "pr_91be",\n  "object": "payroll_run",\n  "status": "draft",\n  "approval_deadline": "2025-01-16T19:00:00Z",\n  "blocking_issues": [\n    {\n      "code": "missing_hours",\n      "employee_id": "emp_77a2",\n      "message": "Hourly employee has no hours for this period."\n    }\n  ]\n}',
      },
    ],
  },
  {
    slug: "reports",
    title: "Reports",
    description: "Generate payroll, tax, and labor reports.",
    overview:
      "Report generation is asynchronous. Create a job, then wait for the report.ready webhook or poll the job. Download URLs are signed and expire after one hour, so request a fresh one rather than storing the link.",
    endpoints: [
      {
        id: "generate",
        method: "GET",
        path: "/v1/reports",
        title: "Generate payroll reports",
        description:
          "Starts a report job and returns immediately. Reports read from a replica that lags production slightly, so a run approved seconds earlier may not appear yet.",
        parameters: [
          { name: "company_id", type: "string", required: true, description: "The company to report on." },
          { name: "type", type: "string", required: true, description: "payroll_register, tax_liability, labor_distribution, employee_census, or general_ledger." },
          { name: "start_date", type: "string", required: true, description: "ISO 8601 date, inclusive." },
          { name: "end_date", type: "string", required: true, description: "ISO 8601 date, inclusive." },
          { name: "format", type: "string", required: false, description: "csv, xlsx, json, or pdf. Defaults to csv." },
          { name: "group_by", type: "string", required: false, description: "department, location, or project." },
        ],
        example:
          "curl https://api.payflo.dev/v1/reports \\\n  -H \"Authorization: Bearer $PAYFLO_API_KEY\" \\\n  -G -d company_id=cmp_8f2a \\\n  -d type=payroll_register \\\n  -d start_date=2025-01-01 \\\n  -d end_date=2025-03-31 \\\n  -d format=csv",
        response:
          '{\n  "id": "rpt_2d40",\n  "object": "report",\n  "status": "pending",\n  "type": "payroll_register",\n  "estimated_seconds": 12,\n  "download_url": null\n}',
      },
    ],
  },
];

export default resources;
