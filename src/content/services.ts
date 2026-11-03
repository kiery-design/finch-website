import type { IconName } from '../components/Icon';

export type Service = {
  id: string;
  icon: IconName;
  name: string;
  summary: string;
  includes: string[];
  goodFit: string;
};

/**
 * Bookkeeping services. Describe what's included. Don't add pricing,
 * guarantees, or credentials here unless they're confirmed and accurate.
 */
export const services: Service[] = [
  {
    id: 'monthly',
    icon: 'ledger',
    name: 'Monthly Bookkeeping',
    summary:
      'Ongoing, month-by-month bookkeeping so your records stay current and you always have a clear picture of where your business stands.',
    includes: [
      'Categorizing income and expenses each month',
      'Reconciling bank and credit card accounts',
      'Keeping your books organized and up to date',
      'Monthly financial reports you can actually read',
      'A simple check-in rhythm for questions as they come up',
    ],
    goodFit: 'You want your books handled consistently so you can focus on running the business.',
  },
  {
    id: 'cleanup',
    icon: 'broom',
    name: 'Cleanup & Catch-Up Bookkeeping',
    summary:
      'For books that have fallen behind or gotten messy. We work through the backlog and get your records accurate and organized again.',
    includes: [
      'Reviewing where your books currently stand',
      'Catching up on uncategorized or missing months',
      'Reconciling accounts for the catch-up period',
      'Fixing miscategorized or duplicate transactions',
      'A clean starting point for monthly bookkeeping',
    ],
    goodFit: "You're months behind, starting fresh, or getting ready for tax season and need things sorted.",
  },
  {
    id: 'reporting',
    icon: 'chart',
    name: 'Financial Reporting Support',
    summary:
      'Help turning your numbers into reports, and helping you understand what those reports say about your business.',
    includes: [
      'Profit & loss and balance sheet reporting',
      'Plain-language walkthroughs of your reports',
      'Help spotting trends in revenue and spending',
      'Organized records ready to share with your tax professional',
    ],
    goodFit: 'You have data but want help reading it and using it to make decisions.',
  },
];

export const idealClients = [
  'Solo owners and small teams who are doing the books themselves and are ready to hand them off',
  'Service businesses, creatives, and online businesses with growing transaction volume',
  'Owners who feel behind, uncertain, or anxious every time tax season comes around',
  'Anyone who wants to make decisions from real numbers instead of guesses',
];

export const consultationSteps = [
  {
    title: 'Reach out',
    body: 'Send a short note through the contact page or email. Tell us a little about your business and where your books stand.',
  },
  {
    title: 'Have a conversation',
    body: "We'll set up a consultation to talk through your needs, your current setup, and what support would help most.",
  },
  {
    title: 'Get a clear proposal',
    body: "If it's a good fit, you'll receive a recommended scope and next steps. No pressure, and no obligation.",
  },
];

export const bookkeepingFaqs = [
  {
    q: 'How do I know if I need cleanup or monthly bookkeeping?',
    a: "If your books are more than a month or two behind, or you aren't sure they're accurate, cleanup usually comes first. Once you're current, monthly bookkeeping keeps you there. We'll help you figure it out during the consultation.",
  },
  {
    q: 'What do I need to get started?',
    a: "Usually access to your business bank and credit card accounts and to your bookkeeping software if you use one. We'll walk through exactly what's needed for your situation.",
  },
  {
    q: 'How is pricing determined?',
    a: 'Pricing depends on factors like transaction volume, number of accounts, and how far behind the books are. We discuss scope and pricing after learning about your business in the consultation.',
  },
  {
    q: 'Do you do taxes?',
    a: 'FINCH focuses on bookkeeping and financial clarity. We keep your records organized and ready to share with your tax professional, who handles tax preparation and filing.',
  },
];
