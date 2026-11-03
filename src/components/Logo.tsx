type LogoProps = { className?: string; inverted?: boolean };

/** FINCH mark + wordmark. Swap in a final logo file here when it's ready. */
export default function Logo({ className = '', inverted = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 64 64" className="h-8 w-8 shrink-0" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill={inverted ? '#FBF6EC' : '#14302A'} />
        <path
          d="M14 38c0-11 9-20 20-20 6 0 11 2.5 14.5 6.5L56 22l-4.5 8.5C52 42 43 50 32 50H14l6-6c-4-1-6-3.5-6-6z"
          fill="#E8834A"
        />
        <circle cx="40" cy="28" r="2.6" fill={inverted ? '#FBF6EC' : '#14302A'} />
      </svg>
      <span
        className={`font-display text-xl font-semibold tracking-[0.08em] ${inverted ? 'text-cream-100' : 'text-ink-900'}`}
      >
        FINCH
      </span>
    </span>
  );
}
