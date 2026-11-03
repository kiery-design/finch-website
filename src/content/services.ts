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
      'We keep your books current every month, so you never have to wonder whether the numbers are up to date. (They are.)',
    includes: [
      'Categorizing income and expenses each month',
      'Reconciling bank and credit card accounts',
      'Keeping your books organized and up to date',
      'Monthly financial reports you can actually read',
      'A simple check-in rhythm for questions as they come up',
    ],
    goodFit: 'Your books are mostly current and you want them to stay that way without your involvement.',
  },
  {
    id: 'cleanup',
    icon: 'broom',
    name: 'Cleanup & Catch-Up Bookkeeping',
    summary:
      'A few months behind, or a few years? We work through the backlog, reconcile every account, and fix whatever got miscategorized along the way. You end up with books you can build on.',
    includes: [
      'Reviewing where your books currently stand',
      'Catching up on uncategorized or missing months',
      'Reconciling accounts for the catch-up period',
      'Fixing miscategorized or duplicate transactions',
      'A clean starting point for monthly bookkeeping',
    ],
    goodFit: "You've been meaning to catch up for a while, or tax season is coming and the books aren't ready.",
  },
  {
    id: 'reporting',
    icon: 'chart',
    name: 'Financial Reporting Support',
    summary:
      "Reports are only useful if you can read them. We'll put them together and walk you through what they're telling you.",
    includes: [
      'Profit & loss and balance sheet reporting',
      'Plain-language walkthroughs of your reports',
      'Help spotting trends in revenue and spending',
      'Organized records ready to share with your tax professional',
    ],
    goodFit: 'You have the numbers but want help figuring out what they mean for the next decision.',
  },
];

export const idealClients = [
  "Owners who've been doing their own books and would like their evenings back",
  'Service businesses, creative studios, and online shops where the transactions add up fast',
  "Businesses whose tax professional keeps asking for things that take a week to find",
  "Anyone who'd rather make the next big decision from real numbers than a gut feeling",
];

export const consultationSteps = [
  {
    title: 'Send a short note',
    body: "Use the contact page or email us. What the business does and where the books stand is plenty to start.",
  },
  {
    title: 'Talk it through',
    body: "We'll set up a call to look at your current setup and figure out what kind of help makes sense.",
  },
  {
    title: 'Get a clear quote',
    body: "If it's a fit, you'll get a written scope and price before anything starts. If it isn't, we'll tell you that too.",
  },
];

export const bookkeepingFaqs = [
  {
    q: 'How do I know if I need cleanup or monthly bookkeeping?',
    a: "If the books are more than a month or two behind, or you're not sure they're right, cleanup comes first. Once you're current, monthly bookkeeping keeps you there. We'll sort out which one you need on the first call.",
  },
  {
    q: 'What do I need to get started?',
    a: "Usually read access to your business bank and credit card accounts, plus your bookkeeping software if you use one. We'll give you a short, specific list.",
  },
  {
    q: 'How is pricing determined?',
    a: "It depends on how many accounts you have, how busy they are, and, for cleanup, how far back we're going. We'll talk it through and give you a clear quote before any work starts.",
  },
  {
    q: 'Do you do taxes?',
    a: "No. We're bookkeepers, not tax preparers. We keep your records in good shape so your tax professional can do their job quickly, which tends to make everyone happier.",
  },
];
