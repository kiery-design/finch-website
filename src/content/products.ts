/**
 * Digital Shop products.
 * ------------------------------------------------------------------
 * These are PLACEHOLDERS until your real products are finalized.
 * To publish a real product:
 *   1. Set `placeholder: false`
 *   2. Add its Stan Store link in `stanUrl` (or leave empty to use the main store URL)
 *   3. Optionally add a `price` string exactly as shown on Stan (e.g. '$27')
 */

export type ProductCategory = 'Financial Tools' | 'Dashboards' | 'Notion Systems' | 'Operations';

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  highlights: string[];
  placeholder: boolean;
  stanUrl?: string;
  price?: string;
  /** Decorative card accent */
  accent: 'ink' | 'finch' | 'sage' | 'cream';
};

export const productCategories: ProductCategory[] = ['Financial Tools', 'Dashboards', 'Notion Systems', 'Operations'];

export const products: Product[] = [
  {
    id: 'cash-flow-dashboard',
    name: 'Cash Flow Dashboard',
    category: 'Dashboards',
    description: 'A visual dashboard to track money in, money out, and what is left over each month.',
    highlights: ['Monthly cash flow view', 'Simple data entry', 'Trend at a glance'],
    placeholder: true,
    accent: 'ink',
  },
  {
    id: 'pricing-calculator',
    name: 'Offer Pricing Calculator',
    category: 'Financial Tools',
    description: 'An interactive calculator to help you price offers with your costs, time, and margins in mind.',
    highlights: ['Cost + time inputs', 'Margin preview', 'Reusable for every offer'],
    placeholder: true,
    accent: 'finch',
  },
  {
    id: 'business-hub',
    name: 'Small Business Operations Hub',
    category: 'Notion Systems',
    description: 'A Notion workspace that brings your clients, projects, processes, and to-dos into one place.',
    highlights: ['Client & project tracker', 'Process library', 'Weekly planning view'],
    placeholder: true,
    accent: 'sage',
  },
  {
    id: 'money-check-in',
    name: 'Monthly Money Check-In',
    category: 'Financial Tools',
    description: 'A guided monthly review to look at your numbers, spot patterns, and set next steps.',
    highlights: ['Step-by-step prompts', 'Goal tracking', 'Printable & digital'],
    placeholder: true,
    accent: 'cream',
  },
  {
    id: 'expense-tracker',
    name: 'Expense & Receipt Tracker',
    category: 'Operations',
    description: 'A simple system for capturing expenses and keeping receipts organized all year long.',
    highlights: ['Category templates', 'Receipt log', 'Tax-time ready'],
    placeholder: true,
    accent: 'ink',
  },
  {
    id: 'tax-prep-kit',
    name: 'Tax Season Prep Kit',
    category: 'Operations',
    description: 'Checklists and organizers to gather what your tax professional needs, without the scramble.',
    highlights: ['Document checklist', 'Quarterly reminders', 'Handoff organizer'],
    placeholder: true,
    accent: 'finch',
  },
];
