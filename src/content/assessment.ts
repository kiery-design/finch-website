/**
 * Business Clarity Assessment: questions and recommendation copy.
 * ------------------------------------------------------------------
 * Scored questions use options worth 0–3 points (3 = strongest habit).
 * Each scored question belongs to one of four areas. The scoring logic lives in
 * src/lib/assessment.ts. You can edit wording here without touching code.
 */

export type AreaId = 'visibility' | 'bookkeeping' | 'systems' | 'planning';

export type Area = {
  id: AreaId;
  name: string;
  short: string;
};

export const areas: Area[] = [
  { id: 'visibility', name: 'Financial Visibility', short: 'How well you can see your numbers' },
  { id: 'bookkeeping', name: 'Bookkeeping Habits', short: 'How current and organized your books are' },
  { id: 'systems', name: 'Systems & Operations', short: 'How smoothly the business runs day to day' },
  { id: 'planning', name: 'Confidence & Planning', short: 'How prepared you feel for what is ahead' },
];

export type Option = { label: string; value: number };

export type ScoredQuestion = {
  id: string;
  kind: 'scored';
  area: AreaId;
  prompt: string;
  help?: string;
  options: Option[];
};

export type ChallengeId = 'behind' | 'numbers' | 'systems' | 'taxes' | 'growth';

export type ProfileQuestion = {
  id: 'challenge';
  kind: 'profile';
  prompt: string;
  help?: string;
  options: { label: string; value: ChallengeId }[];
};

export type Question = ScoredQuestion | ProfileQuestion;

export const questions: Question[] = [
  {
    id: 'challenge',
    kind: 'profile',
    prompt: 'What feels like your biggest business challenge right now?',
    help: "Pick the one that's on your mind most. It helps us prioritize your recommendations.",
    options: [
      { label: "My books are behind and I'm not sure where to start", value: 'behind' },
      { label: "I don't really know my numbers", value: 'numbers' },
      { label: 'My systems and admin feel scattered', value: 'systems' },
      { label: 'Tax season stresses me out', value: 'taxes' },
      { label: 'I want to grow but need a clearer plan', value: 'growth' },
    ],
  },
  // ── Financial Visibility ──────────────────────────────
  {
    id: 'reports',
    kind: 'scored',
    area: 'visibility',
    prompt: 'How often do you review financial reports like a profit & loss statement?',
    options: [
      { label: 'Never, or I am not sure what those are', value: 0 },
      { label: 'Only around tax time', value: 1 },
      { label: 'A few times a year', value: 2 },
      { label: 'Monthly or more often', value: 3 },
    ],
  },
  {
    id: 'profit',
    kind: 'scored',
    area: 'visibility',
    prompt: 'If someone asked what your profit was last month, could you answer?',
    options: [
      { label: 'Honestly, no idea', value: 0 },
      { label: 'I could make a rough guess', value: 1 },
      { label: 'Yes, after some digging', value: 2 },
      { label: 'Yes, confidently', value: 3 },
    ],
  },
  {
    id: 'margins',
    kind: 'scored',
    area: 'visibility',
    prompt: 'Do you know which of your products, services, or clients are most profitable?',
    options: [
      { label: "I haven't looked at that", value: 0 },
      { label: 'I have a hunch', value: 1 },
      { label: 'Roughly, for my main offers', value: 2 },
      { label: 'Yes, I track it', value: 3 },
    ],
  },
  // ── Bookkeeping Habits ────────────────────────────────
  {
    id: 'current',
    kind: 'scored',
    area: 'bookkeeping',
    prompt: 'How up to date are your books right now?',
    options: [
      { label: "More than 6 months behind, or I haven't started", value: 0 },
      { label: '3–6 months behind', value: 1 },
      { label: '1–2 months behind', value: 2 },
      { label: 'Current within the last month', value: 3 },
    ],
  },
  {
    id: 'separation',
    kind: 'scored',
    area: 'bookkeeping',
    prompt: 'Are your business and personal finances kept separate?',
    options: [
      { label: 'No, everything runs through the same accounts', value: 0 },
      { label: 'I have a business account but mix things often', value: 1 },
      { label: 'Mostly separate, with occasional overlap', value: 2 },
      { label: 'Completely separate', value: 3 },
    ],
  },
  {
    id: 'tracking',
    kind: 'scored',
    area: 'bookkeeping',
    prompt: 'How do you track income and expenses today?',
    options: [
      { label: "I don't track them consistently", value: 0 },
      { label: 'A spreadsheet or notes when I remember', value: 1 },
      { label: "Accounting software, but I'm not consistent", value: 2 },
      { label: 'Accounting software, reconciled monthly', value: 3 },
    ],
  },
  // ── Systems & Operations ──────────────────────────────
  {
    id: 'invoicing',
    kind: 'scored',
    area: 'systems',
    prompt: 'How do you handle invoicing and getting paid?',
    options: [
      { label: 'Ad hoc. I sometimes forget to invoice or follow up', value: 0 },
      { label: 'I invoice manually and follow up when I notice', value: 1 },
      { label: 'I have a routine, but late payments slip through', value: 2 },
      { label: 'Invoices and reminders go out on a consistent system', value: 3 },
    ],
  },
  {
    id: 'processes',
    kind: 'scored',
    area: 'systems',
    prompt: 'Where do your business processes and key info live?',
    options: [
      { label: 'Mostly in my head', value: 0 },
      { label: 'Scattered across notes, emails, and apps', value: 1 },
      { label: 'Some things are documented', value: 2 },
      { label: 'Organized in one system or dashboard', value: 3 },
    ],
  },
  {
    id: 'admin',
    kind: 'scored',
    area: 'systems',
    prompt: 'How much time each week goes to admin work you wish took less time?',
    options: [
      { label: '10+ hours', value: 0 },
      { label: '5–10 hours', value: 1 },
      { label: '2–5 hours', value: 2 },
      { label: 'Under 2 hours', value: 3 },
    ],
  },
  // ── Confidence & Planning ─────────────────────────────
  {
    id: 'taxes',
    kind: 'scored',
    area: 'planning',
    prompt: 'How do you feel when tax season comes around?',
    options: [
      { label: 'Panicked. It is a big scramble', value: 0 },
      { label: 'Stressed, but I get through it', value: 1 },
      { label: 'Mostly organized', value: 2 },
      { label: "Calm. Records are ready and I've set money aside", value: 3 },
    ],
  },
  {
    id: 'goals',
    kind: 'scored',
    area: 'planning',
    prompt: 'Do you have a budget or financial goals for your business?',
    options: [
      { label: 'No budget or goals yet', value: 0 },
      { label: 'Loose goals in my head', value: 1 },
      { label: 'Written down, but I rarely check them', value: 2 },
      { label: 'Yes, and I review progress regularly', value: 3 },
    ],
  },
  {
    id: 'decisions',
    kind: 'scored',
    area: 'planning',
    prompt: 'How confident do you feel making money decisions, like pricing, hiring, or investing in tools?',
    options: [
      { label: 'Not confident. I mostly guess', value: 0 },
      { label: 'Somewhat. I second-guess myself a lot', value: 1 },
      { label: 'Fairly confident most of the time', value: 2 },
      { label: 'Very confident. I decide from real numbers', value: 3 },
    ],
  },
];

