/**
 * About page content.
 *
 * `founder`: add your name and a few short paragraphs in your own words.
 * When it's filled in, the About page headline becomes "Hi, I'm <name>."
 * and your paragraphs appear beside your photo. Until then the page uses
 * a neutral headline and doesn't make any claims about your background.
 */
export const founder: null | { name: string; role: string; bio: string[] } = null;

export const values = [
  {
    icon: 'compass' as const,
    title: 'Plain English, always.',
    body: "If we can't explain a number simply, we keep working on it until we can. You should never need a glossary to read your own reports.",
  },
  {
    icon: 'shield' as const,
    title: 'Careful with your information.',
    body: "You're trusting us with your bank accounts and your numbers. We treat that access the way you'd want it treated: only what's needed, and kept private.",
  },
  {
    icon: 'check' as const,
    title: "We'll tell you what we see.",
    body: "If something looks off, or a habit is costing you money, you'll hear about it. Politely, but you'll hear about it.",
  },
  {
    icon: 'layers' as const,
    title: 'Boring is the goal.',
    body: 'The best bookkeeping is the kind you stop thinking about: current every month, ready when someone asks, and never a surprise.',
  },
];
