import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Gently fades content up as it scrolls into view.
 * Content is always visible if JavaScript or IntersectionObserver is unavailable,
 * and the global reduced-motion rule turns the animation off.
 */
export default function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'hidden' | 'shown'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    // Only hide things that start below the fold, so nothing visible ever "pops".
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setState('hidden');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${state === 'hidden' ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'} transition duration-700 ease-out`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