/* ──────────────────────────────────────────────────────────
 * Recommendation copy
 * ────────────────────────────────────────────────────────── */

export type Cta = { label: string; to: string };

export type Recommendation = {
  id: string;
  title: string;
  why: string;
  steps: string[];
  cta?: Cta;
};

const consult: Cta = { label: 'Request a bookkeeping consultation', to: '/contact?topic=bookkeeping' };
const cleanupCta: Cta = { label: 'Learn about cleanup bookkeeping', to: '/bookkeeping#cleanup' };
const monthlyCta: Cta = { label: 'Explore monthly bookkeeping', to: '/bookkeeping#monthly' };
const shopCta: Cta = { label: 'Browse FINCH digital tools', to: '/shop' };

export const recommendationLibrary: Record<string, Recommendation> = {
  cleanup: {
    id: 'cleanup',
    title: 'Get your books caught up first',
    why: 'Your books are several months behind. Until they are current, every report and decision is based on incomplete information.',
    steps: [
      'Pick a cutoff date and gather statements for every business account since your books were last current.',
      'List any accounts you are unsure about. It helps to see the full picture.',
      'Decide whether to tackle the catch-up yourself or hand it off so you can start fresh.',
    ],
    cta: cleanupCta,
  },
  catchupLight: {
    id: 'catchupLight',
    title: 'Close the gap before it grows',
    why: 'You are a month or two behind. That is very manageable now and much harder in six months.',
    steps: [
      'Block one focused session this week to categorize the missing months.',
      'Reconcile each account against its bank statement balance.',
      'Set a recurring monthly reminder so the gap does not reopen.',
    ],
    cta: monthlyCta,
  },
  separate: {
    id: 'separate',
    title: 'Separate business and personal money',
    why: 'Mixed accounts make bookkeeping slower, reports less reliable, and tax time more stressful.',
    steps: [
      'Open (or commit to using) a dedicated business checking account and card.',
      'Run all business income and expenses through those accounts going forward.',
      'Note any mixed transactions so they can be sorted correctly.',
    ],
  },
  system: {
    id: 'system',
    title: 'Move to a consistent bookkeeping routine',
    why: 'Tracking only when you remember leaves blind spots. A simple routine with the right tool makes your numbers trustworthy.',
    steps: [
      'Choose one place where all income and expenses are recorded.',
      'Connect your business bank feeds so transactions come in automatically.',
      'Reconcile accounts once a month. Put it on your calendar.',
    ],
    cta: monthlyCta,
  },
  monthlyReview: {
    id: 'monthlyReview',
    title: 'Start a monthly money check-in',
    why: 'Looking at your numbers regularly is the fastest way to build clarity and catch problems early.',
    steps: [
      'Schedule 30 minutes on the same day each month.',
      'Review three things: revenue, expenses, and profit compared with last month.',
      'Write down one observation and one action for next month.',
    ],
    cta: shopCta,
  },
  profitability: {
    id: 'profitability',
    title: 'Find out what is actually profitable',
    why: 'Knowing which offers or clients make the most money helps you price, focus, and grow intentionally.',
    steps: [
      'List your main offers or client types.',
      'Estimate revenue, direct costs, and time spent for each.',
      'Look for the ones with the best return on your time, and the ones quietly draining it.',
    ],
    cta: shopCta,
  },
  invoicing: {
    id: 'invoicing',
    title: 'Tighten up invoicing and collections',
    why: 'Late or forgotten invoices directly hurt cash flow, even when the business is doing well.',
    steps: [
      'Send invoices the same day work is delivered, or on a fixed schedule.',
      'Turn on automatic payment reminders in your invoicing tool.',
      'Review open invoices weekly and follow up on anything past due.',
    ],
  },
  documentation: {
    id: 'documentation',
    title: 'Get processes out of your head',
    why: 'When everything lives in your head, every task depends on you remembering it. That is draining and hard to delegate.',
    steps: [
      'List the five tasks you repeat most often.',
      'Write a short checklist for each one in a single shared place.',
      'Build from there toward one central hub for clients, projects, and processes.',
    ],
    cta: shopCta,
  },
  admin: {
    id: 'admin',
    title: 'Win back hours from admin',
    why: 'A heavy admin load takes time away from the work that grows your business.',
    steps: [
      'Track your admin tasks for one week and note how long each takes.',
      'Pick the most repetitive one to template, automate, or hand off.',
      'Batch remaining admin into one or two set blocks per week.',
    ],
    cta: consult,
  },
  taxes: {
    id: 'taxes',
    title: 'Make tax season boring (in a good way)',
    why: 'Tax stress usually comes from records that are behind and money that was not set aside.',
    steps: [
      'Keep books current monthly so year-end is a review, not a rebuild.',
      'Set aside a percentage of each payment for taxes in a separate account. Ask your tax professional what percentage fits you.',
      'Keep a running checklist of documents your tax professional needs.',
    ],
    cta: monthlyCta,
  },
  goals: {
    id: 'goals',
    title: 'Set simple financial goals and a budget',
    why: 'Goals turn your numbers into a direction. Without them it is hard to know whether the business is on track.',
    steps: [
      'Set one revenue goal and one profit goal for the next quarter.',
      'Build a basic monthly budget from last quarter’s actual spending.',
      'Compare actuals to your budget during each monthly check-in.',
    ],
    cta: shopCta,
  },
  confidence: {
    id: 'confidence',
    title: 'Build decisions on real numbers',
    why: 'Confidence comes from knowing your numbers are accurate and knowing how to read them.',
    steps: [
      'Make sure your books are current and reconciled. Everything else depends on it.',
      'Learn the three core reports: profit & loss, balance sheet, and cash flow.',
      'Before your next big decision, write down which numbers it affects and check them first.',
    ],
    cta: consult,
  },
  keepGoing: {
    id: 'keepGoing',
    title: 'Protect what is working',
    why: 'Your foundation is strong. The next step is keeping these habits consistent as the business grows.',
    steps: [
      'Keep your monthly review rhythm, even in busy seasons.',
      'Revisit your goals each quarter and adjust as you learn.',
      'Consider handing off routine bookkeeping so your time goes to growth.',
    ],
    cta: consult,
  },
};

/** Which recommendation to lead with, based on the self-identified biggest challenge. */
export const challengeLead: Record<ChallengeId, string> = {
  behind: 'cleanup',
  numbers: 'monthlyReview',
  systems: 'documentation',
  taxes: 'taxes',
  growth: 'goals',
};

export const stages = [
  {
    min: 0,
    name: 'Getting Grounded',
    summary:
      "There's real opportunity here. A few foundational changes will make a big difference in how clear and in control you feel. You don't have to fix everything at once.",
  },
  {
    min: 40,
    name: 'Building Momentum',
    summary:
      'You have some good habits in place and a few gaps that are probably costing you time or peace of mind. Closing them will make your numbers much more useful.',
  },
  {
    min: 70,
    name: 'Running with Clarity',
    summary:
      'You have strong financial habits and solid visibility into your business. Your next gains come from consistency, refinement, and freeing up your time.',
  },
];
