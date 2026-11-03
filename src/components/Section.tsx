import type { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'cream' | 'ink';
  id?: string;
  labelledBy?: string;
};

const tones = {
  default: '',
  cream: 'bg-cream-100',
  ink: 'bg-ink-900 text-cream-100',
};

export default function Section({ children, className = '', tone = 'default', id, labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-16 sm:py-24 ${tones[tone]} ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  inverted?: boolean;
};

export function SectionHeading({ id, eyebrow, title, intro, align = 'left', inverted = false }: SectionHeadingProps) {
  const alignCls = align === 'center' ? 'mx-auto text-center' : '';
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && <p className={`eyebrow ${inverted ? 'text-finch-300' : ''}`}>{eyebrow}</p>}
      <h2
        id={id}
        className={`mt-3 text-3xl font-semibold sm:text-4xl ${inverted ? 'text-cream-50' : ''}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${inverted ? 'text-cream-200' : 'text-ink-700'}`}>{intro}</p>
      )}
    </div>
  );
}
