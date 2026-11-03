import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'light';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 min-h-12 text-center';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-ink-900 text-cream-50 hover:bg-ink-800 focus-visible:outline-finch-600',
  accent: 'bg-finch-500 text-ink-950 hover:bg-finch-300 focus-visible:outline-ink-900',
  secondary:
    'border border-ink-900/15 bg-white text-ink-900 hover:border-ink-900/40 hover:bg-cream-100',
  ghost: 'text-ink-800 underline-offset-4 hover:underline px-2',
  light: 'bg-cream-50 text-ink-900 hover:bg-white focus-visible:outline-finch-500',
};

export function buttonClasses(variant: ButtonVariant = 'primary', extra = '') {
  return `${base} ${variants[variant]} ${extra}`.trim();
}

type CommonProps = { variant?: ButtonVariant; className?: string; children: ReactNode };

/** Internal route link styled as a button. */
export function ButtonLink({ to, variant, className, children }: CommonProps & { to: string }) {
  return (
    <Link to={to} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  );
}

/** External link styled as a button. Opens in a new tab. */
export function ButtonExternal({
  href,
  variant,
  className,
  children,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const isMail = href.startsWith('mailto:');
  return (
    <a
      href={href}
      className={buttonClasses(variant, className)}
      {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      {...rest}
    >
      {children}
      {!isMail && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export function Button({
  variant,
  className,
  children,
  type = 'button',
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses(variant, className)} {...rest}>
      {children}
    </button>
  );
}
