import type { ReactNode } from 'react';

const tones = {
  neutral: 'bg-cream-200 text-ink-800',
  placeholder: 'bg-finch-100 text-finch-700 ring-1 ring-finch-300/60',
  ink: 'bg-ink-100 text-ink-800',
};

export default function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: keyof typeof tones }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
