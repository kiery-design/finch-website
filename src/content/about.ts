/**
 * About page content.
 * `founder` is optional. Fill it in with your real story and the page
 * will show a founder section automatically. Leave it as null to hide it.
 */
export const founder: null | { name: string; role: string; bio: string[] } = null;

export const values = [
  {
    icon: 'compass' as const,
    title: 'Clarity over complexity',
    body: 'Numbers should help you decide, not overwhelm you. We explain things in plain language and focus on what matters.',
  },
  {
    icon: 'heart' as const,
    title: 'Judgment-free support',
    body: "Behind on your books? That's common. We meet you where you are and help you move forward.",
  },
  {
    icon: 'shield' as const,
    title: 'Trustworthy & careful',
    body: 'Your financial information is handled with care, accuracy, and discretion.',
  },
  {
    icon: 'layers' as const,
    title: 'Systems that stick',
    body: "Good habits beat heroic catch-up sessions. We build simple routines and tools you'll actually use.",
  },
];
